import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@lib/utils";
import { springs } from "@lib/motion";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
  size?: "xs" | "sm" | "md" | "lg" | "icon" | "icon-sm";
}

const buttonVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
  secondary:
    "bg-neutral-100 text-foreground hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-foreground/[0.04]",
  ghost:
    "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
  link: "text-accent underline-offset-4 hover:underline",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const buttonSizes = {
  xs: "h-7 px-2.5 text-caption rounded-[var(--radius-lg)] gap-1",
  sm: "h-8 px-3 text-caption rounded-[var(--radius-lg)] gap-1.5",
  md: "h-9 px-4 text-ui rounded-[var(--radius-lg)] gap-2",
  lg: "h-10 px-5 text-ui rounded-[var(--radius-lg)] gap-2",
  icon: "size-8 rounded-[var(--radius-lg)]",
  "icon-sm": "size-7 rounded-[var(--radius-md)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.985 }}
        transition={springs.quick}
        className={cn(
          "inline-flex items-center justify-center font-medium",
          "transition-colors duration-200 cursor-pointer",
          "disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        {...(props as HTMLMotionProps<"button">)}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
