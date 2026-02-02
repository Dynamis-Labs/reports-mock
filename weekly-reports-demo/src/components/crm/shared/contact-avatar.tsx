import { cn } from "../../../lib/utils";
import type { Contact } from "../../../types/contact";

/**
 * Contact Avatar
 *
 * Displays contact's avatar with initials fallback.
 * Includes optional warmth indicator ring.
 */

interface ContactAvatarProps {
  contact: Contact;
  size?: "sm" | "md" | "lg" | "xl";
  showWarmthRing?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: {
    container: "size-6",
    text: "text-[10px]",
    ring: "ring-[1.5px]",
  },
  md: {
    container: "size-8",
    text: "text-xs",
    ring: "ring-2",
  },
  lg: {
    container: "size-10",
    text: "text-sm",
    ring: "ring-2",
  },
  xl: {
    container: "size-14",
    text: "text-lg",
    ring: "ring-[2.5px]",
  },
};

const warmthColors = {
  hot: "ring-red-500/60",
  warm: "ring-emerald-500/60",
  cool: "ring-amber-500/60",
  cold: "ring-slate-400/60",
  new: "ring-accent/60",
};

export function ContactAvatar({
  contact,
  size = "md",
  showWarmthRing = false,
  className,
}: ContactAvatarProps) {
  const config = sizeConfig[size];
  const initials = `${contact.firstName[0]}${contact.lastName[0]}`;

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center shrink-0",
        "bg-gradient-to-br from-accent/20 to-accent/5",
        "text-accent font-semibold",
        config.container,
        config.text,
        showWarmthRing && [
          "ring ring-offset-2 ring-offset-background",
          config.ring,
          warmthColors[contact.warmth],
        ],
        className
      )}
    >
      {contact.avatarUrl ? (
        <img
          src={contact.avatarUrl}
          alt={`${contact.firstName} ${contact.lastName}`}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="select-none">{initials}</span>
      )}
    </div>
  );
}
