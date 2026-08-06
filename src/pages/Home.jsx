import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaBookOpen,
  FaBriefcase,
  FaTerminal,
} from "react-icons/fa";
import { useEffect, useState, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import TerminalWidget from "../components/TerminalWidget";
import LocalTime from "../components/LocalTime";
import GithubActivity from "../components/GithubActivity";

// Lazy — these pull in the heavy tech-stack-icons bundle
const TechMarquee = lazy(() => import("../components/TechMarquee"));
const TechStackShowcase = lazy(() => import("./TechStackDisplay"));

// ── Typewriter tagline ──────────────────────────────────────
const ROLES = [
  "full-stack web",
  "AI/ML engineer",
  "DevOps automation",
  "research + publications",
  "shipping to real users",
];

const Typewriter = () => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pausing | erasing

  useEffect(() => {
    const target = ROLES[idx];
    let t;
    if (phase === "typing") {
      if (text.length < target.length) {
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), 60);
      } else {
        t = setTimeout(() => setPhase("pausing"), 1400);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("erasing"), 800);
    } else if (phase === "erasing") {
      if (text.length > 0) {
        t = setTimeout(() => setText(target.slice(0, text.length - 1)), 30);
      } else {
        setIdx((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx]);

  return (
    <span className="text-amber-300">
      {text}
      <span className="inline-block w-[2px] h-5 md:h-6 align-middle ml-1 bg-amber-400 animate-pulse" />
    </span>
  );
};

// ── Bento tile wrapper ──────────────────────────────────────
const Tile = ({ className = "", children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, delay }}
    className={
      "relative p-5 md:p-6 rounded-lg border border-amber-900/50 bg-black/60 backdrop-blur-md hover:border-amber-500/50 transition-colors " +
      className
    }
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500 opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500 opacity-10 blur-3xl pointer-events-none"></div>

      {/* HERO */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 md:px-8 text-center pt-16 pb-8">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textShadow:
              "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)",
          }}
        >
          Hey, I&apos;m Varshini
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl min-h-[1.75rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Software engineer — <Typewriter />
        </motion.p>

        <motion.p
          className="mt-6 text-base md:text-lg text-gray-300 max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          I ship production Rails 8 and Next.js 16 systems for real businesses —
          Stripe payment engines, ERP and CRM dashboards, marketing sites on
          Cloudflare Pages, and Python email and dispatch pipelines — while
          building LLM tools and machine-learning models on the side. My
          research at UMN Duluth explores digital and robotic interventions for
          mental health, with two peer-reviewed papers published in HEALTHINF
          2026 and ICICT 2025.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-black bg-amber-400 hover:bg-amber-300 transition-all duration-300"
            style={{ boxShadow: "0 0 20px rgba(255, 153, 102, 0.35)" }}
          >
            View Projects <FaArrowRight className="text-sm" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-amber-400 border border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
          >
            About Me
          </Link>
          <a
            href="/Varshini_Bhavanam_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-gray-300 border border-gray-600 hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300"
          >
            <FaDownload className="text-sm" /> Resume
          </a>
        </motion.div>

        <motion.div
          className="mt-6 flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://github.com/varsha698"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-amber-400 text-2xl transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/varshinikb/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-amber-400 text-2xl transition"
          >
            <FaLinkedin />
          </a>
        </motion.div>

        {/* ⌘K hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-xs text-gray-500 font-mono"
        >
          press{" "}
          <kbd className="border border-gray-700 rounded px-1.5 py-0.5 mx-1">
            ⌘K
          </kbd>{" "}
          /{" "}
          <kbd className="border border-gray-700 rounded px-1.5 py-0.5 mx-1">
            ctrl K
          </kbd>{" "}
          to search
        </motion.div>
      </div>

      {/* TECH MARQUEE */}
      <div className="relative z-10 mb-16">
        <Suspense fallback={<div className="h-16" />}>
          <TechMarquee />
        </Suspense>
      </div>

      {/* BENTO GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Terminal — big */}
          <Tile className="md:col-span-4">
            <TerminalWidget />
          </Tile>

          {/* Local time */}
          <Tile className="md:col-span-2" delay={0.05}>
            <LocalTime />
          </Tile>

          {/* Stats — publications */}
          <Tile className="md:col-span-2" delay={0.1}>
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-amber-400/80 text-xs uppercase tracking-wider mb-2">
                <FaBookOpen /> Publications
              </div>
              <div className="font-mono text-4xl font-bold text-amber-300">2</div>
              <p className="text-sm text-gray-400 mt-1">
                HEALTHINF 2026 · ICICT 2025
              </p>
              <Link
                to="/publications"
                className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-mono transition"
              >
                read papers →
              </Link>
            </div>
          </Tile>

          {/* Stats — projects */}
          <Tile className="md:col-span-2" delay={0.15}>
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-amber-400/80 text-xs uppercase tracking-wider mb-2">
                <FaBriefcase /> Projects shipped
              </div>
              <div className="font-mono text-4xl font-bold text-amber-300">
                32<span className="text-2xl">+</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                professional + personal
              </p>
              <Link
                to="/projects"
                className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-mono transition"
              >
                see all →
              </Link>
            </div>
          </Tile>

          {/* Currently building */}
          <Tile className="md:col-span-2" delay={0.2}>
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-amber-400/80 text-xs uppercase tracking-wider mb-2">
                <FaTerminal /> Currently
              </div>
              <ul className="text-sm text-gray-300 space-y-1.5">
                <li className="flex gap-2">
                  <span className="text-amber-400">›</span>
                  Shipping Rails 8 &amp; Next 16 for Xecutive Development
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400">›</span>
                  Prototyping a local-LLM writing studio
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400">›</span>
                  Finishing my CS degree at UMN Duluth
                </li>
              </ul>
            </div>
          </Tile>

          {/* GitHub activity — wide */}
          <Tile className="md:col-span-6" delay={0.25}>
            <GithubActivity />
          </Tile>
        </div>
      </div>

      {/* Full tech-stack breakdown */}
      <div className="relative z-10 w-full pb-16">
        <Suspense
          fallback={
            <div className="text-center py-16 text-amber-400/70 font-mono text-sm">
              loading tech stack…
            </div>
          }
        >
          <TechStackShowcase />
        </Suspense>
      </div>
    </section>
  );
};

Tile.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  delay: PropTypes.number,
};

export default Home;
