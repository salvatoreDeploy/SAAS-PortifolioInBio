"use client";

import { useOnClickOutside } from "@/app/hooks/useOnClickOutside";
import { useRef } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside({ ref, handler: () => setIsOpen(false) });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
      <div ref={ref}>{children}</div>
    </div>
  );
}
