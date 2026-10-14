import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaGithub, FaExternalLinkAlt, FaLock, FaCheck } from "react-icons/fa";
import { TechIcon } from "../components/techIcons";

const ProjectModal = ({ project, onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  if (!project) return null;

  const hasRealRepo = Boolean(project.code);
  const hasRealDemo = Boolean(project.link) && project.link !== project.code;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-y-auto p-4 md:p-8"
      onClick={onClose}
      style={{
        background:
          "radial-gradient(circle at center, rgba(15, 21, 35, 0.85) 0%, rgba(0, 0, 0, 0.95) 100%)",
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ scale: 0.96, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-3xl backdrop-blur-md rounded-lg border border-amber-900/50 bg-black/85 my-auto"
      >
        {/* Close */}
        <motion.button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-amber-400 hover:text-amber-300 focus:outline-none z-10"
          whileHover={{ scale: 1.15, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>

        <div className="p-6 md:p-8">
          {/* Header: org tag + private badge */}
          <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
            {project.org && (
              <span className="text-xs uppercase tracking-wider text-amber-300/80 italic">
                {project.org}
              </span>
            )}
            {project.private && (
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-amber-300/70 border border-amber-700/50 rounded px-2 py-0.5">
                <FaLock className="text-[9px]" /> private
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            id="project-modal-title"
            className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
            style={{ textShadow: "0 0 15px rgba(255, 153, 102, 0.3)" }}
          >
            {project.name}
          </h2>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed mb-6">
            {project.longDesc || project.desc}
          </p>

          {/* Features / Highlights */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-amber-300 mb-3">
                Highlights
              </h3>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm md:text-base text-gray-300 leading-relaxed"
                  >
                    <FaCheck className="text-amber-400 mt-1.5 flex-shrink-0 text-xs" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="text-sm uppercase tracking-wider text-amber-300 mb-3">
              Tech Stack
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              {project.techstackused || "Various technologies"}
            </p>
            {project.techstackicons && project.techstackicons.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.techstackicons.map((tech) => (
                  <TechIcon key={tech} name={tech} className="w-7 h-7" />
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-amber-900/40 mt-6">
            {hasRealDemo && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-black bg-amber-400 hover:bg-amber-300 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                style={{ boxShadow: "0 0 15px rgba(255, 153, 102, 0.35)" }}
              >
                <FaExternalLinkAlt className="text-xs" /> View Live
              </motion.a>
            )}
            {hasRealRepo && (
              <motion.a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-amber-400 border border-amber-400 hover:bg-amber-500/10 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <FaGithub /> View Source
              </motion.a>
            )}
            {!hasRealDemo && !hasRealRepo && (
              <p className="text-sm text-gray-500 italic">
                {project.private
                  ? "Private client repository — source not public."
                  : "Source not public yet."}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

ProjectModal.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    org: PropTypes.string,
    desc: PropTypes.string,
    longDesc: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    private: PropTypes.bool,
    techstackused: PropTypes.string,
    techstackicons: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string,
    code: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ProjectModal;
