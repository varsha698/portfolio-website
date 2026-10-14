import { useEffect, useRef } from "react";

// Lightweight canvas particle system. Amber dots connect when close and
// gently repel from the cursor. Sits fixed behind everything on the page.
// Draws a single still frame when the visitor prefers reduced motion, and
// stops animating while the tab is hidden.
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0;
    let H = 0;
    let particles = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale particle count to viewport (cap for perf)
      const target = Math.min(70, Math.floor((W * H) / 22000));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const step = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update + draw particles
      for (const p of particles) {
        // Cursor repulsion
        const dxM = p.x - mx;
        const dyM = p.y - my;
        const dM2 = dxM * dxM + dyM * dyM;
        if (dM2 < 12000) {
          const f = (12000 - dM2) / 12000;
          p.vx += (dxM / Math.sqrt(dM2 + 1)) * f * 0.08;
          p.vy += (dyM / Math.sqrt(dM2 + 1)) * f * 0.08;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        if (p.x < 0) p.x = W;
        else if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        else if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 175, 90, 0.65)";
        ctx.fill();
      }

      // Connecting lines
      const MAX = 120;
      const MAX2 = MAX * MAX;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX2) {
            const alpha = 1 - d2 / MAX2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 153, 102, ${alpha * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      if (!reducedMotion.matches && !document.hidden) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    const start = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(step);
    };

    const onResize = () => {
      resize();
      start();
    };

    const onVisibility = () => {
      if (!document.hidden) start();
    };

    resize();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", start);
    start();

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
