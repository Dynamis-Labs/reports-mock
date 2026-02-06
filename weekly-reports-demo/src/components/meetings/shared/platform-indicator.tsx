import { Phone, MapPin } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../ui/tooltip";
import type { MeetingPlatform } from "../../../types/meeting";

interface PlatformIndicatorProps {
  platform: MeetingPlatform;
  /** Physical location for in-person meetings (shown in tooltip) */
  location?: string;
  className?: string;
  showLabel?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Brand SVG Icons (inline for zero-dependency, crisp rendering)
// ─────────────────────────────────────────────────────────────────────────────

function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="5" width="14" height="14" rx="3" fill="#2D8CFF" />
      <path d="M16 10.5L21 7.5V16.5L16 13.5V10.5Z" fill="#2D8CFF" />
      <rect x="5" y="9" width="8" height="2" rx="1" fill="white" />
    </svg>
  );
}

function GoogleMeetIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 6.5C3 5.67 3.67 5 4.5 5H14V10H8L3 6.5Z" fill="#00832D" />
      <path d="M3 17.5C3 18.33 3.67 19 4.5 19H14V14H8L3 17.5Z" fill="#0066DA" />
      <path d="M14 5V10L19 7V5.5C19 5.22 18.78 5 18.5 5H14Z" fill="#00AC47" />
      <path
        d="M14 14V19H18.5C18.78 19 19 18.78 19 18.5V17L14 14Z"
        fill="#4285F4"
      />
      <path d="M14 10V14L19 17V7L14 10Z" fill="#FFBA00" />
      <path d="M19 7L22 5V19L19 17V7Z" fill="#00832D" />
    </svg>
  );
}

function TeamsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="13" height="13" rx="2" fill="#5B5FC7" />
      <text
        x="9.5"
        y="14"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        T
      </text>
      <circle cx="18" cy="8" r="3.5" fill="#7B83EB" />
      <path d="M15 13H21C21 13 21 18 18 18C15 18 15 13 15 13Z" fill="#7B83EB" />
    </svg>
  );
}

function InPersonIcon({ className }: { className?: string }) {
  return (
    <MapPin className={cn("text-orange-500", className)} strokeWidth={1.8} />
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <Phone className={cn("text-slate-500", className)} strokeWidth={1.8} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Platform config
// ─────────────────────────────────────────────────────────────────────────────

const platformConfig: Record<MeetingPlatform, { label: string }> = {
  zoom: { label: "Zoom" },
  meet: { label: "Google Meet" },
  teams: { label: "Teams" },
  phone: { label: "Phone" },
  "in-person": { label: "In Person" },
};

const platformIcons: Record<
  MeetingPlatform,
  React.ComponentType<{ className?: string }>
> = {
  zoom: ZoomIcon,
  meet: GoogleMeetIcon,
  teams: TeamsIcon,
  phone: PhoneIcon,
  "in-person": InPersonIcon,
};

/**
 * Displays the meeting platform with branded icon and optional label.
 *
 * - Zoom: blue camera icon
 * - Google Meet: multi-color camera icon
 * - Teams: purple T icon
 * - Phone: standard phone icon
 * - In Person: map pin icon with location tooltip on hover
 */
export function PlatformIndicator({
  platform,
  location,
  className,
  showLabel = true,
}: PlatformIndicatorProps) {
  const config = platformConfig[platform];
  const Icon = platformIcons[platform];

  const content = (
    <div className={cn("flex items-center gap-1.5 text-caption", className)}>
      <Icon className="size-4" />
      {showLabel && (
        <span className="text-muted-foreground">{config.label}</span>
      )}
    </div>
  );

  // In-person meetings with a location get a tooltip on hover
  if (platform === "in-person" && location) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex cursor-default">{content}</div>
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-1.5">
          <MapPin className="size-3 opacity-60" strokeWidth={1.5} />
          <span>{location}</span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
