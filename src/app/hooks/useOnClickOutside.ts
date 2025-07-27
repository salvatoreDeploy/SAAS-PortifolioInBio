import { useEffect } from "react"

type useOnClickOutsideProps = {
  ref: React.RefObject<HTMLDivElement | null>,
  handler?: (event: MouseEvent | TouchEvent) => void
}

export function useOnClickOutside({ ref, handler }: useOnClickOutsideProps) { 
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement

      if (!ref.current || ref.current.contains(target)) {
        return
      }

      if (handler) {
        handler(event)
      }
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref,handler])
}