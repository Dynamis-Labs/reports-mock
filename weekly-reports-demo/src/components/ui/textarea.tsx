import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-surface-elevated border border-border rounded-lg px-4 py-2", // 8px vertical padding
          "text-ui text-foreground",
          "placeholder:text-muted-foreground/60",
          "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted",
          "transition-all duration-200 resize-none",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
