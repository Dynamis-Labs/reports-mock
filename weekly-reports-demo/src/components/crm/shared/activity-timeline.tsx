import { motion } from "motion/react";
import {
  Mail,
  Calendar,
  Phone,
  MessageSquare,
  Linkedin,
  FileText,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { springs } from "../../../lib/motion";
import type { Interaction, InteractionType } from "../../../types/contact";

/**
 * Activity Timeline
 *
 * Displays recent interactions with icons and relative timestamps.
 * Features staggered reveal animation.
 */

const interactionConfig: Record<
  InteractionType,
  { icon: typeof Mail; color: string }
> = {
  email: { icon: Mail, color: "text-blue-500" },
  meeting: { icon: Calendar, color: "text-violet-500" },
  call: { icon: Phone, color: "text-emerald-500" },
  slack: { icon: MessageSquare, color: "text-pink-500" },
  linkedin: { icon: Linkedin, color: "text-sky-600" },
  note: { icon: FileText, color: "text-amber-500" },
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

interface ActivityTimelineProps {
  interactions: Interaction[];
  limit?: number;
  animated?: boolean;
}

export function ActivityTimeline({
  interactions,
  limit = 5,
  animated = true,
}: ActivityTimelineProps) {
  const items = interactions.slice(0, limit);

  if (!animated) {
    return (
      <div className="space-y-0.5">
        {items.map((interaction) => {
          const config = interactionConfig[interaction.type];
          const Icon = config.icon;

          return (
            <div
              key={interaction.id}
              className={cn(
                "group flex items-center gap-3 py-2 px-2.5 -mx-2.5 rounded-lg",
                "hover:bg-muted/60 transition-colors cursor-default",
              )}
            >
              <div
                className={cn(
                  "size-7 rounded-md flex items-center justify-center shrink-0",
                  "bg-muted/50 group-hover:bg-muted transition-colors",
                )}
              >
                <Icon className={cn("size-3.5", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-ui text-foreground truncate leading-tight">
                  {interaction.subject}
                </p>
                {interaction.summary && (
                  <p className="text-micro text-muted-foreground/70 truncate mt-0.5">
                    {interaction.summary}
                  </p>
                )}
              </div>
              <span className="text-micro text-muted-foreground/60 tabular-nums shrink-0">
                {formatRelativeTime(interaction.date)}
              </span>
            </div>
          );
        })}
        {interactions.length > limit && (
          <div className="pt-1">
            <button className="text-micro text-accent hover:text-accent/80 transition-colors">
              View {interactions.length - limit} more interactions
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
      className="space-y-0.5"
    >
      {items.map((interaction, i) => {
        const config = interactionConfig[interaction.type];
        const Icon = config.icon;

        return (
          <motion.div
            key={interaction.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, ...springs.quick }}
            className={cn(
              "group flex items-center gap-3 py-2 px-2.5 -mx-2.5 rounded-lg",
              "hover:bg-muted/60 transition-colors cursor-default",
            )}
          >
            <div
              className={cn(
                "size-7 rounded-md flex items-center justify-center shrink-0",
                "bg-muted/50 group-hover:bg-muted transition-colors",
              )}
            >
              <Icon className={cn("size-3.5", config.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-ui text-foreground truncate leading-tight">
                {interaction.subject}
              </p>
              {interaction.summary && (
                <p className="text-micro text-muted-foreground/70 truncate mt-0.5">
                  {interaction.summary}
                </p>
              )}
            </div>
            <span className="text-micro text-muted-foreground/60 tabular-nums shrink-0">
              {formatRelativeTime(interaction.date)}
            </span>
          </motion.div>
        );
      })}
      {interactions.length > limit && (
        <div className="pt-1">
          <button className="text-micro text-accent hover:text-accent/80 transition-colors">
            View {interactions.length - limit} more interactions
          </button>
        </div>
      )}
    </motion.div>
  );
}
