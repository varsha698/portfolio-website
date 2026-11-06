import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TechIcon } from "../components/techIcons";
import { techLabel } from "../components/techIconRegistry";
import { professional, personal } from "../data/projects";

// The tech stack drawn as an engineering parts list (bill of materials).
// Quantities are counted from src/data/projects.js, so they can't drift
// from the projects actually shown on the site.

const TYPE = {
  python: "Language",
  typescript: "Language",
  javascript: "Language",
  ruby: "Language",
  swift: "Language",
  dart: "Language",
  csharp: "Language",
  react: "Frontend",
  nextjs: "Frontend",
  angular: "Frontend",
  tailwind: "Frontend",
  vite: "Frontend",
  astro: "Frontend",
  flutter: "Mobile",
  rails: "Backend",
  django: "Backend",
  fastapi: "Backend",
  flask: "Backend",
  nodejs: "Backend",
  postgresql: "Data",
  mongodb: "Data",
  supabase: "Data",
  sqlite: "Data",
  firebase: "Data",
  pandas: "Data",
  pytorch: "AI / ML",
  sklearn: "AI / ML",
  tensorflow: "AI / ML",
  claude: "AI / ML",
  openai: "AI / ML",
  proxmox: "Infra",
  linux: "Infra",
  docker: "Infra",
  caddy: "Infra",
  cloudflare: "Infra",
  github: "Infra",
  aws: "Infra",
  terraform: "Infra",
  ansible: "Infra",
  kubernetes: "Infra",
  stripe: "Integration",
  airtable: "Integration",
  odoo: "Integration",
};

const usePartsList = () =>
  useMemo(() => {
    const byTech = new Map();
    [...professional, ...personal].forEach((project) => {
      new Set(project.techstackicons).forEach((key) => {
        if (!byTech.has(key)) byTech.set(key, []);
        byTech.get(key).push(project);
      });
    });
    return [...byTech.entries()]
      .map(([key, projects]) => ({ key, projects, label: techLabel(key) }))
      .sort((a, b) => b.projects.length - a.projects.length || a.label.localeCompare(b.label))
      .map((row, i) => ({ ...row, item: `P-${String(i + 1).padStart(2, "0")}` }));
  }, []);

const QtyBar = ({ qty, max }) => (
  <span className="hidden sm:inline-flex gap-[2px] align-middle" aria-hidden="true">
    {Array.from({ length: max }, (_, i) => (
      <span
        key={i}
        className={`inline-block w-1.5 h-3 ${i < qty ? "bg-amber-400" : "border border-amber-900/70"}`}
        data-fill
      />
    ))}
  </span>
);

QtyBar.propTypes = { qty: PropTypes.number.isRequired, max: PropTypes.number.isRequired };

const Row = ({ row, max, open, onToggle }) => (
  <li className="border-t border-amber-900/50">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={`w-full grid grid-cols-[3.5rem_1fr_auto] sm:grid-cols-[4rem_minmax(0,1.3fr)_7rem_8rem_minmax(0,2fr)] items-center gap-3 px-3 py-2.5 text-left transition-colors ${
        open ? "bg-amber-500/10" : "hover:bg-amber-500/5"
      }`}
    >
      <span className="font-mono text-xs text-amber-500/80">{row.item}</span>
      <span className="flex items-center gap-2.5 min-w-0">
        <TechIcon name={row.key} className="w-5 h-5 flex-shrink-0" />
        <span className="truncate text-gray-100">{row.label}</span>
      </span>
      <span className="hidden sm:block font-mono text-xs text-gray-400">{TYPE[row.key] || "Other"}</span>
      <span className="flex items-center gap-2 font-mono text-sm text-amber-300">
        <span className="w-5 text-right">{row.projects.length}</span>
        <QtyBar qty={row.projects.length} max={max} />
      </span>
      <span className="hidden sm:block truncate text-xs text-gray-400">
        {row.projects.map((p) => p.name).join(" · ")}
      </span>
    </button>
    {open && (
      <div className="px-3 pb-3 sm:pl-[5.25rem]">
        <div className="flex flex-wrap gap-2">
          {row.projects.map((p) => (
            <Link
              key={p.name}
              to="/projects"
              state={{ open: p.name, nonce: Date.now() }}
              className="rounded-sm border border-amber-900/70 px-2 py-1 text-xs text-gray-200 hover:border-amber-400 hover:text-amber-300"
            >
              {p.name}
            </Link>
          ))}
        </div>
        <Link
          to="/projects"
          state={{ highlight: row.key, nonce: Date.now() }}
          className="mt-2 inline-block font-mono text-xs text-amber-400 hover:text-amber-300"
        >
          highlight these on the projects page →
        </Link>
      </div>
    )}
  </li>
);

Row.propTypes = {
  row: PropTypes.shape({
    key: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    projects: PropTypes.array.isRequired,
  }).isRequired,
  max: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const TechStackDisplay = () => {
  const rows = usePartsList();
  const [openKey, setOpenKey] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const max = rows[0]?.projects.length || 1;
  const visible = showAll ? rows : rows.slice(0, 14);

  return (
    <div className="relative w-full px-4 md:px-8 py-16">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-500/70">
          bill of materials · tech stack
        </div>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          Parts list
        </h2>
        <p className="mt-2 text-sm text-gray-400 max-w-2xl">
          Every technology used across the {professional.length + personal.length} projects on
          this site. Qty is how many of them use it. Open a row to see which.
        </p>

        <div className="bp-corner relative mt-6 border border-amber-800/70 bg-black/70 backdrop-blur-sm">
          <div className="grid grid-cols-[3.5rem_1fr_auto] sm:grid-cols-[4rem_minmax(0,1.3fr)_7rem_8rem_minmax(0,2fr)] gap-3 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-500/70">
            <span>Item</span>
            <span>Part</span>
            <span className="hidden sm:block">Type</span>
            <span>Qty</span>
            <span className="hidden sm:block">Used in</span>
          </div>
          <ul>
            {visible.map((row) => (
              <Row
                key={row.key}
                row={row}
                max={max}
                open={openKey === row.key}
                onToggle={() => setOpenKey((k) => (k === row.key ? null : row.key))}
              />
            ))}
          </ul>
          {rows.length > 14 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="w-full border-t border-amber-900/50 px-3 py-2 font-mono text-xs text-amber-400 hover:bg-amber-500/5"
            >
              {showAll ? "show fewer parts ↑" : `show all ${rows.length} parts ↓`}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TechStackDisplay;
