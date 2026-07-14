import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Activity,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Edit3,
  Eye,
  LayoutGrid,
  List,
  Pause,
  Plus,
  Search,
  XCircle,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Surface } from "@/components/app/Surface";
import { TablePagination } from "@/components/app/TablePagination";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/operations/manage-schedules")({
  head: () => ({
    meta: [
      { title: "Manage Schedules — Data Automation Studio" },
      { name: "description", content: "Monitor and manage all automated delivery pipeline schedules across all flow types." },
    ],
  }),
  component: ManageSchedulesPage,
});

const metrics = [
  { label: "Total Executions", value: "0", hint: "All time", icon: Activity, tone: "info" },
  { label: "Active Schedules", value: "1", hint: "0 inactive", icon: Calendar, tone: "primary" },
  { label: "Total Success Deliveries", value: "0", hint: "All time", icon: CheckCircle2, tone: "success" },
  { label: "Failed Deliveries", value: "0", hint: "All time", icon: XCircle, tone: "danger" },
] as const;

const schedules = [
  {
    name: "Test",
    priority: "Medium",
    entity: "ADDA",
    dataSource: "—",
    connector: "—",
    layers: 0,
    flowType: "Primary Delivery",
    frequency: "daily",
    lastRun: "—",
    nextRun: "2026-06-21 09:30",
    runs: 0,
  },
];

const tabs = ["All", "Active", "Inactive"];

function ManageSchedulesPage() {
  const [tab, setTab] = useState("All");
  const [view, setView] = useState<"grid" | "list">("list");
  const [query, setQuery] = useState("");

  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => {
      if (tab !== "All" && s.status !== tab) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.entity.toLowerCase().includes(q) &&
          !s.tool.toLowerCase().includes(q) &&
          !s.id.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [tab, query]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [tab, query]);

  const paginatedSchedules = useMemo(() => {
    return filteredSchedules.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredSchedules, currentPage, pageSize]);

  return (
    <div className="space-y-6">
      <PageHeader

        title="Manage Schedules"
        description="Monitor and manage all automated delivery pipeline schedules across all flow types"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-linear-to-r from-primary to-accent px-4 text-[14px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(59,130,246,0.5)]">
            <Plus className="h-4 w-4" /> New Schedule
          </button>
        }
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Surface key={m.label} className="!p-5">
            <div className="flex items-start justify-between">
              <span className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset",
                m.tone === "info" && "bg-info/15 text-info ring-info/25",
                m.tone === "primary" && "bg-primary/15 text-accent ring-primary/25",
                m.tone === "success" && "bg-success/15 text-success ring-success/25",
                m.tone === "danger" && "bg-danger/15 text-danger ring-danger/25",
              )}>
                <m.icon className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3 text-[14px] font-medium text-muted-foreground">{m.label}</div>
            <div className="mt-1 text-[36px] font-bold leading-none tracking-tight text-foreground">{m.value}</div>
            <div className="mt-2 text-[16px] text-muted-foreground">{m.hint}</div>
          </Surface>
        ))}
      </div>

      <Surface className="!p-0">
        <div className="flex flex-wrap items-center gap-3 border-b border-border/60 p-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, tool, entity or ID..."
              className="h-10 w-full rounded-lg border border-border/60 bg-card/50 pl-10 pr-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-accent/50 focus:outline-none"
            />
          </div>
          <div className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/40 p-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[16px] font-medium transition",
                  tab === t ? "bg-accent/20 text-accent ring-1 ring-inset ring-accent/40" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-3 text-[14px] font-medium text-foreground/80">
            All Frequencies <ChevronDown className="h-4 w-4 opacity-70" />
          </button>
          <span className="text-[16px] text-muted-foreground">
            {filteredSchedules.length} {filteredSchedules.length === 1 ? "schedule" : "schedules"}
          </span>
          <div className="inline-flex items-center rounded-lg border border-border/60 bg-card/40 p-1">
            <button
              onClick={() => setView("grid")}
              className={cn("flex h-8 w-8 items-center justify-center rounded-md", view === "grid" ? "bg-accent/20 text-accent" : "text-muted-foreground")}
            ><LayoutGrid className="h-4 w-4" /></button>
            <button
              onClick={() => setView("list")}
              className={cn("flex h-8 w-8 items-center justify-center rounded-md", view === "list" ? "bg-accent/20 text-accent" : "text-muted-foreground")}
            ><List className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-border/60 bg-foreground/[0.04] text-[12px] font-bold tracking-wide text-muted-foreground/70">
                <th className="px-5 py-3"><input type="checkbox" className="rounded border-border/60 bg-card/60 accent-accent" /></th>
                <SortTh>Scheduler Name</SortTh>
                <SortTh>Entity</SortTh>
                <SortTh>Data Source</SortTh>
                <SortTh>Connector</SortTh>
                <th className="px-5 py-3 whitespace-nowrap">Layers</th>
                <th className="px-5 py-3 whitespace-nowrap">Flow Type</th>
                <SortTh>Frequency</SortTh>
                <SortTh>Last Run</SortTh>
                <th className="px-5 py-3 whitespace-nowrap">Next Run</th>
                <SortTh>Runs</SortTh>
                <th className="px-5 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSchedules.map((s) => (
                <tr key={s.name} className="border-b border-border/40 last:border-0 hover:bg-foreground/[0.02]">
                  <td className="px-5 py-4"><input type="checkbox" className="rounded border-border/60 bg-card/60 accent-accent" /></td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-foreground">{s.name}</div>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-warning/15 px-1.5 py-0.5 text-[15px] font-medium text-warning ring-1 ring-inset ring-warning/25">{s.priority}</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[16px] text-foreground/80">{s.entity}</td>
                  <td className="px-5 py-4"><span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-md bg-foreground/[0.05] px-2 text-[16px] text-muted-foreground ring-1 ring-inset ring-border/60">{s.dataSource}</span></td>
                  <td className="px-5 py-4"><span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-md bg-foreground/[0.05] px-2 text-[16px] text-muted-foreground ring-1 ring-inset ring-border/60">{s.connector}</span></td>
                  <td className="px-5 py-4"><span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-foreground/[0.05] text-[16px] text-foreground/80 ring-1 ring-inset ring-border/60">{s.layers}</span></td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-info/15 px-2 py-1 text-[15px] font-medium text-info ring-1 ring-inset ring-info/25">
                      <span className="h-1.5 w-1.5 rounded-full bg-info" /> {s.flowType}
                    </span>
                  </td>
                  <td className="px-5 py-4"><span className="inline-flex items-center rounded-md bg-foreground/[0.04] px-2 py-1 text-[15px] text-foreground/80 ring-1 ring-inset ring-border/60">{s.frequency}</span></td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-[16px] text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {s.lastRun}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[16px] text-foreground/80">{s.nextRun}</td>
                  <td className="px-5 py-4 text-[16px] text-foreground/80">{s.runs}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <IconBtn tone="warning"><Pause className="h-4 w-4" /></IconBtn>
                      <IconBtn tone="success"><Zap className="h-4 w-4" /></IconBtn>
                      <IconBtn tone="info"><Eye className="h-4 w-4" /></IconBtn>
                      <IconBtn tone="primary"><Edit3 className="h-4 w-4" /></IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TablePagination
          totalItems={filteredSchedules.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          itemNameSingular="schedule"
          itemNamePlural="schedules"
        />
      </Surface>
    </div>
  );
}

function SortTh({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 whitespace-nowrap">
      <span className="inline-flex items-center gap-1">{children}<ChevronDown className="h-3 w-3 opacity-60" /></span>
    </th>
  );
}

function IconBtn({ children, tone }: { children: React.ReactNode; tone: string }) {
  return (
    <button className={cn(
      "flex h-8 w-8 items-center justify-center rounded-md ring-1 ring-inset transition",
      tone === "info" && "bg-info/10 text-info ring-info/25 hover:bg-info/20",
      tone === "success" && "bg-success/10 text-success ring-success/25 hover:bg-success/20",
      tone === "warning" && "bg-warning/10 text-warning ring-warning/25 hover:bg-warning/20",
      tone === "primary" && "bg-primary/10 text-accent ring-primary/25 hover:bg-primary/20",
    )}>{children}</button>
  );
}
