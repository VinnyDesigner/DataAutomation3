import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Activity,
  Briefcase,
  CheckCircle2,
  Clock,
  Edit3,
  GitBranch,
  Layers,
  RefreshCw,
  Search,
  Trash2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Surface } from "@/components/app/Surface";
import { TablePagination } from "@/components/app/TablePagination";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/operations/jobs")({
  head: () => ({
    meta: [
      { title: "Jobs — Data Automation Studio" },
      { name: "description", content: "Track, manage and monitor all data processing jobs across all flow types." },
    ],
  }),
  component: JobsPage,
});

const stats = [
  { label: "Total", value: 1, tone: "primary", icon: Briefcase },
  { label: "Running", value: 1, tone: "info", icon: Activity },
  { label: "Completed", value: 0, tone: "success", icon: CheckCircle2 },
  { label: "Warning", value: 0, tone: "warning", icon: AlertTriangle },
  { label: "Failed", value: 0, tone: "danger", icon: XCircle },
  { label: "Pending", value: 0, tone: "secondary", icon: Clock },
] as const;

const flowTabs = ["All", "Primary", "Delta Sync", "Ext DB"];
const statusTabs = ["All", "Running", "Completed", "Warning", "Failed", "Pending"];

const jobs = [
  {
    delivery: "DEMO-WF-1042",
    subtitle: "#3 · 3 steps",
    flowType: "Primary Delivery",
    flowMode: "Continuous",
    entity: "Abu Dhabi Digital Auth…",
    entityCode: "ADDA",
    layers: 4,
    pipeline: ["done", "active", "pending", "pending"],
    pipelineLabel: "At: qa-qc",
    status: "Running",
    progress: 53,
    submitted: "2026-06-27 22:25",
  },
];

function toneBg(t: string) {
  return {
    primary: "text-accent",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    secondary: "text-[color:var(--secondary-accent)]",
  }[t] ?? "text-accent";
}

function JobsPage() {
  const [flow, setFlow] = useState("All");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      if (flow !== "All" && j.flow !== flow) return false;
      if (status !== "All" && j.status !== status) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !j.delivery.toLowerCase().includes(q) &&
          !j.subtitle.toLowerCase().includes(q) &&
          !j.entityCode.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [flow, status, query]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [flow, status, query]);

  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredJobs, currentPage, pageSize]);
  return (
    <div className="space-y-6">
      <PageHeader

        title="Jobs"
        description="Track, manage and monitor all data processing jobs across all flow types"
      />

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Surface key={s.label} className="!p-4">
            <div className="flex items-start justify-between">
              <div className="text-[16px] font-semibold tracking-wide text-muted-foreground">{s.label}</div>
              <s.icon className={cn("h-4 w-4", toneBg(s.tone))} />
            </div>
            <div className={cn("mt-2 text-[32px] font-bold leading-none tracking-tight", toneBg(s.tone))}>{s.value}</div>
          </Surface>
        ))}
      </div>

      <Surface className="!p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by code or entity..."
              className="h-10 w-full rounded-lg border border-border/60 bg-card/50 pl-10 pr-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-accent/50 focus:outline-none"
            />
          </div>
          <PillTabs items={flowTabs} value={flow} onChange={setFlow} tone="accent" />
          <PillTabs items={statusTabs} value={status} onChange={setStatus} tone="accent" />
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/60 text-muted-foreground transition hover:text-foreground">
            <RefreshCw className="h-4 w-4" />
          </button>
          <span className="text-[16px] text-muted-foreground">{currentPage} of {Math.max(1, Math.ceil(filteredJobs.length / pageSize))}</span>
        </div>
      </Surface>

      <Surface className="!p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-border/60 bg-foreground/[0.04] text-[12px] font-bold tracking-wide text-muted-foreground/70">
                <Th>Delivery</Th>
                <Th>Flow Type</Th>
                <Th>Entity</Th>
                <Th>Layers</Th>
                <Th>Pipeline</Th>
                <Th>Status</Th>
                <Th>Progress</Th>
                <Th>Submitted</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.map((j) => (
                <tr key={j.delivery} className="border-b border-border/40 last:border-0 hover:bg-foreground/[0.02]">
                  <Td>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent ring-1 ring-inset ring-accent/25">
                        <Briefcase className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="font-semibold text-foreground">{j.delivery}</div>
                        <div className="text-[15px] text-muted-foreground">{j.subtitle}</div>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-info/15 px-2 py-1 text-[15px] font-medium text-info ring-1 ring-inset ring-info/25">
                      <GitBranch className="h-3 w-3" /> {j.flowType}
                    </span>
                    <div className="mt-1 inline-flex items-center gap-1 text-[15px] text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" /> {j.flowMode}
                    </div>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20 text-[15px] font-bold text-accent">AD</span>
                      <div>
                        <div className="text-foreground">{j.entity}</div>
                        <div className="text-[15px] text-muted-foreground">{j.entityCode}</div>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-foreground/[0.04] px-2 py-1 text-[15px] text-foreground/80 ring-1 ring-inset ring-border/60">
                      <Layers className="h-3 w-3" /> {j.layers} layers
                    </span>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      {j.pipeline.map((s, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className={cn(
                            "h-2 w-2 rounded-full",
                            s === "done" && "bg-success",
                            s === "active" && "bg-info ring-2 ring-info/40",
                            s === "pending" && "bg-foreground/20",
                          )} />
                          {i < j.pipeline.length - 1 && <span className="h-px w-3 bg-foreground/20" />}
                        </span>
                      ))}
                    </div>
                    <div className="mt-1 text-[15px] text-muted-foreground">{j.pipelineLabel}</div>
                  </Td>
                  <Td>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-info/15 px-2.5 py-1 text-[15px] font-medium text-info ring-1 ring-inset ring-info/25">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-info opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-info" />
                      </span>
                      {j.status}
                    </span>
                  </Td>
                  <Td>
                    <div className="w-24">
                      <div className="text-[15px] font-semibold text-foreground">{j.progress}%</div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                        <div className="h-full rounded-full bg-linear-to-r from-primary to-accent" style={{ width: `${j.progress}%` }} />
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className="font-mono text-[16px] text-foreground/80">{j.submitted}</span>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      <IconBtn tone="info"><GitBranch className="h-4 w-4" /></IconBtn>
                      <IconBtn tone="success"><Activity className="h-4 w-4" /></IconBtn>
                      <IconBtn tone="warning"><Edit3 className="h-4 w-4" /></IconBtn>
                      <IconBtn tone="danger"><Trash2 className="h-4 w-4" /></IconBtn>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          totalItems={filteredJobs.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          itemNameSingular="job"
          itemNamePlural="jobs"
        />
      </Surface>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-5 py-3 text-left">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-4 align-middle">{children}</td>;
}
function IconBtn({ children, tone }: { children: React.ReactNode; tone: string }) {
  return (
    <button className={cn(
      "flex h-8 w-8 items-center justify-center rounded-md ring-1 ring-inset transition",
      tone === "info" && "bg-info/10 text-info ring-info/25 hover:bg-info/20",
      tone === "success" && "bg-success/10 text-success ring-success/25 hover:bg-success/20",
      tone === "warning" && "bg-warning/10 text-warning ring-warning/25 hover:bg-warning/20",
      tone === "danger" && "bg-danger/10 text-danger ring-danger/25 hover:bg-danger/20",
    )}>{children}</button>
  );
}

function PillTabs({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void; tone?: string }) {
  return (
    <div className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-border/60 bg-card/40 p-1 scrollbar-thin">
      {items.map((i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={cn(
            "rounded-md px-3 py-1.5 text-[16px] font-medium transition",
            value === i
              ? "bg-accent/20 text-accent ring-1 ring-inset ring-accent/40"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
