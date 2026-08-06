import StackIcon from "tech-stack-icons";

const items = [
  "python", "typescript", "js", "reactjs", "nextjs", "nodejs",
  "tailwindcss", "vitejs", "flask", "fastapi", "postgresql",
  "mongodb", "docker", "aws", "terraform", "ansible", "github",
  "firebase", "swift", "angular", "pytorch", "tensorflow",
];

const Row = () => (
  <div className="flex items-center gap-10 shrink-0 px-5">
    {items.map((name) => (
      <div
        key={name}
        className="w-10 h-10 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
        title={name}
      >
        <StackIcon name={name} />
      </div>
    ))}
  </div>
);

const TechMarquee = () => (
  <div className="relative overflow-hidden py-4 border-y border-amber-900/40 bg-black/40">
    {/* Fade edges */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

    <div className="flex marquee-track">
      <Row />
      <Row />
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
    `}</style>
  </div>
);

export default TechMarquee;
