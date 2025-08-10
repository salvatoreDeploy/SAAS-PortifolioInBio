"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";

type ModalContextValue = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  titleId?: string;
  descriptionId?: string;
  registerTitleId: (id: string | undefined) => void;
  registerDescriptionId: (id: string | undefined) => void;
  setContentRef: (node: HTMLDivElement | null) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(componentName: string): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error(`${componentName} deve ser usado dentro de <Modal>`);
  }
  return ctx;
}

type ModalRootProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
  portal?: boolean;
};

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(
    container.querySelectorAll<HTMLElement>(selectors.join(","))
  ).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

function hasProvidedContent(children: React.ReactNode): boolean {
  const array = React.Children.toArray(children) as Array<React.ReactElement>;
  return array.some(
    (child) => child && child.type && (child.type as any).__IS_MODAL_CONTENT__
  );
}

function ModalRoot({
  children,
  isOpen,
  setIsOpen,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  lockScroll = true,
  portal = true,
}: ModalRootProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentNodeRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<Element | null>(null);

  const [titleId, setTitleId] = React.useState<string | undefined>(undefined);
  const [descriptionId, setDescriptionId] = React.useState<string | undefined>(
    undefined
  );

  const registerTitleId = useCallback((id: string | undefined) => {
    setTitleId(id);
  }, []);

  const registerDescriptionId = useCallback((id: string | undefined) => {
    setDescriptionId(id);
  }, []);

  // Fechar no ESC
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setIsOpen(false);
      }
      if (e.key === "Tab") {
        // Trap de foco simples
        const content = contentNodeRef.current;
        if (!content) return;
        const focusables = getFocusableElements(content);
        if (focusables.length === 0) {
          (content as HTMLElement).focus();
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || active === content) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (active === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEsc, setIsOpen]);

  // Trava a rolagem do body quando aberto
  useEffect(() => {
    if (!isOpen || !lockScroll) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen, lockScroll]);

  // Gerenciar foco ao abrir/fechar
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocusedElementRef.current = document.activeElement;
    const content = contentNodeRef.current;
    // Foco inicial
    setTimeout(() => {
      if (content) content.focus();
    }, 0);
    return () => {
      const prev = previouslyFocusedElementRef.current as HTMLElement | null;
      if (prev && typeof prev.focus === "function") {
        prev.focus();
      }
    };
  }, [isOpen]);

  const onOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!closeOnOverlayClick) return;
      if (e.target === overlayRef.current) {
        setIsOpen(false);
      }
    },
    [closeOnOverlayClick, setIsOpen]
  );

  const ctxValue = useMemo<ModalContextValue>(
    () => ({
      isOpen,
      setIsOpen,
      titleId,
      descriptionId,
      registerTitleId,
      registerDescriptionId,
      setContentRef: (node: HTMLDivElement | null) => {
        contentNodeRef.current = node;
      },
    }),
    [isOpen, setIsOpen, titleId, descriptionId]
  );

  if (!isOpen) return null;

  const content = (
    <ModalContext.Provider value={ctxValue}>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
        onClick={onOverlayClick}
        aria-hidden
      >
        {/* Caso o consumidor não use Modal.Content, fornecemos um wrapper padrão */}
        {hasProvidedContent(children) ? (
          children
        ) : (
          <div
            ref={(node) => {
              contentNodeRef.current = node;
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="outline-none"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        )}
      </div>
    </ModalContext.Provider>
  );

  if (!portal) return content;
  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}

type ModalOverlayProps = React.HTMLAttributes<HTMLDivElement>;
function ModalOverlay(props: ModalOverlayProps) {
  const { isOpen } = useModalContext("Modal.Overlay");
  if (!isOpen) return null;
  return (
    <div
      {...props}
      className={
        "fixed inset-0 z-40 backdrop-blur-md " +
        (props.className ? props.className : "")
      }
    />
  );
}

type ModalContentProps = React.HTMLAttributes<HTMLDivElement> & {
  autoFocus?: boolean;
};
function ModalContent({
  autoFocus = true,
  className,
  ...rest
}: ModalContentProps) {
  const { isOpen, titleId, descriptionId, setIsOpen, setContentRef } =
    useModalContext("Modal.Content");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen || !autoFocus) return;
    setTimeout(() => {
      ref.current?.focus();
    }, 0);
  }, [isOpen, autoFocus]);

  return (
    <div
      ref={(node) => {
        ref.current = node;
        setContentRef(node);
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={`z-50 outline-none ${className ?? ""}`}
      tabIndex={-1}
      onClick={(e) => e.stopPropagation()}
      {...rest}
    />
  );
}

ModalContent.__IS_MODAL_CONTENT__ = true;

type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>;
function ModalHeader(props: ModalHeaderProps) {
  return <div {...props} />;
}

type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;
function ModalFooter(props: ModalFooterProps) {
  return <div {...props} />;
}

type ModalTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
function ModalTitle({ id, ...rest }: ModalTitleProps) {
  const autoId = useId();
  const { registerTitleId } = useModalContext("Modal.Title");
  const resolvedId = id ?? `modal-title-${autoId}`;

  useEffect(() => {
    registerTitleId(resolvedId);
    return () => registerTitleId(undefined);
  }, [resolvedId, registerTitleId]);

  return <h2 id={resolvedId} {...rest} />;
}

type ModalDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
function ModalDescription({ id, ...rest }: ModalDescriptionProps) {
  const autoId = useId();
  const { registerDescriptionId } = useModalContext("Modal.Description");
  const resolvedId = id ?? `modal-desc-${autoId}`;

  useEffect(() => {
    registerDescriptionId(resolvedId);
    return () => registerDescriptionId(undefined);
  }, [resolvedId, registerDescriptionId]);

  return <p id={resolvedId} {...rest} />;
}

type ModalCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
function ModalClose({ onClick, ...rest }: ModalCloseProps) {
  const { setIsOpen } = useModalContext("Modal.Close");
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      onClick?.(e);
      if (!e.defaultPrevented) setIsOpen(false);
    },
    [onClick, setIsOpen]
  );
  return <button type="button" onClick={handleClick} {...rest} />;
}

export const Modal = Object.assign(ModalRoot, {
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Footer: ModalFooter,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
});
