import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectModal from "./ProjectModal"; 
import { getTechIcon } from "./TechIcons";

const projects = [
  { 
    name: "StyleSync - Fashion Collaboration App", 
    desc: "A full-stack fashion platform offering AI-powered outfit recommendations and AR try-on features, built with React.js, Node.js, Express.js, and MongoDB.",
    link: "", 
    code: "", 
    techstackused: "React.js, Node.js, Express.js, MongoDB, Firebase",
    techstackicons: ["reactjs", "nodejs", "expressjs", "mongodb", "firebase"]
  },
  { 
    name: "PantryPal - Mobile App", 
    desc: "Developing a mobile app that assists low-income families with meal planning and food assistance, using secure data management and machine learning for meal suggestions.",
    link: "", 
    code: "", 
    techstackused: "Flutter, Firebase, Python (Machine Learning)",
    techstackicons: ["flutter", "firebase", "python"]
  }
];

const shineKeyframes = `
  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const navigateToContact = () => {
    navigate('/contact');
  };

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative" style={{ background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)", position: "relative", padding: "6rem 2rem" }}>
      <style dangerouslySetInnerHTML={{ __html: shineKeyframes }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px" style={{ top: `${i * 5}%`, background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)', opacity: '0.3' }} />
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px" style={{ left: `${i * 5}%`, background: 'linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)', opacity: '0.3' }} />
        ))}
      </div>

      <motion.h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-12 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textShadow: "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)", marginBottom: "2rem", marginTop: "2rem" }}>
        Projects
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto z-10">
        {projects.map((project, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedProject(project)} className="relative cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:border-amber-500/50">
            <div className="relative p-6 bg-black/60 backdrop-blur-md rounded-lg border border-amber-900/50 overflow-hidden h-full">
              <h3 className="text-xl font-semibold text-amber-400 mb-2 relative z-10">{project.name}</h3>
              <p className="text-gray-300 mb-4 relative z-10">{project.desc}</p>

              {/* Tech stack icons */}
              <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                {project.techstackicons.map((tech, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }} transition={{ duration: 0.3 }} className="text-2xl text-amber-500">
                    {getTechIcon(tech)}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};

export default Projects;
