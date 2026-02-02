// Spring configurations for consistent animations throughout the app

export const springs = {
  // Quick, snappy interactions (buttons, toggles)
  quick: { type: "spring" as const, stiffness: 400, damping: 30 },

  // Standard UI transitions (panels, modals)
  default: { type: "spring" as const, stiffness: 300, damping: 30 },

  // Slower, more deliberate reveals (page content)
  gentle: { type: "spring" as const, stiffness: 200, damping: 25 },

  // Page-level transitions
  page: { type: "spring" as const, stiffness: 150, damping: 20 },
};

// Variants for staggered content reveals
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springs.gentle,
  },
};

// Fade variants
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide up variants
export const slideUpVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// Slide in from right variants
export const slideInRightVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

// Scale fade for popovers
export const popoverVariants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 5 },
};

// Modal overlay (full-screen backdrop)
export const modalOverlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Modal content (centered panel)
export const modalContentVariants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

// Action slide animation for navigating between forms
export const actionSlideVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  animate: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
  }),
};

// Chatbox quick actions container
export const chatboxQuickActionsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
};

// Individual quick action chip
export const chatboxChipVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.quick,
  },
  exit: { opacity: 0, y: -4, scale: 0.98 },
};

// Chat message entrance
export const chatMessageVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.default,
  },
};
