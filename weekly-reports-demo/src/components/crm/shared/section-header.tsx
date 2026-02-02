import type { LucideIcon } from "lucide-react";

/**
 * Section Header
 *
 * Consistent section header component with icon and title.
 * Used across expanded content, detail panes, and drawers.
 */

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  variant?: "default" | "accent";
}

export function SectionHeader({
  icon: Icon,
  title,
  variant = "default",
}: SectionHeaderProps) {
  if (variant === "accent") {
    return (
      <div className="flex items-center gap-2 mb-3">
        <Icon className="size-4 text-accent" />
        <h4 className="font-medium text-micro text-accent uppercase tracking-wider">
          {title}
        </h4>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="size-4 text-accent" />
      <h4 className="font-semibold text-ui text-foreground">{title}</h4>
    </div>
  );
}
