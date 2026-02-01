import { motion } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import { useReviewActionsStore } from "../../stores/review-actions-store";
import { springs } from "../../lib/motion";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ReviewActionsHeader() {
  const {
    closeModal,
    goToNext,
    goToPrevious,
    actions,
    currentIndex,
    remainingCount,
  } = useReviewActionsStore();

  const remaining = remainingCount();
  const total = actions.length;
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < total - 1;

  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-border-subtle">
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={closeModal}
        className="size-8 text-muted-foreground hover:text-foreground"
        aria-label="Close modal"
      >
        <ArrowLeft className="size-4" />
      </Button>

      {/* Title */}
      <div className="flex items-center gap-2">
        <h2
          id="review-actions-title"
          className="font-semibold text-heading text-foreground"
        >
          Review Actions
        </h2>
        <span className="text-caption text-muted-foreground">
          ({remaining} remaining)
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          disabled={!canGoBack}
          className="size-8"
          aria-label="Previous action"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          disabled={!canGoForward}
          className="size-8"
          aria-label="Next action"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={springs.gentle}
        />
      </div>

      {/* Progress text */}
      <span className="text-caption text-muted-foreground tabular-nums min-w-[3ch]">
        {currentIndex + 1}/{total}
      </span>

      {/* Help */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground"
            aria-label="Help"
          >
            <HelpCircle className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-caption">
            Review and edit AI-suggested actions.
            <br />
            Press Skip to ignore, Done to complete.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
