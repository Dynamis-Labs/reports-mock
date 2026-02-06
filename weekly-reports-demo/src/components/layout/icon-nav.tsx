import { motion } from "motion/react";
import {
  Home,
  Brain,
  Users,
  Calendar,
  FileText,
  Archive,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/avatar";
import { ThemeToggle } from "../theme/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "memory", icon: Brain, label: "Memory" },
  { id: "crm", icon: Users, label: "CRM" },
  { id: "meetings", icon: Calendar, label: "Meetings" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "archive", icon: Archive, label: "Archive" },
];

interface IconNavProps {
  activeSection: string;
  onSectionChange?: (section: string) => void;
}

export function IconNav({ activeSection, onSectionChange }: IconNavProps) {
  return (
    <nav className="w-[52px] shrink-0 flex flex-col items-center py-3 bg-sidebar border-r border-border">
      {/* Nav Items - 8px gap between items */}
      <div className="flex-1 flex flex-col items-center gap-2">
        {navItems.map((item) => {
          const isActive = item.id === activeSection;
          const Icon = item.icon;

          return (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => onSectionChange?.(item.id)}
                  className={cn(
                    "relative size-8 rounded-md flex items-center justify-center",
                    "transition-colors duration-200",
                    isActive
                      ? "bg-accent-muted text-accent"
                      : "text-foreground/50 hover:bg-muted hover:text-white",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", duration: 0.15, bounce: 0 }}
                >
                  <Icon className="size-4" strokeWidth={1.5} />
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
