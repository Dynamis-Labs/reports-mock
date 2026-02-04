import { ChevronRight, type LucideIcon } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface BreadcrumbItem {
  label: string;
  icon?: LucideIcon;
}

interface PageBreadcrumbHeaderProps {
  items: BreadcrumbItem[];
  actions?: ReactNode;
  className?: string;
}

/**
 * Thin page header showing navigation breadcrumb (36px height)
 * Shows: Section icon + label, optional sub-page title
 */
export function PageBreadcrumbHeader({
  items,
  actions,
  className,
}: PageBreadcrumbHeaderProps) {
  return (
    <header
      className={cn(
        "h-9 px-6 flex items-center justify-between",
        "border-b border-border-subtle bg-background shrink-0",
        className,
      )}
    >
      <nav className="flex items-center gap-1.5">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === items.length - 1;

          return (
            <Fragment key={index}>
              {index > 0 && (
                <ChevronRight
                  className="size-3 text-muted-foreground/40"
                  strokeWidth={1.5}
                />
              )}
              <span
                className={cn(
                  "flex items-center gap-1.5 text-caption",
                  isLast
                    ? "text-foreground font-medium"
                    : "text-muted-foreground",
                )}
              >
                {Icon && (
                  <Icon className="size-3.5" strokeWidth={isLast ? 1.5 : 1.2} />
                )}
                {item.label}
              </span>
            </Fragment>
          );
        })}
      </nav>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
