// Header.jsx
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("theme") || "light");

  const links = ["Home", "About", "Projects", "Certificates", "Contact"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.className = selectedTheme;
    localStorage.setItem("theme", selectedTheme);
  }, [selectedTheme]);

  const toggleTheme = () => {
    const nextTheme = selectedTheme === "dark" ? "light" : "dark";
    setSelectedTheme(nextTheme);
  };

  return (
    <header className={`fixed top-0 w-full px-4 md:px-8 py-4 flex items-center justify-between z-50 transition-all duration-300 ${
      scrolled ? "bg-black/80 backdrop-blur-md shadow-[0_4px_20px_rgba(255,153,102,0.15)]" : "bg-black/40 backdrop-blur-sm"
    }`}>
      <div className="absolute bottom-0 left-0 h-px w-full overflow-hidden">
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      </div>

      <div className="relative">
        <img
          src="/portfolio-app/VD.png"
          alt="Logo header"
          className="h-12 cursor-pointer hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute -inset-1 bg-amber-500 opacity-20 blur-md rounded-full -z-10"></div>
      </div>

      <nav className="hidden md:flex gap-6 items-center">
        {links.map((link) => (
          <Link
            key={link}
            to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
            className="text-gray-300 text-lg relative group"
          >
            <span className="relative z-10 hover:text-amber-400">{link}</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 bg-amber-400 blur-sm rounded transition-opacity duration-300"></span>
          </Link>
        ))}
        <button onClick={toggleTheme} className="ml-4 text-amber-400 hover:text-white transition text-xl" aria-label="Toggle Theme">
          {selectedTheme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </nav>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl text-gray-200 md:hidden relative" aria-label="Toggle menu">
        <span className="absolute -inset-2 bg-amber-500 opacity-0 hover:opacity-20 blur-md rounded-full transition-opacity duration-300"></span>
        {isMenuOpen ? <FaTimes className="relative z-10" /> : <FaBars className="relative z-10" />}
      </button>

      <div className={`absolute top-full right-4 w-56 mt-2 bg-gray-900/90 backdrop-blur-md border border-amber-900/50 rounded-lg shadow-lg md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      }`}>
        <div className="py-2">
          {links.map((link) => (
            <Link
              key={link}
              to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:bg-amber-900/30 hover:text-amber-400 transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-amber-900 bg-black flex justify-end">
          <button onClick={toggleTheme} className="text-amber-400 hover:text-white transition text-xl">
            {selectedTheme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
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
