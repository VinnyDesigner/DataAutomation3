import { Link } from "@tanstack/react-router";
import {
  Command,
  Search,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";

export function AppTopbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--background)_35%,transparent)] to-[color-mix(in_srgb,var(--background)_85%,transparent)] backdrop-blur-md border-b border-foreground/5 px-4 sm:px-5 lg:px-6">


      {/* Search */}
      <div className="ml-auto flex flex-1 items-center justify-end gap-2">
        <button
          type="button"
          className="group hidden h-9 min-w-[280px] items-center gap-2 rounded-lg border border-border/60 bg-card/50 px-3 text-[16px] text-muted-foreground transition-colors hover:border-accent/40 hover:bg-card md:flex"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search entities, jobs, metadata…</span>
          <kbd className="ml-auto flex items-center gap-0.5 rounded-md border border-foreground/10 bg-foreground/5 px-1.5 py-0.5 text-[14px] text-foreground/60">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        </button>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground md:hidden"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card/60 text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-9 items-center gap-2 rounded-lg border border-border/60 bg-card/60 pl-1 pr-2 transition-colors hover:border-accent/40">
            <div className={`flex h-7 w-7 items-center justify-center rounded-md text-[15px] font-semibold ${
              theme === "light"
                ? "bg-linear-to-br from-[#e0ecff] to-[#c7dcff] text-[#2563eb] ring-1 ring-inset ring-[#2563eb]/20"
                : "bg-linear-to-br from-accent to-secondary-accent text-white"
            }`}>
              AM
            </div>
            <div className="hidden text-left text-[15px] leading-tight lg:block">
              <div className="font-medium text-foreground">Ahmed Al Mansouri</div>
              <div className="text-[14px] text-success">Super Admin</div>
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 border-border/60 bg-elevated">
            <DropdownMenuLabel className="flex items-center gap-2.5 py-2.5">
              <div className={`flex h-9 w-9 items-center justify-center rounded-md text-[15px] font-semibold ${
                theme === "light"
                  ? "bg-linear-to-br from-[#e0ecff] to-[#c7dcff] text-[#2563eb] ring-1 ring-inset ring-[#2563eb]/20"
                  : "bg-linear-to-br from-accent to-secondary-accent text-white"
              }`}>
                AM
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-medium text-foreground">Ahmed Al Mansouri</div>
                <div className="flex items-center gap-1.5 text-[12px] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Super Admin
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-danger focus:bg-danger/15 focus:text-danger! dark:focus:bg-danger/20 dark:focus:text-danger! cursor-pointer group">
              <Link to="/login" className="flex items-center gap-2 w-full">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive/10 ring-1 ring-inset ring-destructive/20 group-focus:bg-danger/20 group-hover:bg-danger/20 group-focus:ring-danger/35 group-hover:ring-danger/35 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium">Sign Out</span>
                  <span className="text-[12px] text-muted-foreground group-focus:text-danger/80 group-hover:text-danger/80 transition-colors">End your session</span>
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
