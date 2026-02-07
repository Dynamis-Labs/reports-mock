/**
 * Personal Swimlane
 *
 * Horizontal swimlane showing personal high-level tasks.
 * Features:
 * - Horizontal scroll container
 * - No week columns, no connection lines
 * - 4-6 cards visible at once
 * - Fade gradients on scroll edges
 */

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@lib/utils";
import { PersonalTaskCard } from "./personal-task-card";
import { useHomeStore } from "@stores/home-store";
import { mockPersonalTasks } from "@data/mock-home";

export function PersonalSwimlane() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const openTaskPopup = useHomeStore((state) => state.openTaskPopup);

  // Update fade gradients based on scroll position
  const updateFadeState = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setShowLeftFade(scrollLeft > 10);
    setShowRightFade(scrollLeft < maxScroll - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Initial check
    updateFadeState();

    scrollContainer.addEventListener("scroll", updateFadeState);
    window.addEventListener("resize", updateFadeState);

    return () => {
      scrollContainer.removeEventListener("scroll", updateFadeState);
      window.removeEventListener("resize", updateFadeState);
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-surface rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <header className="shrink-0 px-6 py-4 border-b border-border-subtle">
        <h2 className="text-heading font-semibold text-foreground">
          Your Focus Areas
        </h2>
        <p className="text-caption text-muted-foreground mt-1">
          High-level work streams you're actively driving
        </p>
      </header>

      {/* Scrollable content with fade edges */}
      <div className="flex-1 relative">
        {/* Left fade gradient */}
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-12 z-10",
            "bg-gradient-to-r from-surface to-transparent",
            "pointer-events-none transition-opacity duration-200",
            showLeftFade ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Right fade gradient */}
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-12 z-10",
            "bg-gradient-to-l from-surface to-transparent",
            "pointer-events-none transition-opacity duration-200",
            showRightFade ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Scrollable card container */}
        <div
          ref={scrollRef}
          className="h-full overflow-x-auto overflow-y-hidden scrollbar-thin"
        >
          <motion.div
            className="flex gap-4 p-6 h-full items-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {mockPersonalTasks.map((task) => (
              <motion.div
                key={task.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              >
                <PersonalTaskCard
                  task={task}
                  onClick={() => openTaskPopup(task.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
