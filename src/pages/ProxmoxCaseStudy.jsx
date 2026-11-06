import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { TechIcon } from "../components/techIcons";
import { techLabel } from "../components/techIconRegistry";
import SystemMap from "../components/SystemMap";

// Case study for the on-prem Proxmox servers. Facts come from the
// Final-Dev-Journal. Work the journal credits to teammates is described as
// the team's. No internal IP addresses, hostnames or VM IDs appear here.

const STACK = ["proxmox", "linux", "docker", "caddy", "cloudflare", "github"];

const APPS = [
  { app: "Sales-tax filing system", stack: "Django · Gunicorn · PostgreSQL", note: "Mine end to end" },
  { app: "Operator portal", stack: "Rails 8 API · React 19 · Docker Compose", note: "Team project" },
  { app: "Renewal payments", stack: "Rails · Sidekiq · Redis · Docker Compose", note: "I containerized it for its VM" },
  { app: "Payroll hub", stack: "Flask", note: "Team project" },
  { app: "Lead CRM, ERP and data hub", stack: "Rails · PostgreSQL", note: "Team projects" },
];

const PIPELINE = [
  { t: "Push to main", s: "merge on GitHub" },
  { t: "Self-hosted runner", s: "the GitHub Actions job runs on the app's own VM" },
  { t: "Load secrets", s: "production env file copied from a locked-down folder on the VM" },
  { t: "Build and start", s: "docker compose up -d --build" },
  { t: "Migrate", s: "database migrations in a one-off container" },
  { t: "Release", s: "Sentry release tracking, where configured" },
];

const PROBLEMS = [
  {
    title: "One front door, not one tunnel per app",
    body: "An app shipped with its own Cloudflare Tunnel container, unlike the rest of the fleet. It was moved behind the shared gateway, so every app is reached the same way: one tunnel, one Caddy config to change, and app VMs that only need to be reachable inside the network.",
  },
  {
    title: "The 100-second ceiling",
    body: "Cloudflare's tunnel gives up on a response after about 100 seconds. A pay run in the operator portal finished in 242 s on the server but still reached the browser as a 524 error, and my sales-tax batch upload hit the same wall. The fix in both apps: start long work as a background job and return immediately — the sales-tax upload now answers in 0.05 s.",
  },
  {
    title: "Knowing a request was HTTPS",
    body: "Inside the network Caddy talks plain HTTP to each app, so the usual forwarded-protocol header can't be trusted. The team read Cloudflare's own visitor header instead, which let the apps turn on HSTS and secure-only cookies.",
  },
  {
    title: "Runners that remember",
    body: "Self-hosted runners keep state between jobs: leftover work directories, Docker Compose project and volume names, tools that were already installed. Deploy scripts were made idempotent so a second run is always safe. And one workflow quietly ran nothing at all — a step name containing a colon made the YAML invalid — so workflows are now checked with actionlint before they're pushed.",
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

Section.propTypes = { title: PropTypes.string.isRequired, children: PropTypes.node };

// Deploy steps light up in order while the figure is on screen.
const Pipeline = () => {
  const ref = useRef(null);
  const [step, setStep] = useState(-1);
  useEffect(() => {
    const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (calm) {
      setStep(PIPELINE.length - 1);
      return undefined;
    }
    let timer;
    const io = new IntersectionObserver(
      ([e]) => {
        clearInterval(timer);
        if (!e.isIntersecting) return;
        setStep(-1);
        timer = setInterval(
          () => setStep((s) => (s >= PIPELINE.length + 2 ? -1 : s + 1)),
          700
        );
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <figure ref={ref} className="my-6">
      <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {PIPELINE.map((p, i) => {
          const on = i <= step;
          return (
            <li
              key={p.t}
              className={`bp-corner relative rounded-md border px-3 py-3 transition-colors duration-300 ${
                on ? "border-amber-400 bg-amber-500/10" : "border-amber-900/60 bg-black/60"
              }`}
            >
              <div className="font-mono text-[10px] text-amber-500/80">
                step {String(i + 1).padStart(2, "0")}
              </div>
              <div className={`mt-1 text-sm font-semibold ${on ? "text-amber-200" : "text-gray-200"}`}>
                {p.t}
              </div>
              <div className="mt-1 text-xs text-gray-400 leading-snug">{p.s}</div>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-2 font-mono text-[11px] text-gray-500">
        fig. 2 — how an app ships to its VM
      </figcaption>
    </figure>
  );
};

const ProxmoxCaseStudy = () => (
  <section className="min-h-screen px-4 md:px-8 pt-28 pb-20">
    <article className="relative z-10 max-w-5xl mx-auto">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-mono text-amber-400 hover:text-amber-300 mb-8"
      >
        <FaArrowLeft className="text-xs" /> all projects
      </Link>

      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-500/70 mb-2">
        sheet 03b · case study · Xecutive Development LLC · built and run day to day
      </p>
      <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
        On-Prem Servers &amp; VMs
      </h1>
      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        The company&apos;s internal apps don&apos;t live in a cloud account. They run on our own
        servers, which I set up with Proxmox VE: the apps run in their own virtual machines, and
        a single gateway lets the internet reach them without opening a single inbound port.
        I installed it, built the VMs and keep it running day to day.
      </p>
      <div className="flex flex-wrap gap-3 mb-12">
        {STACK.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-700 bg-gray-900/60 text-xs text-gray-300"
          >
            <TechIcon name={t} className="w-4 h-4" /> {techLabel(t)}
          </span>
        ))}
      </div>

      <Section title="How traffic gets in">
        <p>
          Every request comes through one Cloudflare Tunnel into a gateway VM running Caddy.
          Caddy looks at the hostname and forwards the request to the right app VM on the
          internal network. TLS ends at Cloudflare&apos;s edge and nothing on the servers is
          exposed directly. Hover or tap the boxes below.
        </p>
        <div className="rounded-lg border border-amber-900/50 bg-black/60 p-4">
          <SystemMap />
        </div>
      </Section>

      <Section title="How an app ships">
        <p>
          Deploys run on GitHub Actions, but on runners that live on the app&apos;s own VM, so
          nothing outside the network needs credentials to reach the servers.
        </p>
        <Pipeline />
      </Section>

      <Section title="What runs on it">
        <div className="overflow-x-auto rounded-lg border border-amber-900/50">
          <table className="w-full text-sm text-left">
            <thead className="bg-amber-900/20 text-amber-300">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">App</th>
                <th scope="col" className="px-4 py-3 font-semibold">Stack</th>
                <th scope="col" className="px-4 py-3 font-semibold">My part</th>
              </tr>
            </thead>
            <tbody>
              {APPS.map((a) => (
                <tr key={a.app} className="border-t border-amber-900/40">
                  <th scope="row" className="px-4 py-3 font-medium text-gray-200">{a.app}</th>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">{a.stack}</td>
                  <td className="px-4 py-3 text-amber-200">{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400">
          Running the servers is mine regardless of who wrote the app: provisioning VMs,
          deploys, updates and troubleshooting.
        </p>
      </Section>

      <Section title="Hard problems">
        <div className="grid gap-4 md:grid-cols-2">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="bp-corner relative p-5 rounded-lg border border-amber-900/50 bg-black/60">
              <h3 className="font-semibold text-amber-200 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="flex flex-wrap gap-4 pt-6 border-t border-amber-900/40">
        <Link
          to="/projects/sales-tax"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-black bg-amber-400 hover:bg-amber-300 transition"
        >
          Next: the sales-tax system
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

export default ProxmoxCaseStudy;
