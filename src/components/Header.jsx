// Header.jsx
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = ["Home", "About", "Projects", "Certificates", "Publications", "Contact"];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full px-4 md:px-8 py-4 flex items-center justify-between z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-black/80 backdrop-blur-md shadow-[0_4px_20px_rgba(255,153,102,0.15)]" 
        : "bg-black/40 backdrop-blur-sm"
    }`}>
      <div className="absolute bottom-0 left-0 h-px w-full overflow-hidden">
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      </div>

      <div className="relative">
        <Link to="/" aria-label="Home">
          <img
            src="/portfolio-website/VD.png"
            alt="Varshini Bhavanam Portfolio Logo"
            className="h-12 cursor-pointer hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        </Link>
        <div className="absolute -inset-1 bg-amber-500 opacity-20 blur-md rounded-full -z-10"></div>
      </div>

      <nav className="hidden md:flex gap-6 items-center">
        {links.map((link) => (
          <Link
            key={link}
            to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
            className="text-lg relative group text-gray-300"
          >
            <span className="relative z-10 hover:text-amber-400">{link}</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 bg-amber-400 blur-sm rounded transition-opacity duration-300"></span>
          </Link>
        ))}
        <a
          href="/portfolio-website/Varshini_Bhavanam_Resume.pdf"
          download="Varshini_Bhavanam_Resume.pdf"
          className="ml-4 text-amber-400 hover:text-amber-300 transition text-lg flex items-center gap-1 px-3 py-1 border border-amber-400/50 rounded hover:bg-amber-400/10"
          aria-label="Download Resume"
        >
          <FaDownload className="text-sm" />
          <span className="text-sm font-semibold hidden md:inline">Resume</span>
        </a>
      </nav>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl md:hidden relative text-gray-200" aria-label="Toggle menu">
        <span className="absolute -inset-2 bg-amber-500 opacity-0 hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
        {isMenuOpen ? <FaTimes className="relative z-10" /> : <FaBars className="relative z-10" />}
      </button>

      <div className={`absolute top-full right-4 w-56 mt-2 backdrop-blur-md border rounded-lg shadow-lg md:hidden transition-all duration-300 overflow-hidden bg-gray-900/90 border-amber-900/50 ${
        isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      }`}>
        <div className="py-2">
          {links.map((link) => (
            <Link
              key={link}
              to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 transition-colors text-gray-300 hover:bg-amber-900/30 hover:text-amber-400"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="px-4 py-2 border-t flex items-center justify-between border-amber-900 bg-black">
          <a
            href="/portfolio-website/Varshini_Bhavanam_Resume.pdf"
            download="Varshini_Bhavanam_Resume.pdf"
            className="text-amber-400 hover:text-amber-300 transition text-sm flex items-center gap-2 px-3 py-1 border border-amber-400/50 rounded hover:bg-amber-400/10"
            aria-label="Download Resume"
          >
            <FaDownload />
            <span>Resume</span>
          </a>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-5"></div>
    </header>
  );
};

const HeaderStyles = () => (
  <style jsx global>{`
    .bg-scanline {
      background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.5) 2px,
        rgba(0, 0, 0, 0.5) 4px
      );
    }
  `}</style>
);

const HeaderWithStyles = () => (
  <>
    <HeaderStyles />
    <Header />
  </>
);

export default HeaderWithStyles;
