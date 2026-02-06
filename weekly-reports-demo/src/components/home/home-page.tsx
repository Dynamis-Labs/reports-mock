/**
 * Home Page
 *
 * Main dashboard page with 3 sections:
 * - Top Half: Personal Swimlane (high-level work tasks)
 * - Bottom-Left (2/3): Needs Attention (items needing attention)
 * - Bottom-Right (1/3): Next Meeting Widget
 */

import { PersonalSwimlane } from "./personal-swimlane";
import { PersonalTaskPopup } from "./personal-task-popup";
import { InvolvementSection } from "./involvement-section";
import { NeedsAttentionPopup } from "./needs-attention-popup";
import { NextMeetingWidget } from "./next-meeting-widget";
import { MeetingBriefPopup } from "./meeting-brief-popup";

interface HomePageProps {
  onNavigateToMemory: (initiativeId?: string) => void;
  onNavigateToRadar: (radarId?: string) => void;
}

export function HomePage({
  onNavigateToMemory,
  onNavigateToRadar,
}: HomePageProps) {
  return (
    <div className="h-full bg-background px-6 pt-6">
      {/* Cards container — top 85% of the page */}
      <div className="h-[85%] flex flex-col gap-5">
        {/* Top half: Personal Swimlane */}
        <div className="h-1/2 shrink-0 min-h-0">
          <PersonalSwimlane />
        </div>

        {/* Bottom half: Involvement + Meeting Widget */}
        <div className="h-1/2 min-h-0 grid grid-cols-3 gap-5">
          {/* Involvement Section (2/3 width) */}
          <div className="col-span-2">
            <InvolvementSection
              onNavigateToMemory={(initiativeId) =>
                onNavigateToMemory(initiativeId)
              }
              onNavigateToRadar={(radarId) => onNavigateToRadar(radarId)}
            />
          </div>

          {/* Meeting Widget (1/3 width) */}
          <div className="col-span-1">
            <NextMeetingWidget />
          </div>
        </div>
      </div>

      {/* Bottom 15% — whitespace for chatbox */}

      {/* Popups */}
      <PersonalTaskPopup />
      <MeetingBriefPopup />
      <NeedsAttentionPopup
        onNavigateToMemory={(initiativeId) => onNavigateToMemory(initiativeId)}
        onNavigateToRadar={(radarId) => onNavigateToRadar(radarId)}
      />
    </div>
  );
}
