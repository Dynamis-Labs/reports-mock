import { motion, AnimatePresence } from "motion/react";
import { CommentComposer } from "./comment-composer";
import { useCommentStore } from "../../stores/comment-store";
import { cn } from "../../lib/utils";

interface CommentPanelProps {
  reportId: string;
  userName: string;
  userId: string;
}

export function CommentPanel({
  reportId,
  userName,
  userId,
}: CommentPanelProps) {
  const { pendingSelection, isComposerOpen, closeComposer, addComment } =
    useCommentStore();

  const handleSubmit = (text: string) => {
    addComment(text, userName, userId, reportId);
  };

  return (
    <AnimatePresence>
      {isComposerOpen && pendingSelection && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className={cn(
            "shrink-0 border-l border-border bg-sidebar overflow-hidden",
          )}
        >
          <div className="w-80">
            <div className="p-4 border-b border-border">
              <h3 className="text-caption font-semibold">Add Comment</h3>
            </div>
            <CommentComposer
              userName={userName}
              selectedText={pendingSelection.text}
              onSubmit={handleSubmit}
              onCancel={closeComposer}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
