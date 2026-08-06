import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaLock } from "react-icons/fa";
import ProjectModal from "./ProjectModal";
import { getTechIcon } from "./TechIcons";

const professional = [
  {
    name: "Andrew's Lawn & Snow — ERP / Sales Portal",
    org: "Xecutive Development LLC",
    desc: "Rails 8 ERP and sales portal powering a multi-state lawn-care and snow-removal operation. PostgreSQL + Mongoid hybrid storage; Stripe billing; Avalara tax; DocuSign contracts; Airtable and Microsoft Graph integrations for CRM and email pipelines.",
    link: "#",
    code: "#",
    private: true,
    techstackused:
      "Ruby on Rails 8, PostgreSQL, Mongoid, Stripe, Avalara, DocuSign, Airtable, Microsoft Graph",
    techstackicons: ["rubyonrails", "postgresql"],
  },
  {
    name: "Andrew's Lawn & Snow — Marketing Website",
    org: "Xecutive Development LLC",
    desc: "Live Next.js 16 marketing site on Cloudflare Pages. Server Actions post directly into the CRM; instrumented with Sentry, GA4, and the Meta Conversions API for full-funnel attribution.",
    link: "#",
    code: "#",
    private: true,
    techstackused: "Next.js 16, React 19, TypeScript, Tailwind, Cloudflare Pages, Sentry",
    techstackicons: ["nextjs", "typescript", "tailwindcss"],
  },
  {
    name: "Automated Payments Engine",
    org: "Xecutive Development LLC",
    desc: "Rails 8 annual-renewal Stripe charging engine using off-session PaymentIntents, a Server-Sent-Events admin UI for real-time progress, and Microsoft Graph email notifications on every charge outcome.",
    link: "#",
    code: "#",
    private: true,
    techstackused: "Ruby on Rails 8, Stripe, Server-Sent Events, Microsoft Graph, Sidekiq",
    techstackicons: ["rubyonrails"],
  },
  {
    name: "Operator Portal",
    org: "Xecutive Development LLC",
    desc: "Ruby on Rails operations portal with 3-role RBAC (admin, operations, operator) and integrated OptimoRoute, Airtable, payroll, and inventory workflows. Built with a mock-vs-live adapter layer so contract work can be developed offline.",
    link: "#",
    code: "#",
    private: true,
    techstackused: "Ruby on Rails, PostgreSQL, OptimoRoute, Airtable, Sidekiq",
    techstackicons: ["rubyonrails", "postgresql"],
  },
  {
    name: "Solid Rock — Client Website",
    org: "Xecutive Development LLC",
    desc: "Production Next.js 16 marketing and lead-generation website for a family-founded outdoor-living studio. Strict TypeScript, Tailwind v4, Motion for scroll interactions, and a Zod-validated Resend server action with honeypot spam protection and graceful degradation.",
    link: "#",
    code: "#",
    private: true,
    techstackused: "Next.js 16, TypeScript (strict), Tailwind v4, Motion, Resend, Zod",
    techstackicons: ["nextjs", "typescript", "tailwindcss"],
  },
];

const personal = [
  {
    name: "AI Model Stock Analysis",
    desc: "Built an ML ensemble (XGBoost + LSTM) trading-signal and portfolio-risk platform. FastAPI backend, Next.js 14 frontend, SQLite persistence, containerized with Docker and deployed on Fly.io.",
    link: "https://github.com/varsha698/AI-Model-Stock-Analysis",
    code: "https://github.com/varsha698/AI-Model-Stock-Analysis",
    techstackused: "Python, FastAPI, Next.js, XGBoost, LSTM, SQLite, Docker, Fly.io",
    techstackicons: ["python", "nextjs", "docker"],
  },
  {
    name: "ai-doc-editor",
    desc: "Local-LLM (LLaMA3 / Mistral) writing studio with async FastAPI, retrieval-augmented generation over ChromaDB, and a LoRA fine-tuning harness. Next.js 15 + Tiptap frontend, pgvector storage.",
    link: "https://github.com/varsha698/ai-doc-editor",
    code: "https://github.com/varsha698/ai-doc-editor",
    techstackused: "Next.js, FastAPI, ChromaDB, PyTorch, pgvector, Tiptap",
    techstackicons: ["nextjs", "python", "pytorch"],
  },
  {
    name: "AI Quiz Generator Website",
    desc: "AI Quiz Generator with Angular frontend and C# Web API backend, using the Groq API for NLP-based quiz generation. Swagger-documented REST endpoints, Dockerized, GitHub Actions CI/CD.",
    link: "#",
    code: "#",
    techstackused: "Angular, C#, ASP.NET Core, Docker, GitHub Actions, Swagger, Groq API",
    techstackicons: ["angular", "docker", "github"],
  },
  {
    name: "Cloud Infrastructure Automation (DevOps Project)",
    desc: "Provisioned AWS EC2 infrastructure with Terraform, automated environment setup and Flask deployment with Ansible, and built a CI/CD pipeline in GitHub Actions to lint, test, and push Dockerized apps on commit.",
    link: "https://github.com/varsha698/DevOps_Project",
    code: "https://github.com/varsha698/DevOps_Project",
    techstackused: "Terraform, Ansible, Flask, Docker, GitHub Actions, AWS EC2",
    techstackicons: ["terraform", "ansible", "flask", "docker", "github", "aws"],
  },
  {
    name: "PantryPal — Mobile App",
    desc: "Flutter + Firebase food-security app: pantry tracker with expiration dates, smart recipe matching from available ingredients, community feed, and CI/CD via GitHub Actions.",
    link: "https://github.com/varsha698/PantryPalApp",
    code: "https://github.com/varsha698/PantryPalApp",
    techstackused: "Flutter, Firebase, Dart, GitHub Actions",
    techstackicons: ["flutter", "firebase", "github"],
  },
  {
    name: "Winter Weather Lab",
    desc: "NOAA / NWS Streamlit app with a RandomForest winter-storm severity predictor. Blends live weather feeds with a trained classifier to surface storm-risk scores.",
    link: "https://github.com/varsha698/-Winter-Weather-Lab",
    code: "https://github.com/varsha698/-Winter-Weather-Lab",
    techstackused: "Python, Streamlit, scikit-learn, pandas",
    techstackicons: ["python"],
  },
  {
    name: "Sentiment Analysis Model",
    desc: "IMDB review sentiment classifier built with PyTorch and a feedforward neural network. Text preprocessing, vectorization, cross-entropy loss with Adam optimizer.",
    link: "https://github.com/varsha698/nlp_project2025",
    code: "https://github.com/varsha698/nlp_project2025",
    techstackused: "Python, PyTorch, MLP",
    techstackicons: ["python", "pytorch"],
  },
  {
    name: "Sales Analytics Project",
    desc: "pandas / numpy sales-KPI pipeline exporting cleaned CSVs for Tableau dashboards. Business-analyst portfolio piece paired with the Microsoft BA certification work.",
    link: "https://github.com/varsha698/Sales-Analytics-Project",
    code: "https://github.com/varsha698/Sales-Analytics-Project",
    techstackused: "Python, pandas, numpy, Tableau",
    techstackicons: ["python"],
  },
  {
    name: "Personal Admin Assistant (iOS)",
    desc: "Native SwiftUI + SwiftData + CloudKit iOS life-admin app with Tasks, Commitments, DailyBrief, and ActionReceipt models, EventKit calendar sync, and local notifications.",
    link: "#",
    code: "#",
    techstackused: "Swift, SwiftUI, SwiftData, CloudKit, EventKit",
    techstackicons: [],
  },
  {
    name: "dev-journal",
    desc: "Meta-tool for tracking cross-repo engineering activity. stdlib collect.py → journal.json → self-redeploying GitHub Pages activity timeline. Zero external dependencies.",
    link: "https://github.com/varsha698/dev-journal",
    code: "https://github.com/varsha698/dev-journal",
    techstackused: "Python, GitHub Actions, GitHub Pages",
    techstackicons: ["python", "github"],
  },
  {
    name: "Personal Portfolio Website",
    desc: "This site. React 19 + Vite 6 + Tailwind + Framer Motion. Hash routing for static hosting, animated project modals, deployed on Cloudflare Pages.",
    link: "https://varshinibhavanam.com",
    code: "https://github.com/varsha698/portfolio-website",
    techstackused: "React 19, Vite 6, Tailwind CSS, Framer Motion, Cloudflare Pages",
    techstackicons: ["reactjs", "tailwindcss", "vite", "github"],
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
            {getTechIcon(tech)}
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
          label="Personal &amp; Open Source"
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
