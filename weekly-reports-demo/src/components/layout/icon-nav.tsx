import { motion } from "motion/react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Home01Icon,
  Brain01Icon,
  UserGroupIcon,
  Calendar03Icon,
  File02Icon,
  Archive02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@lib/utils";
import { Avatar } from "@components/ui/avatar";
import { ThemeToggle } from "@components/theme/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

interface NavItem {
  id: string;
  icon: IconSvgElement;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: Home01Icon, label: "Home" },
  { id: "memory", icon: Brain01Icon, label: "Memory" },
  { id: "crm", icon: UserGroupIcon, label: "CRM" },
  { id: "meetings", icon: Calendar03Icon, label: "Meetings" },
  { id: "reports", icon: File02Icon, label: "Reports" },
  { id: "archive", icon: Archive02Icon, label: "Archive" },
];

interface IconNavProps {
  activeSection: string;
  onSectionChange?: (section: string) => void;
}

export function IconNav({ activeSection, onSectionChange }: IconNavProps) {
  return (
    <nav className="w-[52px] shrink-0 flex flex-col items-center py-3 bg-sidebar border-r border-border">
      {/* Nav Items */}
      <div className="flex-1 flex flex-col items-center gap-2">
        {navItems.map((item) => {
          const isActive = item.id === activeSection;

          return (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => onSectionChange?.(item.id)}
                  className={cn(
                    "relative size-8 rounded-[var(--radius-md)] flex items-center justify-center",
                    "transition-colors duration-200",
                    isActive
                      ? "bg-accent-muted text-accent"
                      : "text-foreground/50 hover:bg-muted hover:text-foreground",
                  )}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", duration: 0.15, bounce: 0 }}
                >
                  <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.5} />
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute left-0 w-0.5 h-4 bg-accent rounded-r"
                      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                    />
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Bottom section: Theme toggle + User */}
      <div className="flex flex-col items-center gap-2 pt-3 border-t border-border">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              <Avatar name="Justin Cheng" size="md" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
