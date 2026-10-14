import PropTypes from "prop-types";
import { TechIcon } from "./techIcons";

const items = [
  "python", "typescript", "javascript", "ruby", "rails", "react", "nextjs",
  "nodejs", "tailwind", "fastapi", "flask", "postgresql", "mongodb",
  "supabase", "stripe", "docker", "aws", "terraform", "cloudflare", "github",
  "pytorch", "angular", "flutter", "swift",
];

const Row = ({ hidden = false }) => (
  <div className="flex items-center gap-10 shrink-0 px-5" aria-hidden={hidden || undefined}>
    {items.map((name) => (
      <div
        key={name}
        className="w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
      >
        <TechIcon name={name} className="w-9 h-9" />
      </div>
    ))}
  </div>
);

Row.propTypes = {
  hidden: PropTypes.bool,
};

const TechMarquee = () => (
  <div className="relative overflow-hidden py-4 border-y border-amber-900/40 bg-black/40">
    {/* Fade edges */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

    <div className="flex marquee-track">
      <Row />
      <Row hidden />
    </div>

    <style>{`
      @keyframes marqueeSlide {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .marquee-track {
        animation: marqueeSlide 35s linear infinite;
        will-change: transform;
      }
      .marquee-track:hover {
        animation-play-state: paused;
      }
      @media (prefers-reduced-motion: reduce) {
        .marquee-track { animation: none; flex-wrap: wrap; justify-content: center; }
        .marquee-track > :last-child { display: none; }
      }
    `}</style>
  </div>
);

export default TechMarquee;
