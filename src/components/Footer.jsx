import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-content mx-auto px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-fg-muted">
          <span className="text-accent">$</span> echo &quot;© {year} varshini bhavanam&quot;
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/varsha698"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/varshinikb/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:bhava008@d.umn.edu"
            aria-label="Email"
            className="text-fg-muted hover:text-accent transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
