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
  Activity,
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

function FloatingKeywords() {
  return (
    <div className="mt-5 mb-5 flex flex-wrap items-center gap-x-3.5 gap-y-2 select-none login-hero-subheading leading-[1.15] tracking-[-0.02em] font-bold text-[18px] min-[400px]:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[20px] xl:text-[28px] 2xl:text-[36px]">
      <span className="text-primary inline-block animate-smooth-float-1">
        Automate,
      </span>

      <span className="text-success inline-block animate-smooth-float-2">
        Monitor,
      </span>

      <span className="text-info inline-block animate-smooth-float-3">
        and Governance
      </span>

      <span className="bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent inline-block drop-shadow-[0_2px_10px_rgba(56,189,248,0.15)] pl-0.5 animate-smooth-float-4">
        Enterprise Data Workflows
      </span>
    </div>
  );
}



const HUB_NODES = [
  { Icon: Server, angle: -90, label: "Data Sources" },
  { Icon: FileText, angle: -30, label: "Metadata" },
  { Icon: ShieldCheck, angle: 30, label: "Data Quality" },
  { Icon: Workflow, angle: 90, label: "Orchestration" },
  { Icon: ArrowLeftRight, angle: 150, label: "ETL" },
  { Icon: Shield, angle: 210, label: "Governance" },
];

function CircularHub({ compact = false }: { compact?: boolean }) {
  const size = compact ? 280 : 380;
  const radius = compact ? 105 : 145;
  const center = size / 2;

  return (
    <div
      className="relative w-full h-full aspect-square pointer-events-auto transition-transform duration-300 login-workflow-hub"
    >
      {/* Concentric mesh rings */}
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--info)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx={center} cy={center} r={radius * 1.35} fill="url(#hub-glow)" />
        {[0.5, 0.75, 1, 1.25].map((k, i) => (
          <motion.circle
            key={i}
            cx={center}
            cy={center}
            r={radius * k}
            fill="none"
            stroke="var(--info)"
            strokeOpacity={0.35}
            strokeDasharray="3 5"
            animate={{ 
              strokeDashoffset: i % 2 === 0 ? [0, 80] : [0, -80] 
            }}
            transition={{ 
              duration: 6 + i * 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
        {/* Spokes with flowing animation */}
        {HUB_NODES.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = center + Math.cos(rad) * radius;
          const y = center + Math.sin(rad) * radius;
          return (
            <motion.line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="var(--info)"
              strokeOpacity={0.38}
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -32] }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          );
        })}
      </svg>

      {/* Center Database Hub */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 35px rgba(6,182,212,0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
            "0 0 50px rgba(6,182,212,0.65), inset 0 1px 0 rgba(255,255,255,0.15)",
            "0 0 35px rgba(6,182,212,0.45), inset 0 1px 0 rgba(255,255,255,0.1)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full border border-info/50 bg-background/90 text-info shadow-[0_0_35px_rgba(6,182,212,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]"
        style={{ width: compact ? "15%" : "13.6%", height: compact ? "15%" : "13.6%" }}
      >
        {/* Pulsing outer ring */}
        <motion.span
          animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2 border-info/35"
        />
        <Database className="h-1/2 w-1/2 animate-pulse" />
      </motion.div>

      {/* Center Hub Label */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
        style={{
          top: "61%",
        }}
      >
        <span className="text-[8.5px] sm:text-[9.5px] font-semibold tracking-wider uppercase text-info bg-info/10 backdrop-blur-md px-1.5 py-0.5 rounded border border-info/20 shadow-[0_0_12px_rgba(6,182,212,0.15)] whitespace-nowrap">
          Enterprise Database
        </span>
      </div>

      {/* Nodes with gentle floating orbits */}
      {HUB_NODES.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * radius;
        const y = center + Math.sin(rad) * radius;
        return (
          <motion.div 
            key={i} 
            className="absolute -translate-x-1/2 -translate-y-1/2" 
            style={{ 
              left: `${(x / size) * 100}%`, 
              top: `${(y / size) * 100}%`,
              width: compact ? "13.5%" : "12.1%",
              height: compact ? "13.5%" : "12.1%",
            }}
            animate={{
              y: [0, -4, 0],
              x: [0, i % 2 === 0 ? 1.5 : -1.5, 0]
            }}
            transition={{
              duration: 4.5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* The Icon Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.15, borderColor: "var(--info)", boxShadow: "0 0 32px -4px var(--info), inset 0 1px 0 rgba(255,255,255,0.15)" }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
              className="absolute inset-0 grid place-items-center rounded-full border border-info/30 bg-background/90 text-info backdrop-blur-md hover:text-white transition-colors cursor-pointer"
              style={{
                boxShadow: "0 0 24px -6px var(--info), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Rocking/pulsing inner icon */}
              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.08, 0.95, 1]
                }}
                transition={{
                  duration: 3.5 + i * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex items-center justify-center w-full h-full"
              >
                <n.Icon className="h-1/2 w-1/2" />
              </motion.div>
            </motion.div>
            
            {/* The Text Label */}
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
              className="absolute top-[110%] left-1/2 -translate-x-1/2 text-[8.5px] sm:text-[9px] font-semibold tracking-wider uppercase text-info/95 text-center bg-info/10 backdrop-blur-md px-1.5 py-0.5 rounded border border-info/20 shadow-[0_0_12px_rgba(6,182,212,0.15)] whitespace-nowrap"
            >
              {n.label}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
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
          className="flex items-center justify-between gap-4 pt-0 pb-3 sm:pb-4 lg:pb-5"
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

        {/* Body Grid: 3 columns on desktop for mathematically equal distribution */}
        <div className="grid flex-1 grid-cols-1 items-center lg:items-stretch justify-items-center gap-6 pt-2 pb-2 lg:pt-2 xl:pt-3 lg:grid-cols-[1.1fr_1.1fr_1.2fr] lg:grid-rows-[auto_1fr] lg:gap-6 xl:gap-8 lg:justify-items-stretch login-body-grid">

          {/* -------------------- HERO COPY (Spans Col 1 & Col 2) -------------------- */}
          <div className="relative order-1 col-span-1 lg:col-start-1 lg:col-span-2 lg:row-start-1 justify-self-start flex flex-col items-start text-left w-full max-w-[500px] lg:max-w-none lg:self-start login-hero-wrapper">
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

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="w-full mt-2"
            >
              <FloatingKeywords />
            </motion.div>

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
          </div>

          {/* -------------------- COLUMN 1 BOTTOM / Blended Image -------------------- */}
          <div className="col-span-1 order-2 lg:col-start-1 lg:row-start-2 flex items-center justify-center lg:justify-start lg:self-start lg:pt-0 pb-5 overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[384px] xl:max-w-[460px] 2xl:max-w-[540px] max-h-[30vh] lg:max-h-[40vh] xl:max-h-[45vh] aspect-square pointer-events-none select-none overflow-visible"
            >
              {/* Radial gradient mask to feather edges into transparency */}
              <div 
                className="relative w-full h-full opacity-80"
                style={{
                  maskImage: "radial-gradient(circle at 50% 50%, black 15%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 15%, transparent 75%)",
                }}
              >
                <img
                  src="/data_hub_isometric.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
                
                {/* Radial Gradient overlay to blend the image colors seamlessly into the #0e1828 background */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, transparent 20%, #0e1828 75%)"
                  }}
                />

                {/* Grid overlay specifically on top of the image to show lines passing through the artwork */}
                <div 
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--muted-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--muted-foreground) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                    maskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 80%)",
                    WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 80%)",
                  }}
                />
              </div>

              {/* Glowing isometric circuit pulses overlay */}
              <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-85" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="line-glow-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--info)" stopOpacity="0" />
                    <stop offset="50%" stopColor="var(--info)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="line-glow-cyan" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--info)" stopOpacity="0" />
                    <stop offset="50%" stopColor="var(--info)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Circuit path 1: Upper-left to Lower-right isometric angle */}
                <motion.path
                  d="M 20 40 L 45 52 L 80 70"
                  fill="none"
                  stroke="url(#line-glow-blue)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray="15 45"
                  animate={{ strokeDashoffset: [60, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Circuit path 2: Lower-left to Upper-right isometric angle */}
                <motion.path
                  d="M 15 65 L 42 51 L 75 35"
                  fill="none"
                  stroke="url(#line-glow-cyan)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray="12 38"
                  animate={{ strokeDashoffset: [50, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                />

                {/* Circuit path 3: Core vertical connection */}
                <motion.path
                  d="M 50 18 L 50 48 L 50 82"
                  fill="none"
                  stroke="url(#line-glow-blue)"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  strokeDasharray="10 30"
                  animate={{ strokeDashoffset: [40, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Circuit path 4: Outer ring pulse */}
                <motion.path
                  d="M 30 50 A 20 20 0 1 0 70 50 A 20 20 0 1 0 30 50"
                  fill="none"
                  stroke="var(--info)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  strokeDasharray="8 40"
                  animate={{ strokeDashoffset: [48, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  opacity="0.6"
                />
              </svg>
              
              {/* Rotating/pulsing ambient blue highlight glow behind the artwork */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.08, 1],
                  opacity: [0.65, 0.85, 0.65],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute -inset-14 bg-[radial-gradient(circle,rgba(6,182,212,0.22)_0%,rgba(37,99,235,0.12)_50%,transparent_100%)] blur-3xl rounded-full pointer-events-none z-[-1]"
              />
            </motion.div>
          </div>

          {/* -------------------- COLUMN 2 BOTTOM / Interactive Circular Hub -------------------- */}
          <div className="col-span-1 order-3 lg:col-start-2 lg:row-start-2 flex items-center justify-center lg:justify-center lg:self-start lg:pt-0 pb-5 overflow-visible">
            <div className="hidden xl:block w-[380px] h-[380px] xl:w-[460px] xl:h-[460px] 2xl:w-[540px] 2xl:h-[540px] max-h-[35vh] xl:max-h-[45vh] aspect-square overflow-visible">
              <CircularHub />
            </div>
            <div className="hidden sm:block xl:hidden w-[280px] h-[280px] max-h-[30vh] aspect-square overflow-visible">
              <CircularHub compact />
            </div>
            <div className="sm:hidden w-[280px] h-[280px] max-h-[30vh] aspect-square overflow-visible">
              <CircularHub compact />
            </div>
          </div>

          {/* -------------------- COLUMN 3 / Auth card -------------------- */}
          <div className="col-span-1 order-4 lg:col-start-3 lg:row-start-1 lg:row-span-2 flex items-center justify-center lg:justify-end lg:self-center">

            <motion.form
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="relative w-full max-w-[460px] login-card-form"
            >
              {/* Card */}
              <div 
                className="relative overflow-hidden rounded-[24px] px-6 py-6 sm:rounded-[28px] sm:px-8 sm:py-7 login-card-container border border-white/[0.08]"
                style={{
                  backgroundColor: "rgba(14, 24, 40, 0.55)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 24px 64px -12px rgba(0, 0, 0, 0.7), 0 0 50px -10px rgba(37, 99, 235, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/[0.08] to-transparent" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-info/10 blur-3xl" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-3.5">
                    <AnimatedShield />
                    <div>
                      <div className="text-[17px] font-semibold tracking-tight text-foreground login-card-title">
                        Secure Workspace
                      </div>
                      <div className="mt-0.5 text-[12.5px] text-muted-foreground login-card-subtitle">
                        Access your enterprise automation platform
                      </div>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="mt-5 space-y-4">
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
                      <label className="flex cursor-pointer items-center gap-2 text-muted-foreground hover:text-foreground login-checkbox-label">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-primary"
                        />
                        Remember me
                      </label>
                      <a
                        href="#"
                        className="font-medium text-accent transition-colors hover:text-foreground login-forgot-link"
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
                      className="group relative mt-3 inline-flex h-[50px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-primary text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_12px_40px_-12px_rgba(59,130,246,0.55)] transition-all disabled:opacity-95 login-cta-button"
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
              <div className="mt-3.5 flex items-center justify-between px-2 text-[11.5px] text-muted-foreground login-under-card-meta">
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
  const particles = [
    { id: 1, left: "8%", top: "15%", size: 3, duration: 18, delay: 0 },
    { id: 2, left: "25%", top: "45%", size: 2, duration: 22, delay: 1.5 },
    { id: 3, left: "42%", top: "12%", size: 4, duration: 16, delay: 3 },
    { id: 4, left: "15%", top: "75%", size: 3, duration: 20, delay: 0.8 },
    { id: 5, left: "65%", top: "28%", size: 2, duration: 24, delay: 2.2 },
    { id: 6, left: "82%", top: "18%", size: 3, duration: 19, delay: 1.1 },
    { id: 7, left: "55%", top: "68%", size: 4, duration: 21, delay: 4 },
    { id: 8, left: "73%", top: "82%", size: 2, duration: 25, delay: 0.5 },
    { id: 9, left: "88%", top: "62%", size: 3, duration: 17, delay: 2.7 },
    { id: 10, left: "33%", top: "88%", size: 2, duration: 23, delay: 1.9 },
    { id: 11, left: "48%", top: "40%", size: 3, duration: 20, delay: 3.2 },
    { id: 12, left: "92%", top: "48%", size: 2, duration: 26, delay: 0.2 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#040813]">
      {/* 1. Base wash & Depth Layers */}
      <div className="absolute inset-0 bg-[#040813]" />
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, transparent 30%, #02040a 95%)"
        }}
      />

      {/* 2. Soft Light Spots (3-5 spots, large blur, low opacity) */}
      
      {/* Spot 1: Cyan behind the workflow illustration (bottom left) */}
      <motion.div
        animate={{ 
          opacity: [0.18, 0.28, 0.18],
          scale: [1, 1.05, 1],
          x: [0, 15, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] bottom-[8%] h-[550px] w-[550px] rounded-full bg-cyan-500/12 blur-[150px]"
      />

      {/* Spot 2: Blue at top left edge */}
      <motion.div
        animate={{ 
          opacity: [0.12, 0.20, 0.12],
          y: [0, 15, 0],
          x: [0, -10, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[-5%] top-[-5%] h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[130px]"
      />

      {/* Spot 3: Cyan at bottom right edge */}
      <motion.div
        animate={{ 
          opacity: [0.10, 0.18, 0.10],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-8%] bottom-[-8%] h-[580px] w-[580px] rounded-full bg-cyan-600/8 blur-[160px]"
      />

      {/* Spot 4: Indigo at top right edge */}
      <motion.div
        animate={{ 
          opacity: [0.08, 0.15, 0.08],
          x: [0, -12, 0],
          y: [0, 15, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute right-[12%] top-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-600/8 blur-[170px]"
      />

      {/* Spot 5: Central cyan highlight glow behind the Circular Hub */}
      <motion.div
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute left-[35%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]"
      />

      {/* 3. Subtle Technical Grid (Opacity 3%-6%, 1px lines, fades to edges) */}
      <div
        className="absolute inset-0 opacity-[0.038]"
        style={{
          backgroundImage:
            "linear-gradient(var(--muted-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--muted-foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 50%, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 25%, transparent 75%)",
        }}
      />

      {/* 4. Ambient Particles (Slow drifting, tiny, low opacity, scattered) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 10px rgba(34,211,238,0.6)",
          }}
          animate={{
            y: [-18, 18, -18],
            x: [-12, 12, -12],
            opacity: [0.12, 0.35, 0.12],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
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
      <label className="text-[11px] font-semibold tracking-wide text-muted-foreground/80 login-field-label">
        {label}
      </label>
      <div
        className={`group relative flex h-[50px] items-center gap-3 overflow-hidden rounded-full border px-5 pl-5 transition-all duration-300 login-input-field ${
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
