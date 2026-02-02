import { Columns2, Square, Rows3 } from "lucide-react";
import { motion } from "motion/react";
import {
  useReviewActionsStore,
  type ModalLayout,
} from "../../stores/review-actions-store";
import { springs } from "../../lib/motion";

const layouts: { id: ModalLayout; icon: typeof Columns2; label: string }[] = [
  { id: "split-panel", icon: Columns2, label: "Split Panel" },
  { id: "minimal-card", icon: Square, label: "Minimal Card" },
  { id: "accordion", icon: Rows3, label: "Accordion" },
];

export function LayoutSwitcher() {
  const { layout, setLayout } = useReviewActionsStore();

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-muted/50">
      {layouts.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setLayout(id)}
          className={`relative p-1.5 rounded transition-colors ${
            layout === id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground/70"
          }`}
          title={label}
          aria-label={`Switch to ${label} layout`}
        >
          {layout === id && (
            <motion.div
              layoutId="layout-indicator"
              className="absolute inset-0 bg-surface rounded shadow-sm"
              transition={springs.quick}
            />
          )}
          <Icon className="size-4 relative z-10" />
        </button>
      ))}
    </div>
  );
}
