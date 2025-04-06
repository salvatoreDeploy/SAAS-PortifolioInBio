import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "p-3 text-heading rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70",
        variant === "primary" && "bg-purple",
        variant === "secondary" && "bg-tertiary",
        variant === "ghost" && "bg-border-primary",
        className
      )}
      {...props}
    ></button>
  );
}
