import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Shared pieces of the blueprint look: the fixed grid behind every page and
// the "sheet" title block at the top of each page.

export const BlueprintBackdrop = () => (
  <div aria-hidden="true" className="blueprint-backdrop" />
);

export const SheetHeader = ({ sheet, kicker, title, sub, align = "center" }) => {
  const centred = align === "center";
  return (
    <header className={`w-full max-w-7xl mx-auto mb-12 ${centred ? "text-center" : ""}`}>
      <motion.div
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-500/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        sheet {sheet} · {kicker}
      </motion.div>
      <motion.h1
        className="mt-3 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>
      {sub && (
        <motion.p
          className={`mt-4 text-gray-400 max-w-2xl ${centred ? "mx-auto" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {sub}
        </motion.p>
      )}
      <motion.div
        className={`dim-rule mt-6 ${centred ? "mx-auto" : ""}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: centred ? "center" : "left" }}
      />
    </header>
  );
};

SheetHeader.propTypes = {
  sheet: PropTypes.string.isRequired,
  kicker: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  sub: PropTypes.node,
  align: PropTypes.oneOf(["center", "left"]),
};
