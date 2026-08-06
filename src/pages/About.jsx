import { motion } from "framer-motion";

const timeline = [
  {
    year: "Dec 2025",
    when: "expected",
    title: "B.S. Computer Science",
    org: "University of Minnesota Duluth",
    desc: "Coursework: Computer Security, Operating Systems, Software Engineering, NLP, Mobile UX & Design, Automata & Formal Languages, Sensors & IoT.",
    href: "https://www.d.umn.edu/",
  },
  {
    year: "2026 →",
    when: "current",
    title: "Software Engineer — Xecutive Development LLC",
    org: "andrew's lawn & snow suite",
    desc: "Contributing to a 20+ service business platform: Rails 8 ERP/CRM, Next.js 16 marketing sites on Cloudflare Pages, Python payment/mailer pipelines, Airtable/Stripe/Odoo integrations.",
    href: null,
  },
  {
    year: "Feb 2025 – Apr 2025",
    when: "internship",
    title: "EHR Data Migration Intern",
    org: "St. Luke's Aspirus Administration, Duluth MN",
    desc: "Migrated and validated patient data from Meditech to Epic; reconciled structured clinical records under HIPAA compliance.",
    href: "https://www.slhduluth.com/",
  },
  {
    year: "Sep 2024 – May 2025",
    when: "research",
    title: "Undergraduate Research Assistant",
    org: "UMN Duluth · Dr. Arshia Khan",
    desc: "Mental-wellness mobile app research: gamification, literature review, prototyping, IRB documentation. Led to two accepted publications (HEALTHINF 2026, ICICT).",
    href: "https://www.d.umn.edu/",
  },
  {
    year: "Aug 2024 →",
    when: "current",
    title: "Intern — International Student Services",
    org: "UMN Duluth",
    desc: "Managing student data in Sunapsis; supporting international student onboarding, orientation, and engagement.",
    href: "https://www.d.umn.edu/international/",
  },
];

const About = () => {
  return (
    <section className="page">
      <p className="section-label">about.md</p>
      <h1 className="section-title text-3xl md:text-4xl">
        <span className="hash">#</span>varshini_bhavanam
      </h1>

      <div className="mt-6 max-w-3xl space-y-4 text-fg leading-relaxed">
        <p>
          I&apos;m a CS student at the University of Minnesota Duluth graduating
          December 2025. I like building things that ship — from ML/LLM
          experiments and mobile apps to production Rails and Next.js systems
          for real businesses.
        </p>
        <p>
          Outside of coursework I do professional full-stack work on a
          multi-service operations platform, publish research on digital mental
          health interventions, and maintain a set of AI/ML side projects
          exploring what small teams can do with modern tooling.
        </p>
      </div>

      <div className="hairline my-12" />

      <p className="section-label">timeline</p>
      <h2 className="section-title mb-8">
        <span className="hash">##</span>journey
      </h2>

      <div className="relative">
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
        <ol className="space-y-8">
          {timeline.map((e, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative pl-12 md:pl-16"
            >
              <span
                className="absolute left-2.5 md:left-4.5 top-2 w-3 h-3 rounded-full bg-bg border-2 border-accent"
                aria-hidden="true"
              />
              <div className="card p-5">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="mono text-xs text-accent">{e.year}</span>
                  <span className="mono text-xs text-fg-faint">·</span>
                  <span className="mono text-xs text-fg-muted">{e.when}</span>
                </div>
                <h3 className="text-fg font-medium">{e.title}</h3>
                {e.href ? (
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono text-sm text-accent-link hover:text-accent"
                  >
                    {e.org} →
                  </a>
                ) : (
                  <p className="mono text-sm text-fg-muted">{e.org}</p>
                )}
                <p className="text-sm text-fg-muted mt-2 leading-relaxed">{e.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default About;
