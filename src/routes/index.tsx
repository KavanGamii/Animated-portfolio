import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  Sparkles,
  Code2,
  Palette,
  Zap,
  Layers,
  Rocket,
  Search,
  Pencil,
  Cpu,
  Menu,
  X,
  Atom,
  Braces,
  Wind,
  Waves,
  Boxes,
  LayoutTemplate,
  Blocks,
  GitBranch,
  Triangle,
  Paintbrush,
} from "lucide-react";

import heroVideo from "@/assets/hero-bg.mp4";
import charDev from "@/assets/char-dev.jpg";
import charRobot from "@/assets/char-robot.jpg";
import charDesigner from "@/assets/char-designer.jpg";
import charMascot from "@/assets/char-mascot.jpg";
import charWave from "@/assets/char-wave.jpg";
import { useLenis } from "@/hooks/use-lenis";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Kavan Gami — UI Developer & Web Designer" },
      {
        name: "description",
        content:
          "Kavan Gami — UI Developer & Web Designer building cinematic frontend experiences with React, Tailwind CSS, GSAP, Lenis and WordPress.",
      },
    ],
  }),
});

/* ---------- Data ---------- */

const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  { name: "React.js", cat: "Framework", icon: Atom },
  { name: "JavaScript", cat: "Language", icon: Braces },
  { name: "Tailwind CSS", cat: "Styling", icon: Wind },
  { name: "GSAP", cat: "Motion", icon: Zap },
  { name: "Lenis", cat: "Smooth Scroll", icon: Waves },
  { name: "Three.js", cat: "3D / WebGL", icon: Boxes },
  { name: "WordPress", cat: "CMS", icon: LayoutTemplate },
  { name: "ACF", cat: "CMS", icon: Blocks },
  { name: "AI-Assisted Dev", cat: "Workflow", icon: Sparkles },
  { name: "Git", cat: "Version Control", icon: GitBranch },
  { name: "Vue.js", cat: "Framework", icon: Triangle },
  { name: "SCSS", cat: "Styling", icon: Paintbrush },
];

const PROJECTS = [
  {
    n: "01",
    name: "SuperMia",
    tag: "AI Agent Platform",
    stack: "React · Tailwind",
    desc: "Scalable, component-based UI for an enterprise AI automation platform — dynamic components tuned for complex workflow states and production performance.",
    href: "https://mia.supermia.ai/",
    accent: "#4F7CFF",
  },
  {
    n: "02",
    name: "Pioneer Group",
    tag: "UK Government Platform",
    stack: "HTML · Bootstrap · GSAP · Lenis",
    desc: "Accessibility-focused public-sector web platform with GSAP scroll animations and Lenis smooth scrolling — built to strict cross-browser and gov design standards.",
    href: "https://pioneergroup.org.uk",
    accent: "#161616",
  },
  {
    n: "03",
    name: "Local Lens",
    tag: "Hyperlocal Discovery App",
    stack: "Next.js · Tailwind",
    desc: "Full personal product shipped end-to-end — a mobile-first, performance-optimized UI with location-based UX and fast load times.",
    href: "https://local-lenss.vercel.app",
    accent: "#4F7CFF",
  },
  {
    n: "04",
    name: "WordPress · ACF Themes",
    tag: "Agency & Enterprise",
    stack: "WordPress · ACF · SCSS",
    desc: "Custom WordPress themes with ACF-driven content models, pixel-level fidelity to Figma, and maintainable component architecture across multi-page production sites.",
    href: "#",
    accent: "#161616",
  },
];

const EXPERIENCE = [
  {
    role: "Web Designer & UI Developer",
    company: "Softqube Technology",
    place: "Ahmedabad",
    period: "Jun 2025 — Present",
    points: [
      "Ship pixel-perfect, mobile-first UIs with React and Tailwind, translating Figma into reusable token-based components.",
      "Author GSAP + Lenis scroll interactions for premium client-facing experiences.",
      "Own Agile Git workflows — feature branches, code reviews, sprint deliverables.",
    ],
  },
  {
    role: "Associate Web Designer & Developer",
    company: "Tridhya Tech",
    place: "Ahmedabad",
    period: "Feb 2024 — May 2025",
    points: [
      "Built scalable UI component libraries with React, Vue (Vuex) and Vuetify.",
      "Delivered WordPress sites with ACF custom fields at pixel-level fidelity.",
      "Resolved cross-browser issues and applied token-based design across large production projects.",
    ],
  },
];

const SERVICES = [
  { icon: Code2, title: "Frontend Development", desc: "React, TypeScript, Tailwind — production-grade component architectures." },
  { icon: Palette, title: "UI Engineering", desc: "Figma-to-code with pixel precision and token-based design systems." },
  { icon: Layers, title: "WordPress + ACF", desc: "Custom themes with maintainable, content-editor-friendly ACF fields." },
  { icon: Zap, title: "Motion & Animation", desc: "GSAP, ScrollTrigger and Lenis — motion with purpose, not noise." },
  { icon: Cpu, title: "Design Systems", desc: "Tokens, components, docs — one source of truth across products." },
  { icon: Rocket, title: "Performance", desc: "Lighthouse-obsessed. Fast paints, small bundles, smooth 60fps." },
];

const PROCESS = [
  { icon: Search, title: "Discover", desc: "Understand the product, user and constraints." },
  { icon: Sparkles, title: "Research", desc: "References, patterns, tokens, motion direction." },
  { icon: Pencil, title: "Design", desc: "Layouts and interactions inside a real design system." },
  { icon: Layers, title: "Prototype", desc: "High-fidelity motion and states in code, early." },
  { icon: Code2, title: "Develop", desc: "Clean, typed, componentized production build." },
  { icon: Rocket, title: "Launch", desc: "Perf tuning, QA, ship, iterate." },
];

const STACK = [
  "React", "Next.js", "TypeScript", "Tailwind", "SCSS", "GSAP",
  "Lenis", "Framer Motion", "Three.js", "WordPress", "ACF", "Vue",
  "Vuex", "Vuetify", "Figma", "Git", "PWA", "AI-Assisted",
];

const STATS = [
  { n: 2, suffix: "+", label: "Years Experience" },
  { n: 40, suffix: "+", label: "Projects Shipped" },
  { n: 18, suffix: "+", label: "Technologies" },
  { n: 25, suffix: "+", label: "Happy Clients" },
];

/* ---------- Small helpers ---------- */

function useCountUp(target: number, active: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return v;
}

function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground font-button">
      <span className="text-foreground/40">{n}</span>
      <span className="h-px w-8 bg-foreground/20" />
      <span>{label}</span>
    </div>
  );
}

/* ---------- Sections ---------- */

const SECTION_IDS = ["about", "work", "experience", "playground", "contact"];

/* Out-of-the-box animated brand logo — a geometric "K" monogram whose top arm
   escapes a rounded box. GSAP draws the box + strokes in, an accent segment
   orbits the frame, a glowing spark "breaks out", the whole mark floats, and it
   springs magnetically toward the cursor on hover. */
function Logo() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set([".kg-box", ".kg-stroke"], {
        strokeDasharray: 1,
        strokeDashoffset: 1,
      });
      gsap.set(".kg-orbit", {
        strokeDasharray: "0.14 0.86",
        strokeDashoffset: 0,
      });
      gsap.set([".kg-dot", ".kg-halo"], {
        scale: 0,
        transformOrigin: "50% 50%",
      });

      if (reduced) {
        gsap.set([".kg-box", ".kg-stroke"], { strokeDashoffset: 0 });
        gsap.set([".kg-dot", ".kg-halo"], { scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(".kg-box", { strokeDashoffset: 0, duration: 0.7 })
        .to(
          ".kg-stroke",
          { strokeDashoffset: 0, duration: 0.5, stagger: 0.1 },
          "-=0.35",
        )
        .to(".kg-dot", { scale: 1, duration: 0.5, ease: "back.out(3)" }, "-=0.1")
        .to(".kg-halo", { scale: 1, duration: 0.5 }, "<");

      // ambient life
      gsap.to(".kg-orbit", {
        strokeDashoffset: -1,
        duration: 5,
        repeat: -1,
        ease: "none",
        delay: 0.8,
      });
      gsap.to(".kg-svg", {
        y: -1.5,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".kg-halo", {
        scale: 1.35,
        opacity: 0.08,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setP({
      x: (e.clientX - r.left - r.width / 2) * 0.18,
      y: (e.clientY - r.top - r.height / 2) * 0.18,
    });
  };

  return (
    <motion.a
      ref={ref}
      href="#top"
      onMouseMove={onMove}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      animate={{ x: p.x, y: p.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="group flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-1.5"
      aria-label="Kavan Gami — UI Developer, back to top"
    >
      <span className="relative grid h-10 w-10 shrink-0 place-items-center">
        <svg
          className="kg-svg absolute inset-0 h-full w-full text-foreground"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          {/* glowing "escape" halo */}
          <circle
            className="kg-halo"
            cx="41"
            cy="11"
            r="6"
            fill="var(--accent)"
            opacity="0.14"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          {/* the box */}
          <rect
            className="kg-box"
            x="6"
            y="10"
            width="30"
            height="30"
            rx="9"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          {/* accent segment orbiting the box */}
          <rect
            className="kg-orbit"
            x="6"
            y="10"
            width="30"
            height="30"
            rx="9"
            pathLength={1}
            stroke="var(--accent)"
            strokeWidth="2.25"
            strokeLinecap="round"
            fill="none"
          />
          {/* the K — its top arm breaks out of the box */}
          <g className="kg-glyph">
            <line
              className="kg-stroke"
              x1="16"
              y1="16"
              x2="16"
              y2="34"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
            <line
              className="kg-stroke"
              x1="16"
              y1="25"
              x2="39"
              y2="12"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
            <line
              className="kg-stroke"
              x1="16"
              y1="25"
              x2="33"
              y2="34"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          </g>
          {/* the escaped spark */}
          <circle
            className="kg-dot"
            cx="41"
            cy="11"
            r="3"
            fill="var(--accent)"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: "scale(0)",
            }}
          />
        </svg>
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="relative font-display text-[15px] font-medium tracking-tight text-foreground">
          Kavan <span className="italic font-normal">Gami</span>
          <span className="kg-underline absolute -bottom-1 left-0 h-px w-full bg-accent" />
        </span>
        <span className="mt-1.5 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.28em] text-muted-foreground font-button">
          <span className="h-1 w-1 rounded-full bg-accent" />
          UI Developer
        </span>
      </span>
    </motion.a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section in view.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const indicator = hovered ?? active;

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 sm:top-6"
      >
        <div
          className={`glass-card flex items-center justify-between gap-2 rounded-full py-2 pl-2 pr-2 transition-all duration-500 ${
            scrolled
              ? "shadow-[0_16px_50px_-24px_rgba(0,0,0,0.4)]"
              : "shadow-[0_8px_30px_-24px_rgba(0,0,0,0.25)]"
          }`}
        >
          <Logo />

          <nav
            onMouseLeave={() => setHovered(null)}
            className="hidden items-center gap-0.5 md:flex"
          >
            {NAV.map((n) => {
              const on = indicator === n.href;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onMouseEnter={() => setHovered(n.href)}
                  onClick={() => setActive(n.href)}
                  className="relative rounded-full px-4 py-2 text-sm font-button"
                >
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      on ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {n.label}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <MagneticCTA />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-foreground/10 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} setOpen={setOpen} setActive={setActive} />
    </>
  );
}

function MagneticCTA() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setP({
      x: (e.clientX - r.left - r.width / 2) * 0.3,
      y: (e.clientY - r.top - r.height / 2) * 0.3,
    });
  };
  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={onMove}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      animate={{ x: p.x, y: p.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="group hidden items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm text-background font-button transition-colors hover:bg-foreground/90 sm:inline-flex"
    >
      Let's talk
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

function MobileMenu({
  open,
  setOpen,
  setActive,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  setActive: (v: string) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-60 flex flex-col bg-foreground text-background md:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-display text-lg">
              Kavan <span className="italic font-normal text-background/70">Gami</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-background/10 transition-colors hover:bg-background/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {NAV.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={() => {
                  setActive(n.href);
                  setOpen(false);
                }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.15 + i * 0.07,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-baseline justify-between border-b border-background/10 py-4 font-display text-4xl"
              >
                {n.label}
                <span className="text-xs text-background/40 font-button">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.a>
            ))}
          </nav>

          <div className="px-6 py-8">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-background px-6 py-4 text-foreground font-button"
            >
              Let's talk
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // mouse light
  const [pos, setPos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-background"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/20" />
        <div
          className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light"
          style={{
            background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(79,124,255,0.25), transparent 60%)`,
          }}
        />
      </motion.div>

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-foreground/20 float-soft"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 6) * 0.7}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity }} className="relative z-10 flex h-full w-full flex-col justify-end pb-16 sm:pb-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-5xl">
          <Reveal delay={0.3} y={20}>
            <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/70 font-button">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for freelance · Q3 2026
            </div>
          </Reveal>

          <h1 className="font-display text-[14vw] sm:text-[10vw] lg:text-[9vw] leading-[0.9] font-medium tracking-[-0.04em] text-foreground">
            <Reveal y={80}>
              <span className="block">Kavan</span>
            </Reveal>
            <Reveal y={80} delay={0.15}>
              <span className="block italic font-normal text-foreground/90">Gami.</span>
            </Reveal>
          </h1>

          <Reveal delay={0.5}>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <p className="max-w-xl text-base sm:text-lg text-foreground/80 leading-relaxed">
                UI Developer & Web Designer crafting cinematic, high-performance
                frontend experiences with{" "}
                <span className="text-foreground">React</span>,{" "}
                <span className="text-foreground">Tailwind</span>,{" "}
                <span className="text-foreground">GSAP</span> and{" "}
                <span className="text-foreground">WordPress</span>.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background font-button hover:bg-foreground/90 transition"
                >
                  See selected work
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="mailto:kavangami13@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/60 backdrop-blur px-6 py-3 text-sm text-foreground font-button hover:bg-background transition"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-foreground/50 font-button">
        Scroll
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["React", "Tailwind", "GSAP", "Lenis", "WordPress", "Figma", "TypeScript", "Framer Motion"];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border py-6 bg-secondary-bg">
      <div className="flex whitespace-nowrap marquee">
        {doubled.map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 font-display text-4xl sm:text-6xl text-foreground/80">
            {t}
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const smooth = useSpring(yImg, { stiffness: 60, damping: 20 });

  return (
    <section id="about" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="02" label="About" /></Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.03em] font-medium">
                I build interfaces that
                <span className="italic font-normal text-foreground/70"> feel </span>
                as good as they look.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                I'm a UI Developer with 2+ years of professional experience
                delivering pixel-perfect, responsive interfaces for product
                companies, agencies and government clients. I translate Figma
                into reusable, token-based components — then layer in GSAP and
                Lenis to make it move like something you want to keep touching.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { k: "Based in", v: "Ahmedabad" },
                { k: "Focus", v: "Frontend + Motion" },
                { k: "Education", v: "B.Tech IT · Ganpat" },
                { k: "Stack", v: "React · WP · GSAP" },
              ].map((x) => (
                <Reveal key={x.k} delay={0.05}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-button">{x.k}</p>
                    <p className="mt-2 font-display text-lg">{x.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div style={{ y: smooth }} className="relative">
              <div className="relative overflow-hidden rounded-3xl bg-secondary-bg aspect-[4/5]">
                <img src={charDev} alt="Kavan illustration" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)]">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-button">Currently</p>
                <p className="mt-1 font-display">Softqube Technology</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, i }: { readonly skill: (typeof SKILLS)[number]; readonly i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 15,
  });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const Icon = skill.icon;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
    setGlow({ x: px * 100, y: py * 100 });
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-44 rounded-3xl border border-border bg-card p-6"
    >
      {/* cursor spotlight (clipped to the rounded shape by border-radius) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, rgba(79,124,255,0.18), transparent 65%)`,
        }}
      />
      {/* accent border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-accent/0 transition-colors duration-300 group-hover:border-accent/40" />

      <div
        className="relative flex h-full flex-col justify-between"
        style={{ transform: "translateZ(35px)" }}
      >
        <div className="flex items-start justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary-bg text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-display text-lg text-foreground/15 transition-colors duration-300 group-hover:text-accent/40">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-button">
            {skill.cat}
          </p>
          <h3 className="mt-1.5 font-display text-xl tracking-tight">{skill.name}</h3>
        </div>
      </div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 bg-secondary-bg">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="03" label="Skills" /></Reveal>
        <div className="mt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-6xl leading-[1.05] tracking-[-0.03em] font-medium max-w-3xl">
              A curated toolkit — not a laundry list.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted-foreground">
              Every tool below is used on shipped, in-production work. Deep, not
              wide.
            </p>
          </Reveal>
        </div>

        <div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ perspective: 1200 }}
        >
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} skill={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".proj-card").forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <div>
              <SectionLabel n="04" label="Selected Work" />
              <h2 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.03em] font-medium">
                Featured
                <span className="italic font-normal text-foreground/70"> projects</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={charDesigner} alt="" className="hidden md:block w-40 rounded-2xl" loading="lazy" />
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((p) => (
            <a
              key={p.n}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="proj-card group block"
            >
              <div className="relative overflow-hidden rounded-3xl bg-card border border-border aspect-[4/3]">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${p.accent}10, ${p.accent}00 60%), var(--secondary-bg)` }}
                />
                <div className="relative h-full p-8 sm:p-10 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-button">
                      {p.n} · {p.tag}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="h-10 w-10 rounded-full bg-foreground text-background grid place-items-center"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-display text-4xl sm:text-5xl leading-none tracking-[-0.03em]">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground max-w-md">{p.desc}</p>
                    <p className="mt-4 text-xs text-foreground/60 font-button">{p.stack}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 bg-secondary-bg">
      <div className="mx-auto max-w-6xl">
        <Reveal><SectionLabel n="05" label="Experience" /></Reveal>
        <Reveal>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.05] tracking-[-0.03em] font-medium max-w-3xl">
            A short, focused
            <span className="italic font-normal text-foreground/70"> career </span>
            so far — built on real production work.
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-foreground/10 md:-translate-x-1/2" />
          <div className="space-y-16">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.1}>
                <div className={`relative md:grid md:grid-cols-2 md:gap-16 ${i % 2 ? "md:direction-rtl" : ""}`}>
                  <div className={`pl-12 md:pl-0 ${i % 2 ? "md:col-start-2" : ""}`}>
                    <div className="absolute left-4 md:left-1/2 top-2 h-3 w-3 rounded-full bg-accent md:-translate-x-1/2 ring-4 ring-secondary-bg" />
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-button">
                      {e.period}
                    </p>
                    <h3 className="mt-3 font-display text-2xl sm:text-3xl">
                      {e.role}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {e.company} · {e.place}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                      {e.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <Reveal className="lg:col-span-8">
            <SectionLabel n="06" label="Services" />
            <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.05] tracking-[-0.03em] font-medium">
              What I do, end to end.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-muted-foreground">
              I handle the entire frontend layer — from tokens and components to
              motion and performance.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group h-full rounded-3xl bg-card border border-border p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary-bg">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-muted-foreground font-button">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 bg-secondary-bg">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <div>
              <SectionLabel n="07" label="Creative Process" />
              <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.05] tracking-[-0.03em] font-medium">
                Six steps from
                <span className="italic font-normal text-foreground/70"> idea </span>
                to launch.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={charRobot} alt="" className="hidden md:block w-40 rounded-2xl float-soft" loading="lazy" />
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="rounded-3xl bg-card border border-border p-8 h-full">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-5xl text-foreground/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-6 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="08" label="Tech Stack" /></Reveal>
        <Reveal>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.05] tracking-[-0.03em] font-medium max-w-3xl">
            Tools I reach for on a Monday morning.
          </h2>
        </Reveal>
        <div className="mt-16 flex flex-wrap gap-3">
          {STACK.map((t, i) => (
            <Reveal key={t} delay={i * 0.02}>
              <motion.div
                whileHover={{ y: -3, backgroundColor: "#161616", color: "#F7F4EF" }}
                className="rounded-full border border-border bg-card px-5 py-3 font-button text-sm cursor-default"
              >
                {t}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="achievements" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 bg-foreground text-background">
      <div className="mx-auto max-w-7xl">
        <SectionLabelDark n="09" label="Achievements" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.03em] font-medium">
              Small numbers.
              <span className="italic font-normal text-background/60"> Real work.</span>
            </h2>
          </div>
          <p className="md:col-span-4 text-background/60">
            Two years, four teams, a lot of shipped pixels — and just getting
            started.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <StatItem key={s.label} n={s.n} suffix={s.suffix} label={s.label} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
function SectionLabelDark({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-background/60 font-button">
      <span className="text-background/40">{n}</span>
      <span className="h-px w-8 bg-background/20" />
      <span>{label}</span>
    </div>
  );
}
function StatItem({ n, suffix, label, active }: { n: number; suffix: string; label: string; active: boolean }) {
  const v = useCountUp(n, active);
  return (
    <div>
      <p className="font-display text-6xl sm:text-7xl leading-none tracking-[-0.04em]">
        {v}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-4 text-sm text-background/60 font-button uppercase tracking-[0.2em]">
        {label}
      </p>
    </div>
  );
}

function Playground() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const boxRef = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 });
  };
  return (
    <section id="playground" className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="10" label="Playground" /></Reveal>
        <Reveal>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.05] tracking-[-0.03em] font-medium max-w-3xl">
            Small experiments. No brief.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            ref={boxRef}
            onMouseMove={onMove}
            onMouseLeave={() => setPos({ x: 0, y: 0 })}
            className="relative overflow-hidden rounded-3xl bg-secondary-bg aspect-square grid place-items-center"
          >
            <motion.div
              animate={{ x: pos.x * 0.3, y: pos.y * 0.3 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="grid h-32 w-32 place-items-center rounded-full bg-foreground text-background font-display text-xl"
            >
              hover
            </motion.div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-card border border-border aspect-square p-8 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-button">Magnetic</p>
            <div className="flex items-center justify-center flex-1">
              <MagneticButton>Click me</MagneticButton>
            </div>
            <p className="text-sm text-muted-foreground">Spring-based cursor attraction.</p>
          </div>

          <div className="relative overflow-hidden rounded-3xl aspect-square">
            <img src={charMascot} alt="" className="h-full w-full object-cover breathe" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background/80 to-transparent">
              <p className="font-display text-xl">Breathing mascot</p>
              <p className="text-sm text-muted-foreground">CSS keyframes, no JS.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setP({ x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4 });
  };
  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      animate={{ x: p.x, y: p.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="rounded-full bg-accent px-8 py-4 text-background font-button"
    >
      {children}
    </motion.button>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 bg-secondary-bg">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="11" label="Contact" /></Reveal>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.04em] font-medium">
                Have a project
                <br />
                in mind?
                <br />
                <span className="italic font-normal text-foreground/70">Let's make it.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href="mailto:kavangami13@gmail.com"
                className="group mt-10 inline-flex items-center gap-4 rounded-full bg-foreground px-8 py-5 text-background"
              >
                <Mail className="h-5 w-5" />
                <span className="font-button text-lg">kavangami13@gmail.com</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <ContactLink icon={Mail} label="Email" v="kavangami13@gmail.com" href="mailto:kavangami13@gmail.com" />
              <ContactLink icon={Github} label="GitHub" v="KavanGamii" href="https://github.com/KavanGamii/" />
              <ContactLink icon={Linkedin} label="LinkedIn" v="kavanpatel-it" href="https://www.linkedin.com/in/kavanpatel-it/" />
              <ContactLink icon={MapPin} label="Based in" v="Ahmedabad, IN" href="#" />
            </div>
          </div>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="relative">
              <img src={charWave} alt="" className="w-full rounded-3xl float-soft" loading="lazy" />
              <div className="absolute -top-4 -left-4 glass-card rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-button">Reply time</p>
                <p className="font-display">~24 hours</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function ContactLink({ icon: Icon, label, v, href }: { icon: typeof Mail; label: string; v: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group block">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-button flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="mt-2 font-display text-lg group-hover:text-accent transition-colors">{v}</p>
    </a>
  );
}

function Footer() {
  return (
    <footer className="relative px-6 sm:px-10 lg:px-16 py-12 border-t border-border">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={charMascot} alt="" className="h-10 w-10 rounded-full breathe" loading="lazy" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kavan Gami — Built with love, GSAP & Lenis.
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm text-muted-foreground font-button">
          <a href="https://github.com/KavanGamii/" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/kavanpatel-it/" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="mailto:kavangami13@gmail.com" className="hover:text-foreground transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

function Portfolio() {
  useLenis();
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Work />
      <Experience />
      <Services />
      <Process />
      <Stack />
      <Achievements />
      <Playground />
      <Contact />
      <Footer />
    </main>
  );
}
