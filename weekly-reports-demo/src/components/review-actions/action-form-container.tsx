import { motion, AnimatePresence } from "motion/react";
import { useReviewActionsStore } from "../../stores/review-actions-store";
import { isMeetingAction, isEmailAction } from "../../types/action";
import { actionSlideVariants, springs } from "../../lib/motion";
import { MeetingActionForm } from "./meeting-action-form";
import { EmailActionForm } from "./email-action-form";

export function ActionFormContainer() {
  const { draftAction, direction } = useReviewActionsStore();

  if (!draftAction) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <p className="text-caption text-muted-foreground">
          No actions to review
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={draftAction.id}
        custom={direction}
        variants={actionSlideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={springs.default}
      >
        {isMeetingAction(draftAction) && (
          <MeetingActionForm action={draftAction} />
        )}
        {isEmailAction(draftAction) && <EmailActionForm action={draftAction} />}
      </motion.div>
    </AnimatePresence>
  );
}
