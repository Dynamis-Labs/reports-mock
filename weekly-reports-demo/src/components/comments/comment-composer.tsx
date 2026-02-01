import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Avatar } from "../ui/avatar";
import { cn } from "../../lib/utils";

interface CommentComposerProps {
  userName: string;
  selectedText: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

export function CommentComposer({
  userName,
  selectedText,
  onSubmit,
  onCancel,
}: CommentComposerProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      className="p-4 space-y-4"
    >
      {/* Selected text preview */}
      <div className="bg-accent/10 rounded-md p-3 border-l-2 border-accent">
        <p className="text-caption text-muted-foreground line-clamp-3">
          "{selectedText}"
        </p>
      </div>

      {/* User info + textarea */}
      <div className="flex gap-3">
        <Avatar name={userName} size="sm" />
        <div className="flex-1 space-y-2">
          <p className="text-caption font-medium">{userName}</p>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment..."
            rows={3}
            className={cn(
              "w-full resize-none rounded-md border border-border bg-background",
              "px-3 py-2 text-ui placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
            )}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className={cn(
            "px-4 py-2 text-caption font-medium rounded-md",
            "text-muted-foreground hover:bg-muted transition-colors",
          )}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className={cn(
            "px-4 py-2 text-caption font-medium rounded-md",
            "bg-accent text-accent-foreground",
            "hover:bg-accent/90 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          Comment
        </button>
      </div>
    </motion.div>
  );
}
