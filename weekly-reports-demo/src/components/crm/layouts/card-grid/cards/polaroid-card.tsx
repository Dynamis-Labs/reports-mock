import { motion } from "motion/react";
import { cn } from "../../../../../lib/utils";
import { formatRelativeTime } from "../../../../../lib/date-utils";
import { staggerItem } from "../../../../../lib/motion";
import type { Contact } from "../../../../../types/contact";

/**
 * Polaroid Card
 *
 * Nostalgic instant-photo aesthetic with warm, personal feel.
 * Large photo dominates, handwriting-style name, subtle film grain.
 */

interface PolaroidCardProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

export function PolaroidCard({
  contact,
  isSelected,
  onClick,
}: PolaroidCardProps) {
  const fullName = `${contact.firstName} ${contact.lastName}`;
  const initials = `${contact.firstName[0]}${contact.lastName[0]}`;

  // Random slight rotation for organic feel (-2 to 2 degrees)
  const rotation = ((contact.id.charCodeAt(0) % 5) - 2) * 0.8;

  return (
    <motion.button
      variants={staggerItem}
      onClick={onClick}
      whileHover={{
        y: -8,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={{ rotate: rotation }}
      className={cn(
        "group relative text-left w-full",
        "bg-[#fefdfb] dark:bg-[#2a2825]",
        "rounded-sm shadow-md",
        "border-[6px] border-b-[40px] border-[#faf8f5] dark:border-[#3a3835]",
        "transition-shadow duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
        isSelected
          ? "shadow-xl ring-2 ring-amber-400/50"
          : "hover:shadow-xl",
      )}
    >
      {/* Photo area with film grain overlay */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200 dark:bg-neutral-700">
        {contact.avatarUrl ? (
          <img
            src={contact.avatarUrl}
            alt={fullName}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
            <span className="text-4xl font-light text-amber-700/60 dark:text-amber-300/60 uppercase tracking-wider">
              {initials}
            </span>
          </div>
        )}

        {/* Film grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none" />
      </div>

      {/* Info area - styled like Polaroid caption */}
      <div className="absolute bottom-0 left-0 right-0 h-[40px] -mb-[40px] px-3 flex flex-col justify-center">
        <h3
          className="font-medium text-sm text-neutral-800 dark:text-neutral-200 truncate text-center"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {fullName}
        </h3>
        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate text-center tracking-wide">
          {contact.title} · {formatRelativeTime(contact.lastContacted)}
        </p>
      </div>
    </motion.button>
  );
}
