import { ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Info Row
 *
 * Displays a labeled piece of contact information with an icon.
 * Supports optional link behavior with external link indicator.
 */

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  compact?: boolean;
}

export function InfoRow({
  icon: Icon,
  label,
  value,
  href,
  compact = false,
}: InfoRowProps) {
  const content = (
    <div className="flex items-center gap-3 py-2">
      <Icon className="size-4 text-muted-foreground/60 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-micro text-muted-foreground/60 mb-0.5">{label}</p>
        <p
          className={`${compact ? "text-caption" : "text-ui"} text-foreground truncate`}
        >
          {value}
        </p>
      </div>
      {href && <ExternalLink className="size-3.5 text-muted-foreground/40" />}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-muted/50 -mx-3 px-3 rounded-lg transition-colors"
      >
        {content}
      </a>
    );
  }

  return content;
}
