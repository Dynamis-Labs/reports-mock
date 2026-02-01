import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/utils";
import { springs } from "../../lib/motion";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

const buttonVariants = {
  default: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm",
  secondary: "bg-muted text-foreground hover:bg-muted/80",
  outline:
    "border border-border bg-transparent hover:bg-muted hover:border-muted-foreground/30",
  ghost: "hover:bg-muted text-muted-foreground hover:text-foreground",
  link: "underline-offset-4 hover:underline text-accent",
};

const buttonSizes = {
  sm: "h-8 px-3 text-caption rounded-md",
  md: "h-9 px-4 text-ui rounded-lg",
  lg: "h-10 px-5 text-ui rounded-lg",
  icon: "size-8 rounded-md",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
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
