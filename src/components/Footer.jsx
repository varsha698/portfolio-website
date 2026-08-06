import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";

const Footer = () => {
  const [scrolled, setScrolled] = useState(false);

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

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/varsha698", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/varshinikb/", label: "LinkedIn" },
  ];

  return (
    <footer className={`relative w-full px-4 md:px-8 py-6 flex flex-col items-center z-10 transition-all duration-300 ${
      scrolled 
        ? "backdrop-blur-md"
        : "backdrop-blur-sm"
    }`}
    style={{
      backgroundColor: scrolled 
        ? "rgba(0, 0, 0, 0.8)" 
        : "rgba(0, 0, 0, 0.4)"
    }}
    >
      {/* Top animated border */}
      <div className="absolute top-0 left-0 h-px w-full overflow-hidden">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-[moveGradient_4s_linear_infinite]" />
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-4">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-2xl relative group text-gray-300">
            <span className="relative z-10 hover:text-amber-400">{link.icon}</span>
            <span className="absolute -inset-2 -z-10 opacity-0 group-hover:opacity-20 bg-amber-400 blur-md rounded-full transition-opacity duration-300"></span>
          </a>
        ))}
      </div>

      {/* Resume Download */}
      <div className="mb-4">
        <a
          href="/portfolio-website/Varshini_Bhavanam_Resume.pdf"
          download="Varshini_Bhavanam_Resume.pdf"
          className="inline-flex items-center gap-2 px-4 py-2 text-amber-400 border border-amber-400/50 rounded-lg hover:bg-amber-400/10 hover:border-amber-400 transition-all duration-300 text-sm font-semibold relative group"
        >
          <FaDownload className="text-lg" />
          <span>Download Resume</span>
          <span className="absolute -inset-1 bg-amber-500 opacity-0 group-hover:opacity-10 blur-md rounded-lg transition-opacity duration-300"></span>
        </a>
      </div>

      {/* Copyright */}
      <div className="relative">
        <p className="text-sm text-gray-400">© Varshini Bhavanam 2025</p>
        <div className="absolute -inset-1 bg-amber-500 opacity-0 hover:opacity-10 blur-md rounded-full -z-10 transition-opacity duration-300"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-5"></div>
    </footer>
  );
};

export default Footer;
