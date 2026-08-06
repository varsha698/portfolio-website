import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";

const stack = [
  "python", "typescript", "react", "next.js",
  "node.js", "flask", "fastapi", "rails",
  "postgres", "mongodb", "docker", "aws",
  "terraform", "pytorch", "tensorflow", "firebase",
];

const focus = [
  { k: "ai/ml", v: "LLM apps, RAG, PyTorch, ML for good" },
  { k: "full-stack", v: "React/Next.js, Rails, FastAPI, Postgres" },
  { k: "devops", v: "Docker, Terraform, Ansible, GitHub Actions, AWS" },
  { k: "research", v: "digital mental-health interventions" },
];

const Home = () => {
  return (
    <section className="page">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mono"
      >
        <p className="text-fg-muted text-sm">
          <span className="text-accent">$</span> whoami
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold text-fg mt-3 leading-tight">
          Varshini Bhavanam
          <span className="blink text-accent">_</span>
        </h1>
        <p className="text-fg-muted mt-2 text-sm md:text-base">
          <span className="comment">cs @ university of minnesota duluth · builder · tech for good</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-10 max-w-3xl"
      >
        <p className="text-fg leading-relaxed">
          Software engineer working across AI/ML, full-stack web, and DevOps.
          I build secure, scalable, user-focused systems — from LLM writing tools
          and NLP models to production Rails/Next.js platforms for real
          businesses. My research explores digital interventions for mental
          health.
        </p>
      </motion.div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/projects" className="btn btn-primary">
          view projects <FaArrowRight className="text-xs" />
        </Link>
        <Link to="/about" className="btn">
          cat about.md
        </Link>
        <a
          href="https://github.com/varsha698"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          <FaGithub /> github
        </a>
        <a
          href="https://www.linkedin.com/in/varshinikb/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          <FaLinkedin /> linkedin
        </a>
      </div>

      <div className="hairline my-14" />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="section-label">focus</p>
          <h2 className="section-title">
            <span className="hash">##</span>current.work
          </h2>
          <ul className="mt-5 space-y-3">
            {focus.map((f) => (
              <li key={f.k} className="mono text-sm flex flex-col md:flex-row md:gap-3">
                <span className="text-accent min-w-[6rem]">{f.k}</span>
                <span className="text-fg-muted">{f.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label">stack</p>
          <h2 className="section-title">
            <span className="hash">##</span>tools.of.trade
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hairline my-14" />

      <div>
        <p className="section-label">highlights</p>
        <h2 className="section-title">
          <span className="hash">##</span>selected.work
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <HighlightCard
            title="AI Model Stock Analysis"
            desc="XGBoost + LSTM ensemble for trading signals & portfolio risk. FastAPI + Next.js 14."
            tags={["python", "fastapi", "xgboost", "lstm"]}
            href="https://github.com/varsha698/AI-Model-Stock-Analysis"
          />
          <HighlightCard
            title="ai-doc-editor"
            desc="Local-LLM writing studio (LLaMA3 / Mistral) with async FastAPI, RAG on ChromaDB, LoRA harness."
            tags={["next.js", "fastapi", "chromadb", "pytorch"]}
            href="https://github.com/varsha698/ai-doc-editor"
          />
          <HighlightCard
            title="Quiz Generator"
            desc="Angular 20 + Node/Express + MongoDB + Groq LLM + OCR. PWA."
            tags={["angular", "node", "mongo", "groq"]}
            href="https://github.com/varsha698/Quiz-Generator"
          />
          <HighlightCard
            title="DevOps Reference Project"
            desc="Terraform + Ansible + Docker + K8s + GitHub Actions on AWS, Flask backend."
            tags={["terraform", "ansible", "aws", "k8s"]}
            href="https://github.com/varsha698/DevOps_Project"
          />
        </div>
        <div className="mt-6">
          <Link to="/projects" className="mono text-sm text-fg-muted hover:text-accent">
            <span className="text-accent">$</span> ls projects/ →
          </Link>
        </div>
      </div>
    </section>
  );
};

const HighlightCard = ({ title, desc, tags, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="card p-5 block group"
  >
    <div className="flex items-start justify-between gap-3">
      <h3 className="mono text-fg font-medium group-hover:text-accent transition-colors">
        {title}
      </h3>
      <FaArrowRight className="text-fg-faint group-hover:text-accent transition-colors mt-1 text-sm" />
    </div>
    <p className="text-sm text-fg-muted mt-2 leading-relaxed">{desc}</p>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span key={t} className="tag">{t}</span>
      ))}
    </div>
  </a>
);

HighlightCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  href: PropTypes.string.isRequired,
};

export default Home;
