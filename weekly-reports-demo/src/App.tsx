import { useState } from "react";
import { ThemeProvider } from "./components/theme/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { AppLayout } from "./components/layout/app-layout";
import { ArchiveSidebar } from "./components/layout/archive-sidebar";
import { CommentPanel } from "./components/comments";
import { SourcesSidebar } from "./components/sources";
import { ReadingPane } from "./components/report/reading-pane";
import { SettingsPane } from "./components/settings";
import { ReviewActionsModal } from "./components/review-actions";
import { AskSentraChatbox } from "./components/chat";
import { CrmPage } from "./components/crm";
import { useSettingsStore } from "./stores/settings-store";
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

  const isSettingsOpen = useSettingsStore((state) => state.isOpen);

  const selectedReport =
    mockReports.find((r) => r.id === selectedReportId) ?? null;

  return (
    <ThemeProvider defaultTheme="system">
      <TooltipProvider delayDuration={300}>
        <AppLayout
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          leftSidebar={
            activeSection === "crm" ? null : (
              <ArchiveSidebar
                reports={mockReports}
                selectedReportId={selectedReportId}
                onSelectReport={setSelectedReportId}
              />
            )
          }
          mainContent={
            activeSection === "crm" ? (
              <CrmPage />
            ) : isSettingsOpen ? (
              <SettingsPane />
            ) : (
              <ReadingPane report={selectedReport} />
            )
          }
          commentPanel={
            activeSection === "crm"
              ? null
              : selectedReport &&
                !isSettingsOpen && (
                  <CommentPanel
                    reportId={selectedReport.id}
                    userName={CURRENT_USER.name}
                    userId={CURRENT_USER.id}
                  />
                )
          }
        />
        <ReviewActionsModal />
        {!isSettingsOpen && <AskSentraChatbox />}
        <SourcesSidebar />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
