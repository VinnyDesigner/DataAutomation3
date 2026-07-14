import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Columns3,
  Download,
  Globe2,
  Layers,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Surface } from "@/components/app/Surface";
import { TablePagination } from "@/components/app/TablePagination";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/data-management/layers")({
  head: () => ({
    meta: [
      { title: "Data Layers — Data Automation Studio" },
      { name: "description", content: "Register and manage spatial data layers — names, classification, schema mapping, sensitivity, and attribute-level access control." },
    ],
  }),
  component: LayersPage,
});

const metrics = [
  { label: "Total Layers", value: "0", hint: "All registered", icon: Layers, tone: "primary" },
  { label: "Active", value: "0", hint: "Accepting deliveries", icon: CheckCircle2, tone: "success" },
  { label: "Published", value: "0", hint: "Publicly accessible", icon: Globe2, tone: "info" },
  { label: "By Classification", value: "", hint: "No classifications", icon: ShieldCheck, tone: "secondary" },
] as const;

const columns = [
  "Alias Name",
  "Agency Layer Name",
  "DB Layer Name",
  "Entity",
  "Type",
  "Geometry",
  "Coverage",
  "Sensitivity",
  "Actions",
];

function LayersPage() {
  const [pageSize, setPageSize] = useState(10);
  return (
    <div className="space-y-6">
      <PageHeader

        title="Data Layers"
        description="Register and manage spatial data layers — names, classification, schema mapping, sensitivity, and attribute-level access control"
        actions={
          <>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-4 text-[14px] font-medium text-foreground/80 hover:text-foreground">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-linear-to-r from-primary to-accent px-4 text-[14px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(59,130,246,0.5)]">
              <Plus className="h-4 w-4" /> Register Layer
            </button>
          </>
        }
      />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Surface key={m.label} className="!p-5">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <div className="text-[14px] font-medium text-muted-foreground">{m.label}</div>
                <div className="mt-2 text-[36px] font-bold leading-none tracking-tight text-foreground">{m.value || "—"}</div>
                <div className="mt-2 text-[16px] text-muted-foreground">{m.hint}</div>
              </div>
              <span className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset",
                m.tone === "primary" && "bg-primary/15 text-accent ring-primary/25",
                m.tone === "success" && "bg-success/15 text-success ring-success/25",
                m.tone === "info" && "bg-info/15 text-info ring-info/25",
                m.tone === "secondary" && "bg-[color:var(--secondary-accent)]/15 text-[color:var(--secondary-accent)] ring-[color:var(--secondary-accent)]/25",
              )}>
                <m.icon className="h-5 w-5" />
              </span>
            </div>
          </Surface>
        ))}
      </div>

      <Surface className="!p-0">
        <div className="flex flex-wrap items-center gap-3 border-b border-border/60 p-4">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search layers, DB name, entity..."
              className="h-10 w-full rounded-lg border border-border/60 bg-card/50 pl-10 pr-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-accent/50 focus:outline-none"
            />
          </div>
          <DropdownBtn label="All Entities" />
          <DropdownBtn label="All Sensitivity" />
          <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-3 text-[14px] font-medium text-foreground/80">
            <Columns3 className="h-4 w-4 text-accent" /> Columns <span className="text-muted-foreground">(9)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-border/60 bg-foreground/[0.04] text-[12px] font-bold tracking-wide text-muted-foreground/70">
                {columns.map((c) => (
                  <th key={c} className="px-5 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">{c}<ChevronDown className="h-3 w-3 opacity-60" /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={columns.length} className="px-5 py-20">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/[0.04] text-muted-foreground ring-1 ring-inset ring-border/60">
                      <Layers className="h-7 w-7" />
                    </span>
                    <div className="text-[16px] font-semibold text-foreground">No layers match the current filters.</div>
                    <div className="text-[14px] text-muted-foreground">
                      Onboard a data source and run Save Mapping to populate this list, or click <span className="font-semibold text-accent">Register Layer</span> above.
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <TablePagination
          totalItems={0}
          pageSize={pageSize}
          currentPage={1}
          onPageChange={() => {}}
          onPageSizeChange={setPageSize}
          itemNameSingular="layer"
          itemNamePlural="layers"
        />
      </Surface>
    </div>
  );
}

function DropdownBtn({ label }: { label: string }) {
  return (
    <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-3 text-[14px] font-medium text-foreground/80 hover:text-foreground">
      {label} <ChevronDown className="h-4 w-4 opacity-70" />
    </button>
  );
}
