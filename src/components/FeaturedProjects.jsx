import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaBookOpen, FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";
import { featured } from "../data/projects";
import { TechIcon } from "./techIcons";

const linkClass =
  "inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition";

// Cards for the projects flagged `featured` in src/data/projects.js, with
// direct links (case study / live / source) so visitors don't have to open a
// dialog to click through.
const FeaturedCard = ({ project, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="relative flex flex-col h-full p-5 md:p-6 rounded-lg border border-amber-900/50 bg-black/60 backdrop-blur-md hover:border-amber-500/50 transition-colors"
  >
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
    <h3 className="text-lg font-semibold text-amber-400">{project.name}</h3>
    <p className="text-xs text-amber-300/70 italic mt-1 mb-2">
      {[project.org || "Personal", project.role].filter(Boolean).join(" · ")}
    </p>
    <p className="text-sm text-gray-300 flex-grow">{project.desc}</p>
    <div className="flex flex-wrap gap-3 mt-4">
      {project.techstackicons.map((tech) => (
        <TechIcon key={tech} name={tech} className="w-5 h-5" />
      ))}
    </div>
    <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-amber-900/40">
      {project.caseStudy && (
        <Link to={project.caseStudy} className={linkClass}>
          <FaBookOpen /> case study →
        </Link>
      )}
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <FaExternalLinkAlt /> live
        </a>
      )}
      {project.code && (
        <a href={project.code} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <FaGithub /> source
        </a>
      )}
      {!project.caseStudy && !project.link && !project.code && (
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500">
          <FaLock /> private repo
        </span>
      )}
    </div>
  </motion.article>
);

FeaturedCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    org: PropTypes.string,
    role: PropTypes.string,
    desc: PropTypes.string.isRequired,
    screenshot: PropTypes.string,
    techstackicons: PropTypes.arrayOf(PropTypes.string).isRequired,
    caseStudy: PropTypes.string,
    link: PropTypes.string,
    code: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const FeaturedProjects = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
    {featured.map((p, i) => (
      <FeaturedCard key={p.name} project={p} index={i} />
    ))}
  </div>
);

export default FeaturedProjects;
