import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { lazy, Suspense } from "react";

// Lazy-load the heavy tech-stack-icons bundle so the hero paints fast
const TechStackShowcase = lazy(() => import("./TechStackDisplay"));

const Home = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${i * 5}%`,
              background:
                "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)",
              opacity: "0.3",
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px"
            style={{
              left: `${i * 5}%`,
              background:
                "linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)",
              opacity: "0.3",
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500 opacity-10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500 opacity-10 blur-3xl pointer-events-none"></div>

      {/* HERO — fits above the fold */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 md:px-8 text-center">
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
          className="mt-4 text-lg md:text-xl text-amber-300/90 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Software engineer — full-stack web, AI/ML, and DevOps.
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
          className="mt-8 flex items-center gap-6"
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
      </div>

      {/* Tech stack — below the fold, scroll to see */}
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

export default Home;
