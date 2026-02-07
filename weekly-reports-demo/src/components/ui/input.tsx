import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full h-9 bg-surface-elevated border border-border rounded-[var(--radius-md)] px-3",
          "text-ui text-foreground",
          "placeholder:text-muted-foreground/50",
          "focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300",
          "dark:focus:border-neutral-500 dark:focus:ring-neutral-600",
          "transition-all duration-200",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
