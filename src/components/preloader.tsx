import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cinematic first-visit loader.
 *
 * Plays ONCE per browser session (sessionStorage). The dark panel counts
 * 0 → 100 while a masked "Kavan Gami." reveal plays, then the whole curtain
 * lifts to reveal the site, inverting the site's own palette (foreground /
 * background / accent) so it feels like part of the same system.
 *
 * Want it to play only ONCE EVER (not once per session)? Swap the two
 * `sessionStorage` calls below for `localStorage`.
 */
const STORAGE_KEY = "kg-loader-seen";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

function safeStorage(action: "get" | "set"): string | null {
  try {
    if (action === "set") {
      sessionStorage.setItem(STORAGE_KEY, "1");
      return "1";
    }
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function Preloader() {
  // Default `true` so SSR + first client render agree (no hydration flash /
  // mismatch); the effect below hides it immediately for returning visitors.
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Already seen this session → skip the whole thing.
    if (safeStorage("get")) {
      setShow(false);
      return;
    }

    // Lock scroll + pin to top while the curtain is up.
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Respect users who don't want motion, snap to 100 and exit fast.
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let exitTimer = 0;

    const finish = () => {
      safeStorage("set");
      setShow(false);
    };

    if (reduced) {
      setCount(100);
      exitTimer = window.setTimeout(finish, 400);
    } else {
      const start = performance.now();
      const duration = 1900;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setCount(Math.round(eased * 100));
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          exitTimer = window.setTimeout(finish, 350); // brief hold at 100
        }
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      body.style.overflow = prevOverflow; // restore when curtain unmounts
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-100 flex select-none flex-col justify-between bg-foreground px-6 py-8 text-background sm:px-10 sm:py-10"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_IN_OUT }}
        >
          {/* top row */}
          <motion.div
            className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-background/50 font-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Portfolio
            </span>
            <span>Loading</span>
          </motion.div>

          {/* center, masked name reveal (mirrors the hero) */}
          <h1 className="font-display text-[18vw] leading-[0.85] font-medium tracking-[-0.04em] sm:text-[12vw]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 }}
              >
                Kavan
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block italic font-normal text-background/70"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE_OUT, delay: 0.28 }}
              >
                Gami.
              </motion.span>
            </span>
          </h1>

          {/* bottom, tagline, counter, progress bar */}
          <div>
            <div className="flex items-end justify-between gap-6">
              <motion.p
                className="max-w-xs text-sm leading-relaxed text-background/50"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                UI Developer &amp; Web Designer, crafting cinematic frontend
                experiences.
              </motion.p>
              <p className="font-display text-6xl leading-none tracking-[-0.04em] tabular-nums sm:text-8xl">
                {String(count).padStart(3, "0")}
                <span className="text-accent">%</span>
              </p>
            </div>
            <div className="mt-6 h-px w-full overflow-hidden bg-background/15">
              <div
                className="h-full bg-background"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
