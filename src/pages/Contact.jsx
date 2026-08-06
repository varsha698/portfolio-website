import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const channels = [
  {
    key: "email",
    value: "bhava008@d.umn.edu",
    href: "mailto:bhava008@d.umn.edu",
    icon: <FaEnvelope />,
  },
  {
    key: "phone",
    value: "651-359-1842",
    href: "tel:+16513591842",
    icon: <FaPhone />,
  },
  {
    key: "github",
    value: "github.com/varsha698",
    href: "https://github.com/varsha698",
    icon: <FaGithub />,
  },
  {
    key: "linkedin",
    value: "linkedin.com/in/varshinikb",
    href: "https://www.linkedin.com/in/varshinikb/",
    icon: <FaLinkedin />,
  },
];

const Contact = () => {
  return (
    <section className="page">
      <p className="section-label">contact</p>
      <h1 className="section-title text-3xl md:text-4xl">
        <span className="hash">#</span>get.in.touch
      </h1>
      <p className="text-fg-muted mt-3 max-w-2xl">
        Open to collaboration, internships, and interesting problems.
        The fastest way to reach me is email.
      </p>

      <div className="hairline my-10" />

      <div className="grid md:grid-cols-[auto,1fr] gap-8 md:gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="mx-auto md:mx-0"
        >
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-md overflow-hidden border border-border">
            <img
              src="/image.JPG"
              alt="Varshini Bhavanam"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <p className="mono text-xs text-fg-muted mt-3 text-center md:text-left">
            <span className="comment">./varshini.jpg</span>
          </p>
        </motion.div>

        <div className="w-full">
          <div className="card p-5 md:p-6">
            <p className="mono text-xs text-fg-muted mb-4">
              <span className="text-accent">$</span> cat contact.yml
            </p>
            <ul className="divide-y divide-border">
              {channels.map((c) => (
                <li key={c.key} className="py-3 flex items-center gap-4">
                  <span className="text-fg-muted w-4">{c.icon}</span>
                  <span className="mono text-sm text-accent w-24">{c.key}:</span>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="mono text-sm text-fg hover:text-accent break-all"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex gap-3 flex-wrap">
            <a href="mailto:bhava008@d.umn.edu" className="btn btn-primary">
              <FaEnvelope /> send email
            </a>
            <a
              href="/Varshini_Bhavanam_Resume.pdf"
              download
              className="btn"
            >
              download resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
