import { Video, Users, Building2, Phone } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { MeetingPlatform } from "../../../types/meeting";

interface PlatformIndicatorProps {
  platform: MeetingPlatform;
  className?: string;
  showLabel?: boolean;
}

const platformConfig: Record<
  MeetingPlatform,
  { label: string; color: string }
> = {
  zoom: { label: "Zoom", color: "text-blue-500" },
  meet: { label: "Google Meet", color: "text-green-500" },
  teams: { label: "Teams", color: "text-purple-500" },
  phone: { label: "Phone", color: "text-slate-500" },
  "in-person": { label: "In Person", color: "text-orange-500" },
};

/**
 * Displays the meeting platform with icon and optional label
 */
export function PlatformIndicator({
  platform,
  className,
  showLabel = true,
}: PlatformIndicatorProps) {
  const config = platformConfig[platform];
  const Icon =
    platform === "in-person"
      ? Building2
      : platform === "phone"
        ? Phone
        : platform === "teams"
          ? Users
          : Video;

  return (
    <div className={cn("flex items-center gap-1.5 text-caption", className)}>
      <Icon className={cn("size-4", config.color)} />
      {showLabel && (
        <span className="text-muted-foreground">{config.label}</span>
      )}
    </div>
  );
}
