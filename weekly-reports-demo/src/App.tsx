import { useState } from "react";
import { ThemeProvider } from "./components/theme/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { AppLayout } from "./components/layout/app-layout";
import { ArchiveSidebar } from "./components/layout/archive-sidebar";
import { CommentPanel } from "./components/comments";
import { ReadingPane } from "./components/report/reading-pane";
import { ReviewActionsModal } from "./components/review-actions";
import { mockReports } from "./data/mock-reports";

// Mock current user - in a real app this would come from auth
const CURRENT_USER = {
  id: "user-1",
  name: "Justin Cheng",
};

function App() {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(
    mockReports[0]?.id ?? null,
  );
  const [activeSection, setActiveSection] = useState("reports");

  const selectedReport =
    mockReports.find((r) => r.id === selectedReportId) ?? null;

  return (
    <ThemeProvider defaultTheme="system">
      <TooltipProvider delayDuration={300}>
        <AppLayout
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          leftSidebar={
            <ArchiveSidebar
              reports={mockReports}
              selectedReportId={selectedReportId}
              onSelectReport={setSelectedReportId}
            />
          }
          mainContent={<ReadingPane report={selectedReport} />}
          commentPanel={
            selectedReport && (
              <CommentPanel
                reportId={selectedReport.id}
                userName={CURRENT_USER.name}
                userId={CURRENT_USER.id}
              />
            )
          }
        />
        <ReviewActionsModal />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
