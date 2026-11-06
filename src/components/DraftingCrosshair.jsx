import { useEffect, useRef, useState } from "react";

// Faint CAD-style guide lines that follow the pointer, with a coordinate
// readout. Desktop (fine pointer) only, never under reduced motion, and it
// never replaces the real cursor. Toggle from the ⌘K palette.

export const CROSSHAIR_EVENT = "bp:toggle-crosshair";
const STORAGE_KEY = "bp-crosshair";

const readPref = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
};

const DraftingCrosshair = () => {
  const [enabled, setEnabled] = useState(readPref);
  const [capable, setCapable] = useState(false);
  const hRef = useRef(null);
  const vRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCapable(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const onToggle = () =>
      setEnabled((on) => {
        const next = !on;
        try {
          localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
        } catch {
          /* storage unavailable: keep the in-memory choice */
        }
        return next;
      });
    window.addEventListener(CROSSHAIR_EVENT, onToggle);
    return () => window.removeEventListener(CROSSHAIR_EVENT, onToggle);
  }, []);

  useEffect(() => {
    if (!enabled || !capable) return undefined;
    let raf = 0;
    let x = -100;
    let y = -100;
    const els = [hRef.current, vRef.current, tagRef.current];
    const paint = () => {
      raf = 0;
      if (hRef.current) hRef.current.style.transform = `translateY(${y}px)`;
      if (vRef.current) vRef.current.style.transform = `translateX(${x}px)`;
      if (tagRef.current) {
        const flipX = x > window.innerWidth - 150;
        const flipY = y > window.innerHeight - 40;
        tagRef.current.style.transform = `translate(${x + (flipX ? -140 : 14)}px, ${
          y + (flipY ? -28 : 12)
        }px)`;
        tagRef.current.textContent = `x ${String(Math.round(x + window.scrollX)).padStart(4, "0")} · y ${String(
          Math.round(y + window.scrollY)
        ).padStart(4, "0")}`;
      }
    };
    const show = (on) => els.forEach((el) => el && (el.style.opacity = on ? "1" : "0"));
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      show(true);
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => show(false);
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, capable]);

  if (!enabled || !capable) return null;

  const base = "fixed pointer-events-none opacity-0 transition-opacity duration-300 z-40";
  return (
    <div aria-hidden="true">
      <div ref={hRef} className={`${base} left-0 top-0 h-px w-full bg-amber-400/15`} />
      <div ref={vRef} className={`${base} left-0 top-0 w-px h-full bg-amber-400/15`} />
      <div
        ref={tagRef}
        className={`${base} left-0 top-0 font-mono text-[10px] text-amber-400/70 bg-black/70 px-1.5 py-0.5 rounded-sm whitespace-nowrap`}
      />
    </div>
  );
};

export default DraftingCrosshair;
