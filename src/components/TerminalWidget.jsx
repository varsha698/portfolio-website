import { useEffect, useState, useRef } from "react";

// Types out a sequence of shell commands + their responses. Cursor keeps
// blinking. Auto-scrolls the inner terminal to the latest line.
const LINES = [
  { prompt: true, text: "whoami" },
  { text: "varshini bhavanam · cs @ umn duluth" },
  { prompt: true, text: "pwd" },
  { text: "~/minneapolis/mn" },
  { prompt: true, text: "cat current_stack.txt" },
  { text: "rails 8 · next.js 16 · python · postgres · stripe" },
  { prompt: true, text: "ls projects/ | wc -l" },
  { text: "32" },
  { prompt: true, text: "echo $STATUS" },
  { text: "shipping ✨", status: true },
];

const TYPE_SPEED = 24; // ms per char
const LINE_PAUSE = 260; // ms between lines

const TerminalWidget = () => {
  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let idx = 0;

    const runLine = async () => {
      if (cancelled || idx >= LINES.length) {
        setDone(true);
        return;
      }
      const line = LINES[idx];
      // Type character-by-character
      for (let i = 0; i <= line.text.length; i++) {
        if (cancelled) return;
        setTyping(line.text.slice(0, i));
        await new Promise((r) => setTimeout(r, TYPE_SPEED));
      }
      setVisible((v) => [...v, line]);
      setTyping("");
      idx += 1;
      await new Promise((r) => setTimeout(r, LINE_PAUSE));
      runLine();
    };

    runLine();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [visible, typing]);

  // Currently-typing line context
  const nextLine = LINES[visible.length];
  const isTypingPrompt = nextLine?.prompt;

  return (
    <div className="rounded-lg border border-amber-900/50 bg-black/70 overflow-hidden font-mono text-sm h-full flex flex-col">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-amber-900/40 bg-black/60">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-gray-500">
          varshini@portfolio ~ zsh
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="p-4 space-y-1 overflow-y-auto flex-grow min-h-[200px] max-h-[280px] text-[13px] md:text-sm"
      >
        {visible.map((l, i) => (
          <div key={i} className="leading-relaxed">
            {l.prompt ? (
              <span>
                <span className="text-amber-400">➜ </span>
                <span className="text-cyan-400">~</span>{" "}
                <span className="text-gray-100">{l.text}</span>
              </span>
            ) : (
              <span
                className={l.status ? "text-amber-300" : "text-gray-400"}
              >
                {l.text}
              </span>
            )}
          </div>
        ))}
        {!done && (
          <div className="leading-relaxed">
            {isTypingPrompt ? (
              <span>
                <span className="text-amber-400">➜ </span>
                <span className="text-cyan-400">~</span>{" "}
                <span className="text-gray-100">{typing}</span>
              </span>
            ) : (
              <span className="text-gray-400">{typing}</span>
            )}
            <span className="inline-block w-2 h-4 align-middle ml-0.5 bg-amber-400 animate-pulse" />
          </div>
        )}
        {done && (
          <div className="leading-relaxed">
            <span className="text-amber-400">➜ </span>
            <span className="text-cyan-400">~</span>{" "}
            <span className="inline-block w-2 h-4 align-middle bg-amber-400 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalWidget;
