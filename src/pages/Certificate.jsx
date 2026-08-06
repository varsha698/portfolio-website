import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCertificate } from "react-icons/fa";

const certificates = [
  {
    name: "Google Cybersecurity Professional Certificate V2",
    provider: "Google · Coursera",
    issued: "May 2025",
    desc: "8-course certification covering security best practices, threat detection, risk management, and incident response.",
    url: "https://www.credly.com/badges/ed51ce48-72c1-40bf-9aeb-faebd2924e2b/public_url",
  },
  {
    name: "Microsoft Business Analyst Professional Certificate",
    provider: "Microsoft · Coursera",
    issued: "Oct 2025",
    desc: "Business process analysis, requirements gathering, stakeholder communication, and data-driven decision making with Visio and Excel.",
    url: "https://www.coursera.org/account/accomplishments/specialization/GZ13WSR6DMFP",
  },
];

const incoming = [
  "Google Cloud Associate",
  "AWS Developer Associate",
  "Microsoft Azure Fundamentals",
];

const Certificate = () => {
  return (
    <section className="page">
      <p className="section-label">certifications</p>
      <h1 className="section-title text-3xl md:text-4xl">
        <span className="hash">#</span>certifications
      </h1>

      <div className="hairline my-10" />

      <div className="grid md:grid-cols-2 gap-4">
        {certificates.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="card p-6 group flex flex-col"
          >
            <div className="flex items-start justify-between gap-3">
              <FaCertificate className="text-accent text-lg mt-1" />
              <FaExternalLinkAlt className="text-fg-faint group-hover:text-accent transition-colors text-xs" />
            </div>
            <h3 className="mono text-fg font-medium mt-3 group-hover:text-accent transition-colors">
              {c.name}
            </h3>
            <p className="mono text-xs text-fg-muted mt-2">
              {c.provider} · issued {c.issued}
            </p>
            <p className="text-sm text-fg-muted mt-3 leading-relaxed">{c.desc}</p>
          </motion.a>
        ))}
      </div>

      <div className="mt-14">
        <p className="section-label">incoming</p>
        <h2 className="section-title mb-4">
          <span className="hash">##</span>in.progress
        </h2>
        <ul className="flex flex-wrap gap-2">
          {incoming.map((n) => (
            <li key={n} className="tag">{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Certificate;
