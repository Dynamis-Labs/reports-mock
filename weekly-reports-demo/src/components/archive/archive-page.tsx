import { useMemo } from "react";
import { ArchiveHeader } from "./archive-header";
import { ArchiveReportsList, type ArchivedReport } from "./reports";
import { RadarsList } from "./radars";
import { useArchiveStore } from "../../stores/archive-store";
import { mockReports } from "../../data/mock-reports";
import { mockRadarItems } from "../../data/mock-radar";
import { ReadingPane } from "../report/reading-pane";
import { RadarReadingPane } from "../radar/radar-reading-pane";

/**
 * Transform existing reports into archived reports format
 * (Radar items are now displayed separately in the Radars tab)
 */
function getArchivedReports(): ArchivedReport[] {
  const reports: ArchivedReport[] = [];

  // Add weekly reports only (no radar items mixed in)
  for (const report of mockReports) {
    reports.push({
      id: report.id,
      title: report.title,
      summary: report.content.slice(0, 150).replace(/[#*]/g, "").trim() + "...",
      type:
        report.reportType === "leadership-digest"
          ? "weekly"
          : report.title.toLowerCase().includes("daily")
            ? "daily"
            : "standard",
      date: report.generatedAt,
      isUnread: report.id === mockReports[0]?.id,
    });
  }

  return reports;
}

/**
 * Main Archive page component
 * Displays radars and reports in a tabbed interface with detail views
 */
export function ArchivePage() {
  const {
    activeTab,
    setActiveTab,
    selectedArchivedReportId,
    selectArchivedReport,
    selectedRadarId,
    selectRadar,
    searchQuery,
    setSearchQuery,
  } = useArchiveStore();

  // Get archived reports (without radar items)
  const archivedReports = useMemo(() => getArchivedReports(), []);

  // Find selected report
  const selectedReport = useMemo(() => {
    if (!selectedArchivedReportId) return null;
    return mockReports.find((r) => r.id === selectedArchivedReportId) ?? null;
  }, [selectedArchivedReportId]);

  // Find selected radar
  const selectedRadar = useMemo(() => {
    if (!selectedRadarId) return null;
    return mockRadarItems.find((r) => r.id === selectedRadarId) ?? null;
  }, [selectedRadarId]);

  // Handle report selection
  const handleSelectReport = (id: string) => {
    selectArchivedReport(id);
  };

  // Handle radar selection
  const handleSelectRadar = (id: string) => {
    selectRadar(id);
  };

  // Render list view (radars or reports)
  const renderList = () => {
    if (activeTab === "radars") {
      return (
        <div className="flex-1 overflow-hidden flex flex-col p-3">
          <RadarsList
            radars={mockRadarItems}
            selectedRadarId={selectedRadarId}
            onSelectRadar={handleSelectRadar}
            searchQuery={searchQuery}
          />
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-hidden flex flex-col p-3">
        <ArchiveReportsList
          reports={archivedReports}
          selectedReportId={selectedArchivedReportId}
          onSelectReport={handleSelectReport}
          searchQuery={searchQuery}
        />
      </div>
    );
  };

  // Render detail view
  const renderDetail = () => {
    if (activeTab === "radars") {
      if (!selectedRadar) {
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-px bg-border mx-auto mb-6" />
              <p className="text-heading font-medium text-muted-foreground">
                Select a radar alert to view
              </p>
              <div className="w-24 h-px bg-border mx-auto mt-6" />
            </div>
          </div>
        );
      }
      return <RadarReadingPane item={selectedRadar} />;
    }

    // Reports tab detail
    if (!selectedReport) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-px bg-border mx-auto mb-6" />
            <p className="text-heading font-medium text-muted-foreground">
              Select a report to view
            </p>
            <div className="w-24 h-px bg-border mx-auto mt-6" />
          </div>
        </div>
      );
    }

    return <ReadingPane report={selectedReport} />;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header with search and tabs */}
      <ArchiveHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        radarsCount={mockRadarItems.length}
        reportsCount={archivedReports.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex border-t border-border-subtle">
        {/* Left panel: List */}
        <div className="w-[400px] border-r border-border flex flex-col overflow-hidden">
          {renderList()}
        </div>

        {/* Right panel: Detail */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {renderDetail()}
        </div>
      </div>
    </div>
  );
}
