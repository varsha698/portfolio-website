import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { asset } from "../utils/asset";
import { TechIcon } from "../components/techIcons";

// Case study for the multi-state sales-tax filing system. Facts and numbers
// come from the project's commit history (Final-Dev-Journal). No customer
// data, credentials or internal hostnames appear here.

// Drop a sanitized screenshot at this path to show it; the figure hides
// itself while the file is missing.
const SCREENSHOT = asset("/case-studies/sales-tax-dashboard.png");

const RESULTS = [
  {
    metric: "Large batch (1,021 rows)",
    before: "~340 s, serial — timed out",
    after: "11.9 s with a 16-worker pool",
  },
  {
    metric: "Colorado import (177 rows)",
    before: "117 rows failed on rate limits",
    after: "0 errors with a per-key request pacer",
  },
  {
    metric: "Batch upload response",
    before: "Held open until done, cut off at Cloudflare's 100 s limit",
    after: "Returns in 0.05 s; work runs as a background job",
  },
  {
    metric: "One bad row in a batch",
    before: "HTTP 500 for the whole batch",
    after: "Recorded on that row; the rest complete",
  },
];

const PROBLEMS = [
  {
    title: "A state API that rejects fast clients",
    body: "Colorado's tax-rate service allows about one request per second per key and answers anything faster with HTTP 401. My 16-thread batch pool tripped it immediately: 117 of 177 rows in one import failed even after retries. I added a pacer that spaces request starts at least 1.1 s apart per API key, shared across processes with a file lock, plus a per-batch cache that dedupes lookups by address and product. A re-run of the failing addresses finished with zero errors.",
  },
  {
    title: "Batches longer than the proxy allows",
    body: "Requests through Cloudflare are cut off at 100 seconds, and a paced Colorado import takes about three minutes. Uploads now save the CSV as a job, start a detached worker and redirect to a progress page that polls every five seconds, shows \"processing N of M rows\", reports failures and flags jobs that have stalled.",
  },
  {
    title: "A filing that came back empty",
    body: "One month's Minnesota run produced zero taxable lines. Two bugs compounded: the ZIP+4 cache was not mounted as a volume, so every rebuild shipped an empty cache, and the nightly sync never filled it. I bind-mounted the cache and turned on ZIP+4 lookup during sync so it fills itself. I also added a USPS-first, Geocodio-fallback lookup for better ZIP+4 coverage.",
  },
  {
    title: "Totals that were right in sum but wrong per jurisdiction",
    body: "New York requires the 4% state tax and the local tax on separate lines. The engine emitted one combined line, so a $100 Erie County sale showed $8.75 against Erie instead of $4 state + $4.75 Erie. It now emits a state and a local line, with rounding absorbed by the local line so the pair still reconciles to the amount charged. Fanning out Minnesota lines the same way exposed double-counted gross sales on the dashboard, which I fixed by de-duplicating per transaction before summing.",
  },
];

const Section = ({ title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5 }}
    className="mb-14"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-4">{children}</div>
  </motion.section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const DiagramNode = ({ x, y, t, s }) => (
  <g>
    <rect x={x} y={y} width="170" height="58" rx="8" className="fill-[#0b0f19] stroke-amber-600/70" strokeWidth="1.5" />
    <text x={x + 85} y={y + 25} textAnchor="middle" className="fill-amber-200 text-[13px] font-semibold">{t}</text>
    <text x={x + 85} y={y + 44} textAnchor="middle" className="fill-gray-400 text-[11px]">{s}</text>
  </g>
);

DiagramNode.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  t: PropTypes.string.isRequired,
  s: PropTypes.string.isRequired,
};

// Data flow, drawn inline so it stays crisp and themable.
const Diagram = () => {
  const nodes = [
    { x: 10, y: 140, t: "Airtable", s: "orders + customers" },
    { x: 200, y: 140, t: "Nightly sync", s: "address check, ZIP+4" },
    { x: 390, y: 140, t: "Tax engine", s: "per-state rules" },
    { x: 580, y: 140, t: "Tax lines", s: "per jurisdiction" },
  ];
  const outputs = [
    { x: 390, y: 290, t: "Filing summary", s: "per-state return totals" },
    { x: 580, y: 290, t: "Line-detail CSV", s: "130 columns" },
    { x: 200, y: 290, t: "Reconciliation", s: "vs. filed records" },
  ];
  const lookups = [
    { x: 200, y: 20, t: "USPS / Geocodio", s: "ZIP+4 lookup" },
    { x: 390, y: 20, t: "MN + CO rate APIs", s: "paced, cached" },
    { x: 580, y: 20, t: "NY rate tables", s: "state + local" },
  ];
  const arrow = "stroke-amber-500/80";
  return (
    <figure className="my-6">
      <div className="overflow-x-auto rounded-lg border border-amber-900/50 bg-black/60 p-4">
        <svg viewBox="0 0 760 370" className="min-w-[640px] w-full" role="img" aria-labelledby="dg-title">
          <title id="dg-title">
            Data flow: Airtable feeds a nightly sync, then the tax engine, which writes
            per-jurisdiction tax lines used for filing summaries, a line-detail CSV and
            reconciliation. The sync and engine call ZIP+4 and state rate services.
          </title>
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="fill-amber-500" />
            </marker>
          </defs>
          {[180, 370, 560].map((x) => (
            <line key={x} x1={x} y1="169" x2={x + 18} y2="169" className={arrow} strokeWidth="1.5" markerEnd="url(#ah)" />
          ))}
          <path d="M665 198 V240 H475 V288" fill="none" className={arrow} strokeWidth="1.5" markerEnd="url(#ah)" />
          <line x1="665" y1="198" x2="665" y2="288" className={arrow} strokeWidth="1.5" markerEnd="url(#ah)" />
          <path d="M665 240 H285 V288" fill="none" className={arrow} strokeWidth="1.5" markerEnd="url(#ah)" />
          <line x1="285" y1="78" x2="285" y2="138" className={arrow} strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#ah)" />
          <line x1="475" y1="78" x2="475" y2="138" className={arrow} strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#ah)" />
          <path d="M665 78 V108 H520 V138" fill="none" className={arrow} strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#ah)" />
          {[...nodes, ...outputs, ...lookups].map((n) => (
            <DiagramNode key={n.t} {...n} />
          ))}
          <text x="20" y="52" className="fill-gray-500 text-[11px]">dashed = external lookups</text>
        </svg>
      </div>
      <figcaption className="text-xs text-gray-500 mt-2">
        Runs as a Dockerized Django app on a company Proxmox VM, served through a Caddy
        gateway and a Cloudflare Tunnel.
      </figcaption>
    </figure>
  );
};

const STACK = ["python", "django", "postgresql", "docker", "caddy", "cloudflare"];

const SalesTaxCaseStudy = () => (
  <section
    className="min-h-screen bg-black px-4 md:px-8 pt-28 pb-20"
    style={{ background: "radial-gradient(circle at top, #0f1523 0%, #000000 70%)" }}
  >
    <article className="relative z-10 max-w-4xl mx-auto">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-mono text-amber-400 hover:text-amber-300 mb-8"
      >
        <FaArrowLeft className="text-xs" /> all projects
      </Link>

      <p className="text-xs uppercase tracking-widest text-amber-300/70 mb-2">
        Case study · Xecutive Development LLC · Primary author
      </p>
      <h1
        className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4"
        style={{ textShadow: "0 0 15px rgba(255, 153, 102, 0.35)" }}
      >
        Multi-State Sales Tax Filing System
      </h1>
      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        A Django app that turns a lawn and snow company&apos;s sales into ready-to-file sales-tax
        returns for Minnesota, Colorado and New York. I started it in July 2026 and built
        it end to end: the tax engine, the web app, the batch tools and the deployment.
      </p>
      <div className="flex flex-wrap gap-3 mb-12">
        {STACK.map((t) => (
          <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-700 bg-gray-900/60 text-xs text-gray-300">
            <TechIcon name={t} className="w-4 h-4" /> {t === "django" ? "Django" : t === "postgresql" ? "PostgreSQL" : t.charAt(0).toUpperCase() + t.slice(1)}
          </span>
        ))}
      </div>

      <Section title="The problem">
        <p>
          The company sells taxable and non-taxable services across several states. Each
          state reports differently: Minnesota taxes by stacked local jurisdictions keyed
          on ZIP+4, Colorado rates come from a state lookup service, and New York wants
          state and local tax on separate lines. Sales are tax-inclusive, so tax has to be
          backed out of the amount the customer paid, not added on top.
        </p>
        <p>
          Before this system, that meant manual lookups and spreadsheets for every filing
          period, with no easy way to check the numbers against what was actually filed.
        </p>
      </Section>

      <Section title="What I built">
        <ul className="list-disc pl-5 space-y-2">
          <li>A <strong className="text-amber-200">tax engine</strong> with per-state rules for MN, CO and NY, including tax-inclusive back-out and decisions from the finance manager recorded in code.</li>
          <li>A <strong className="text-amber-200">nightly sync</strong> from Airtable that validates addresses and fills a ZIP+4 cache (USPS first, Geocodio as fallback).</li>
          <li><strong className="text-amber-200">Filing runs</strong> over any date range that produce per-state summaries, a 130-column line-detail CSV, and a &ldquo;mark filed&rdquo; status per state.</li>
          <li>A <strong className="text-amber-200">batch calculator</strong>: upload a CSV of addresses and amounts and get per-row tax plus a per-jurisdiction filing summary.</li>
          <li>A <strong className="text-amber-200">reconciliation service</strong> that matches computed lines to filed records by address, date and service.</li>
          <li>A login-protected dashboard with tax owed, remittance progress and the largest jurisdictions, in light and dark themes.</li>
        </ul>
      </Section>

      <Section title="How it fits together">
        <Diagram />
      </Section>

      <figure className="mb-14">
        <img
          src={SCREENSHOT}
          alt="Sales-tax dashboard with sample data"
          className="w-full rounded-lg border border-amber-900/50"
          loading="lazy"
          onError={(e) => {
            e.target.parentElement.style.display = "none";
          }}
        />
        <figcaption className="text-xs text-gray-500 mt-2">Dashboard, shown with sample data.</figcaption>
      </figure>

      <Section title="Hard problems">
        <div className="grid gap-4">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="p-5 rounded-lg border border-amber-900/50 bg-black/60">
              <h3 className="text-lg font-semibold text-amber-300 mb-2">{p.title}</h3>
              <p className="text-gray-300 text-sm md:text-base">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Before and after">
        <div className="overflow-x-auto rounded-lg border border-amber-900/50">
          <table className="w-full text-sm text-left">
            <thead className="bg-amber-900/20 text-amber-300">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Scenario</th>
                <th scope="col" className="px-4 py-3 font-semibold">Before</th>
                <th scope="col" className="px-4 py-3 font-semibold">After</th>
              </tr>
            </thead>
            <tbody>
              {RESULTS.map((r) => (
                <tr key={r.metric} className="border-t border-amber-900/40">
                  <th scope="row" className="px-4 py-3 font-medium text-gray-200">{r.metric}</th>
                  <td className="px-4 py-3 text-gray-400">{r.before}</td>
                  <td className="px-4 py-3 text-amber-200">{r.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Shipping it">
        <p>
          The app runs in Docker with Gunicorn and PostgreSQL on one of the company&apos;s
          Proxmox virtual machines, which I set up and maintain. Traffic reaches it through
          the shared Caddy gateway and a Cloudflare Tunnel, so the server has no open
          inbound ports. Long-running work (Airtable syncs, filing runs, large batches) runs
          as detached background jobs so web requests stay fast.
        </p>
      </Section>

      <div className="flex flex-wrap gap-4 pt-6 border-t border-amber-900/40">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-black bg-amber-400 hover:bg-amber-300 transition"
        >
          More projects
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-amber-400 border border-amber-400 hover:bg-amber-400/10 transition"
        >
          Ask me about it
        </Link>
      </div>
    </article>
  </section>
);

export default SalesTaxCaseStudy;
