import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-bg-surface border border-border rounded-md overflow-hidden max-h-[85vh] flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-bg-raised">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="mono text-xs text-fg-muted ml-3">
              ~/projects/{project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-fg-muted hover:text-accent p-1 border border-transparent hover:border-border rounded"
          >
            <FaTimes />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <p className="section-label">project</p>
          <h2 className="mono text-xl md:text-2xl text-fg mt-1 font-semibold">
            {project.name}
          </h2>

          <p className="text-fg mt-4 leading-relaxed">{project.desc}</p>

          <div className="mt-6">
            <p className="section-label mb-2">stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="section-label mb-2">category</p>
            <p className="mono text-sm text-accent">{project.category}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <FaGithub /> source
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FaExternalLinkAlt className="text-xs" /> live demo
              </a>
            )}
            {!project.repo && !project.demo && (
              <p className="mono text-sm text-fg-muted">
                <span className="comment">private repository</span>
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
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired,
    repo: PropTypes.string,
    demo: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ProjectModal;
