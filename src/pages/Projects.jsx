import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    name: "AI Model Stock Analysis",
    desc: "XGBoost + LSTM ensemble producing trading signals and portfolio-risk scores. FastAPI backend, Next.js 14 frontend, SQLite, Dockerized, Fly.io.",
    tags: ["python", "fastapi", "next.js", "xgboost", "lstm", "docker"],
    category: "ai / ml",
    repo: "https://github.com/varsha698/AI-Model-Stock-Analysis",
    demo: null,
  },
  {
    name: "ai-doc-editor",
    desc: "Local-LLM (LLaMA3 / Mistral) writing studio. Async FastAPI, RAG with ChromaDB, LoRA fine-tuning harness. Next.js 15 + Tiptap frontend, pgvector.",
    tags: ["next.js", "fastapi", "chromadb", "pytorch", "postgres"],
    category: "ai / ml",
    repo: "https://github.com/varsha698/ai-doc-editor",
    demo: null,
  },
  {
    name: "Quiz Generator (QuizMaster)",
    desc: "AI-powered quiz generator: Angular 20 + Node/Express + MongoDB + Groq LLM + Tesseract.js OCR. PWA-enabled.",
    tags: ["angular", "node", "mongodb", "groq", "pwa"],
    category: "full-stack",
    repo: "https://github.com/varsha698/Quiz-Generator",
    demo: null,
  },
  {
    name: "Winter Weather Lab",
    desc: "NOAA / NWS Streamlit app with a RandomForest winter-storm severity predictor.",
    tags: ["python", "streamlit", "sklearn"],
    category: "ai / ml",
    repo: "https://github.com/varsha698/-Winter-Weather-Lab",
    demo: null,
  },
  {
    name: "Sales Analytics Project",
    desc: "pandas/numpy sales-KPI pipeline exporting CSVs for Tableau. Business-analyst portfolio piece.",
    tags: ["python", "pandas", "tableau"],
    category: "data",
    repo: "https://github.com/varsha698/Sales-Analytics-Project",
    demo: null,
  },
  {
    name: "PantryPal",
    desc: "Flutter + Firebase food-security app: pantry tracker, recipe matching, community feed. 3-person team.",
    tags: ["flutter", "firebase", "dart"],
    category: "mobile",
    repo: "https://github.com/varsha698/PantryPalApp",
    demo: null,
  },
  {
    name: "Personal Admin Assistant",
    desc: "Native iOS life-admin app. SwiftUI + SwiftData + CloudKit; Tasks, Commitments, DailyBrief, ActionReceipt models; EventKit sync.",
    tags: ["swift", "swiftui", "cloudkit"],
    category: "mobile",
    repo: null,
    demo: null,
  },
  {
    name: "Cloud Infrastructure Automation",
    desc: "Terraform-provisioned AWS EC2 + Ansible-configured environments, Flask app in Docker, CI/CD via GitHub Actions.",
    tags: ["terraform", "ansible", "aws", "docker", "flask"],
    category: "devops",
    repo: "https://github.com/varsha698/DevOps_Project",
    demo: null,
  },
  {
    name: "Sentiment Analysis Model",
    desc: "IMDB review sentiment classifier: PyTorch MLP + TF-IDF vectorization; cross-entropy + Adam.",
    tags: ["python", "pytorch", "nlp"],
    category: "ai / ml",
    repo: "https://github.com/benjaminponto/nlp_project2025",
    demo: null,
  },
  {
    name: "dev-journal",
    desc: "Meta-tool: stdlib collect.py → journal.json → self-redeploying GitHub Pages activity timeline.",
    tags: ["python", "github-pages"],
    category: "tooling",
    repo: "https://github.com/varsha698/dev-journal",
    demo: null,
  },
  {
    name: "Portfolio Website",
    desc: "This site. React 19 + Vite 6 + Tailwind. Hash routing, deployed on Cloudflare Pages.",
    tags: ["react", "vite", "tailwind"],
    category: "web",
    repo: "https://github.com/varsha698/portfolio-website",
    demo: "https://varshinibhavanam.com",
  },
];

const categories = ["all", "ai / ml", "full-stack", "web", "mobile", "devops", "data", "tooling"];

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section className="page">
      <p className="section-label">projects</p>
      <h1 className="section-title text-3xl md:text-4xl">
        <span className="hash">#</span>projects
      </h1>
      <p className="text-fg-muted mt-3 max-w-2xl">
        A selection of things I&apos;ve shipped. Click a card for details.
      </p>

      <div className="mt-8 flex flex-wrap gap-2 font-mono text-sm">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded border transition-colors ${
              filter === c
                ? "border-accent-dim text-accent bg-bg-raised"
                : "border-border text-fg-muted hover:text-fg hover:border-border-strong"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.button
            key={p.name}
            onClick={() => setSelected(p)}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: (i % 6) * 0.03 }}
            className="card p-5 text-left group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="mono text-[11px] text-fg-muted uppercase tracking-wider">
                {p.category}
              </span>
              <div className="flex items-center gap-2 text-fg-faint text-xs">
                {p.repo && <FaGithub />}
                {p.demo && <FaExternalLinkAlt />}
              </div>
            </div>
            <h3 className="mono text-fg font-medium group-hover:text-accent transition-colors">
              {p.name}
            </h3>
            <p className="text-sm text-fg-muted mt-2 leading-relaxed line-clamp-3">
              {p.desc}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.slice(0, 4).map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
              {p.tags.length > 4 && (
                <span className="tag">+{p.tags.length - 4}</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};

export default Projects;
