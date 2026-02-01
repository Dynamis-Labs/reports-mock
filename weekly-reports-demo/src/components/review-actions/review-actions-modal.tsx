import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useReviewActionsStore } from "../../stores/review-actions-store";
import {
  modalOverlayVariants,
  modalContentVariants,
  springs,
} from "../../lib/motion";
import { ReviewActionsHeader } from "./review-actions-header";
import { ActionFormContainer } from "./action-form-container";
import { Button } from "../ui/button";

export function ReviewActionsModal() {
  const { isOpen, closeModal, skipAction, markCompleted, draftAction } =
    useReviewActionsStore();

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  // Focus trap - focus first focusable element when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const modal = document.getElementById("review-actions-modal");
        const firstFocusable = modal?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        firstFocusable?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="review-actions-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={modalOverlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={springs.default}
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-actions-title"
        >
          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal content */}
          <motion.div
            className="relative w-full max-w-2xl mx-4 bg-surface-elevated rounded-2xl shadow-float border border-border"
            variants={modalContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springs.default}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <ReviewActionsHeader />

            {/* Content */}
            <div className="px-6 py-4 min-h-[400px]">
              <ActionFormContainer />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-subtle">
              <Button variant="outline" size="md" onClick={skipAction}>
                Skip
              </Button>
              <Button
                variant="default"
                size="md"
                onClick={markCompleted}
                disabled={!draftAction}
              >
                Done
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
