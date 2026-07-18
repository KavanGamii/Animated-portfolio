import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
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
import footerVideo from "@/assets/footer.mp4";
import aboutImg from "@/assets/about-img.png";
import charRobot from "@/assets/char-robot.jpg";
import charDesigner from "@/assets/side-image.png";
import charMascot from "@/assets/char-mascot.jpg";
import charWave from "@/assets/contact-from.png";
import { useLenis } from "@/hooks/use-lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Kavan Gami · UI Developer & Web Designer" },
      {
        name: "description",
        content:
          "Kavan Gami · UI Developer & Web Designer building cinematic frontend experiences with React, Tailwind CSS, GSAP, Lenis and WordPress.",
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
    desc: "Scalable, component-based UI for an enterprise AI automation platform, dynamic components tuned for complex workflow states and production performance.",
    href: "https://mia.supermia.ai/",
    accent: "#4F7CFF",
  },
  {
    n: "02",
    name: "Pioneer Group",
    tag: "UK Government Platform",
    stack: "HTML · Bootstrap · GSAP · Lenis",
    desc: "Accessibility-focused public-sector web platform with GSAP scroll animations and Lenis smooth scrolling, built to strict cross-browser and gov design standards.",
    href: "https://pioneergroup.org.uk",
    accent: "#161616",
  },
  {
    n: "03",
    name: "Local Lens",
    tag: "Hyperlocal Discovery App",
    stack: "Next.js · Tailwind",
    desc: "Full personal product shipped end-to-end: a mobile-first, performance-optimized UI with location-based UX and fast load times.",
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
    period: "Jun 2025 → Present",
    points: [
      "Ship pixel-perfect, mobile-first UIs with React and Tailwind, translating Figma into reusable token-based components.",
      "Author GSAP + Lenis scroll interactions for premium client-facing experiences.",
      "Own Agile Git workflows: feature branches, code reviews, sprint deliverables.",
    ],
  },
  {
    role: "Associate Web Designer & Developer",
    company: "Tridhya Tech",
    place: "Ahmedabad",
    period: "Feb 2024 → May 2025",
    points: [
      "Built scalable UI component libraries with React, Vue (Vuex) and Vuetify.",
      "Delivered WordPress sites with ACF custom fields at pixel-level fidelity.",
      "Resolved cross-browser issues and applied token-based design across large production projects.",
    ],
  },
];

const SERVICES = [
  { icon: Code2, title: "Frontend Development", desc: "React, TypeScript, Tailwind: production-grade component architectures." },
  { icon: Palette, title: "UI Engineering", desc: "Figma-to-code with pixel precision and token-based design systems." },
  { icon: Layers, title: "WordPress + ACF", desc: "Custom themes with maintainable, content-editor-friendly ACF fields." },
  { icon: Zap, title: "Motion & Animation", desc: "GSAP, ScrollTrigger and Lenis: motion with purpose, not noise." },
  { icon: Cpu, title: "Design Systems", desc: "Tokens, components, docs: one source of truth across products." },
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

/* Brand logo, a clean monogram tile: a crisp "K" in a rounded dark tile with an
   accent status dot that breaks out of the corner and pulses. Magnetic, with a
/* Brand logo: a clean monogram tile with a crisp "K" in a rounded dark tile and an accent status dot that breaks out of the corner and pulses. Magnetic, with a subtle tilt on hover. */
function Logo() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setP({
      x: (e.clientX - r.left - r.width / 2) * 0.15,
      y: (e.clientY - r.top - r.height / 2) * 0.15,
    });
  };

  return (
    <motion.a
      ref={ref}
      href="#top"
      onMouseMove={onMove}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      animate={{ x: p.x, y: p.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex items-center gap-3 shrink-0 rounded-xl"
      aria-label="Kavan Gami · Back to top"
    >
      {/* Monogram Tile */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background transition-transform duration-500 group-hover:scale-[1.05] group-hover:rotate-6 shadow-sm">
        <span className="font-display text-xl font-medium leading-none tracking-tighter ml-[-1px]">
          K<span className="text-accent italic font-normal">g</span>
        </span>
        
        {/* Pulsing status dot */}
        <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full border-[2.5px] border-background bg-accent transition-transform duration-500 group-hover:scale-125">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        </span>
      </div>

      {/* Stacked Typography */}
      <div className="hidden sm:flex flex-col justify-center overflow-hidden leading-tight">
        <span className="font-display text-[15px] font-semibold tracking-tight text-foreground transition-colors duration-300">
          Kavan Gami
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-button transition-colors duration-300 group-hover:text-accent">
          UI Developer
        </span>
      </div>
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
          className={`glass-card flex items-center justify-between gap-2 rounded-full py-2 pl-2 pr-2 transition-all duration-500 ${scrolled
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
                    className={`relative z-10 transition-colors ${on ? "text-foreground" : "text-muted-foreground"
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

      <motion.div style={{ opacity }} className="relative z-10 flex h-full w-full flex-col justify-end pb-14 sm:pb-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-5xl">
          <h1 className="font-display text-[14vw] sm:text-[10vw] lg:text-[8.5vw] leading-[0.88] font-medium tracking-[-0.04em] text-foreground">
            <Reveal y={80}>
              <span className="block">Kavan</span>
            </Reveal>
            <Reveal y={80} delay={0.15}>
              <span className="block italic font-normal text-foreground/90">Gami.</span>
            </Reveal>
          </h1>

          {/* role + value proposition */}
          <Reveal delay={0.45}>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-foreground/80 leading-relaxed">
              <span className="font-medium text-foreground">
                UI Developer &amp; Web Designer
              </span>{" "}
              crafting cinematic, high-performance frontend experiences.
            </p>
          </Reveal>

          {/* informative facts */}
          <Reveal delay={0.55}>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-button text-sm">
              <span className="flex items-baseline gap-2">
                <span className="font-medium text-foreground">2+ yrs</span>
                <span className="text-xs uppercase tracking-[0.15em] text-foreground/45">
                  Experience
                </span>
              </span>
              <span className="hidden h-4 w-px bg-foreground/15 sm:block" />
              <span className="flex items-baseline gap-2">
                <span className="font-medium text-foreground">Frontend + Motion</span>
                <span className="text-xs uppercase tracking-[0.15em] text-foreground/45">
                  Focus
                </span>
              </span>
            </div>
          </Reveal>

          {/* tech stack, compact animated marquee, highlights on hover */}
          <Reveal delay={0.6}>
            <div className="group/skills relative mt-6 max-w-xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="marquee flex w-max gap-2 group-hover/skills:[animation-play-state:paused]">
                {[
                  "React", "Next.js", "TypeScript", "JavaScript", "Tailwind",
                  "SCSS", "GSAP", "Lenis", "Framer Motion", "Three.js",
                  "WordPress", "Figma", "Git",
                  "React", "Next.js", "TypeScript", "JavaScript", "Tailwind",
                  "SCSS", "GSAP", "Lenis", "Framer Motion", "Three.js",
                  "WordPress", "Figma", "Git",
                ].map((t, i) => (
                  <span
                    key={i}
                    className="whitespace-nowrap rounded-full border border-foreground/15 bg-background/50 px-3 py-1 text-xs font-button text-foreground/80 backdrop-blur transition-colors duration-300 hover:border-accent/60 hover:bg-background/70 hover:text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.75}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
    <section id="about" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="02" label="About" /></Reveal>

        {/* heading */}
        <Reveal className="mt-10 block max-w-4xl">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.03em] font-medium">
            I build interfaces that
            <span className="italic font-normal text-foreground/70"> feel </span>
            as good as they look.
          </h2>
        </Reveal>

        {/* bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch">
          {/* portrait */}
          <Reveal className="lg:col-span-5">
            <motion.div
              style={{ y: smooth }}
              className="group relative h-full min-h-[380px] overflow-hidden rounded-3xl border border-border bg-secondary-bg"
            >
              <img
                src={aboutImg}
                alt="Kavan Gami · 3D illustration"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
            </motion.div>
          </Reveal>

          {/* right column: bio + compact facts */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              {/* bio + skills marquee */}
              <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur sm:p-8">
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  I'm a{" "}
                  <span className="font-medium text-foreground">
                    UI Developer &amp; Web Designer
                  </span>{" "}
                  with 2+ years turning Figma into pixel-perfect, token-based
                  components, then layering in{" "}
                  <span className="text-foreground">GSAP</span> and{" "}
                  <span className="text-foreground">Lenis</span> so every
                  interface moves like something you want to keep touching.
                  Shipped for product companies, agencies and government clients.
                </p>

                {/* what I do */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {[
                    { t: "Frontend Development", d: "React · TypeScript · Tailwind" },
                    { t: "UI Engineering", d: "Figma-to-code · design systems" },
                    { t: "Motion & Animation", d: "GSAP · ScrollTrigger · Lenis" },
                    { t: "WordPress + ACF", d: "Custom, editor-friendly themes" },
                  ].map((s) => (
                    <div
                      key={s.t}
                      className="group/do flex items-start gap-3 border-t border-border pt-4"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover/do:scale-[1.8]" />
                      <div>
                        <p className="font-display text-base leading-tight">{s.t}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground font-button">
                          {s.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* skills marquee */}
                <div className="group/skills relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                  <div className="marquee flex w-max gap-2 group-hover/skills:[animation-play-state:paused]">
                    {[
                      "React", "Next.js", "TypeScript", "JavaScript", "Tailwind",
                      "SCSS", "GSAP", "Lenis", "Framer Motion", "Three.js",
                      "WordPress", "Figma", "Git",
                      "React", "Next.js", "TypeScript", "JavaScript", "Tailwind",
                      "SCSS", "GSAP", "Lenis", "Framer Motion", "Three.js",
                      "WordPress", "Figma", "Git",
                    ].map((t, i) => (
                      <span
                        key={i}
                        className="whitespace-nowrap rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-button text-foreground/75"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* compact fact strip */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { k: "Experience", v: "2+ yrs" },
                  { k: "Focus", v: "Frontend + Motion" },
                  { k: "Education", v: "B.Tech IT" },
                  { k: "Based in", v: "Ahmedabad" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="group/fact rounded-2xl border border-border bg-card/60 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    <p className="font-display text-lg leading-tight">{x.v}</p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-button">
                      <span className="h-1 w-1 rounded-full bg-accent transition-all duration-300 group-hover/fact:w-3" />
                      {x.k}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---- Skill category grouping helper ---- */
const SKILL_CATEGORIES = (() => {
  const map = new Map<string, typeof SKILLS>();
  SKILLS.forEach((s) => {
    if (!map.has(s.cat)) map.set(s.cat, []);
    map.get(s.cat)!.push(s);
  });
  return Array.from(map, ([cat, items]) => ({ cat, items }));
})();

function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    const engine = Engine.create();
    engine.gravity.y = 0.8;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const wallThickness = 200;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, { isStatic: true });
    const leftWall = Bodies.rectangle(0 - wallThickness / 2, height / 2, wallThickness, height * 4, { isStatic: true });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 4, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -1000, width * 2, wallThickness, { isStatic: true });

    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    const bodies = SKILLS.map((skill, index) => {
      const el = pillRefs.current[index];
      const w = el ? el.offsetWidth : 150;
      const h = el ? el.offsetHeight : 50;

      const x = Math.random() * (width - w) + w / 2;
      const y = -Math.random() * 500 - 200;

      return Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: h / 2 },
        restitution: 0.4,
        friction: 0.1,
        density: 0.001,
      });
    });

    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);

    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    let animationFrameId: number;
    const update = () => {
      bodies.forEach((body, index) => {
        // Out of bounds rescue
        if (body.position.y > height + 200 || body.position.x < -200 || body.position.x > width + 200) {
          Matter.Body.setPosition(body, { x: width / 2, y: 100 });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
        }

        const el = pillRefs.current[index];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(update);
    };

    const runner = Runner.create();
    Runner.run(runner, engine);
    update();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top 60%",
        onEnter: () => {
          World.add(engine.world, bodies);
          bodies.forEach((body) => {
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
          });
        },
        once: true,
      });
    }, containerRef);

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
      Matter.Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Engine.clear(engine);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="skills" className="relative py-20 bg-foreground text-background overflow-hidden h-[500px] lg:h-[600px] flex items-center justify-center">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-full px-6 flex flex-col items-center">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-background/50 font-button">
          <span className="text-background/30">03</span>
          <span className="h-px w-8 bg-background/20" />
          <span>Capabilities</span>
        </div>
        <h2 className="mt-8 font-display text-5xl sm:text-7xl lg:text-8xl leading-[1.05] tracking-[-0.03em] font-medium max-w-2xl text-center">
          Interactive <br />
          <span className="italic font-normal text-background/60">Toolkit.</span>
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-background/60 max-w-xs text-center">
          Grab, drag, and throw the physics pills around.
        </p>
      </div>

      <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-20">
        {SKILLS.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              className="absolute top-0 left-0 flex items-center gap-3 px-6 py-4 bg-background/5 backdrop-blur-md text-background rounded-full border border-background/20 shadow-2xl cursor-grab active:cursor-grabbing hover:bg-background/10 transition-colors duration-300"
              style={{ willChange: 'transform' }}
            >
              <Icon className="h-6 w-6 text-accent" />
              <span className="font-display text-2xl font-medium whitespace-nowrap">{skill.name}</span>
            </div>
          );
        })}
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
    <section id="work" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
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
  const ref = useRef<HTMLDivElement>(null);
  const CARD_TOP_START = 100; // px from top of viewport for first card
  const CARD_TOP_STEP = 30; // each next card offsets by this much more

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      // subtle scale-down for stacked cards as they go behind
      gsap.utils.toArray<HTMLElement>(".exp-sticky-card").forEach((card, i, arr) => {
        if (i === arr.length - 1) return; // last card doesn't need it
        ScrollTrigger.create({
          trigger: arr[i + 1],
          start: "top bottom",
          end: "top center",
          scrub: true,
          onUpdate: (self) => {
            const scale = 1 - self.progress * 0.03;
            const brightness = 1 - self.progress * 0.08;
            card.style.transform = `scale(${scale})`;
            card.style.filter = `brightness(${brightness})`;
          },
          onLeaveBack: () => {
            card.style.transform = "scale(1)";
            card.style.filter = "brightness(1)";
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative px-6 sm:px-10 lg:px-16 bg-secondary-bg"
    >
      {/* header — not sticky */}
      <div className="mx-auto max-w-6xl pt-28 sm:pt-40 pb-16">
        <Reveal><SectionLabel n="05" label="Experience" /></Reveal>
        <Reveal>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.05] tracking-[-0.03em] font-medium max-w-3xl">
            A short, focused
            <span className="italic font-normal text-foreground/70"> career </span>
            so far, built on real production work.
          </h2>
        </Reveal>
      </div>

      {/* stacking cards */}
      <div className="mx-auto max-w-6xl pb-28 sm:pb-40">
        {EXPERIENCE.map((e, i) => {
          const isPresent = e.period.includes("Present");
          const topOffset = CARD_TOP_START + i * CARD_TOP_STEP;

          return (
            <div
              key={e.company}
              className="exp-sticky-card sticky rounded-2xl border border-border bg-card shadow-[0_-1px_0_0_rgba(0,0,0,0.02)] mb-6 last:mb-0 origin-top transition-[transform,filter] duration-300 will-change-transform"
              style={{ top: topOffset, zIndex: i + 1 }}
            >
              <div className="p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16">
                {/* left: period */}
                <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-button whitespace-nowrap">
                    {e.period}
                  </p>
                  {isPresent && (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-button">
                        Now
                      </span>
                    </span>
                  )}
                </div>

                {/* right: content */}
                <div>
                  <h3 className="font-display text-2xl sm:text-[2rem] leading-tight tracking-tight">
                    {e.role}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {e.company}, {e.place}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-foreground/25" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".svc-row", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".svc-list", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20">
          <Reveal>
            <SectionLabel n="06" label="Services" />
            <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.05] tracking-[-0.03em] font-medium">
              What I do,{" "}
              <span className="italic font-normal text-foreground/70">end to end.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-muted-foreground">
              I handle the entire frontend layer, from tokens and components to
              motion and performance.
            </p>
          </Reveal>
        </div>

        {/* full-width service rows */}
        <div className="svc-list">
          {/* top rule */}
          <div className="h-px bg-foreground/10" />

          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isHovered = hovered === i;

            return (
              <div
                key={s.title}
                className="svc-row group cursor-default"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative py-7 sm:py-9 flex items-center gap-6 sm:gap-10">
                  {/* number */}
                  <span className="hidden sm:block w-10 text-sm text-foreground/20 font-display transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* icon — slides in on hover */}
                  <motion.span
                    className="hidden md:grid h-12 w-12 shrink-0 place-items-center"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -12,
                      rotate: isHovered ? 0 : -20,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Icon className="h-5 w-5 text-accent" />
                  </motion.span>

                  {/* title — shifts right on hover */}
                  <motion.h3
                    className="font-display text-2xl sm:text-3xl lg:text-[2.6rem] tracking-tight leading-none"
                    animate={{ x: isHovered ? 8 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {s.title}
                  </motion.h3>

                  {/* spacer */}
                  <span className="flex-1" />

                  {/* description — reveals on hover */}
                  <motion.p
                    className="hidden lg:block max-w-xs text-sm leading-relaxed text-muted-foreground text-right"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : 20,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {s.desc}
                  </motion.p>

                  {/* arrow — always visible but rotates on hover */}
                  <motion.span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-foreground/10 transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/[0.06]"
                    animate={{ rotate: isHovered ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ArrowUpRight className="h-4 w-4 text-foreground/30 transition-colors duration-300 group-hover:text-accent" />
                  </motion.span>
                </div>

                {/* bottom rule — transitions to accent on hover */}
                <div className="h-px bg-foreground/10 transition-colors duration-500 group-hover:bg-accent/40" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".proc-step", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".proc-grid", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-secondary-bg">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel n="07" label="Creative Process" />
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.05] tracking-[-0.03em] font-medium">
            Six steps from
            <span className="italic font-normal text-foreground/70"> idea </span>
            to launch.
          </h2>
        </Reveal>

        <div className="proc-grid mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-0">
          {PROCESS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="proc-step group relative">
                {/* integrated connector — dot + line inside each cell */}


                {/* content — padded inside each cell */}
                <div className="lg:pr-8 py-8 sm:py-6 lg:py-0 border-b border-foreground/[0.06] sm:border-b lg:border-b-0">
                  {/* number */}
                  <span className="font-display text-4xl font-medium leading-none text-foreground/[0.07] transition-colors duration-500 group-hover:text-accent/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* title + icon */}
                  <div className="mt-5 flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-foreground/25 transition-colors duration-400 group-hover:text-accent" />
                    <h3 className="font-display text-lg tracking-tight">
                      {p.title}
                    </h3>
                  </div>

                  {/* description */}
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground lg:pr-2">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
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
    <section id="achievements" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-foreground text-background">
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
            Two years, four teams, a lot of shipped pixels, and just getting
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
    <section id="playground" className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
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
    <section id="contact" className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-secondary-bg">
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
                className="group mt-10 inline-flex items-center gap-4 rounded-full bg-foreground px-4 py-2 sm:px-8 sm:py-5 text-background"
              >
                <Mail className="h-5 w-5 sm:block hidden" />
                <span className="font-button text-lg break-words">Let's Connect</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <ContactLink icon={Github} label="GitHub" v="KavanGamii" href="https://github.com/KavanGamii/" />
              <ContactLink icon={Linkedin} label="LinkedIn" v="kavanpatel-it" href="https://www.linkedin.com/in/kavanpatel-it/" />
              <ContactLink icon={MapPin} label="Based in" v="Ahmedabad, IN" href="#" />
              <ContactLink icon={Mail} label="Email" v="kavangami13@gmail.com" href="mailto:kavangami13@gmail.com" />
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
      <p className="mt-2 font-display text-lg group-hover:text-accent transition-colors break-words">{v}</p>
    </a>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[80%_center] sm:object-center"
        src={footerVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* legibility overlays (match the hero) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-transparent to-background/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        {/* CTA */}
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.04em] font-medium text-foreground">
            Let's build something
            <span className="italic font-normal text-foreground/70"> worth touching.</span>
          </h2>
          <a
            href="mailto:kavangami13@gmail.com"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-background font-button transition-colors hover:bg-foreground/90"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* link columns */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border/60 pt-10 sm:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-button">
              Navigate
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-button">
              Connect
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="https://github.com/KavanGamii/" target="_blank" rel="noreferrer" className="text-foreground/70 transition-colors hover:text-foreground">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/kavanpatel-it/" target="_blank" rel="noreferrer" className="text-foreground/70 transition-colors hover:text-foreground">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:kavangami13@gmail.com" className="text-foreground/70 transition-colors hover:text-foreground">
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-end sm:justify-end">
            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-sm font-button text-foreground/70 transition-colors hover:text-foreground"
            >
              Back to top
              <span className="grid h-8 w-8 place-items-center rounded-full border border-border transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/50">
                ↑
              </span>
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kavan Gami · Built with GSAP & Lenis.
          </p>
          <p className="font-display text-lg text-foreground/80">
            Kavan <span className="italic font-normal">Gami.</span>
          </p>
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
      <Achievements />
      <Playground />
      <Contact />
      <Footer />
    </main>
  );
}
