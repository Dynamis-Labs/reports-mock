import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { springs, staggerContainer, staggerItem } from "../../lib/motion";
import { Button } from "../ui/button";
import { InfoPopover } from "../ui/info-popover";
import {
  useSettingsStore,
  type Frequency,
  type Preset,
} from "../../stores/settings-store";

// Preset definitions with detailed descriptions
const PRESETS: Array<{
  id: Preset;
  title: string;
  description: string;
}> = [
  {
    id: "org-overview",
    title: "Org-wide overview",
    description:
      "Broadly summarize the movements across the organization this week, highlighting key achievements, blockers, and measurable progress across all teams.",
  },
  {
    id: "engineering",
    title: "Engineering focus",
    description:
      "Focus on technical progress; completed milestones, overdue tasks, emerging risks, and any incidents or blockers from the engineering team.",
  },
  {
    id: "customer-revenue",
    title: "Customer & revenue focus",
    description:
      "Dive deep into customer relations, focusing on any feedback, risks of churn, and any delays or issues on our end relating to revenue-impacting activities.",
  },
];

// Schedule options
const FREQUENCIES: Array<{ value: Frequency; label: string }> = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Biweekly" },
  { value: "monthly", label: "Monthly" },
];

const DAYS_OF_WEEK = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const TIMES = [
  { value: "06:00", label: "6:00 AM" },
  { value: "07:00", label: "7:00 AM" },
  { value: "08:00", label: "8:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
  { value: "18:00", label: "6:00 PM" },
];

// Info content for section headers
const SCHEDULE_INFO =
  "Report generation begins 2 hours prior to the scheduled time. Note that changing the time to a later time will not trigger a new report generation if a report was already generated within the last 24 hours.";

const REPORT_FOCUS_INFO =
  "By default, Sentra will make a report for you that highlights major changes over the last week — updates on what progressed as well as any blockers or issues — followed by drill-downs into the details of various projects and initiatives.\n\nCustomize what Sentra should focus on when writing your report, as well as the format.";

// Custom select component for consistent styling
interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

function Select({ label, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="flex-1 min-w-0">
      <label className="block text-caption text-muted-foreground mb-1.5">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full h-10 px-3 rounded-lg",
            "bg-muted border border-border-subtle text-white",
            "flex items-center justify-between gap-2",
            "text-ui text-left",
            "transition-colors duration-200",
            "hover:bg-muted/80",
            "focus:outline-none focus:ring-1 focus:ring-accent",
          )}
        >
          <span className="truncate">{selectedOption?.label ?? "Select"}</span>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop to close dropdown */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "absolute z-20 top-full left-0 right-0 mt-1",
                  "bg-surface-elevated border border-border rounded-lg shadow-lg",
                  "max-h-48 overflow-y-auto",
                )}
              >
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-ui text-left",
                      "flex items-center justify-between",
                      "transition-colors duration-150",
                      option.value === value
                        ? "bg-accent-muted text-accent"
                        : "hover:bg-muted/50 hover:text-white",
                    )}
                  >
                    <span>{option.label}</span>
                    {option.value === value && (
                      <Check className="size-4 text-accent" />
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Preset card component - simplified without info icon
interface PresetCardProps {
  preset: (typeof PRESETS)[0];
  isSelected: boolean;
  onClick: () => void;
}

function PresetCard({ preset, isSelected, onClick }: PresetCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={staggerItem}
      whileTap={{ scale: 0.99 }}
      transition={springs.quick}
      className={cn(
        "w-full p-5 rounded-lg text-left",
        "border transition-colors duration-200",
        isSelected
          ? "border-accent bg-accent-muted"
          : "border-border-subtle hover:border-accent/50",
      )}
    >
      <h4 className="text-ui font-medium">{preset.title}</h4>
      <p className="text-caption text-muted-foreground mt-2 leading-relaxed">
        {preset.description}
      </p>
    </motion.button>
  );
}

// Section header with info icon
interface SectionHeaderProps {
  title: string;
  infoContent: string;
}

function SectionHeader({ title, infoContent }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-caption uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <InfoPopover>
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {infoContent}
        </p>
      </InfoPopover>
    </div>
  );
}

export function SettingsPane() {
  const {
    closeSettings,
    frequency,
    dayOfWeek,
    time,
    preset,
    customInstructions,
    updateSchedule,
    setPreset,
    setCustomInstructions,
    saveSettings,
  } = useSettingsStore();

  // Derive showCustom from state - visible when preset is custom OR has custom instructions
  const showCustom = preset === "custom" || customInstructions.length > 0;

  const handlePresetClick = (presetId: Preset) => {
    setPreset(presetId);
  };

  const handleCustomToggle = () => {
    if (showCustom && preset === "custom") {
      // If closing custom and it was selected, clear and select first preset
      setCustomInstructions("");
      setPreset("org-overview");
    } else {
      // Opening custom section
      setPreset("custom");
    }
  };

  const handleSave = () => {
    saveSettings();
  };

  // Handle Escape key to close settings
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSettings();
      }
    },
    [closeSettings],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={springs.gentle}
      className="h-full flex flex-col bg-background"
    >
      {/* Header */}
      <header className="relative shrink-0 px-8 pt-12 pb-6 border-b border-border-subtle">
        <h1 className="text-title font-semibold">Settings</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={closeSettings}
          className="absolute top-6 right-6 size-8"
        >
          <X className="size-4" />
        </Button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto px-8 py-12 space-y-12">
          {/* Schedule Section */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>
              <SectionHeader title="Schedule" infoContent={SCHEDULE_INFO} />
            </motion.div>
            <motion.div variants={staggerItem} className="flex gap-4">
              <Select
                label="Frequency"
                value={frequency}
                onChange={(v) => updateSchedule({ frequency: v as Frequency })}
                options={FREQUENCIES}
              />
              <Select
                label="Day"
                value={dayOfWeek}
                onChange={(v) => updateSchedule({ dayOfWeek: v })}
                options={DAYS_OF_WEEK}
              />
              <Select
                label="Time"
                value={time}
                onChange={(v) => updateSchedule({ time: v })}
                options={TIMES}
              />
            </motion.div>
          </motion.section>

          {/* Divider */}
          <div className="border-b border-border-subtle" />

          {/* Focus Section */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>
              <SectionHeader
                title="Report Focus"
                infoContent={REPORT_FOCUS_INFO}
              />
            </motion.div>

            {/* Preset Cards - stacked vertically for better readability */}
            <motion.div variants={staggerItem} className="space-y-3 mb-6">
              {PRESETS.map((p) => (
                <PresetCard
                  key={p.id}
                  preset={p}
                  isSelected={preset === p.id}
                  onClick={() => handlePresetClick(p.id)}
                />
              ))}
            </motion.div>

            {/* Custom Instructions Toggle */}
            <motion.div variants={staggerItem}>
              <button
                type="button"
                onClick={handleCustomToggle}
                className={cn(
                  "flex items-center gap-2 text-ui",
                  "transition-colors duration-200",
                  showCustom
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform duration-200",
                    showCustom && "rotate-180",
                  )}
                />
                <span>Custom report preferences</span>
              </button>

              <AnimatePresence>
                {showCustom && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-caption text-muted-foreground mt-3 mb-2">
                      Provide specific instructions on how you want your weekly
                      reports structured and what to focus on.
                    </p>
                    <textarea
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      placeholder="e.g., Focus on trends in sprint velocity, highlight blockers and their resolution time, and emphasize team achievements."
                      className={cn(
                        "w-full max-w-full p-3 rounded-lg",
                        "bg-muted border border-border-subtle text-white",
                        "text-ui placeholder:text-muted-foreground/60",
                        "resize-none min-h-[100px]",
                        "focus:outline-none focus:ring-1 focus:ring-accent",
                        "box-border",
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* Footer */}
      <footer className="shrink-0 px-8 py-4 border-t border-border-subtle">
        <div className="max-w-lg mx-auto flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </footer>
    </motion.div>
  );
}
