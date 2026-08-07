// Header.jsx
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "../context/ModeContext";
import ModeToggle from "./ModeToggle";

const WORK_LINKS = ["Home", "About", "Projects", "Certificates", "Publications", "Contact"];
const PERSONAL_LINKS = ["Home", "Contact"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { mode } = useMode();
  const isPersonal = mode === "personal";
  const links = isPersonal ? PERSONAL_LINKS : WORK_LINKS;

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

  const accent = isPersonal ? "text-rose-200 hover:text-rose-100" : "text-amber-400 hover:text-amber-300";
  const accentBorder = isPersonal ? "border-rose-300/40 hover:bg-rose-300/10" : "border-amber-400/50 hover:bg-amber-400/10";

  return (
    <header
      className={`fixed top-0 w-full px-4 md:px-8 py-4 flex items-center justify-between z-50 transition-all duration-500 ${
        scrolled
          ? isPersonal
            ? "bg-[#1a0a12]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(252,162,119,0.18)]"
            : "bg-black/80 backdrop-blur-md shadow-[0_4px_20px_rgba(255,153,102,0.15)]"
          : isPersonal
          ? "bg-[#1a0a12]/40 backdrop-blur-sm"
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="absolute bottom-0 left-0 h-px w-full overflow-hidden">
        <motion.div
          className={`h-px w-full bg-gradient-to-r from-transparent ${isPersonal ? "via-rose-300" : "via-amber-400"} to-transparent`}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      </div>

      {/* Logo */}
      <div className="relative flex items-center gap-3">
        <Link to="/" aria-label="Home">
          <img
            src="/VD.png"
            alt="Varshini Bhavanam Portfolio Logo"
            className="h-12 cursor-pointer hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
            }}
          />
        </Link>
        <div
          className={`absolute -inset-1 blur-md rounded-full -z-10 ${
            isPersonal ? "bg-rose-400 opacity-20" : "bg-amber-500 opacity-20"
          }`}
        />
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-6 items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
            className="flex gap-6 items-center"
          >
            {links.map((link) => (
              <Link
                key={link}
                to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
                className={`text-lg relative group ${
                  isPersonal ? "text-stone-200 font-serif italic" : "text-gray-300"
                }`}
                style={
                  isPersonal
                    ? { fontFamily: '"Cormorant Garamond", Georgia, serif' }
                    : undefined
                }
              >
                <span className={`relative z-10 ${isPersonal ? "hover:text-rose-200" : "hover:text-amber-400"}`}>
                  {link}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${
                    isPersonal ? "bg-rose-300" : "bg-amber-400"
                  }`}
                />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {!isPersonal && (
          <a
            href="/Varshini_Bhavanam_Resume.pdf"
            download="Varshini_Bhavanam_Resume.pdf"
            className={`ml-2 transition text-lg flex items-center gap-1 px-3 py-1 border rounded ${accent} ${accentBorder}`}
            aria-label="Download Resume"
          >
            <FaDownload className="text-sm" />
            <span className="text-sm font-semibold hidden md:inline">Resume</span>
          </a>
        )}

        <div className="ml-2">
          <ModeToggle />
        </div>
      </nav>

      {/* Mobile toggle + menu button */}
      <div className="flex items-center gap-3 md:hidden">
        <ModeToggle />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`text-2xl relative ${isPersonal ? "text-stone-100" : "text-gray-200"}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes className="relative z-10" /> : <FaBars className="relative z-10" />}
        </button>
      </div>

      <div
        className={`absolute top-full right-4 w-56 mt-2 backdrop-blur-md border rounded-lg shadow-lg md:hidden transition-all duration-300 overflow-hidden ${
          isPersonal ? "bg-[#241118]/95 border-rose-300/30" : "bg-gray-900/90 border-amber-900/50"
        } ${isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <div className="py-2">
          {links.map((link) => (
            <Link
              key={link}
              to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 transition-colors ${
                isPersonal
                  ? "text-stone-200 hover:bg-rose-300/10 hover:text-rose-100 font-serif italic"
                  : "text-gray-300 hover:bg-amber-900/30 hover:text-amber-400"
              }`}
              style={
                isPersonal
                  ? { fontFamily: '"Cormorant Garamond", Georgia, serif' }
                  : undefined
              }
            >
              {link}
            </Link>
          ))}
        </div>
        {!isPersonal && (
          <div className="px-4 py-2 border-t flex items-center justify-between border-amber-900 bg-black">
            <a
              href="/Varshini_Bhavanam_Resume.pdf"
              download="Varshini_Bhavanam_Resume.pdf"
              className="text-amber-400 hover:text-amber-300 transition text-sm flex items-center gap-2 px-3 py-1 border border-amber-400/50 rounded hover:bg-amber-400/10"
              aria-label="Download Resume"
            >
              <FaDownload />
              <span>Resume</span>
            </a>
          </div>
        )}
      </div>

      {!isPersonal && (
        <div className="absolute inset-0 pointer-events-none bg-scanline opacity-5"></div>
      )}
    </header>
  );
};

export default Header;
