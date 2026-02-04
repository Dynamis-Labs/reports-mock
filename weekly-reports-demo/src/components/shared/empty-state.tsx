import { Sparkles, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { springs, fadeVariants } from "../../lib/motion";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Empty state component for placeholder pages
 * Shows a clean "Coming Soon" message
 */
export function EmptyState({
  icon: Icon = Sparkles,
  title = "Coming Soon",
  description = "This feature is in development",
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      transition={springs.gentle}
      className={cn(
        "flex flex-col items-center justify-center h-full",
        "text-center p-8",
        className,
      )}
    >
      <div className="mb-4 p-4 rounded-2xl bg-muted/50">
        <Icon className="size-8 text-muted-foreground" strokeWidth={1.2} />
      </div>
      <h2 className="text-heading font-semibold text-foreground mb-2">
        {title}
      </h2>
      <p className="text-ui text-muted-foreground max-w-sm">{description}</p>
    </motion.div>
  );
}
