import { motion } from "motion/react";
import { Avatar } from "../ui/avatar";
import { cn, formatRelativeTime } from "../../lib/utils";
import type { CommentHighlight } from "../../stores/comment-store";

interface CommentCardProps {
  highlight: CommentHighlight;
  isActive: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function CommentCard({
  highlight,
  isActive,
  onClick,
  style,
}: CommentCardProps) {
  if (!highlight.comment) return null;

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95,
      }}
      whileHover={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.2, bounce: 0 }}
      style={style}
      className={cn(
        "absolute right-4 w-64 p-3 rounded-lg cursor-pointer",
        "bg-sidebar border border-border shadow-sm",
        "transition-shadow duration-200",
        isActive && "ring-2 ring-accent shadow-md",
      )}
    >
      {/* Header: avatar + name + time */}
      <div className="flex items-center gap-2 mb-2">
        <Avatar name={highlight.comment.userName} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-caption font-medium truncate">
            {highlight.comment.userName}
          </p>
        </div>
        <span className="text-micro text-muted-foreground shrink-0">
          {formatRelativeTime(highlight.comment.createdAt)}
        </span>
      </div>

      {/* Highlighted text preview */}
      <p className="text-micro text-muted-foreground mb-2 line-clamp-1 italic">
        "{highlight.selectedText}"
      </p>

      {/* Comment text */}
      <p className="text-caption">{highlight.comment.text}</p>
    </motion.div>
  );
}
