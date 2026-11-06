import PropTypes from "prop-types";
import { toggleDrawingMode, useDrawingMode } from "../utils/drawingMode";

// Header switch between the rendered and wireframe views.
export const DrawingModeToggle = ({ className = "" }) => {
  const mode = useDrawingMode();
  const wire = mode === "wireframe";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={wire}
      aria-label="Wireframe view"
      title={wire ? "Switch to the rendered view" : "Switch to the wireframe view"}
      onClick={toggleDrawingMode}
      className={`relative inline-flex items-center rounded border border-amber-400/50 p-0.5 font-mono text-[10px] uppercase tracking-wider ${className}`}
    >
      <span
        aria-hidden="true"
        data-fill
        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-sm bg-amber-400/20 transition-transform duration-300 ${
          wire ? "translate-x-full" : "translate-x-0"
        }`}
      />
      <span className={`relative z-10 px-2 py-0.5 ${wire ? "text-gray-500" : "text-amber-300"}`}>render</span>
      <span className={`relative z-10 px-2 py-0.5 ${wire ? "text-amber-300" : "text-gray-500"}`}>wire</span>
    </button>
  );
};

DrawingModeToggle.propTypes = { className: PropTypes.string };
