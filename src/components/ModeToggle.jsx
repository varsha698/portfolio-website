import { motion } from "framer-motion";
import { useMode } from "../context/ModeContext";

const ModeToggle = () => {
  const { mode, toggle } = useMode();
  const isPersonal = mode === "personal";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isPersonal ? "work" : "personal"} mode`}
      className="relative flex items-center gap-2 rounded-full border px-1.5 py-1 transition-colors"
      style={{
        borderColor: isPersonal ? "rgba(186, 230, 253, 0.4)" : "rgba(251, 191, 36, 0.4)",
        backgroundColor: isPersonal ? "rgba(4, 24, 37, 0.6)" : "rgba(0, 0, 0, 0.4)",
      }}
    >
      <span
        className={`relative z-10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] transition-colors ${
          !isPersonal ? "text-black" : "text-amber-200/60"
        }`}
      >
        Work
      </span>
      <span
        className={`relative z-10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] transition-colors ${
          isPersonal ? "text-sky-950" : "text-sky-200/60"
        }`}
      >
        Personal
      </span>

      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 bottom-1 rounded-full"
        style={{
          left: isPersonal ? "50%" : "0.375rem",
          right: isPersonal ? "0.375rem" : "50%",
          background: isPersonal
            ? "linear-gradient(135deg, #bae6fd 0%, #7dd3fc 100%)"
            : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          boxShadow: isPersonal
            ? "0 0 20px rgba(125, 211, 252, 0.5)"
            : "0 0 20px rgba(251, 191, 36, 0.5)",
        }}
      />
    </button>
  );
};

export default ModeToggle;
