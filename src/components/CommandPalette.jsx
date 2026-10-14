import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { EMAIL, GITHUB_URL, GITHUB_USER, LINKEDIN_URL, RESUME_PATH } from "../data/profile";

// Static command list. Add more items here.
const commands = [
  { id: "home", label: "Go to Home", hint: "/", type: "nav", target: "/" },
  { id: "about", label: "About Me", hint: "/about", type: "nav", target: "/about" },
  { id: "projects", label: "Projects", hint: "/projects", type: "nav", target: "/projects" },
  { id: "pubs", label: "Publications", hint: "/publications", type: "nav", target: "/publications" },
  { id: "certs", label: "Certifications", hint: "/certificates", type: "nav", target: "/certificates" },
  { id: "contact", label: "Contact", hint: "/contact", type: "nav", target: "/contact" },
  {
    id: "resume",
    label: "Download Resume (PDF)",
    hint: "action",
    type: "download",
    target: RESUME_PATH,
  },
  {
    id: "email",
    label: `Email me — ${EMAIL}`,
    hint: "action",
    type: "external",
    target: `mailto:${EMAIL}`,
  },
  {
    id: "gh",
    label: `GitHub — @${GITHUB_USER}`,
    hint: "external",
    type: "external",
    target: GITHUB_URL,
  },
  {
    id: "li",
    label: "LinkedIn",
    hint: "external",
    type: "external",
    target: LINKEDIN_URL,
  },
  {
    id: "healthinf",
    label: "Publication · HEALTHINF 2026",
    hint: "download",
    type: "external",
    target: "/HEALTHINF_2026_Digital_Interventions.pdf",
  },
  {
    id: "icict",
    label: "Publication · ICICT 2025",
    hint: "download",
    type: "external",
    target: "/ICICT_Mental_Health_and_Robotics.pdf",
  },
];

const fuzzyScore = (q, s) => {
  q = q.toLowerCase();
  s = s.toLowerCase();
  if (!q) return 1;
  if (s.includes(q)) return 2;
  // simple subsequence match
  let i = 0;
  let hit = 0;
  for (const ch of s) {
    if (ch === q[i]) {
      i++;
      hit++;
      if (i === q.length) return 1 + hit / s.length;
    }
  }
  return 0;
};

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      // Focus input on open
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    return commands
      .map((c) => ({ ...c, _score: fuzzyScore(query, c.label + " " + c.hint) }))
      .filter((c) => c._score > 0)
      .sort((a, b) => b._score - a._score);
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const run = (cmd) => {
    if (!cmd) return;
    close();
    if (cmd.type === "nav") {
      navigate(cmd.target);
    } else if (cmd.type === "download") {
      const a = document.createElement("a");
      a.href = cmd.target;
      a.download = "";
      a.click();
    } else if (cmd.type === "external") {
      window.open(cmd.target, cmd.target.startsWith("mailto") ? "_self" : "_blank");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[active]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 backdrop-blur-sm"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-lg border border-amber-900/60 bg-black/95 shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 0 40px rgba(255, 153, 102, 0.25)" }}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-amber-900/40">
          <FaSearch className="text-amber-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search — jump to a page, open a link, download resume…"
            className="flex-grow bg-transparent border-none outline-none text-gray-100 placeholder:text-gray-500 font-mono text-sm"
          />
          <kbd className="text-xs text-gray-500 border border-gray-700 rounded px-1.5 py-0.5 font-mono">
            esc
          </kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-gray-500">
              No matches.
            </li>
          )}
          {filtered.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => run(c)}
                className={`w-full flex items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors ${
                  i === active
                    ? "bg-amber-500/10 text-amber-200"
                    : "text-gray-300 hover:bg-amber-500/5"
                }`}
              >
                <span className="text-sm">{c.label}</span>
                <span className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-gray-500">
                    {c.hint}
                  </span>
                  <FaArrowRight
                    className={`text-xs ${
                      i === active ? "text-amber-400" : "text-gray-600"
                    }`}
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="px-4 py-2 border-t border-amber-900/40 flex justify-between text-[11px] text-gray-500 font-mono">
          <span>
            <kbd className="border border-gray-700 rounded px-1">↑</kbd>{" "}
            <kbd className="border border-gray-700 rounded px-1">↓</kbd> navigate
          </span>
          <span>
            <kbd className="border border-gray-700 rounded px-1">↵</kbd> select
          </span>
          <span>
            <kbd className="border border-gray-700 rounded px-1">⌘K</kbd> toggle
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
