/* global __BUILD_DATE__ */
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GITHUB_URL, LINKEDIN_URL } from "../data/profile";

// The footer is drawn as an engineering drawing's title block. The sheet
// numbers match the SheetHeader on each page.
const SHEETS = {
  "": ["01", "Home"],
  "/about": ["02", "About"],
  "/projects": ["03", "Projects"],
  "/projects/sales-tax": ["03a", "Case study · sales tax"],
  "/projects/proxmox": ["03b", "Case study · servers"],
  "/certificates": ["04", "Certifications"],
  "/publications": ["05", "Publications"],
  "/contact": ["06", "Contact"],
};

const BUILD_DATE = typeof __BUILD_DATE__ === "string" ? __BUILD_DATE__ : "";

const Cell = ({ label, children, className = "" }) => (
  <div className={`px-3 py-2 border-amber-900/60 ${className}`}>
    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-amber-500/60">
      {label}
    </div>
    <div className="mt-0.5 text-sm text-gray-200">{children}</div>
  </div>
);

Cell.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

const Footer = () => {
  const { pathname } = useLocation();
  const [sheet, title] = SHEETS[pathname.replace(/\/$/, "")] || ["—", "Portfolio"];

  return (
    <footer className="relative z-10 w-full px-4 md:px-8 py-10">
      <div className="bp-corner relative max-w-7xl mx-auto border border-amber-800/70 bg-black/70 backdrop-blur-sm grid grid-cols-2 md:grid-cols-6 text-left">
        <Cell label="Project" className="col-span-2 md:col-span-2 border-b md:border-b-0 md:border-r">
          varshinibhavanam.com
        </Cell>
        <Cell label="Drawn by" className="border-b md:border-b-0 border-r">
          Varshini Bhavanam
        </Cell>
        <Cell label="Sheet" className="border-b md:border-b-0 md:border-r">
          <span className="font-mono">{sheet}</span> · {title}
        </Cell>
        <Cell label="Rev" className="border-r">
          <span className="font-mono">{BUILD_DATE || "current"}</span>
        </Cell>
        <Cell label="Links">
          <span className="flex gap-4 text-lg">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-300 hover:text-amber-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-amber-400 transition"
            >
              <FaLinkedin />
            </a>
          </span>
        </Cell>
      </div>
      <p className="mt-3 text-center font-mono text-[10px] text-gray-500">
        © {new Date().getFullYear()} Varshini Bhavanam · scale 1:1
        <span className="hidden md:inline"> · press ⌘K</span>
      </p>
    </footer>
  );
};

export default Footer;
