import { FileText, Mail, Upload } from "lucide-react";
import { motion } from "motion/react";
import { springs } from "../../lib/motion";
import { cn } from "../../lib/utils";

const actions = [
  { id: "gdoc", label: "Add to Google Doc", icon: FileText },
  { id: "email", label: "Email to Engineering", icon: Mail },
  { id: "github", label: "Upload to GitHub", icon: Upload },
];

export function PRDActions() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springs.quick}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg",
              "border border-border bg-surface",
              "hover:border-accent hover:bg-accent-muted",
              "transition-colors duration-150",
            )}
          >
            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-caption text-foreground font-medium">
              {action.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
