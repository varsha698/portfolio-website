import { useEffect, useRef, useState } from "react";

// Shrek-themed cursor that lags playfully behind the mouse:
//   👂  when hovering an interactive element (them Shrek ears)
//   🧅  briefly on click ("ogres are like onions")
//   🐸  after 3s of not moving (swamp nap)
//   🧌  default (closest emoji to Shrek)
// Disabled on touch devices and when reduce-motion is on.
const DEFAULT_EMOJI = "🧌";
const HOVER_EMOJI = "👂";
const CLICK_EMOJI = "🧅";
const IDLE_EMOJI = "🐸";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const nodeRef = useRef(null);
  const rafRef = useRef(null);
  const idleTimerRef = useRef(null);
  const clickTimerRef = useRef(null);
  const stateRef = useRef({ hover: false, click: false, idle: false });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    // Hide the system cursor while Shrek is active
    document.documentElement.classList.add("hide-native-cursor");

    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;
    targetRef.current = { x: initX, y: initY };
    posRef.current = { x: initX, y: initY };

    const resolveEmoji = () => {
      if (stateRef.current.click) return CLICK_EMOJI;
      if (stateRef.current.hover) return HOVER_EMOJI;
      if (stateRef.current.idle) return IDLE_EMOJI;
      return DEFAULT_EMOJI;
    };

    const setState = (patch) => {
      Object.assign(stateRef.current, patch);
      setEmoji(resolveEmoji());
    };

    const scheduleIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setState({ idle: true }), 3000);
    };

    const onMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (stateRef.current.idle) setState({ idle: false });
      scheduleIdle();
      const el = e.target;
      const isInteractive =
        el &&
        (el.closest(
          "a, button, [role='button'], input, textarea, [data-cursor='hover']"
        ) !== null);
      if (isInteractive !== stateRef.current.hover) setState({ hover: isInteractive });
    };

    const onDown = () => {
      setState({ click: true });
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      clickTimerRef.current = setTimeout(() => setState({ click: false }), 350);
    };

    const step = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.18;
      if (nodeRef.current) {
        nodeRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    scheduleIdle();
    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      document.documentElement.classList.remove("hide-native-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={nodeRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        fontSize: "28px",
        lineHeight: 1,
        pointerEvents: "none",
        zIndex: 9999,
        filter: "drop-shadow(0 0 6px rgba(126, 231, 135, 0.35))",
        transition: "font-size 120ms ease",
        willChange: "transform",
        userSelect: "none",
      }}
    >
      {emoji}
    </div>
  );
};

export default CustomCursor;
