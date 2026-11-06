import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// Animated figures for projects, driven by the `result` field in
// src/data/projects.js. "race" and "shrink" show measured results from the
// Final-Dev-Journal — don't add numbers that aren't documented there.
// "rewrite" illustrates how a tool works and is labelled "illustration"
// on the page.

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const fmt = (n) => n.toLocaleString("en-US");

// ── Race: parallel vs serial batch run ──────────────────────
const Lane = ({ label, p, status, hot, compact }) => (
  <div>
    <div className="flex justify-between gap-2 font-mono text-[11px] text-gray-400">
      <span>{label}</span>
      <span className={hot ? "text-amber-300" : ""}>{status}</span>
    </div>
    <div className={`mt-1 ${compact ? "h-1.5" : "h-2.5"} rounded-sm bg-amber-950/60 overflow-hidden`} data-track>
      <div
        data-fill
        className={`h-full ${hot ? "bg-amber-400" : "bg-gray-500"}`}
        style={{ width: `${p * 100}%` }}
      />
    </div>
  </div>
);
Lane.propTypes = {
  compact: PropTypes.bool,
  label: PropTypes.string,
  p: PropTypes.number,
  status: PropTypes.string,
  hot: PropTypes.bool,
};


const Race = ({ data, compact }) => {
  const { rows, fast, slow, speed = 30 } = data;
  const ref = useRef(null);
  const inView = useInView(ref);
  const [t, setT] = useState(() => (prefersReducedMotion() ? slow : 0));
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return undefined;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((prev) => {
        const next = Math.min(prev + dt * speed, slow);
        if (next < slow) raf = requestAnimationFrame(tick);
        return next;
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, run, slow, speed]);

  const fastP = Math.min(t / fast, 1);
  const slowP = Math.min(t / slow, 1);
  const done = t >= slow;

  return (
    <div ref={ref} className="space-y-2" aria-label={`${fmt(rows)} rows: ${fast} seconds in parallel versus about ${slow} seconds serially`} role="img">
      <Lane
        compact={compact}
        label="parallel engine"
        p={fastP}
        hot
        status={fastP < 1 ? `${t.toFixed(1)} s` : `done · ${fast} s`}
      />
      <Lane
        compact={compact}
        label="serial"
        p={slowP}
        status={
          done
            ? `done · ~${slow} s`
            : `${fmt(Math.floor(slowP * rows))} / ${fmt(rows)} rows · ${Math.floor(t)} s`
        }
      />
      {!compact && (
        <div className="flex justify-between font-mono text-[10px] text-gray-500 pt-1">
          <span>{fmt(rows)} rows · replayed at {speed}× speed</span>
          {done && !prefersReducedMotion() && (
            <button
              type="button"
              onClick={() => {
                setT(0);
                setRun((r) => r + 1);
              }}
              className="text-amber-400 hover:text-amber-300"
            >
              replay ↺
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Race.propTypes = {
  data: PropTypes.shape({
    rows: PropTypes.number.isRequired,
    fast: PropTypes.number.isRequired,
    slow: PropTypes.number.isRequired,
    speed: PropTypes.number,
  }).isRequired,
  compact: PropTypes.bool,
};

// ── Shrink: before/after sizes ───────────────────────────────
const Shrink = ({ data, compact }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const items = compact ? data.items.slice(0, 1) : data.items;
  return (
    <div ref={ref} className="space-y-3">
      {items.map((it) => {
        const ratio = Math.max(it.after / it.before, 0.02);
        return (
          <div
            key={it.label}
            role="img"
            aria-label={`${it.label}: ${it.beforeText} down to ${it.afterText}`}
          >
            <div className="flex justify-between gap-2 font-mono text-[11px] text-gray-400">
              <span>{it.label}</span>
              <span>
                <span className="line-through decoration-gray-600">{it.beforeText}</span>
                {" → "}
                <span className="text-amber-300">{it.afterText}</span>
              </span>
            </div>
            <div className={`mt-1 relative ${compact ? "h-1.5" : "h-2.5"} rounded-sm bg-amber-950/60 overflow-hidden`} data-track>
              <div
                data-fill
                className="absolute inset-y-0 left-0 bg-amber-400 transition-[width] duration-[1600ms] ease-out motion-reduce:transition-none"
                style={{ width: inView ? `${ratio * 100}%` : "100%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

Shrink.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        before: PropTypes.number.isRequired,
        after: PropTypes.number.isRequired,
        beforeText: PropTypes.string.isRequired,
        afterText: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  compact: PropTypes.bool,
};

// Cycles through `count` steps every `ms` while on screen; holds step 0 under
// reduced motion.
const useCycle = (ref, count, ms) => {
  const inView = useInView(ref);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView || prefersReducedMotion() || count < 2) return undefined;
    const id = setInterval(() => setStep((s) => (s + 1) % count), ms);
    return () => clearInterval(id);
  }, [inView, count, ms]);
  return [step, inView];
};

// ── Rewrite: grammar fixes, then an LLM rewrite ──────────────
// `tokens` is a list of [kind, text] where kind is "keep", "del" or "ins".
const Rewrite = ({ data, compact }) => {
  const ref = useRef(null);
  const [step] = useCycle(ref, 3, 2600);
  const stageLabel = ["draft", "grammar engine", data.model || "local LLM rewrite"][step];
  return (
    <div ref={ref} className="space-y-2">
      <div className="font-mono text-[11px] text-gray-400">
        stage · <span className="text-amber-300">{stageLabel}</span>
      </div>
      <p
        className={`rounded-sm border border-amber-900/60 bg-black/60 px-2 py-1.5 text-gray-200 ${
          compact ? "text-xs min-h-[3.2rem]" : "text-sm min-h-[2.75rem]"
        }`}
      >
        {step === 2
          ? <span className="text-amber-200">{data.rewrite}</span>
          : data.tokens.map(([kind, text], i) => {
              if (kind === "keep") return <span key={i}>{text}</span>;
              if (kind === "del")
                return step === 0 ? (
                  <span key={i}>{text}</span>
                ) : (
                  <span key={i} className="mr-1 line-through decoration-red-400/70 text-gray-500">
                    {text}
                  </span>
                );
              return step === 0 ? null : (
                <span key={i} className="text-amber-300">
                  {text}
                </span>
              );
            })}
      </p>
    </div>
  );
};

Rewrite.propTypes = {
  data: PropTypes.shape({
    tokens: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    rewrite: PropTypes.string.isRequired,
    model: PropTypes.string,
  }).isRequired,
  compact: PropTypes.bool,
};

const BODIES = { race: Race, shrink: Shrink, rewrite: Rewrite };

const ResultViz = ({ result, compact = false }) => {
  if (!result) return null;
  const Body = BODIES[result.kind] || Shrink;
  return (
    <figure className={compact ? "" : "rounded-md border border-amber-900/50 bg-black/50 p-4"}>
      {!compact && result.title && (
        <figcaption className="mb-3 flex justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-amber-500/80">
          <span>{result.title}</span>
          {result.illustration && <span className="text-gray-500">illustration</span>}
        </figcaption>
      )}
      <Body data={result} compact={compact} />
    </figure>
  );
};

ResultViz.propTypes = {
  result: PropTypes.shape({
    kind: PropTypes.oneOf(["race", "shrink", "rewrite"]).isRequired,
    title: PropTypes.string,
    illustration: PropTypes.bool,
  }),
  compact: PropTypes.bool,
};

export default ResultViz;
