import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

// Image path - Vite serves public files with the base path
const imageSrc = "/portfolio-website/image.JPG";

const ContactMe = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative transition-colors duration-300 bg-black"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
        position: "relative",
        paddingTop: "6rem",   // ⭐ ADDED FIX — moves the whole section down
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={`h-${i}`} 
            className="absolute w-full h-px" 
            style={{ 
              top: `${i * 5}%`, 
              background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
              opacity: '0.3'
            }} 
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`v-${i}`} 
            className="absolute h-full w-px" 
            style={{ 
              left: `${i * 5}%`, 
              background: 'linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
              opacity: '0.3'
            }} 
          />
        ))}
      </div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textShadow: "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)"
        }}
      >
        Contact Me
      </motion.h1>

      {/* Profile Image */}
      <motion.div
        className="mb-8 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="relative inline-block">
          <motion.img
            src={`${imageSrc}?v=${Date.now()}`}
            alt="Varshini Bhavanam"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-amber-400/50 shadow-lg"
            style={{
              boxShadow: "0 0 20px rgba(255, 153, 102, 0.5), 0 0 40px rgba(255, 153, 102, 0.3)"
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              console.error("Image failed to load from:", e.target.src);
              // Try fallback path for GitHub Pages deployment
              if (e.target.src === window.location.origin + '/image.JPG') {
                e.target.src = '/portfolio-website/image.JPG';
              }
            }}
          />
          <div className="absolute -inset-2 rounded-full border-2 border-amber-400/30 animate-pulse"></div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        className="text-xl mb-8 text-center space-y-2 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p>
          Phone: <a href="tel:+16513591842" className="transition text-amber-400 hover:text-amber-300">651-359-1842</a>
        </p>
        <p>
          Email: <a href="mailto:bhava008@d.umn.edu" className="transition text-amber-400 hover:text-amber-300">bhava008@d.umn.edu</a>
        </p>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        className="flex flex-wrap justify-center gap-10 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <a href="https://github.com/varsha698" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub className="text-4xl transition hover:text-amber-400" />
        </a>
        <a href="https://www.linkedin.com/in/varshinikb/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin className="text-4xl transition hover:text-amber-400" />
        </a>
        <a href="mailto:bhava008@d.umn.edu" aria-label="Email">
          <FaEnvelope className="text-4xl transition hover:text-amber-400" />
        </a>
      </motion.div>

      <motion.p
        className="mt-12 text-center max-w-2xl px-4 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Feel free to reach out for collaborations, projects, or just to say hi!
      </motion.p>
    </section>
  );
};

export default ContactMe;
