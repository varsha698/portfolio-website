import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/varsha698" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/varshinikb/" },
    { icon: <FaYoutube />, url: "https://www.youtube.com" },
  ];

  return (
    <footer className={`relative w-full px-4 md:px-8 py-6 flex flex-col items-center z-10 transition-all duration-300 ${
      scrolled ? "bg-black/80 backdrop-blur-md" : "bg-black/40 backdrop-blur-sm"
    }`}>
      {/* Top animated border */}
      <div className="absolute top-0 left-0 h-px w-full overflow-hidden">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-[moveGradient_4s_linear_infinite]" />
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-4">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-300 text-2xl relative group">
            <span className="relative z-10 hover:text-amber-400">{link.icon}</span>
            <span className="absolute -inset-2 -z-10 opacity-0 group-hover:opacity-20 bg-amber-400 blur-md rounded-full transition-opacity duration-300"></span>
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div className="relative">
        <p className="text-gray-400 text-sm">© Varshini Bhavanam 2025</p>
        <div className="absolute -inset-1 bg-amber-500 opacity-0 hover:opacity-10 blur-md rounded-full -z-10 transition-opacity duration-300"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-5"></div>
    </footer>
  );
};

export default Footer;
