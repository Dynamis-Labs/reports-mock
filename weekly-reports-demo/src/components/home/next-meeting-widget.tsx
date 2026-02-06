/**
 * Next Meeting Widget
 *
 * Compact square card matching the Up Next design from the meetings page.
 * Layout: "UP NEXT" + countdown → title → description → View Brief →
 * attendee chips → platform + Join Now footer.
 */

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ChevronRight, ExternalLink, Clock } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { PlatformIndicator } from "../meetings/shared/platform-indicator";
import { AttendeeChips } from "../meetings/shared/attendee-chips";
import { useHomeStore } from "../../stores/home-store";
import { mockMeetings } from "../../data/mock-meetings";
import type { Meeting } from "../../types/meeting";

// ─────────────────────────────────────────────────────────────────────────────
// Meeting time utilities
// ─────────────────────────────────────────────────────────────────────────────

function parseMeetingDate(meeting: Meeting): Date {
  const meetingDate = new Date(meeting.date);
  const [time, period] = meeting.startTime.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let hour24 = hours;
  if (period === "PM" && hours !== 12) hour24 += 12;
  if (period === "AM" && hours === 12) hour24 = 0;
  meetingDate.setHours(hour24, minutes, 0, 0);
  return meetingDate;
}

function getNextMeeting(meetings: Meeting[]): Meeting | null {
  const now = new Date();

  const futureMeetings = meetings
    .filter((m) => parseMeetingDate(m) > now)
    .sort(
      (a, b) => parseMeetingDate(a).getTime() - parseMeetingDate(b).getTime(),
    );

  return futureMeetings[0] ?? null;
}

function formatTimeUntil(meeting: Meeting): string {
  const now = new Date();
  const meetingDate = parseMeetingDate(meeting);
  const diffMs = meetingDate.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Starting now";
  if (diffMins < 60) return `In ${diffMins} min (${meeting.startTime})`;
  if (diffHours < 24) {
    return `In ${diffHours}h (${meeting.startTime})`;
  }
  if (diffDays === 1) return `Tomorrow (${meeting.startTime})`;
  return `In ${diffDays} days`;
}

function isMeetingImminent(meeting: Meeting): boolean {
  const now = new Date();
  const meetingDate = parseMeetingDate(meeting);
  const diffMs = meetingDate.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  return diffMins <= 15 && diffMins >= -30;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function NextMeetingWidget() {
  const [timeUntil, setTimeUntil] = useState("");
  const [isImminent, setIsImminent] = useState(false);
  const openBriefPopup = useHomeStore((state) => state.openBriefPopup);

  const meeting = getNextMeeting(mockMeetings);

  useEffect(() => {
    if (!meeting) return;

    const updateTime = () => {
      setTimeUntil(formatTimeUntil(meeting));
      setIsImminent(isMeetingImminent(meeting));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [meeting]);

  const handleViewBrief = useCallback(() => {
    if (meeting) {
      openBriefPopup(meeting.id);
    }
  }, [meeting, openBriefPopup]);

  const handleJoin = useCallback(() => {
    if (meeting?.meetingUrl) {
      window.open(meeting.meetingUrl, "_blank", "noopener,noreferrer");
    }
  }, [meeting?.meetingUrl]);

  // ── Empty state ──────────────────────────────────────────────────────────
  if (!meeting) {
    return (
      <div className="h-full flex flex-col bg-surface rounded-xl border border-border overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <Clock
              className="size-8 text-muted-foreground/30 mx-auto mb-2"
              strokeWidth={1}
            />
            <p className="text-caption text-muted-foreground">
              No upcoming meetings
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main card ────────────────────────────────────────────────────────────
  return (
    <div className="h-full flex flex-col rounded-xl border border-border bg-background relative overflow-hidden">
      {/* Subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="flex-1 flex flex-col p-5">
        {/* Row 1: "UP NEXT" label + countdown */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground/60">
            Up Next
          </span>
          <div
            className={cn(
              "flex items-center gap-1.5 text-sm",
              isImminent ? "text-accent" : "text-muted-foreground",
            )}
          >
            <Clock className="size-4" strokeWidth={1.5} />
            <span>{timeUntil}</span>
          </div>
        </div>

        {/* Row 2: Title */}
        <h3 className="text-base font-semibold text-foreground leading-tight mb-1.5 line-clamp-1">
          {meeting.title}
        </h3>

        {/* Row 3: Description */}
        {meeting.description && (
          <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
            {meeting.description}
          </p>
        )}

        {/* Row 4: View Brief link */}
        <button
          type="button"
          onClick={handleViewBrief}
          className="text-accent hover:text-accent/80 text-sm font-medium mb-3 flex items-center gap-1 hover:gap-2 transition-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1"
        >
          View Brief <ChevronRight className="size-4" />
        </button>

        {/* Row 5: Attendees */}
        <AttendeeChips attendees={meeting.attendees} maxDisplay={3} size="md" />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Row 6: Footer — platform + Join Now */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle">
          <PlatformIndicator
            platform={meeting.platform}
            location={meeting.location}
            showLabel={false}
          />
          {meeting.meetingUrl && (
            <motion.div
              initial={isImminent ? { opacity: 0, scale: 0.9 } : false}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                variant="default"
                onClick={handleJoin}
                className="h-8 text-sm px-4 rounded-md"
              >
                Join Now
                <ExternalLink className="size-3.5 ml-1.5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
