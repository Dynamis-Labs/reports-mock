import { PageBreadcrumbHeader } from "@components/layout/page-breadcrumb-header";
import {
  CrmSearchBar,
  CrmTagFilterDropdown,
  CrmRecencyFilter,
  CrmActiveFilters,
} from "./filters";

/**
 * CRM Header
 *
 * Thin orchestrator composing the breadcrumb, search bar,
 * tag filter dropdown, recency filter, and active filters row.
 */

export function CrmHeader() {
  return (
    <header className="shrink-0 bg-background">
      <PageBreadcrumbHeader items={[{ label: "CRM" }]} />

      <div className="px-6 py-4 flex items-center gap-3 border-b border-border/60">
        <CrmSearchBar />
        <CrmTagFilterDropdown />
        <CrmRecencyFilter />
      </div>

      <CrmActiveFilters />
    </header>
  );
}
