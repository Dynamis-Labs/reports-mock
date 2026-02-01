import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full bg-surface-elevated border border-border rounded-lg px-3 py-2",
          "text-ui text-foreground",
          "placeholder:text-muted-foreground/60",
          "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted",
          "transition-all duration-200",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
