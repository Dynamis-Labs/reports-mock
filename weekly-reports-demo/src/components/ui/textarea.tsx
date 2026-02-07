import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-surface-elevated border border-border rounded-[var(--radius-md)] px-3 py-2",
          "text-ui text-foreground",
          "placeholder:text-muted-foreground/50",
          "focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300",
          "dark:focus:border-neutral-500 dark:focus:ring-neutral-600",
          "transition-all duration-200 resize-none",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
