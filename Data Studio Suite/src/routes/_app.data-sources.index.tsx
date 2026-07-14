import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Database, Layers, Plus, Search, Table2 } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { StatCard, Surface } from "@/components/app/Surface";
import { TablePagination } from "@/components/app/TablePagination";

export const Route = createFileRoute("/_app/data-sources/")({
  head: () => ({
    meta: [
      { title: "Data Sources — Data Automation Studio" },
      { name: "description", content: "Registered source systems and onboarding status." },
    ],
  }),
  component: DataSources,
});

function DataSources() {
  const [pageSize, setPageSize] = useState(10);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Sources"
        description="Registered source systems and onboarding status"
        actions={
          <Link
            to="/data-sources/onboard"
            className="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-b from-primary to-primary/90 px-3 py-2 text-[15px] font-medium text-white shadow-[0_4px_16px_-4px_rgba(37,99,235,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]"
          >
            <Plus className="h-3.5 w-3.5" /> Onboard Source
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Sources" value={0} hint="Registered connections" icon={<Database className="h-4 w-4" />} accent="primary" />
        <StatCard label="Total Layers" value={0} hint="Across all sources" icon={<Layers className="h-4 w-4" />} accent="secondary" />
        <StatCard label="Total Records" value={0} hint="Across all layers" icon={<Table2 className="h-4 w-4" />} accent="success" />
      </div>

      <Surface padded={false}>
        <div className="flex flex-col gap-3 border-b border-border/60 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search source name or entity…"
              className="w-full rounded-lg border border-border/60 bg-foreground/[0.02] py-2 pl-9 pr-3 text-[16px] text-foreground placeholder:text-muted-foreground focus:border-accent/50 focus:outline-none"
            />
          </div>
          <button className="rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-[15px] text-foreground/80">All Types</button>
          <button className="rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-[15px] text-foreground/80">All Statuses</button>
          <span className="text-[15px] text-muted-foreground">0 sources</span>
        </div>

        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full text-[16px]">
            <thead>
              <tr className="bg-foreground/[0.04] text-[12px] font-bold tracking-wide text-muted-foreground/70">
                <th className="py-3 pl-4"><input type="checkbox" className="h-3.5 w-3.5 rounded border-foreground/20 bg-foreground/5" /></th>
                <th className="py-3 pr-4 text-left">Source</th>
                <th className="py-3 pr-4 text-left">Entity</th>
                <th className="py-3 pr-4 text-left">Type</th>
                <th className="py-3 pr-4 text-left">Layers</th>
                <th className="py-3 pr-4 text-left">Last Sync</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
          </table>
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/[0.03] ring-1 ring-inset ring-foreground/10">
              <Database className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-[16px] text-muted-foreground">No data sources registered yet.</div>
            <Link to="/data-sources/onboard" className="text-[16px] font-medium text-accent hover:underline">
              Onboard a new source
            </Link>
          </div>
        </div>

        <TablePagination
          totalItems={0}
          pageSize={pageSize}
          currentPage={1}
          onPageChange={() => {}}
          onPageSizeChange={setPageSize}
          itemNameSingular="source"
          itemNamePlural="sources"
        />
      </Surface>
    </div>
  );
}
