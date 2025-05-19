import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Timeline Data - Varshini's Career
const timeline = [
  {
    year: "Dec 2025 (Expected)",
    title: "Bachelor's in Computer Science",
    desc: "Pursuing B.S. in Computer Science at University of Minnesota Duluth. Relevant coursework includes Software Engineering, Operating Systems, Computer Security, NLP, and Mobile UX/UI Design.",
    iconPath: "umd_logo.png",
    path: "https://www.d.umn.edu/",
  },
  {
    year: "Feb 2025 – Present",
    title: "EHR Data Migration Intern",
    desc: "At St. Luke’s Aspirus, migrating patient data from Meditech to Epic. Ensured data validation, accuracy, and HIPAA compliance.",
    iconPath: "stlukes_logo.jpg",
    path: "https://www.slhduluth.com/",
  },
  {
    year: "Sep 2024 – Present",
    title: "Undergraduate Research Assistant",
    desc: "Developing a mobile app that gamifies stress management. Contributed to IRB documentation, prototyping, and research.",
    iconPath: "umd_logo.png",
    path: "https://www.d.umn.edu/",
  },
  {
    year: "Aug 2024 – Present",
    title: "Intern – International Student Services",
    desc: "Managing student data in Sunapsis and supporting international student onboarding, orientation, and engagement at UMD.",
    iconPath: "umd_iss_logo.png",
    path: "https://www.d.umn.edu/international/",
  },
];

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative" style={{ background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)" }}>
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px" style={{ top: `${i * 5}%`, background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)', opacity: '0.3' }} />
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px" style={{ left: `${i * 5}%`, background: 'linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)', opacity: '0.3' }} />
        ))}
      </div>

      <motion.h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-12 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textShadow: "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)", marginTop: "0vh" }}>
        My Journey
      </motion.h1>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute w-1 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 h-full left-1/2 transform -translate-x-1/2"></div>

        {timeline.map((event, index) => (
          <motion.div key={index} className={`flex items-center w-full my-12 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.2 }} viewport={{ once: true, amount: 0.3 }}>
            {/* Icon */}
            <div className="absolute z-20 w-16 h-16 flex items-center justify-center md:left-1/2 md:transform md:-translate-x-1/2 left-0">
              <motion.div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-amber-500/50 overflow-hidden relative" whileHover={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 300, damping: 10 }} style={{ zIndex: 30, boxShadow: "0 0 10px rgba(255, 153, 102, 0.5)" }}>
                <a href={event.path || "#"} target="_blank" rel="noopener noreferrer" className="block w-full h-full flex items-center justify-center">
                  <img src={`/icons/${event.iconPath}`} alt={`${event.title} icon`} className="w-10 h-10 object-contain" onError={(e) => { e.target.onerror = null; e.target.src = "/fallback-icon.png"; }} />
                </a>
                <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-50"></div>
              </motion.div>
            </div>

            {/* Content */}
            <div className={`relative ${index % 2 === 0 ? 'md:mr-12 ml-8 md:ml-0' : 'md:ml-12 ml-8'} w-4/5 md:w-5/12 mt-4 md:mt-0`}>
              <motion.div className="relative p-6 rounded-lg bg-black/60 backdrop-blur-md border border-amber-900/50 overflow-hidden" whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(255, 153, 102, 0.2)" }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <h3 className="text-xl font-semibold text-amber-300">{event.title}</h3>
                <p className="text-sm italic text-orange-400 mb-2">{event.year}</p>
                <p className="text-gray-300">{event.desc}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
