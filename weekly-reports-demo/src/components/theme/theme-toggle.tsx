import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun01Icon, Moon01Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "./theme-provider";
import { cn } from "@lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggle}
      className={cn(
        "size-10 rounded-[var(--radius-lg)] flex items-center justify-center",
        "text-foreground/60 hover:bg-muted hover:text-foreground",
        "transition-colors duration-200",
      )}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      >
        <HugeiconsIcon
          icon={isDark ? Moon01Icon : Sun01Icon}
          size={20}
          strokeWidth={1.5}
        />
      </motion.div>
    </motion.button>
  );
}
