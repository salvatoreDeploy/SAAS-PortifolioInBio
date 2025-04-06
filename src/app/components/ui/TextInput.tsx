import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentProps<"input"> {}

export default function TextInput({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={twMerge(
        "w-full bg-secondary text-heading placeholder:text-placeholder rounded-xl border border-transparent hover:border-secondary hover:text-body active:border-tertiary",
        className
      )}
    />
  );
}
