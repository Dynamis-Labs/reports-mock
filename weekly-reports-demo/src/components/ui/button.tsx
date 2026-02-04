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
  secondary: "bg-muted text-white hover:bg-muted/80",
  outline:
    "border border-border bg-transparent hover:bg-muted hover:border-muted-foreground/30 hover:text-white",
  ghost: "hover:bg-muted text-foreground/60 hover:text-white",
  link: "underline-offset-4 hover:underline text-accent",
};

const buttonSizes = {
  sm: "h-8 px-3 text-caption rounded-md gap-1.5", // 32px height
  md: "h-10 px-4 text-ui rounded-lg gap-2", // 40px height (8px grid)
  lg: "h-12 px-6 text-ui rounded-lg gap-2", // 48px height (8px grid)
  icon: "size-8 rounded-md", // 32px square
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
