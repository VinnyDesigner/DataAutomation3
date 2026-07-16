import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Database,
  Eye,
  EyeOff,
  Fingerprint,
  Lock,
  ShieldCheck,
  Sparkles,
  User,
  FileText,
  Code2,
  ArrowLeftRight,
  Share2,
  Workflow,
  Layers,
  LineChart,
  Shield,
  Server,
} from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Data Automation Studio" },
      {
        name: "description",
        content:
          "Secure enterprise sign-in to the Data Automation Studio — government-grade data automation, quality and governance.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Login,
});

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function AnimatedLogo() {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 xl:w-[76px] xl:h-[76px] 2xl:w-[96px] 2xl:h-[96px] drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        {/* Glow filter */}
        <filter id="neon-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradients */}
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* Main D shape outline */}
      <motion.path
        d="M 38 18 L 62 18 A 32 32 0 0 1 62 82 L 38 82 A 7 7 0 0 1 38 68 L 58 68 A 18 18 0 0 0 58 32 L 38 32 A 7 7 0 0 1 38 18 Z"
        fill="url(#logo-grad)"
        filter="url(#neon-glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Circuit Trace lines inside the D loop - Base paths */}
      <path
        d="M 16 38 L 28 38 L 38 48 L 52 48"
        stroke="#38bdf8"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M 10 50 L 52 50"
        stroke="#60a5fa"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M 16 62 L 28 62 L 38 52 L 52 52"
        stroke="#818cf8"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* Circuit Trace lines inside the D loop - Pulsing flow overlay paths */}
      {/* Top Trace Pulse */}
      <motion.path
        d="M 16 38 L 28 38 L 38 48 L 52 48"
        stroke="#38bdf8"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#neon-glow)"
        strokeDasharray="10 30"
        animate={{ strokeDashoffset: [0, -40] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />
      {/* Top Node */}
      <motion.circle
        cx="16"
        cy="38"
        r="4"
        fill="#38bdf8"
        filter="url(#neon-glow)"
        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Middle Trace Pulse */}
      <motion.path
        d="M 10 50 L 52 50"
        stroke="#60a5fa"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#neon-glow)"
        strokeDasharray="12 30"
        animate={{ strokeDashoffset: [0, -42] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
      {/* Middle Node */}
      <motion.circle
        cx="10"
        cy="50"
        r="5.5"
        fill="#60a5fa"
        filter="url(#neon-glow)"
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      {/* Bottom Trace Pulse */}
      <motion.path
        d="M 16 62 L 28 62 L 38 52 L 52 52"
        stroke="#818cf8"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#neon-glow)"
        strokeDasharray="10 30"
        animate={{ strokeDashoffset: [0, -40] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.2 }}
      />
      {/* Bottom Node */}
      <motion.circle
        cx="16"
        cy="62"
        r="4"
        fill="#818cf8"
        filter="url(#neon-glow)"
        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </motion.svg>
  );
}

function Login() {
  const [show, setShow] = useState(false);
  const [caps, setCaps] = useState(false);
  const [loading, setLoading] = useState<"idle" | "loading" | "success">("idle");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("loading");
    setTimeout(() => {
      setLoading("success");
      setTimeout(() => navigate({ to: "/dashboard" }), 500);
    }, 900);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <AmbientBackdrop />

      {/* Centered container — tighter gutters */}
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-none flex-col login-container-strict">

        {/* Top logo bar */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between gap-4 py-5 sm:py-6 lg:py-7"
        >
          <img
            src="/DGE White.png"
            alt="Department of Government Enablement"
            className="h-8 w-auto shrink-0 object-contain opacity-95 sm:h-10 lg:h-11 xl:h-13 2xl:h-15"
          />
          <img
            src="/SDI White.png"
            alt="Abu Dhabi Spatial Data"
            className="h-10 w-auto shrink-0 object-contain opacity-90 sm:h-14 lg:h-17 xl:h-20 2xl:h-24"
          />
        </motion.header>

        {/* Body */}
        <div className="grid flex-1 grid-cols-1 items-center justify-items-center gap-8 py-4 lg:grid-cols-[1.3fr_1fr] lg:gap-8 xl:gap-12 2xl:gap-16 lg:justify-items-stretch login-body-grid">

          {/* -------------------- LEFT / Hero copy -------------------- */}
          <div className="relative order-1 flex flex-col items-start text-left w-full max-w-[500px] lg:max-w-[650px] xl:max-w-[850px] 2xl:max-w-[1000px] login-hero-wrapper">
            <div className="relative w-full flex items-center gap-4 sm:gap-5 login-logo-title-group">
              {/* Premium Glow Highlight Effect behind title */}
              <div className="absolute -left-12 -top-12 -right-12 -bottom-12 pointer-events-none bg-gradient-to-r from-primary/25 via-accent/15 to-info/20 blur-3xl opacity-75 rounded-full" />
              
              <AnimatedLogo />

              <div className="flex flex-row items-start gap-3.5 flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: -12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  whileHover={{ 
                    scale: 1.01, 
                    x: 3, 
                    filter: "drop-shadow(0 4px 20px rgba(56,189,248,0.4))"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 250, 
                    damping: 18,
                    x: { duration: 0.3 }
                  }}
                  className="relative text-[24px] min-[400px]:text-[28px] sm:text-[34px] md:text-[38px] lg:text-[28px] xl:text-[40px] 2xl:text-[52px] font-extrabold leading-[1.02] tracking-[-0.02em] bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(56,189,248,0.25)] login-hero-heading cursor-default select-none"
                >
                  <span className="whitespace-nowrap">Data Automation Studio</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-[10.5px] font-semibold tracking-wide text-success shrink-0 sm:mt-1.5 xl:mt-2.5"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  Live Enterprise Data Platform
                </motion.div>
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-5 text-[18px] min-[400px]:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[20px] xl:text-[28px] 2xl:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] login-hero-subheading whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap"
            >
              <span className="text-primary">Automate,</span>{" "}
              <span className="text-success">Monitor,</span>{" "}
              <span className="text-info">and Governance</span>{" "}
              <span className="text-foreground">Enterprise Data Workflows</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-5 max-w-[750px] text-[12px] sm:text-[13.5px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] leading-[1.75] text-muted-foreground login-hero-paragraph"
            >
              A secure command center for government-grade data workflows —
              orchestrating validation, transformation, metadata and quality
              across every layer of the pipeline.
            </motion.p>

            {/* Circular diagram placed responsively below text */}
            <div className="relative flex w-full items-center justify-center py-6 mt-12 lg:mt-20 xl:mt-28 login-workflow-hub-container">
              <div className="hidden xl:block">
                <CircularHub />
              </div>
              <div className="hidden sm:block xl:hidden">
                <CircularHub compact />
              </div>
              <div className="sm:hidden">
                <CircularHub compact />
              </div>
            </div>
          </div>

          {/* -------------------- RIGHT / Auth card -------------------- */}
          <div className="relative order-3 flex items-center justify-center lg:justify-end">

            <motion.form
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="relative w-full max-w-[460px] login-card-form"
            >
              {/* Card */}
              <div className="glass-strong relative overflow-hidden rounded-[24px] px-6 py-8 shadow-[var(--shadow-elevated)] sm:rounded-[28px] sm:px-8 sm:py-10 login-card-container">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/[0.08] to-transparent" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-info/10 blur-3xl" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-3.5">
                    <AnimatedShield />
                    <div>
                      <div className="text-[17px] font-semibold tracking-tight text-foreground">
                        Secure Workspace
                      </div>
                      <div className="mt-0.5 text-[12.5px] text-muted-foreground">
                        Access your enterprise automation platform
                      </div>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="mt-8 space-y-4">
                    <FloatingField
                      label="Username"
                      icon={<User className="h-4 w-4" />}
                      defaultValue="DAPortalAdmin"
                      autoComplete="username"
                    />
                    <FloatingField
                      label="Password"
                      icon={<Lock className="h-4 w-4" />}
                      type={show ? "text" : "password"}
                      defaultValue="EnterpriseSecure2026"
                      autoComplete="current-password"
                      onKeyUp={(e) =>
                        setCaps(e.getModifierState && e.getModifierState("CapsLock"))
                      }
                      trailing={
                        <button
                          type="button"
                          aria-label={show ? "Hide password" : "Show password"}
                          onClick={() => setShow((s) => !s)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                        >
                          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      }
                    />

                    {caps && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 rounded-lg border border-warning/25 bg-warning/10 px-3 py-2 text-[11.5px] text-warning"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Caps Lock is on
                      </motion.div>
                    )}

                    <div className="flex items-center justify-between pt-1 text-[12.5px]">
                      <label className="flex cursor-pointer items-center gap-2 text-muted-foreground hover:text-foreground">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-primary"
                        />
                        Remember me
                      </label>
                      <a
                        href="#"
                        className="font-medium text-accent transition-colors hover:text-foreground"
                      >
                        Forgot password?
                      </a>
                    </div>

                    {/* CTA */}
                    <motion.button
                      type="submit"
                      disabled={loading !== "idle"}
                      whileHover={loading === "idle" ? { y: -1 } : undefined}
                      whileTap={loading === "idle" ? { y: 0, scale: 0.99 } : undefined}
                      className="group relative mt-4 inline-flex h-[54px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-primary text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_12px_40px_-12px_rgba(59,130,246,0.55)] transition-all disabled:opacity-95 login-cta-button"
                    >
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
                      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      {loading === "idle" && (
                        <>
                          Sign In to Workspace
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                      {loading === "loading" && (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Signing In...
                        </>
                      )}
                      {loading === "success" && (
                        <motion.span
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Welcome back
                        </motion.span>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Under card meta */}
              <div className="mt-5 flex items-center justify-between px-2 text-[11.5px] text-muted-foreground login-under-card-meta">
                <span className="inline-flex items-center gap-1.5">
                  <Fingerprint className="h-3.5 w-3.5 text-success" />
                  End-to-end encrypted session
                </span>
                <Link to="/" className="hover:text-foreground">
                  Need help?
                </Link>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Circular hub visualization                                          */
/* ------------------------------------------------------------------ */

const HUB_NODES = [
  { Icon: Server, angle: -90, label: "Data Sources" },
  { Icon: FileText, angle: -30, label: "Metadata" },
  { Icon: ShieldCheck, angle: 30, label: "Data Quality" },
  { Icon: Workflow, angle: 90, label: "Orchestration" },
  { Icon: ArrowLeftRight, angle: 150, label: "ETL" },
  { Icon: Shield, angle: 210, label: "Governance" },
];

function CircularHub({ compact = false }: { compact?: boolean }) {
  const size = compact ? 320 : 420;
  const radius = compact ? 120 : 160;
  const center = size / 2;

  return (
    <div
      className="relative pointer-events-auto transition-transform duration-300 xl:scale-110 2xl:scale-125 login-workflow-hub"
      style={{ width: size, height: size }}
    >
      {/* Concentric mesh rings */}
      <svg className="absolute inset-0" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--info)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx={center} cy={center} r={radius * 1.35} fill="url(#hub-glow)" />
        {[0.5, 0.75, 1, 1.25].map((k, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * k}
            fill="none"
            stroke="var(--info)"
            strokeOpacity={0.14}
            strokeDasharray="2 4"
          />
        ))}
        {/* Spokes */}
        {HUB_NODES.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = center + Math.cos(rad) * radius;
          const y = center + Math.sin(rad) * radius;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="var(--info)"
              strokeOpacity={0.22}
              strokeDasharray="3 4"
            />
          );
        })}
      </svg>

      {/* Center Database Hub */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full border border-info/50 bg-background/90 text-info shadow-[0_0_35px_rgba(6,182,212,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]"
        style={{ width: compact ? 48 : 58, height: compact ? 48 : 58 }}
      >
        {/* Pulsing outer ring */}
        <motion.span
          animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2 border-info/35"
        />
        <Database className={compact ? "h-5 w-5 animate-pulse" : "h-6 w-6 animate-pulse"} />
      </div>

      {/* Center Hub Label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
        style={{
          top: `calc(50% + ${compact ? "32px" : "38px"})`,
        }}
      >
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-info bg-info/10 backdrop-blur-md px-2 py-0.5 rounded border border-info/20 shadow-[0_0_12px_rgba(6,182,212,0.15)] whitespace-nowrap">
          Enterprise Database
        </span>
      </div>

      {/* Nodes */}
      {HUB_NODES.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * radius;
        const y = center + Math.sin(rad) * radius;
        return (
          <div key={i} className="absolute" style={{ left: x, top: y }}>
            {/* The Icon Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, borderColor: "var(--info)" }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
              className="absolute grid place-items-center rounded-full border border-info/30 bg-background/90 text-info backdrop-blur-md hover:text-white transition-colors cursor-pointer -translate-x-1/2 -translate-y-1/2"
              style={{
                width: compact ? 44 : 54,
                height: compact ? 44 : 54,
                boxShadow: "0 0 24px -6px var(--info), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <n.Icon className={compact ? "h-4 w-4" : "h-5 w-5"} />
            </motion.div>
            
            {/* The Text Label */}
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
              className="absolute top-7 sm:top-8 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-info/95 text-center bg-info/10 backdrop-blur-md px-2 py-0.5 rounded border border-info/20 shadow-[0_0_12px_rgba(6,182,212,0.15)] whitespace-nowrap"
            >
              {n.label}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated shield                                                     */
/* ------------------------------------------------------------------ */

function AnimatedShield() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gradient-primary)] shadow-[0_14px_36px_-12px_var(--primary)]">
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-2xl bg-accent blur-md"
      />
      <ShieldCheck className="relative h-5 w-5 text-primary-foreground" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ambient backdrop — subtle mesh + orbs, using project tokens        */
/* ------------------------------------------------------------------ */

function AmbientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />

      {/* Mesh grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--muted-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--muted-foreground) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Ambient orbs */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[6%] top-[14%] h-[420px] w-[420px] rounded-full bg-primary/15 blur-[130px]"
      />
      <motion.div
        animate={{ opacity: [0.45, 0.75, 0.45], y: [0, -14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-[20%] h-[440px] w-[440px] rounded-full bg-info/12 blur-[140px]"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], x: [0, -10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-success/10 blur-[150px]"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Inputs                                                              */
/* ------------------------------------------------------------------ */

function FloatingField({
  label,
  icon,
  type = "text",
  defaultValue,
  trailing,
  autoComplete,
  onKeyUp,
}: {
  label: string;
  icon: React.ReactNode;
  type?: string;
  defaultValue?: string;
  trailing?: React.ReactNode;
  autoComplete?: string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-wide text-muted-foreground/80">
        {label}
      </label>
      <div
        className={`group relative flex h-[54px] items-center gap-3 overflow-hidden rounded-full border px-5 pl-5 transition-all duration-300 login-input-field ${
          focused
            ? "border-primary/60 bg-white/[0.07]"
            : "border-white/[0.10] bg-white/[0.04] hover:border-white/[0.18]"
        }`}
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(255,255,255,0.02), 0 8px 24px -12px rgba(0,0,0,0.6)",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 45%, rgba(255,255,255,0.00) 100%)",
        }}
      >
        <span
          className={`relative transition-colors ${focused ? "text-accent" : "text-muted-foreground"}`}
        >
          {icon}
        </span>
        <div className="relative flex-1">
          <input
            type={type}
            value={value}
            autoComplete={autoComplete}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyUp={onKeyUp}
            className="peer relative h-full w-full bg-transparent py-0 text-[14px] text-foreground outline-none placeholder:text-muted-foreground/40"
          />
        </div>
        <span className="relative">{trailing}</span>
      </div>
    </div>
  );
}
