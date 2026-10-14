import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FaLock } from "react-icons/fa";
import ProjectModal from "./ProjectModal";
import { professional, personal } from "../data/projects";
import { TechIcon } from "../components/techIcons";

const ProjectCard = ({ project, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
    viewport={{ once: true, amount: 0.1 }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`${project.name} — details`}
    className="relative cursor-pointer group rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
  >
    <div className="relative p-6 backdrop-blur-md rounded-lg border overflow-hidden h-full transition-colors duration-300 bg-black/60 border-amber-900/50 group-hover:border-amber-500/50 flex flex-col">
      {project.screenshot && (
        <div className="mb-4 rounded-md overflow-hidden border border-amber-900/40">
          <img
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            className="w-full h-40 object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.parentElement.style.display = "none";
            }}
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-xl font-semibold text-amber-400">{project.name}</h3>
        {project.private && (
          <span
            className="flex-shrink-0 mt-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-amber-300/70 border border-amber-700/50 rounded px-2 py-0.5"
            title="Private repository"
          >
            <FaLock className="text-[9px]" /> private
          </span>
        )}
      </div>
      {(project.org || project.role) && (
        <p className="text-xs text-amber-300/70 italic mb-2">
          {[project.org, project.role].filter(Boolean).join(" · ")}
        </p>
      )}
      <p className="mb-4 text-gray-300 flex-grow">{project.desc}</p>
      <div className="flex flex-wrap gap-3 mt-auto">
        {project.techstackicons.map((tech) => (
          <TechIcon key={tech} name={tech} className="w-6 h-6" />
        ))}
      </div>
    </div>
  </motion.div>
);

const SectionHeader = ({ label, sub }) => (
  <div className="w-full max-w-7xl mx-auto mb-8">
    <motion.h2
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-2xl md:text-3xl font-bold text-amber-400"
      style={{ textShadow: "0 0 10px rgba(255, 153, 102, 0.4)" }}
    >
      {label}
    </motion.h2>
    {sub && <p className="text-sm text-gray-400 mt-1">{sub}</p>}
    <div className="mt-3 h-px w-full bg-gradient-to-r from-amber-400/60 via-amber-400/20 to-transparent" />
  </div>
);

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    org: PropTypes.string,
    role: PropTypes.string,
    desc: PropTypes.string.isRequired,
    private: PropTypes.bool,
    screenshot: PropTypes.string,
    techstackicons: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

SectionHeader.propTypes = {
  label: PropTypes.string.isRequired,
  sub: PropTypes.string,
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center overflow-hidden relative transition-colors duration-300 bg-black"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
        padding: "6rem 2rem",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${i * 5}%`,
              background:
                "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)",
              opacity: "0.3",
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px"
            style={{
              left: `${i * 5}%`,
              background:
                "linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)",
              opacity: "0.3",
            }}
          />
        ))}
      </div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textShadow:
            "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)",
          marginTop: "2rem",
        }}
      >
        Projects
      </motion.h1>
      <p className="text-center text-gray-400 mb-12 max-w-2xl relative z-10">
        Selected work — click any card for details.
      </p>

      <div className="relative z-10 w-full">
        <SectionHeader
          label="Professional"
          sub="Production systems at Xecutive Development LLC — team projects list what I built"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto mb-16">
          {professional.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i}
              onClick={() => setSelectedProject(p)}
            />
          ))}
        </div>

        <SectionHeader
          label="Personal & Open Source"
          sub="Side projects, tools and experiments"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {personal.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i}
              onClick={() => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
