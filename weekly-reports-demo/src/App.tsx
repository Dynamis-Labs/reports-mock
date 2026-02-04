import { useState } from "react";
import { ThemeProvider } from "./components/theme/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { AppLayout } from "./components/layout/app-layout";
import { ArchiveSidebar } from "./components/layout/archive-sidebar";
import { ReportsRadarToggle } from "./components/layout/reports-radar-toggle";
import { CommentPanel } from "./components/comments";
import { SourcesSidebar } from "./components/sources";
import { ReadingPane } from "./components/report/reading-pane";
import { SettingsPane } from "./components/settings";
import { ReviewActionsModal } from "./components/review-actions";
import { AskSentraChatbox } from "./components/chat";
import { CrmPage } from "./components/crm";
import { TodosPage } from "./components/todos";
import { ArchivePage } from "./components/archive";
import { MemoryPage } from "./components/memory";
import { MeetingsPage } from "./components/meetings";
import { RadarSidebar, RadarReadingPane } from "./components/radar";
import { useSettingsStore } from "./stores/settings-store";
import { useReportsStore } from "./stores/reports-store";
import { mockReports } from "./data/mock-reports";
import { mockRadarItems } from "./data/mock-radar";

// Mock current user - in a real app this would come from auth
const CURRENT_USER = {
  id: "user-1",
  name: "Justin Cheng",
};

function App() {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(
    mockReports[0]?.id ?? null,
  );
  const [selectedRadarId, setSelectedRadarId] = useState<string | null>(
    mockRadarItems[0]?.id ?? null,
  );
  const [activeSection, setActiveSection] = useState("reports");

  const isSettingsOpen = useSettingsStore((state) => state.isOpen);
  const viewMode = useReportsStore((state) => state.viewMode);
  const setViewMode = useReportsStore((state) => state.setViewMode);

  const selectedReport =
    mockReports.find((r) => r.id === selectedReportId) ?? null;
  const selectedRadarItem =
    mockRadarItems.find((r) => r.id === selectedRadarId) ?? null;

  // Determine if we're in a reports-style section (reports or radar via toggle)
  const isReportsSection = activeSection === "reports";
  const showReportsRadarToggle = isReportsSection;

  // Render the Reports/Radar toggle header - compact, centered in viewport
  const reportsRadarHeader = showReportsRadarToggle ? (
    <div className="h-9 flex items-center justify-center border-b border-border-subtle bg-background relative">
      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-30">
        <ReportsRadarToggle value={viewMode} onChange={setViewMode} />
      </div>
    </div>
  ) : null;

  // Determine left sidebar based on section and view mode
  const getLeftSidebar = () => {
    // Full-width sections with no sidebar (Memory has its own integrated sidebar)
    if (
      activeSection === "crm" ||
      activeSection === "meetings" ||
      activeSection === "todos" ||
      activeSection === "archive" ||
      activeSection === "memory"
    ) {
      return null;
    }

    if (isReportsSection) {
      if (viewMode === "radar") {
        return (
          <RadarSidebar
            selectedItemId={selectedRadarId}
            onSelectItem={setSelectedRadarId}
          />
        );
      }
      return (
        <ArchiveSidebar
          reports={mockReports}
          selectedReportId={selectedReportId}
          onSelectReport={setSelectedReportId}
        />
      );
    }

    return null;
  };

  // Determine main content based on section and view mode
  const getMainContent = () => {
    // Memory section
    if (activeSection === "memory") {
      return <MemoryPage />;
    }

    // CRM section
    if (activeSection === "crm") {
      return <CrmPage />;
    }

    // TODOs section
    if (activeSection === "todos") {
      return <TodosPage />;
    }

    // Meetings section
    if (activeSection === "meetings") {
      return <MeetingsPage />;
    }

    // Archive section
    if (activeSection === "archive") {
      return <ArchivePage />;
    }

    // Reports section (with radar toggle)
    if (isReportsSection) {
      if (isSettingsOpen) {
        return <SettingsPane />;
      }

      return (
        <div className="flex flex-col h-full">
          {reportsRadarHeader}
          {viewMode === "radar" ? (
            <RadarReadingPane item={selectedRadarItem} />
          ) : (
            <ReadingPane report={selectedReport} />
          )}
        </div>
      );
    }

    return null;
  };

  // Determine comment panel visibility
  const getCommentPanel = () => {
    if (activeSection !== "reports" || viewMode === "radar") {
      return null;
    }

    if (selectedReport && !isSettingsOpen) {
      return (
        <CommentPanel
          reportId={selectedReport.id}
          userName={CURRENT_USER.name}
          userId={CURRENT_USER.id}
        />
      );
    }

    return null;
  };

  return (
    <ThemeProvider defaultTheme="system">
      <TooltipProvider delayDuration={300}>
        <AppLayout
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          leftSidebar={getLeftSidebar()}
          mainContent={getMainContent()}
          commentPanel={getCommentPanel()}
        />
        <ReviewActionsModal />
        {!isSettingsOpen && <AskSentraChatbox />}
        <SourcesSidebar />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
