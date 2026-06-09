import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Linkedin, Mail, Phone, MapPin, Github, Award, GraduationCap,
  Briefcase, Cpu, Trophy, Languages, ArrowUpRight, Sparkles, ArrowDown, Star,
} from "lucide-react";
import jushitaImage from "@/assets/jushita.jpg";
import jushitaAsset from "@/assets/jushita.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jushita Pediredla — Mechatronic Engineer & IEM APU President" },
      { name: "description", content: "Portfolio of Jushita Pediredla — First-Class Mechatronic Engineering graduate, roboticist, and twice-elected IEM APU President. Open to graduate engineering roles." },
      { property: "og:title", content: "Jushita Pediredla — Mechatronic Engineer" },
      { property: "og:description", content: "Robotics, automation, and leadership. Portfolio & CV." },
      { property: "og:image", content: jushitaAsset.url },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  component: Portfolio,
});

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "leadership", label: "Leadership" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
] as const;

const WHATSAPP = "60173031653";
const LINKEDIN = "https://www.linkedin.com/in/pediredla-jushita/";
const EMAIL = "pediredlajushita@gmail.com";
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent("Opportunity for Jushita Pediredla")}`;

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---------- Custom cursor ---------- */
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 30, mass: 0.4 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a,button,[data-cursor=hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [x, y]);

  return (
    <>
      {/* Glow core */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      >
        <motion.div
          animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.35 : 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-gold"
          style={{ boxShadow: "0 0 20px 4px oklch(0.84 0.16 80 / 0.6), 0 0 60px 12px oklch(0.84 0.16 80 / 0.25)" }}
        />
      </motion.div>
      {/* Outer ring */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[99] hidden md:block"
      >
        <motion.div
          animate={{ scale: hovering ? 1.5 : 1 }}
          className="w-10 h-10 -ml-5 -mt-5 rounded-full border border-gold/40"
          style={{ boxShadow: "0 0 30px -5px oklch(0.84 0.16 80 / 0.3)" }}
        />
      </motion.div>
      {/* Trailing glow */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[98] hidden md:block"
      >
        <motion.div
          animate={{ scale: hovering ? 3 : 1.8, opacity: hovering ? 0.15 : 0.25 }}
          transition={{ duration: 0.4 }}
          className="w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-gold blur-md"
          style={{ boxShadow: "0 0 80px 24px oklch(0.84 0.16 80 / 0.2)" }}
        />
      </motion.div>
    </>
  );
}

function Portfolio() {
  const [active, setActive] = useState<string>("about");
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: "var(--gradient-hero)" }}>
      <Cursor />
      <Aurora />

      <motion.div
        style={{ scaleX: progressScale, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[60]"
      >
        <div className="w-full h-full" style={{ background: "var(--gradient-gold)" }} />
      </motion.div>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollToId("top")} className="font-display text-xl tracking-wide">
            Jushita <span className="text-gradient-gold">P.</span>
          </button>
          <nav className="hidden md:flex items-center gap-1 relative">
            {SECTIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => scrollToId(t.id)}
                className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                  active === t.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === t.id && (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-full shadow-[var(--shadow-gold)]"
                    style={{ background: "var(--gradient-gold)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </nav>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-sm text-foreground hover:text-gold transition-colors"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>

        <div className="md:hidden px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
          {SECTIONS.map((t) => (
            <button
              key={t.id}
              onClick={() => scrollToId(t.id)}
              className={`px-3.5 py-1.5 text-xs rounded-full whitespace-nowrap transition border ${
                active === t.id
                  ? "bg-gold text-primary-foreground border-gold shadow-[var(--shadow-gold)]"
                  : "border-border text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <Hero />
      <Marquee />

      <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <Section id="about"><About /></Section>
        <Section id="experience"><Experience /></Section>
        <Section id="projects"><Projects /></Section>
        <Section id="skills"><Skills /></Section>
        <Section id="leadership"><Leadership /></Section>
        <Section id="awards"><Awards /></Section>
        <Section id="contact"><Contact /></Section>
      </main>

      <footer className="border-t border-border/60 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Jushita Pediredla. Crafted with intent.</p>
          <div className="flex gap-4">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-gold"><Linkedin className="w-4 h-4" /></a>
            <a href="https://github.com/Jushita12" target="_blank" rel="noopener noreferrer" className="hover:text-gold"><Github className="w-4 h-4" /></a>
            <a href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer" className="hover:text-gold"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Animated background ---------- */
function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)", opacity: 0.22 }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.22 320) 0%, transparent 60%)", opacity: 0.28 }}
        animate={{ x: [0, -100, 40, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.16 200) 0%, transparent 60%)", opacity: 0.2 }}
        animate={{ x: [0, 60, -60, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay noise-overlay" />
    </div>
  );
}

/* ---------- Word-by-word reveal ---------- */
function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.06 }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------- 3D Tilt photo card ---------- */
function TiltPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, oklch(0.90 0.14 88 / 0.45), transparent 55%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 16);
    rx.set(-(py - 0.5) * 16);
    mx.set(px * 100);
    my.set(py * 100);
  }
  function reset() { rx.set(0); ry.set(0); }

  return (
    <div className="relative" style={{ perspective: 1200 }}>
      {/* glow halo */}
      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-8 rounded-[2rem] blur-3xl"
        style={{ background: "var(--gradient-gold)", opacity: 0.35 }}
      />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)] group"
      >
        {/* gradient border */}
        <div className="absolute inset-0 rounded-[2rem] p-[2px]" style={{ background: "var(--gradient-gold)" }}>
          <div className="w-full h-full rounded-[1.9rem] bg-background" />
        </div>

        <div className="relative m-[2px] rounded-[1.9rem] overflow-hidden">
          <img
            src={jushitaImage}
            alt="Jushita Pediredla"
            className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <motion.div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{ background: spotlight }} />
          {/* conic shine sweep */}
          <motion.div
            className="absolute -inset-x-1/2 -top-1/2 h-[200%] pointer-events-none opacity-25"
            style={{ background: "conic-gradient(from 0deg, transparent 0deg, oklch(0.95 0.12 88 / 0.7) 20deg, transparent 40deg)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-background/95 via-background/40 to-transparent">
            <p className="font-display text-2xl text-gradient-gold">Jushita Pediredla</p>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mt-1">Mechatronic Engineer · Kuala Lumpur</p>
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-12 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-xl border border-gold/30 shadow-[var(--shadow-gold)]"
        style={{ transform: "translateZ(40px)" }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-ring" />
        <span className="text-xs font-medium">Open to roles</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute -right-4 bottom-24 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-xl border border-gold/30"
      >
        <Star className="w-3.5 h-3.5 text-gold fill-gold" />
        <span className="text-xs font-medium">First Class · CGPA 3.70</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute -left-2 bottom-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-xl border border-gold/30"
      >
        <Trophy className="w-3.5 h-3.5 text-gold" />
        <span className="text-xs font-medium">2× IEM President</span>
      </motion.div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="max-w-6xl mx-auto px-6 pt-12 pb-12 md:pt-20 md:pb-20 relative z-10"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-center"
      >
        <div>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold mb-6">
            <motion.span
              animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.span>
            Portfolio · 2026 · Open to graduate roles
          </motion.div>

          <h1 className="font-sans font-semibold text-6xl md:text-8xl leading-[0.95] mb-6 tracking-tight">
            <span className="block" style={{ overflow: "hidden" }}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                className="inline-block"
              >
                Jushita
              </motion.span>
            </span>
            <span className="block text-muted-foreground/80" style={{ overflow: "hidden", fontSize: "0.5em" }}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.45 }}
                className="inline-block"
              >
                Pediredla.
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Mechatronic Engineering graduate (First Class · CGPA 3.70) from Asia Pacific University.
            Roboticist, automation enthusiast, and twice-elected{" "}
            <span className="text-foreground font-medium">President of IEM APU</span> — leading a 600+ member engineering body.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <MagneticLink href={LINKEDIN} primary>
              <Linkedin className="w-4 h-4" /> Connect on LinkedIn
            </MagneticLink>
            <MagneticLink href={GMAIL_COMPOSE}>
              <Mail className="w-4 h-4" /> Email me
            </MagneticLink>
            <MagneticLink href={`https://wa.me/${WHATSAPP}`}>
              <Phone className="w-4 h-4" /> WhatsApp
            </MagneticLink>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/60 max-w-md">
            <Stat n={3.70} suffix="" l="CGPA · First Class" decimals={2} />
            <Stat n={600} suffix="+" l="IEM members led" />
            <Stat n={2} suffix="×" l="Elected President" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        >
          <TiltPhoto />
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        className="mt-16 mx-auto flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors"
      >
        Scroll <ArrowDown className="w-3.5 h-3.5" />
      </motion.button>
    </section>
  );
}


/* ---------- Marquee ticker ---------- */
function Marquee() {
  const items = ["Robotics", "Mechatronics", "Automation", "Python", "ROS / SLAM", "PLC", "MATLAB", "SolidWorks", "Computer Vision", "ABB RobotStudio", "Lean Six Sigma", "Leadership"];
  const row = [...items, ...items];
  return (
    <div className="relative z-10 border-y border-border/40 bg-background/40 backdrop-blur-sm py-5 overflow-hidden">
      <div className="flex gap-12 animate-marquee w-max">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-12 text-2xl md:text-3xl font-display text-muted-foreground/70">
            <span className="hover:text-gold transition-colors">{t}</span>
            <Sparkles className="w-4 h-4 text-gold/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShimmerText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="italic relative inline-block bg-clip-text text-transparent"
      style={{
        backgroundImage: "linear-gradient(110deg, oklch(0.88 0.10 88) 35%, oklch(1 0 0) 50%, oklch(0.88 0.10 88) 65%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 4.5s linear infinite",
      }}
    >
      {children}
    </span>
  );
}

function MagneticLink({
  href, children, primary,
}: { href: string; children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  function reset() { x.set(0); y.set(0); }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={primary ? { x: sx, y: sy, background: "var(--gradient-gold)" } : { x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={
        primary
          ? "inline-flex items-center gap-2 text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-95 transition shadow-[var(--shadow-gold)]"
          : "inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full text-sm font-medium hover:border-gold hover:text-gold transition bg-background/40 backdrop-blur"
      }
    >
      {children}
    </motion.a>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="scroll-mt-28 py-16 md:py-20 border-t border-border/40 first:border-t-0"
    >
      {children}
    </motion.section>
  );
}

/* ---------- Animated counter ---------- */
function Stat({ n, l, suffix = "", decimals = 0 }: { n: number; l: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(n * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, n]);
  return (
    <motion.div ref={ref} whileHover={{ y: -3 }}>
      <div className="font-display text-4xl text-gradient-gold tabular-nums">
        {val.toFixed(decimals)}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{l}</div>
    </motion.div>
  );
}

function SectionTitle({ icon: Icon, kicker, title }: { icon: any; kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold mb-3"
      >
        <Icon className="w-3.5 h-3.5" /> {kicker}
      </motion.div>
      <h2 className="font-display text-4xl md:text-6xl">
        <SplitWords text={title} />
      </h2>
    </div>
  );
}

function RevealList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function About() {
  return (
    <div>
      <SectionTitle icon={Sparkles} kicker="About" title="Engineering meets leadership." />
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
        Final-year Mechatronic Engineering student at Asia Pacific University, graduating in 2026 with a
        First-Class degree (CGPA 3.70). Hands-on industry exposure at{" "}
        <span className="text-gradient-gold font-semibold" style={{ textShadow: "0 0 24px oklch(0.84 0.16 80 / 0.35)" }}>Alstom Malaysia</span>{" "}
        and autonomous robotics work with{" "}
        <span className="text-foreground font-medium">PEKAT Malaysia</span>. Twice elected President of IEM APU,
        I've led a 600+ member body — I ship technical work <em className="text-gradient-gold not-italic font-medium">and</em> rally a team around it.
      </p>

      <RevealList className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: GraduationCap, t: "BEng (Hons) Mechatronic Engineering", s: "Asia Pacific University · First Class · 2026" },
          { icon: GraduationCap, t: "Foundation in Science", s: "University of Cyberjaya · CGPA 3.75 · 2022" },
          { icon: Award, t: "Lean Six Sigma Green Belt", s: "Certified 2025" },
          { icon: Award, t: "IEM & IMechE Member", s: "No. 121771 · No. 80768567" },
        ].map((c) => (
          <motion.div
            key={c.t}
            variants={fadeUp}
            whileHover={{ y: -4, borderColor: "oklch(0.84 0.16 80 / 0.6)" }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 backdrop-blur border border-border/40 transition-colors"
          >
            <c.icon className="w-5 h-5 text-gold shrink-0 mt-1" />
            <div>
              <p className="font-medium">{c.t}</p>
              <p className="text-sm text-muted-foreground mt-1">{c.s}</p>
            </div>
          </motion.div>
        ))}
      </RevealList>
    </div>
  );
}

function Experience() {
  const items = [
    {
      role: "Project Intern",
      org: "ALSTOM Transport Systems Malaysia",
      time: "Sept 2025 — Jan 2026 · 16 weeks",
      points: [
        "Supported project management for rail systems — coordinating timelines and deliverables across engineering teams.",
        "Assisted in train troubleshooting, applying systematic fault-diagnosis methods to identify and document technical issues.",
      ],
    },
    {
      role: "Robotics Engineer (Part-time)",
      org: "Pekat Group Berhad",
      time: "2024 — 2026",
      points: [
        "Co-developing an autonomous solar panel cleaning robot — mechanical design, control logic, and safety architecture.",
        "Solved practical challenges: fall-prevention mechanisms and battery optimization relative to payload weight.",
      ],
    },
    {
      role: "Virtual Internships",
      org: "Accenture · Visa · Cisco",
      time: "Structured programs",
      points: ["Technology consulting, financial technology, and networking — corporate problem-solving frameworks."],
    },
  ];
  return (
    <div>
      <SectionTitle icon={Briefcase} kicker="Experience" title="Where I've built things." />
      <RevealList className="space-y-6 relative">
        <div className="absolute left-[100px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent hidden md:block" />
        {items.map((it) => (
          <motion.div
            key={it.role}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className={`grid md:grid-cols-[200px_1fr] gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur border transition-colors relative ${it.org.includes("ALSTOM") ? "border-gold/60 shadow-[0_0_40px_-12px_oklch(0.84_0.16_80/0.25)]" : "border-border/40 hover:border-gold/40"}`}
          >
            <div className="text-sm text-muted-foreground relative">
              {it.time}
              <span className={`hidden md:block absolute -right-[6px] top-1.5 w-3 h-3 rounded-full shadow-[var(--shadow-gold)] ${it.org.includes("ALSTOM") ? "bg-gold animate-pulse-ring" : "bg-gold"}`} />
            </div>
            <div>
              <h3 className="font-display text-2xl">{it.role}</h3>
              <p className={`text-sm font-medium mb-3 ${it.org.includes("ALSTOM") ? "text-gradient-gold" : "text-muted-foreground"}`}>{it.org}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {it.points.map((p, i) => (
                  <li key={i} className="flex gap-2"><span className="text-gold mt-1.5">▸</span>{p}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </RevealList>
    </div>
  );
}


function Projects() {
  const projects = [
    { t: "LiDAR TurtleBot Navigation", d: "Autonomous warehouse navigation using LiDAR-based SLAM and real-time obstacle avoidance in ROS." },
    { t: "Driver Fatigue Detection", d: "AI-powered drowsiness detection with Python/OpenCV for real-time driver monitoring." },
    { t: "Rehabilitation Glove", d: "Low-cost assistive glove for stroke, TBI & Parkinson's patients — flex sensors + servo actuation." },
    { t: "ABB Robot Arm Simulation", d: "Pick-and-place operations in RobotStudio with path optimization and collision detection." },
    { t: "Thermocol Cutting System", d: "Pneumatic automated cutter via Automation Studio with PLC sequencing for cut precision." },
    { t: "Line-Following Boe-Bot", d: "Arduino autonomous robot integrating ultrasonic + IR sensors for navigation decisions." },
    { t: "PLC Solenoid Gripper Turntable", d: "Automated gripper control with Cx-Programmer synchronized via Automation Studio." },
    { t: "Can-Crushing Mechanism", d: "SolidWorks model with FEA stress analysis and design iteration." },
  ];
  return (
    <div>
      <SectionTitle icon={Cpu} kicker="Projects" title="Robotics, AI, and the floor between." />
      <RevealList className="grid md:grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.t} p={p} i={i} />
        ))}
      </RevealList>
    </div>
  );
}

function ProjectCard({ p, i }: { p: { t: string; d: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      whileHover={{ y: -8 }}
      onMouseMove={onMove}
      className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/40 hover:border-gold/60 transition-colors overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.84 0.16 80 / 0.18), transparent 50%)",
        }}
      />
      <div className="absolute top-4 right-4 text-xs font-display text-gold/40 tabular-nums">{String(i + 1).padStart(2, "0")}</div>
      <div className="flex items-start justify-between gap-3 mb-2 relative">
        <h3 className="font-display text-2xl">{p.t}</h3>
        <ArrowUpRight className="w-4 h-4 text-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed relative">{p.d}</p>
    </motion.div>
  );
}

function Skills() {
  const groups = [
    { t: "Robotics & Automation", s: ["Arduino", "ABB RobotStudio", "Cx-One PLC", "Cx-Programmer", "Automation Studio"] },
    { t: "Software & Programming", s: ["Python", "C", "MATLAB", "LabVIEW", "SolidWorks", "TinkerCAD"] },
    { t: "AI & Computer Vision", s: ["OpenCV", "Real-time image processing", "Sensor fusion"] },
    { t: "Electronics & Hardware", s: ["PCB design", "Microcontrollers", "Pneumatic systems", "Solenoid actuation"] },
    { t: "Methodologies", s: ["Lean Six Sigma (Green Belt)", "Project planning", "Technical documentation"] },
    { t: "Languages", s: ["English (Fluent)", "Telugu (Native)", "Malay", "Hindi", "Tamil"] },
  ];
  return (
    <div>
      <SectionTitle icon={Cpu} kicker="Skills" title="A toolkit, sharpened." />
      <RevealList className="grid md:grid-cols-2 gap-4">
        {groups.map((g) => (
          <motion.div
            key={g.t}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/40 hover:border-gold/40 transition-colors"
          >
            <h3 className="font-display text-xl mb-4 text-gradient-gold">{g.t}</h3>
            <div className="flex flex-wrap gap-2">
              {g.s.map((s) => (
                <motion.span
                  key={s}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="text-xs px-3 py-1.5 rounded-full bg-background/60 border border-border/60 hover:border-gold/50 hover:text-gold transition-colors cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </RevealList>
    </div>
  );
}

function Leadership() {
  const items = [
    { t: "President · IEM APU Chapter", time: "2024/25 & 2025/26", d: "Led 600+ member society. Spearheaded Engineering Day Malaysia, factory visits (Yakult, Beryl's), inter-university Bridge Building competition, and career sessions with Experian." },
    { t: "Secretary · IEM APU Chapter", time: "2023/24", d: "Coordinated committee operations, meeting documentation, and event logistics." },
    { t: "Industrial Visit · Drone Academy Malaysia", time: "Organized", d: "Exposed members to UAV manufacturing and operations." },
    { t: "Student Ambassador & Prefect", time: "2019/20", d: "Represented institution at outreach events; maintained campus discipline." },
  ];
  return (
    <div>
      <SectionTitle icon={Languages} kicker="Leadership" title="Twice elected, repeatedly trusted." />
      <RevealList className="space-y-4">
        {items.map((it) => (
          <motion.div
            key={it.t}
            variants={fadeUp}
            whileHover={{ y: -3, borderColor: "oklch(0.84 0.16 80 / 0.5)" }}
            className="p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/40 transition-colors"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="font-display text-2xl">{it.t}</h3>
              <span className="text-xs text-gradient-gold font-semibold uppercase tracking-widest">{it.time}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.d}</p>
          </motion.div>
        ))}
      </RevealList>
    </div>
  );
}

function Awards() {
  const list = [
    "Top 20 Finalist — AWS CendekiAwan 2026",
    "Top 10 Finalist — IEM Marvex 2025",
    "Finalist — D3CODE 2025 Malaysia Edition",
    "Monash DATATHON L'Oréal 2025",
    "Amazon Problem Statement Idea Generation",
    "Vice Chancellor's List — Academic Excellence (2025)",
    "Second Place — Roboroaz Smorphi Robotics Competition (2025)",
    "High Achiever Award — Foundation Sem 3 (2022)",
    "High Achiever Award — Foundation Sem 2 (2021)",
    "First Place — English Week Public Speaking (2014)",
    "Storytelling World Cup Finalist (2017–2018)",
    "Notepad Design Competition — First Place (2018)",
    "Junior Scientist Award (2017)",
  ];

  const certGroups = [
    { t: "Alstom — Compliance & Safety", s: ["HR Induction & Onboarding", "Ethics & Compliance Alert Procedure", "Railway Safety Induction", "E-Ethics & Conflict of Interest", "Information Security Awareness", "USB & Cybersecurity Awareness", "Dawn Raids Training"] },
    { t: "Alstom — Infrastructure & Trackwork", s: ["Infrastructure & Trackwork Training", "D&IS Anti-Vibration Track Solution (HAS)", "Trackworks & Depot Equipment", "D&IS Installation & Field Operations", "Optical Fibre Awareness", "Mainline Track Products"] },
    { t: "Alstom — Signalling & Systems", s: ["Signalling & Systems Awareness", "ATC Overview", "HealthHub Signalling E-Learning", "TCMS Embedded Software", "RSM Basics", "Automation & Robotics (ARGR)"] },
    { t: "Alstom — Fleet Maintenance & Quality", s: ["AFMS · F1 Fleet Maintenance", "AFMS · F1 Maintenance Supervision", "Development for Quality (DFQ)", "Navigating RSO Management"] },
    { t: "Leadership & Professional", s: ["Corporate Entrepreneurship", "Leadership & Organisational Behaviour", "Developing a Positive Outlook", "Avoiding Common Leadership Pitfalls"] },
    { t: "Technical", s: ["Python Programming", "Lean Six Sigma Green Belt (2025)", "MATLAB Onramp — MathWorks (2024)", "Start-Up Valuation (2023)"] },
    { t: "AWS — Fundamentals of ML & AI", s: ["AI Use Cases & Applications", "Responsible AI Practices", "Developing ML Solutions", "Developing Generative AI Solutions", "Optimizing Foundation Models", "AI Security & Governance", "Prompt Engineering"] },
    { t: "Memberships", s: ["IEM Student Member (121771)", "IMechE Affiliate Student (80768567)"] },
  ];

  return (
    <div>
      <SectionTitle icon={Trophy} kicker="Recognition" title="Awards & certifications." />
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
        <div>
          <h3 className="font-display text-2xl text-gradient-gold mb-4">Awards</h3>
          <RevealList className="space-y-3">
            {list.map((a) => (
              <motion.li
                key={a}
                variants={fadeUp}
                whileHover={{ x: 4 }}
                className="flex gap-3 text-sm text-muted-foreground list-none"
              >
                <Trophy className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {a}
              </motion.li>
            ))}
          </RevealList>
        </div>
        <div>
          <h3 className="font-display text-2xl text-gradient-gold mb-4">Certifications</h3>
          <RevealList className="space-y-4">
            {certGroups.map((g) => (
              <motion.div
                key={g.t}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl bg-card/50 backdrop-blur border border-border/40 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-gold" />
                  <h4 className="font-display text-lg">{g.t}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.s.map((c) => (
                    <span
                      key={c}
                      className="text-xs px-3 py-1.5 rounded-full bg-background/60 border border-border/60"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </RevealList>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <SectionTitle icon={Mail} kicker="Contact" title="Let's build something." />
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        Seeking a graduate engineering role where technical depth and leadership experience can drive
        immediate value. <ShimmerText>I'd love to hear from you.</ShimmerText>
      </p>
      <RevealList className="grid md:grid-cols-2 gap-4">
        <ContactCard icon={Linkedin} label="LinkedIn" value="pediredla-jushita" href={LINKEDIN} external />
        <ContactCard icon={Phone} label="WhatsApp" value="+60 17-303 1653" href={`https://wa.me/${WHATSAPP}`} external />
        <ContactCard icon={Mail} label="Email (opens Gmail)" value={EMAIL} href={GMAIL_COMPOSE} external />
        <ContactCard icon={MapPin} label="Based in" value="Sentral Suites, KL Sentral, Kuala Lumpur" />
      </RevealList>
    </div>
  );
}

function ContactCard({
  icon: Icon, label, value, href, external,
}: { icon: any; label: string; value: string; href?: string; external?: boolean }) {
  const inner = (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, borderColor: "oklch(0.84 0.16 80 / 0.6)" }}
      className="flex items-center gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur border border-border/40 transition-colors group"
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-[var(--shadow-gold)]" style={{ background: "var(--gradient-gold)" }}>
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="font-medium truncate">{value}</p>
      </div>
      {href && <ArrowUpRight className="w-4 h-4 text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
    </motion.div>
  );
  if (!href) return inner;
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {inner}
    </a>
  );
}
