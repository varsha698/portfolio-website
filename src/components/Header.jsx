import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaDownload, FaGithub } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "home", path: "/" },
  { label: "about", path: "/about" },
  { label: "projects", path: "/projects" },
  { label: "publications", path: "/publications" },
  { label: "certificates", path: "/certificates" },
  { label: "contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 4);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const current = links.find((l) => l.path === location.pathname)?.label || "home";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-border" : "bg-bg/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
        <Link to="/" aria-label="Home" className="font-mono text-sm text-fg hover:text-accent transition-colors">
          <span className="text-accent">vb</span>
          <span className="text-fg-muted">@</span>
          <span className="text-fg">portfolio</span>
          <span className="text-fg-muted">:</span>
          <span className="text-accent-link">~/{current}</span>
          <span className="text-accent">$</span>
          <span className="blink text-fg-muted">_</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 font-mono text-sm">
          {links.map((l) => {
            const active = location.pathname === l.path;
            return (
              <Link
                key={l.path}
                to={l.path}
                className={`px-3 py-1.5 rounded transition-colors ${
                  active
                    ? "text-accent bg-bg-raised"
                    : "text-fg-muted hover:text-fg hover:bg-bg-surface"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <span className="w-px h-4 bg-border mx-2" aria-hidden="true" />
          <a
            href="https://github.com/varsha698"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 text-fg-muted hover:text-accent transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="/Varshini_Bhavanam_Resume.pdf"
            download
            className="ml-1 btn"
            aria-label="Download resume"
          >
            <FaDownload className="text-xs" />
            <span>resume.pdf</span>
          </a>
        </nav>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden p-2 text-fg-muted hover:text-accent border border-transparent"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-200 border-t border-border ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col font-mono text-sm bg-bg-surface">
          {links.map((l) => {
            const active = location.pathname === l.path;
            return (
              <Link
                key={l.path}
                to={l.path}
                className={`px-5 py-3 border-b border-border ${
                  active ? "text-accent" : "text-fg-muted"
                }`}
              >
                <span className="text-faint mr-2">›</span>
                {l.label}
              </Link>
            );
          })}
          <a
            href="/Varshini_Bhavanam_Resume.pdf"
            download
            className="px-5 py-3 text-fg flex items-center gap-2"
          >
            <FaDownload className="text-xs" />
            resume.pdf
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
