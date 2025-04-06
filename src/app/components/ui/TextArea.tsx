import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends ComponentProps<"textarea"> {}

export default function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={twMerge(
        "w-full p-3 bg-secondary text-heading placeholder:text-placeholder rounded-xl border border-transparent hover:border-secondary hover:text-body active:border-tertiary",
        className
      )}
      {...props}
    ></textarea>
  );
}
