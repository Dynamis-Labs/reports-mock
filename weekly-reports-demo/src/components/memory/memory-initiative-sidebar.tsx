import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, AlertCircle, Zap } from "lucide-react";
import { cn } from "../../lib/utils";
import { initiativeCategoryColors, type Initiative } from "../../types/memory";
import {
  useMemoryStore,
  useIsInitiativeSelected,
  useIsSectionExpanded,
} from "../../stores/memory-store";

/**
 * Initiative Sidebar
 *
 * Left sidebar showing initiatives (swimlanes) grouped by status:
 * - ACTIVE section: Initiatives that are in progress
 * - BLOCKED section: Initiatives that are blocked/stalled
 *
 * Each initiative item shows:
 * - Category-colored dot
 * - Initiative name
 * - Event count badge
 */

interface InitiativeItemProps {
  initiative: Initiative;
}

function InitiativeItem({ initiative }: InitiativeItemProps) {
  const isSelected = useIsInitiativeSelected(initiative.id);
  const selectInitiative = useMemoryStore((state) => state.selectInitiative);

  // Get dot color from category
  const dotColor =
    initiativeCategoryColors[initiative.category] || "bg-slate-400";

  const handleClick = () => {
    selectInitiative(initiative.id);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={cn(
        "w-full text-left px-3 py-2.5 rounded-md",
        "transition-colors duration-150",
        isSelected
          ? "bg-accent-muted text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Category dot */}
        <span className={cn("size-2 rounded-full shrink-0", dotColor)} />

        {/* Initiative name */}
        <span className="text-caption font-medium truncate">
          {initiative.name}
        </span>
      </div>
    </motion.button>
  );
}

interface SectionProps {
  title: string;
  sectionKey: "active" | "blocked";
  initiatives: Initiative[];
  icon: typeof Zap;
}

function Section({ title, sectionKey, initiatives, icon: Icon }: SectionProps) {
  const isExpanded = useIsSectionExpanded(sectionKey);
  const toggleSection = useMemoryStore((state) => state.toggleSection);

  return (
    <div>
      {/* Section Header */}
      <button
        type="button"
        onClick={() => toggleSection(sectionKey)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5",
          "text-caption font-semibold text-muted-foreground",
          "hover:text-foreground transition-colors",
        )}
      >
        <div className="flex items-center gap-2">
          <Icon className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
          <span className="uppercase tracking-wider">{title}</span>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-3.5 opacity-50" strokeWidth={1.5} />
        </motion.div>
      </button>

      {/* Initiative Items */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 pb-2">
              {initiatives.length === 0 ? (
                <p className="px-3 py-2 text-micro text-muted-foreground/50 italic">
                  No initiatives
                </p>
              ) : (
                initiatives.map((initiative) => (
                  <InitiativeItem key={initiative.id} initiative={initiative} />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MemoryInitiativeSidebar() {
  const getInitiativesByStatus = useMemoryStore(
    (state) => state.getInitiativesByStatus,
  );

  const { active, blocked } = getInitiativesByStatus();

  return (
    <aside className="w-[220px] shrink-0 bg-sidebar border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-3 border-b border-border">
        <h2 className="text-caption font-semibold text-foreground uppercase tracking-wider">
          Swimlanes
        </h2>
        <p className="text-micro text-muted-foreground/60 mt-0.5">
          {active.length + blocked.length} initiatives
        </p>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Active Section */}
        <Section
          title="Active"
          sectionKey="active"
          initiatives={active}
          icon={Zap}
        />

        {/* Divider */}
        <div className="my-2 mx-3 border-t border-border/50" />

        {/* Blocked Section */}
        <Section
          title="Blocked"
          sectionKey="blocked"
          initiatives={blocked}
          icon={AlertCircle}
        />
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-border text-micro text-muted-foreground/50">
        Click to view timeline
      </div>
    </aside>
  );
}
