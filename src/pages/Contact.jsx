import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactMe = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
        position: "relative",
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px" style={{ top: `${i * 5}%`, background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)', opacity: '0.3' }} />
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px" style={{ left: `${i * 5}%`, background: 'linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)', opacity: '0.3' }} />
        ))}
      </div>

      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textShadow: "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)"
        }}
      >
        Contact Me
      </motion.h1>

      {/* Email */}
      <motion.p
        className="text-xl text-gray-300 mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Email: <span className="text-amber-400">bhava008@d.umn.edu</span>
      </motion.p>

      {/* Social Icons */}
      <motion.div
        className="flex flex-wrap justify-center gap-10 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <a href="https://github.com/varsha698" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub className="text-4xl hover:text-amber-400 transition" />
        </a>
        <a href="https://linkedin.com/in/varshini-bhavanam-559b76339" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin className="text-4xl hover:text-amber-400 transition" />
        </a>
        <a href="mailto:bhava008@d.umn.edu" aria-label="Email">
          <FaEnvelope className="text-4xl hover:text-amber-400 transition" />
        </a>
      </motion.div>

      <motion.p
        className="text-gray-400 mt-12 text-center"
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
