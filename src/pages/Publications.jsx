import { motion } from "framer-motion";
import { FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";

const publications = [
  {
    title:
      "Digital Interventions for Depression and Anxiety: A Systematic Synthesis of Chatbots, App-Based CBT, and Immersive VR/XR",
    authors: "Varshini Bhavanam, Dr. Arshia Khan, et al.",
    venue: "HEALTHINF 2026",
    venueFull: "International Conference on Health Informatics",
    type: "Short Paper",
    status: "accepted",
    year: "2026",
    url: null,
    abstract:
      "A systematic synthesis of digital interventions including chatbots, app-based cognitive behavioral therapy, and immersive virtual/extended reality technologies for depression and anxiety treatment.",
  },
  {
    title:
      "Humanoid and Socially Assistive Robots in Mental Health Care: A PRISMA Guided Systematic Review of Therapeutic and Emotional Outcomes (2021–2025)",
    authors: "Varshini Bhavanam, Ayesha Noshin, Dr. Arshia Khan",
    venue: "ICICT 2025",
    venueFull: "International Conference on Information and Communication Technology",
    type: "Systematic Review",
    status: "accepted",
    year: "2025",
    url: "/ICICT_Mental_Health_and_Robotics.pdf",
    abstract:
      "A PRISMA-guided systematic review of therapeutic and emotional outcomes of humanoid and socially assistive robots in mental-health care, covering research from 2021 to 2025.",
  },
];

const statusColor = {
  accepted: "text-accent border-accent-dim",
  published: "text-accent border-accent-dim",
  "under review": "text-accent-warn border-accent-warn/50",
  submitted: "text-fg-muted border-border-strong",
};

const Publications = () => {
  return (
    <section className="page">
      <p className="section-label">publications</p>
      <h1 className="section-title text-3xl md:text-4xl">
        <span className="hash">#</span>publications
      </h1>
      <p className="text-fg-muted mt-3 max-w-2xl">
        Peer-reviewed research on digital and robotic interventions for mental health,
        with Dr. Arshia Khan (UMN Duluth).
      </p>

      <div className="hairline my-10" />

      <div className="space-y-5">
        {publications.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="card p-6"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="mono text-xs text-accent">{p.venue}</span>
              <span className="text-fg-faint">·</span>
              <span className="mono text-xs text-fg-muted">{p.type}</span>
              <span className="text-fg-faint">·</span>
              <span className="mono text-xs text-fg-muted">{p.year}</span>
              <span
                className={`ml-auto mono text-[11px] uppercase tracking-wider px-2 py-0.5 border rounded ${
                  statusColor[p.status] || "text-fg-muted border-border"
                }`}
              >
                {p.status}
              </span>
            </div>

            <h2 className="text-fg font-medium leading-snug">{p.title}</h2>

            <p className="mono text-sm text-fg-muted mt-2">{p.authors}</p>
            <p className="text-xs text-fg-faint mt-1">{p.venueFull}</p>

            <p className="text-sm text-fg-muted mt-4 leading-relaxed">
              {p.abstract}
            </p>

            <div className="mt-5">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  {p.url.endsWith(".pdf") ? (
                    <>
                      <FaFilePdf /> download pdf
                    </>
                  ) : (
                    <>
                      <FaExternalLinkAlt className="text-xs" /> view paper
                    </>
                  )}
                </a>
              ) : (
                <p className="mono text-sm text-fg-muted">
                  <span className="comment">pdf available soon</span>
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Publications;
