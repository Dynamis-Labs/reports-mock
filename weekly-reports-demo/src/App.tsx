import { useState } from "react";
import { ThemeProvider } from "./components/theme/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { AppLayout } from "./components/layout/app-layout";
import { ReportsSidebar } from "./components/layout/reports-sidebar";
import { CommentPanel } from "./components/comments";
import { SourcesSidebar } from "./components/sources";
import { ReadingPane } from "./components/report/reading-pane";
import { SettingsPane } from "./components/settings";
import { ReviewActionsModal } from "./components/review-actions";
import { HomePage } from "./components/home";
import { CrmPage } from "./components/crm";
import { ArchivePage } from "./components/archive";
import { MemoryPage } from "./components/memory";
import { MeetingsPage } from "./components/meetings";
import { RadarReadingPane } from "./components/radar";
import { AskSentraChatbox } from "./components/chat/ask-sentra-chatbox";
import { useSettingsStore } from "./stores/settings-store";
import { useReportsStore } from "./stores/reports-store";
import { useMemoryStore } from "./stores/memory-store";
import { useArchiveStore } from "./stores/archive-store";
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
  const [activeSection, setActiveSection] = useState("home");

  const isSettingsOpen = useSettingsStore((state) => state.isOpen);
  const viewMode = useReportsStore((state) => state.viewMode);
  const setViewMode = useReportsStore((state) => state.setViewMode);

  const selectedReport =
    mockReports.find((r) => r.id === selectedReportId) ?? null;
  const selectedRadarItem =
    mockRadarItems.find((r) => r.id === selectedRadarId) ?? null;

  // Determine if we're in a reports-style section (reports or radar via toggle)
  const isReportsSection = activeSection === "reports";

  // Determine left sidebar based on section and view mode
  const getLeftSidebar = () => {
    // Full-width sections with no sidebar (Memory has its own integrated sidebar)
    if (
      activeSection === "home" ||
      activeSection === "crm" ||
      activeSection === "meetings" ||
      activeSection === "archive" ||
      activeSection === "memory"
    ) {
      return null;
    }

    if (isReportsSection) {
      return (
        <ReportsSidebar
          reports={mockReports}
          selectedReportId={selectedReportId}
          onSelectReport={setSelectedReportId}
          selectedRadarId={selectedRadarId}
          onSelectRadarItem={setSelectedRadarId}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      );
    }

    return null;
  };

  // Navigation handlers for Home page
  const selectInitiative = useMemoryStore((state) => state.selectInitiative);

  const handleNavigateToMemory = (initiativeId?: string) => {
    if (initiativeId) {
      selectInitiative(initiativeId);
    }
    setActiveSection("memory");
  };

  const handleNavigateToRadar = (radarId?: string) => {
    if (radarId) {
      setSelectedRadarId(radarId);
    }
    setViewMode("radar");
    setActiveSection("reports");
  };

  // Imperatively update archive store before navigation (Zustand getState pattern)
  const handleViewReportHistory = (reportTitle: string) => {
    const archiveStore = useArchiveStore.getState();
    archiveStore.setActiveTab("reports");
    archiveStore.setSearchQuery(reportTitle);
    archiveStore.selectArchivedReport(null);
    setActiveSection("archive");
  };

  // Determine main content based on section and view mode
  const getMainContent = () => {
    // Home section (default)
    if (activeSection === "home") {
      return (
        <HomePage
          onNavigateToMemory={handleNavigateToMemory}
          onNavigateToRadar={handleNavigateToRadar}
        />
      );
    }

    // Memory section
    if (activeSection === "memory") {
      return <MemoryPage />;
    }

    // CRM section
    if (activeSection === "crm") {
      return <CrmPage />;
    }

    // Meetings section
    if (activeSection === "meetings") {
      return <MeetingsPage />;
    }

    // Archive section
    if (activeSection === "archive") {
      return <ArchivePage />;
    }

    // Reports section
    if (isReportsSection) {
      if (isSettingsOpen) {
        return <SettingsPane />;
      }

      return viewMode === "radar" ? (
        <RadarReadingPane item={selectedRadarItem} />
      ) : (
        <ReadingPane
          report={selectedReport}
          onViewHistory={
            selectedReport
              ? () => handleViewReportHistory(selectedReport.title)
              : undefined
          }
        />
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
        <SourcesSidebar />
        <AskSentraChatbox />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
