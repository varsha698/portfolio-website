import { useEffect, useRef, useState } from "react";

// A little rubber-duck cursor that lags playfully behind the mouse:
//   👆  when hovering an interactive element
//   ✨  briefly on click
//   🥱  after 3s of not moving
//   🦆  default
// Disabled on touch devices and when reduce-motion is on.
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [emoji, setEmoji] = useState("🦆");
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const nodeRef = useRef(null);
  const rafRef = useRef(null);
  const idleTimerRef = useRef(null);
  const clickTimerRef = useRef(null);
  const stateRef = useRef({ hover: false, click: false, idle: false });

  useEffect(() => {
    // Feature-detect: mouse only, not touch, respect reduced motion
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;
    targetRef.current = { x: initX, y: initY };
    posRef.current = { x: initX, y: initY };

    const resolveEmoji = () => {
      if (stateRef.current.click) return "✨";
      if (stateRef.current.hover) return "👆";
      if (stateRef.current.idle) return "🥱";
      return "🦆";
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
      // Live update hover state based on element under cursor
      const el = e.target;
      const isInteractive =
        el &&
        (el.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']") !==
          null);
      if (isInteractive !== stateRef.current.hover) setState({ hover: isInteractive });
    };

    const onDown = () => {
      setState({ click: true });
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      clickTimerRef.current = setTimeout(() => setState({ click: false }), 350);
    };

    const step = () => {
      // Ease toward target for lag
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
        fontSize: "26px",
        lineHeight: 1,
        pointerEvents: "none",
        zIndex: 9999,
        filter: "drop-shadow(0 0 6px rgba(255, 153, 102, 0.35))",
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
