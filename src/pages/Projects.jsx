import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaLock } from "react-icons/fa";
import ProjectModal from "./ProjectModal";
import { TechIcon } from "../components/techIcons";

const XD = "Xecutive Development LLC";

const professional = [
  // ── Lead / CRM / ERP ──────────────────────────────
  {
    name: "Andrew's Lawn & Snow — ERP / Sales Portal",
    org: XD,
    desc: "Rails 8 ERP and sales portal powering a multi-state lawn-care and snow-removal operation.",
    features: [
      "PostgreSQL primary storage with Mongoid for document-shaped records",
      "Stripe billing integrated with the CRM for invoices and one-off charges",
      "Avalara tax calculation across state boundaries",
      "DocuSign contract flow with status webhooks",
      "Airtable and Microsoft Graph pipelines feeding CRM and outbound email",
    ],
    private: true,
    techstackused: "Ruby on Rails 8, PostgreSQL, Mongoid, Stripe, Avalara, DocuSign, Airtable, Microsoft Graph",
    techstackicons: ["rails", "postgresql"],
  },
  {
    name: "Andrew's Lawn & Snow — Lead CRM",
    org: XD,
    desc: "Rails 8 Kanban lead CRM with a public leads API and Odoo importer.",
    features: [
      "Public POST /api/leads endpoint accepting form submissions from marketing sites",
      "Kanban board for pipeline stages with drag-to-move status changes",
      "CSV importer for legacy Odoo lead exports",
      "Assignment, notes, and per-lead activity timeline",
    ],
    private: true,
    techstackused: "Ruby on Rails 8, PostgreSQL, Hotwire, Sidekiq",
    techstackicons: ["rails", "postgresql"],
  },

  // ── Customer-facing web ───────────────────────────
  {
    name: "Andrew's Lawn & Snow — Marketing Website",
    org: XD,
    desc: "Live Next.js 16 marketing site on Cloudflare Pages with full-funnel attribution.",
    features: [
      "Server Actions post form submissions directly into the CRM",
      "Sentry error monitoring wired to release tags",
      "GA4 and Meta Conversions API for full-funnel attribution",
      "Deployed on Cloudflare Pages with edge caching",
    ],
    private: true,
    techstackused: "Next.js 16, React 19, TypeScript, Tailwind, Cloudflare Pages, Sentry",
    techstackicons: ["nextjs", "typescript", "tailwind"],
  },
  {
    name: "Lawn Care & Snow Services — Alternate Brand Site",
    org: XD,
    desc: "Static Astro 5 site for an alternate brand, kept isolated for compliance.",
    features: [
      "Static-first Astro build for maximum speed and minimal JS",
      "Kept in a separate repo to isolate compliance and content ownership",
      "Deployed on Cloudflare Pages",
    ],
    private: true,
    techstackused: "Astro 5, TypeScript, Tailwind, Cloudflare Pages",
    techstackicons: ["typescript", "tailwind"],
  },
  {
    name: "ALS Hub — Internal App Launcher",
    org: XD,
    desc: "NextAuth-gated internal portal that indexes and launches every app in the ecosystem.",
    features: [
      "Single sign-on via NextAuth against the org identity provider",
      "Directory of every internal tool with role-scoped visibility",
      "Central place for on-call links, runbooks, and quick actions",
    ],
    private: true,
    techstackused: "Next.js, NextAuth, TypeScript, Tailwind",
    techstackicons: ["nextjs", "typescript", "tailwind"],
  },

  // ── Snow dispatch & mailers ──────────────────────
  {
    name: "Snow-Lawn Mailer",
    org: XD,
    desc: "Rails 8 + Hotwire outbound mailer that fans out to 10k+ recipients via Sidekiq.",
    features: [
      "OptimoRoute + Airtable customer joins to segment audiences",
      "Microsoft Graph as the transport for authenticated sending",
      "Sidekiq fan-out with retry, dead-letter, and per-campaign metrics",
      "Hotwire admin UI for live send progress",
    ],
    private: true,
    techstackused: "Ruby on Rails 8, Hotwire, Sidekiq, Airtable, OptimoRoute, Microsoft Graph",
    techstackicons: ["rails"],
  },
  {
    name: "Snow Dispatch Pipeline",
    org: XD,
    desc: "Python inbound triage: email + Vonage voicemail → GPT-4o-mini / Whisper → dispatch CSV.",
    features: [
      "Ingests inbound customer email and Vonage voicemail",
      "Whisper for voicemail transcription; GPT-4o-mini for structured extraction",
      "Emits a normalized cleanup-dispatch CSV for the ops team",
      "Runs on a scheduled worker with idempotent processing",
    ],
    private: true,
    techstackused: "Python, OpenAI (Whisper + GPT-4o-mini), Vonage API, Microsoft Graph",
    techstackicons: ["python"],
  },

  // ── Payroll ──────────────────────────────────────
  {
    name: "Consolidated Payroll (Andrews Payroll Hub)",
    org: XD,
    desc: "Flask app unifying snow, lawn, and spring-cleanup payroll across states.",
    features: [
      "Single UI for what used to be three separate script-based pipelines",
      "State-aware payroll rules (tax, overtime, differentials)",
      "SQLite backend with export to accounting",
      "Supersedes the older Payroll-Scripts codebase",
    ],
    private: true,
    techstackused: "Python, Flask, SQLite, Jinja",
    techstackicons: ["flask", "python"],
  },
  {
    name: "Payroll Scripts",
    org: XD,
    desc: "JavaScript cleanup-payroll calculator with a thin Python + SQLite backend.",
    features: [
      "Client-side JS calculator for spring-cleanup labor payouts",
      "Python + SQLite persistence for audit history",
      "Now superseded by Consolidated Payroll",
    ],
    private: true,
    techstackused: "JavaScript, Python, SQLite",
    techstackicons: ["python"],
  },

  // ── Payments & billing ───────────────────────────
  {
    name: "Automated Payments Engine",
    org: XD,
    desc: "Rails 8 annual-renewal Stripe charging engine with real-time SSE progress UI.",
    features: [
      "Off-session PaymentIntents for saved cards",
      "Server-Sent Events admin dashboard streaming per-customer charge outcomes",
      "Microsoft Graph email notifications on every success and failure",
      "Sidekiq batch processing with retry and idempotency keys",
    ],
    private: true,
    techstackused: "Ruby on Rails 8, Stripe, Server-Sent Events, Microsoft Graph, Sidekiq",
    techstackicons: ["rails"],
  },
  {
    name: "AirBridge Payment Renewal Sync",
    org: XD,
    desc: "Python tool syncing Stripe charge results back into the Airtable CRM.",
    features: [
      "Reads Stripe events / charge results for renewals",
      "Writes back matched records into Airtable with normalized statuses",
      "Handles reconciliation edge cases (partial matches, missing customers)",
    ],
    private: true,
    techstackused: "Python, Stripe API, Airtable API",
    techstackicons: ["python"],
  },
  {
    name: "Customer Billing Merge",
    org: XD,
    desc: "Python email-join utility enriching billing CSVs with Stripe customer IDs.",
    features: [
      "Joins external billing CSVs against the Stripe customer directory",
      "Fuzzy-matches by normalized email to catch address-style variants",
      "Outputs a merged CSV ready for downstream billing tools",
    ],
    private: true,
    techstackused: "Python, pandas, Stripe API",
    techstackicons: ["python"],
  },
  {
    name: "Stripe Customer / PaymentMethod Extractor",
    org: XD,
    desc: "Rails Stripe enricher backfilling PaymentMethod IDs onto customers.",
    features: [
      "Iterates Stripe Customer.search and pairs each with PaymentMethod.list",
      "Sidekiq workers for parallel API scan with rate-limit awareness",
      "Kamal + Docker deployment recipe for one-command redeploys",
    ],
    private: true,
    techstackused: "Ruby on Rails, Stripe API, Sidekiq, Kamal, Docker",
    techstackicons: ["rails", "docker"],
  },

  // ── Airtable & email services ────────────────────
  {
    name: "Airtable Sync App",
    org: XD,
    desc: "Ruby bearer-token API syncing Airtable to PostgreSQL nightly. Org-wide auth standard.",
    features: [
      "Bearer-token API using the org-wide INTER_APP_SECRET auth pattern",
      "Nightly full-sync into PostgreSQL for reporting and joins",
      "Endpoint surface for other internal services to pull cached snapshots",
    ],
    private: true,
    techstackused: "Ruby, Airtable API, PostgreSQL",
    techstackicons: ["rails", "postgresql"],
  },
  {
    name: "Automated Emails",
    org: XD,
    desc: "Python bulk-email campaign runner. Predecessor to the reusable Python Email Service.",
    features: [
      "Templated bulk send with CSV recipient lists",
      "Batching with rate limits and per-recipient logging",
      "Superseded by Python_Email_Service as a reusable library",
    ],
    private: true,
    techstackused: "Python, SMTP, Microsoft Graph",
    techstackicons: ["python"],
  },
  {
    name: "Python Email Service",
    org: XD,
    desc: "Reusable Microsoft Graph email transport library used across the org.",
    features: [
      "OAuth2 client credential flow against Microsoft Graph",
      "Exponential-backoff retry, envelope + payload abstraction",
      "Drop-in dependency for any Python service that needs to send mail",
    ],
    private: true,
    techstackused: "Python, Microsoft Graph, OAuth2",
    techstackicons: ["python"],
  },

  // ── Odoo ERP ─────────────────────────────────────
  {
    name: "Xecutive Development Odoo Addons",
    org: XD,
    desc: "Custom Python Odoo addons extending partner / customer models and seasonal service config.",
    features: [
      "Partner and customer model extensions with org-specific fields",
      "Seasonal service configuration models tied to sales workflows",
      "Deployed alongside the corporate Odoo instance",
    ],
    private: true,
    techstackused: "Python, Odoo, PostgreSQL, XML views",
    techstackicons: ["python", "postgresql"],
  },
  {
    name: "Odoo Data Migration",
    org: XD,
    desc: "Jupyter ETL pipeline migrating Airtable and legacy CRM data into Odoo via XML-RPC.",
    features: [
      "Extract from Airtable and legacy CRM sources into normalized frames",
      "Load into Odoo via authenticated XML-RPC with per-model mapping",
      "Reproducible run book kept in notebook cells",
    ],
    private: true,
    techstackused: "Python, Jupyter, Odoo XML-RPC, Airtable API, pandas",
    techstackicons: ["python"],
  },

  // ── Inventory ────────────────────────────────────
  {
    name: "Inventory Tracking System",
    org: XD,
    desc: "TypeScript inventory tracker consumed by Operator Portal's mock/live adapter.",
    features: [
      "REST API for inventory counts, transfers, and adjustments",
      "Successor to the earlier Inventory-Tracking prototype",
      "Deployed at inventory.andrewslawnandsnow.org",
    ],
    private: true,
    techstackused: "TypeScript, Node.js, PostgreSQL",
    techstackicons: ["typescript", "postgresql"],
  },

  // ── Operator portal & corporate site ─────────────
  {
    name: "Operator Portal",
    org: XD,
    desc: "Rails operations portal with 3-role RBAC and mock-vs-live adapters for offline work.",
    features: [
      "3-role RBAC: admin, operations, operator, each with a distinct nav",
      "OptimoRoute, Airtable, payroll, and inventory integrations",
      "Mock-vs-live adapter layer lets contract dev happen offline",
    ],
    private: true,
    techstackused: "Ruby on Rails, PostgreSQL, OptimoRoute, Airtable, Sidekiq",
    techstackicons: ["rails", "postgresql"],
  },
  {
    name: "Xecutive Development Corporate Website",
    org: XD,
    desc: "TypeScript corporate marketing site on Next.js + Tailwind, hosted on Cloudflare Pages.",
    features: [
      "Next.js App Router with strict TypeScript",
      "Tailwind design system and reusable content sections",
      "Cloudflare Pages deploy",
    ],
    private: true,
    techstackused: "Next.js, TypeScript, Tailwind, Cloudflare Pages",
    techstackicons: ["nextjs", "typescript", "tailwind"],
  },
];

const personal = [
  {
    name: "AI Model Stock Analysis",
    desc: "ML ensemble (XGBoost + LSTM) trading-signal and portfolio-risk platform.",
    features: [
      "XGBoost + LSTM ensemble producing directional signals and risk scores",
      "FastAPI backend serving predictions, Next.js 14 frontend for dashboards",
      "SQLite persistence for backtests and prediction history",
      "Dockerized and deployed on Fly.io",
    ],
    link: "https://github.com/varsha698/AI-Model-Stock-Analysis",
    code: "https://github.com/varsha698/AI-Model-Stock-Analysis",
    techstackused: "Python, FastAPI, Next.js, XGBoost, LSTM, SQLite, Docker, Fly.io",
    techstackicons: ["python", "nextjs", "docker"],
  },
  {
    name: "ai-doc-editor",
    desc: "Local-LLM writing studio with async FastAPI, RAG on ChromaDB, and a LoRA fine-tuning harness.",
    features: [
      "Runs local LLaMA3 / Mistral models — no external inference calls",
      "Retrieval-augmented generation over a ChromaDB vector store",
      "LoRA fine-tuning harness for style-specific adapters",
      "Next.js 15 + Tiptap frontend with pgvector for embeddings storage",
    ],
    link: "https://github.com/varsha698/ai-doc-editor",
    code: "https://github.com/varsha698/ai-doc-editor",
    techstackused: "Next.js, FastAPI, ChromaDB, PyTorch, pgvector, Tiptap",
    techstackicons: ["nextjs", "python", "pytorch"],
  },
  {
    name: "AI Quiz Generator Website",
    desc: "AI Quiz Generator with Angular frontend and C# Web API backend, powered by Groq.",
    features: [
      "Angular frontend with responsive UI",
      "C# ASP.NET Core Web API with Swagger-documented REST endpoints",
      "Groq API for fast NLP-based question generation",
      "Docker containerization and GitHub Actions CI/CD",
    ],
    techstackused: "Angular, C#, ASP.NET Core, Docker, GitHub Actions, Swagger, Groq API",
    techstackicons: ["angular", "docker", "github"],
  },
  {
    name: "Cloud Infrastructure Automation (DevOps Project)",
    desc: "Terraform + Ansible + Docker + GitHub Actions reference project on AWS.",
    features: [
      "Terraform provisions AWS EC2 with SSH key access",
      "Ansible bootstraps the host and installs the Flask app",
      "GitHub Actions pipeline lints, tests, and pushes Dockerized apps on commit",
      "Fully teardown-and-recreate via `terraform destroy` / `apply`",
    ],
    link: "https://github.com/varsha698/DevOps_Project",
    code: "https://github.com/varsha698/DevOps_Project",
    techstackused: "Terraform, Ansible, Flask, Docker, GitHub Actions, AWS EC2",
    techstackicons: ["terraform", "ansible", "flask", "docker", "github", "aws"],
  },
  {
    name: "PantryPal — Mobile App",
    desc: "Flutter + Firebase food-security app: pantry tracker, recipe matching, community feed.",
    features: [
      "Pantry tracker with expiration dates and low-stock alerts",
      "Smart recipe matching from currently-available ingredients",
      "Tags and filters for dietary needs, time, and budget",
      "Community chat, comments, and a local food-resource directory",
      "CI/CD via GitHub Actions",
    ],
    link: "https://github.com/varsha698/PantryPalApp",
    code: "https://github.com/varsha698/PantryPalApp",
    techstackused: "Flutter, Firebase (Auth, Firestore, Storage), Dart, GitHub Actions",
    techstackicons: ["flutter", "firebase", "github"],
  },
  {
    name: "Winter Weather Lab",
    desc: "NOAA / NWS Streamlit app with a RandomForest winter-storm severity predictor.",
    features: [
      "Pulls live NOAA / NWS feeds into a Streamlit dashboard",
      "Trains a RandomForest classifier on historical storm severity",
      "Surfaces per-region storm-risk scores with feature-importance context",
    ],
    link: "https://github.com/varsha698/-Winter-Weather-Lab",
    code: "https://github.com/varsha698/-Winter-Weather-Lab",
    techstackused: "Python, Streamlit, scikit-learn, pandas",
    techstackicons: ["python"],
  },
  {
    name: "Sentiment Analysis Model",
    desc: "IMDB review sentiment classifier built with PyTorch and a feedforward neural network.",
    features: [
      "PyTorch MLP over TF-IDF-vectorized text",
      "Cross-entropy loss with Adam optimizer",
      "Trained on the IMDB movie-reviews dataset",
      "Classifies reviews as positive or negative with accuracy metrics",
    ],
    link: "https://github.com/varsha698/nlp_project2025",
    code: "https://github.com/varsha698/nlp_project2025",
    techstackused: "Python, PyTorch, MLP, TF-IDF",
    techstackicons: ["python", "pytorch"],
  },
  {
    name: "Sales Analytics Project",
    desc: "pandas / numpy sales-KPI pipeline exporting cleaned CSVs for Tableau dashboards.",
    features: [
      "Cleans raw sales exports into normalized KPI tables",
      "Emits per-region and per-product cuts as Tableau-ready CSVs",
      "Business-analyst portfolio piece paired with the Microsoft BA cert",
    ],
    link: "https://github.com/varsha698/Sales-Analytics-Project",
    code: "https://github.com/varsha698/Sales-Analytics-Project",
    techstackused: "Python, pandas, numpy, Tableau",
    techstackicons: ["python"],
  },
  {
    name: "Personal Admin Assistant (iOS)",
    desc: "Native SwiftUI + SwiftData + CloudKit iOS life-admin app.",
    features: [
      "Models: Tasks, Commitments, DailyBrief, ActionReceipt — all SwiftData",
      "CloudKit sync so state moves across the user's devices",
      "EventKit calendar sync and local notifications",
      "Daily-brief screen surfaces what needs attention today",
    ],
    techstackused: "Swift, SwiftUI, SwiftData, CloudKit, EventKit",
    techstackicons: [],
  },
  {
    name: "dev-journal",
    desc: "Meta-tool that turns cross-repo engineering activity into a self-redeploying timeline.",
    features: [
      "stdlib-only Python collector — no external dependencies",
      "Produces journal.json from git and GitHub activity",
      "Publishes to a GitHub Pages timeline that redeploys itself on push",
    ],
    link: "https://github.com/varsha698/dev-journal",
    code: "https://github.com/varsha698/dev-journal",
    techstackused: "Python, GitHub Actions, GitHub Pages",
    techstackicons: ["python", "github"],
  },
  {
    name: "Personal Portfolio Website",
    desc: "This site — React 19 + Vite 6 + Tailwind + Framer Motion.",
    features: [
      "Hash routing for static hosting compatibility",
      "Animated project modals with per-project feature detail",
      "Route-level code-splitting; heavy tech-icon bundle lazy-loaded",
      "Optimized WebP profile image with JPG fallback",
      "Deployed on Cloudflare Pages",
    ],
    link: "https://varshinibhavanam.com",
    code: "https://github.com/varsha698/portfolio-website",
    techstackused: "React 19, Vite 6, Tailwind CSS, Framer Motion, Cloudflare Pages",
    techstackicons: ["react", "tailwind", "vite", "github"],
  },
];

const shineKeyframes = `
  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProjectCard = ({ project, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
    viewport={{ once: true, amount: 0.1 }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="relative cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
  >
    <div className="relative p-6 backdrop-blur-md rounded-lg border overflow-hidden h-full transition-colors duration-300 bg-black/60 border-amber-900/50 group-hover:border-amber-500/50 flex flex-col">
      {project.screenshot && (
        <div className="mb-4 rounded-md overflow-hidden border border-amber-900/40">
          <img
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            className="w-full h-40 object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.parentElement.style.display = "none";
            }}
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-xl font-semibold text-amber-400">{project.name}</h3>
        {project.private && (
          <span
            className="flex-shrink-0 mt-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-amber-300/70 border border-amber-700/50 rounded px-2 py-0.5"
            title="Private repository"
          >
            <FaLock className="text-[9px]" /> private
          </span>
        )}
      </div>
      {project.org && (
        <p className="text-xs text-amber-300/70 italic mb-2">{project.org}</p>
      )}
      <p className="mb-4 text-gray-300 flex-grow">{project.desc}</p>
      <div className="flex flex-wrap gap-3 mt-auto">
        {project.techstackicons.map((tech, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.3 }}
            className="text-2xl text-amber-500"
          >
            <TechIcon name={tech} className="w-6 h-6" />
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const SectionHeader = ({ label, sub }) => (
  <div className="w-full max-w-7xl mx-auto mb-8">
    <motion.h2
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-2xl md:text-3xl font-bold text-amber-400"
      style={{ textShadow: "0 0 10px rgba(255, 153, 102, 0.4)" }}
    >
      {label}
    </motion.h2>
    {sub && <p className="text-sm text-gray-400 mt-1">{sub}</p>}
    <div className="mt-3 h-px w-full bg-gradient-to-r from-amber-400/60 via-amber-400/20 to-transparent" />
  </div>
);

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    org: PropTypes.string,
    desc: PropTypes.string.isRequired,
    private: PropTypes.bool,
    screenshot: PropTypes.string,
    techstackicons: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

SectionHeader.propTypes = {
  label: PropTypes.string.isRequired,
  sub: PropTypes.string,
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center overflow-hidden relative transition-colors duration-300 bg-black"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
        padding: "6rem 2rem",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: shineKeyframes }} />

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

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textShadow:
            "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)",
          marginTop: "2rem",
        }}
      >
        Projects
      </motion.h1>
      <p className="text-center text-gray-400 mb-12 max-w-2xl relative z-10">
        Selected work — click any card for details.
      </p>

      <div className="relative z-10 w-full">
        <SectionHeader
          label="Professional"
          sub="Client and production work at Xecutive Development LLC"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto mb-16">
          {professional.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i}
              onClick={() => setSelectedProject(p)}
            />
          ))}
        </div>

        <SectionHeader
          label="Personal & Open Source"
          sub="Side projects, research code, and open-source work"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {personal.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i}
              onClick={() => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
