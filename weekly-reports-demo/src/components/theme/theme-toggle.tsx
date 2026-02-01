import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "../../lib/utils";

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
        "size-10 rounded-lg flex items-center justify-center",
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        "transition-colors duration-200",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      >
        {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
      </motion.div>
    </motion.button>
  );
}
