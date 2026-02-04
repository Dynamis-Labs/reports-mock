import { Github } from "lucide-react";
import { motion } from "motion/react";
import { springs } from "../../lib/motion";
import { cn, isValidExternalUrl } from "../../lib/utils";
import { SlackIcon } from "../icons/source-icons";

interface PRDSourcesProps {
  slackUrl: string;
}

export function PRDSources({ slackUrl }: PRDSourcesProps) {
  const isValidUrl = isValidExternalUrl(slackUrl);

  const handleSlackClick = () => {
    if (isValidUrl) {
      window.open(slackUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-caption text-muted-foreground font-medium">
        Sources:
      </span>

      <div className="flex items-center gap-2">
        {/* Slack icon (clickable) */}
        <motion.button
          onClick={handleSlackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springs.quick}
          className={cn(
            "size-8 rounded-lg flex items-center justify-center",
            "bg-muted text-white",
            "hover:bg-purple-100 hover:text-purple-600",
            "dark:hover:bg-purple-950 dark:hover:text-purple-400",
            "transition-colors duration-150",
          )}
          title="View in Slack"
        >
          <SlackIcon className="size-4" />
        </motion.button>

        {/* GitHub icon */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springs.quick}
          className={cn(
            "size-8 rounded-lg flex items-center justify-center",
            "bg-muted text-white",
            "hover:bg-accent-muted hover:text-accent",
            "transition-colors duration-150",
          )}
          title="View on GitHub"
        >
          <Github className="size-4" strokeWidth={1.5} />
        </motion.button>
      </div>
    </div>
  );
}
