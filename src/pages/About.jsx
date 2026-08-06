import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "Dec 2025 (Expected)",
    title: "Bachelor of Science in Computer Science",
    desc: "University of Minnesota - Duluth. Relevant coursework: Computer Security, Operating Systems, Software Engineering, Natural Language Processing, Mobile User Experience and Design, Automata and Formal Languages, and Sensors and Internet of things.",
    iconPath: "icons/umd_logo.png",
    path: "https://www.d.umn.edu/",
  },
  {
    year: "Feb 2025 – Apr 2025",
    title: "EHR Data Migration Intern",
    desc: "St. Luke's Aspirus Administration, Duluth, MN. Migrated and validated patient data from Meditech to Epic, improving data consistency and accuracy. Processed and reconciled structured clinical records with attention to detail and HIPAA compliance.",
    iconPath: "icons/stlukes_logo.jpg",
    path: "https://www.slhduluth.com/",
  },
  {
    year: "Sep 2024 – May 2025",
    title: "Undergraduate Research Assistant",
    desc: "University of Minnesota Duluth. Developed a mobile app that uses gamification to support mental wellness among students. Assisted in literature review, app prototyping, and IRB documentation.",
    iconPath: "icons/umd_logo.png",
    path: "https://www.d.umn.edu/",
  },
  {
    year: "Aug 2024 – Present",
    title: "Intern – International Student Services",
    desc: "Managing student data in Sunapsis and supporting international student onboarding, orientation, and engagement at UMD.",
    iconPath: "icons/umd_iss_logo.png",
    path: "https://www.d.umn.edu/international/",
  },
];

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative transition-colors duration-300 bg-black"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
      }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px" style={{
            top: `${i * 5}%`,
            background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.2), transparent)",
            opacity: "0.3",
          }} />
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px" style={{
            left: `${i * 5}%`,
            background: "linear-gradient(0deg, transparent, rgba(0,255,255,0.2), transparent)",
            opacity: "0.3",
          }} />
        ))}
      </div>

      {/* Scanline */}
      <motion.div className="fixed inset-0 pointer-events-none z-50 opacity-10"
        style={{
          background: "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
          backgroundSize: "100% 4px"
        }}
        animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />

<motion.h1
  className="pt-24 text-5xl md:text-6xl font-bold text-center drop-shadow-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  style={{
    textShadow: `
      0 0 10px rgba(255, 153, 102, 0.8),
      0 0 20px rgba(255, 153, 102, 0.6),
      0 0 40px rgba(255, 153, 102, 0.5)
    `,
    marginBottom: "3rem",
  }}
>
  My Journey
</motion.h1>



      <div className="relative w-full max-w-4xl mx-auto">
        {/* Timeline line + moving node */}
        <div className="absolute w-1 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 h-full left-1/2 transform -translate-x-1/2">
          <motion.div className="absolute w-3 h-3 rounded-full bg-amber-400 left-1/2 transform -translate-x-1/2"
            animate={{
              top: ["0%", "100%", "0%"],
              boxShadow: [
                "0 0 10px 2px rgba(255, 153, 102, 0.7)",
                "0 0 15px 3px rgba(255, 153, 102, 0.7)",
                "0 0 10px 2px rgba(255, 153, 102, 0.7)"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Timeline entries */}
        {timeline.map((event, index) => (
          <motion.div
            key={index}
            className={`flex items-center w-full my-12 relative ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Icon */}
            <div className="absolute z-20 w-16 h-16 flex items-center justify-center md:left-1/2 md:transform md:-translate-x-1/2 left-0">
              <motion.div
                className="w-12 h-12 rounded-full bg-gray-900 border-2 border-amber-500/50 overflow-hidden relative"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                style={{ boxShadow: "0 0 10px rgba(255, 153, 102, 0.5)" }}
              >
                <a href={event.path} target="_blank" rel="noopener noreferrer" className="block w-full h-full flex items-center justify-center">
                  <img
                    src={event.iconPath}
                    alt={`${event.title} icon`}
                    className="w-10 h-10 object-contain rounded-full"
                    style={{ padding: "4px", backgroundColor: "#fff" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "icons/default.png";
                    }}
                  />
                </a>
                <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-50"></div>
              </motion.div>
            </div>

            {/* Content */}
            <div className={`relative ${index % 2 === 0 ? "md:mr-12 ml-8 md:ml-0" : "md:ml-12 ml-8"} w-4/5 md:w-5/12 mt-4 md:mt-0`}>
              <motion.div
                className="relative p-6 rounded-lg backdrop-blur-md border overflow-hidden transition-colors duration-300 bg-black/60 border-amber-900/50"
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(255, 153, 102, 0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="text-xl font-semibold text-amber-300">{event.title}</h3>
                <p className="text-sm italic mb-2 text-orange-400">{event.year}</p>
                <p className="text-gray-300">{event.desc}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default About;
