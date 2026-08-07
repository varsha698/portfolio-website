import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FaInstagram,
  FaLinkedin,
  FaPlay,
  FaWater,
  FaFilm,
  FaDumbbell,
  FaUserFriends,
  FaBookOpen,
  FaMusic,
  FaHeart,
  FaClock,
  FaRegCircle,
  FaCheckCircle,
} from "react-icons/fa";

// ── Data ─────────────────────────────────────────────────────
const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/track/7siXHCf5qUbyJrhNYQXKFr?utm_source=generator";
const INSTAGRAM_URL = "https://instagram.com/varsha.com7";
const LINKEDIN_URL = "https://www.linkedin.com/in/varshinikb/";

const routine = [
  { time: "6:30 AM",  label: "wake up / cold water" },
  { time: "9:00 AM",  label: "coffee + email triage" },
  { time: "12:00 PM", label: "lunch / walk" },
  { time: "5:30 PM",  label: "gym or pool" },
  { time: "8:00 PM",  label: "cook / anime" },
  { time: "11:00 PM", label: "read / sleep" },
];

const bucket = [
  { done: true,  label: "graduate" },
  { done: false, label: "japan trip" },
  { done: false, label: "learn to freedive" },
  { done: false, label: "run a half marathon" },
  { done: false, label: "read 30 books this year" },
  { done: false, label: "get scuba certified" },
  { done: false, label: "master a real deadlift PR" },
];

const stats = [
  { label: "Anime watched",  n: "+120", bg: "#a78bfa", fg: "#1a0f2e" },
  { label: "Pool laps / wk", n: "+40",  bg: "#38bdf8", fg: "#062a3f" },
  { label: "Gym days / wk",  n: "5",    bg: "#fb7185", fg: "#3a0d1a" },
  { label: "Books this yr",  n: "+18",  bg: "#facc15", fg: "#3a2a02" },
  { label: "Cities visited", n: "12",   bg: "#4ade80", fg: "#052e15" },
];

const hobbies = [
  {
    key: "water",
    title: "In the water",
    kicker: "swim · float · repeat",
    blurb:
      "Pools, lakes, oceans — doesn't matter. Something about weightlessness makes the noise stop.",
    Icon: FaWater,
    gradient: "linear-gradient(160deg, #7dd3fc 0%, #38bdf8 35%, #0369a1 70%, #082f49 100%)",
    accent: "#7dd3fc",
  },
  {
    key: "anime",
    title: "Anime nights",
    kicker: "Demon Slayer · JJK",
    blurb:
      "Demon Slayer for the animation, Jujutsu Kaisen for the fights. Frieren when I want to feel something quiet.",
    Icon: FaFilm,
    gradient: "linear-gradient(160deg, #f9a8d4 0%, #c084fc 45%, #7c3aed 100%)",
    accent: "#f9a8d4",
  },
  {
    key: "gym",
    title: "The log book",
    kicker: "push · pull · legs",
    blurb:
      "Lifting is my meditation. Show up on the random Tuesdays when nobody's watching. That's the point.",
    Icon: FaDumbbell,
    gradient: "linear-gradient(160deg, #fecaca 0%, #fb7185 45%, #be123c 100%)",
    accent: "#fecaca",
  },
  {
    key: "friends",
    title: "The circle",
    kicker: "small · deep · loud",
    blurb:
      "Late-night drives, four-hour coffees, cooking on the floor. The best hours are the ones we don't plan.",
    Icon: FaUserFriends,
    gradient: "linear-gradient(160deg, #fde68a 0%, #fbbf24 45%, #d97706 100%)",
    accent: "#fde68a",
  },
];

const currentObsessions = [
  { title: "Demon Slayer",   src: "/personal/anime/demon-slayer.jpg", fallback: "linear-gradient(160deg, #0f1b2d 0%, #1e293b 40%, #dc2626 100%)" },
  { title: "Jujutsu Kaisen", src: "/personal/anime/jjk.jpg",          fallback: "linear-gradient(160deg, #1a1a2e 0%, #52525b 50%, #7f1d1d 100%)" },
  { title: "Frieren",        src: "/personal/anime/frieren.jpg",      fallback: "linear-gradient(160deg, #064e3b 0%, #10b981 60%, #d1fae5 100%)" },
];

// Placeholder photo tiles — each is a distinct gradient/scene until real jpgs land
const photoWall = [
  { alt: "sunset over Lake Superior",
    style: "linear-gradient(180deg, #fed7aa 0%, #fca277 25%, #f472b6 55%, #7c2d5c 100%)" },
  { alt: "gym mirror selfie",
    style: "linear-gradient(160deg, #1f2937 0%, #374151 50%, #6b7280 100%)" },
  { alt: "anime rewatch night",
    style: "linear-gradient(160deg, #312e81 0%, #6d28d9 60%, #ec4899 100%)" },
  { alt: "coffee with friends",
    style: "linear-gradient(160deg, #92400e 0%, #d97706 45%, #fde68a 100%)" },
  { alt: "pool laps",
    style: "linear-gradient(160deg, #0c4a6e 0%, #0284c7 45%, #7dd3fc 100%)" },
  { alt: "campus walk",
    style: "linear-gradient(160deg, #14532d 0%, #16a34a 50%, #bbf7d0 100%)" },
];

// ── Card wrapper ─────────────────────────────────────────────
const Card = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, delay }}
    className={
      "relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md " +
      "hover:border-white/[0.15] transition-colors " +
      className
    }
  >
    {children}
  </motion.div>
);

const CardHeading = ({ icon: Icon, children, accent = "text-sky-300" }) => (
  <div className="flex items-center gap-2 mb-4">
    {Icon && <Icon className={accent} />}
    <span className="font-mono text-sm text-white/90">{children}</span>
  </div>
);

// ── Page ─────────────────────────────────────────────────────
const Personal = () => {
  return (
    <div
      className="relative min-h-screen font-mono text-white/90"
      style={{ background: "radial-gradient(ellipse at top, #0f1220 0%, #05070f 60%, #030509 100%)" }}
    >
      {/* Grid pattern backdrop */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Soft ambient blobs */}
      <div className="pointer-events-none fixed top-1/4 -left-32 w-96 h-96 rounded-full bg-fuchsia-500 opacity-[0.08] blur-3xl" />
      <div className="pointer-events-none fixed bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-500 opacity-[0.08] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16">

        {/* ── HERO ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">
                Personal · off the clock
              </div>
              <h1 className="text-4xl md:text-6xl text-white font-bold tracking-tight leading-tight">
                Varshini&apos;s
                <br />
                <span className="text-transparent bg-clip-text"
                      style={{ backgroundImage: "linear-gradient(90deg, #f9a8d4 0%, #c084fc 50%, #7dd3fc 100%)" }}>
                  hobby dashboard
                </span>
              </h1>
              <p className="mt-4 text-sm md:text-base text-white/60 max-w-md">
                Not the resume. Not the job title. Just water, workouts,
                anime nights, and the people I like most.
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-white/80 hover:border-pink-400/60 hover:text-pink-200 transition-colors"
              >
                <FaInstagram className="text-pink-300 group-hover:scale-110 transition-transform" />
                @varsha.com7
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-widest text-white/80 hover:border-sky-400/60 hover:text-sky-200 transition-colors"
              >
                <FaLinkedin className="text-sky-300 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── ROW 1 · Now playing · Daily rhythm · Stats ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">

          {/* Now playing */}
          <Card className="md:col-span-5 p-5">
            <CardHeading icon={FaMusic} accent="text-fuchsia-300">
              Now playing
            </CardHeading>
            <div className="rounded-xl overflow-hidden">
              <iframe
                title="Spotify — Now playing"
                src={SPOTIFY_EMBED}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: 12 }}
              />
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/50">
              <FaHeart className="text-pink-400/80" />
              on repeat this month
            </div>
          </Card>

          {/* Daily rhythm */}
          <Card className="md:col-span-3 p-5" delay={0.05}>
            <CardHeading icon={FaClock} accent="text-emerald-300">
              Daily rhythm
            </CardHeading>
            <ul className="space-y-2.5">
              {routine.map((r) => (
                <li key={r.time} className="flex items-baseline gap-3 text-sm">
                  <span className="w-16 text-emerald-300/80 text-xs">{r.time}</span>
                  <span className="text-white/70">{r.label}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Stat pills */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-2.5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 shadow-lg"
                style={{ backgroundColor: s.bg, color: s.fg }}
              >
                <span className="text-sm font-bold tracking-tight">{s.label}</span>
                <span className="text-lg font-extrabold">{s.n}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── ROW 2 · Hobbies (photo cards with placeholder gradients) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
          {hobbies.map((h, i) => (
            <motion.div
              key={h.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="md:col-span-6 relative rounded-2xl overflow-hidden border border-white/10 group"
            >
              <div
                className="aspect-[16/10] w-full relative"
                style={{ background: h.gradient }}
              >
                {/* Simple sceney overlay */}
                <div className="absolute inset-0 opacity-40" style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, transparent 45%)",
                }} />
                {/* Placeholder marker (swap with real photo later) */}
                <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest text-white/60 bg-black/30 rounded-full px-2 py-1 backdrop-blur-sm">
                  photo · placeholder
                </div>
                {/* Icon */}
                <h.Icon
                  className="absolute bottom-6 right-6 text-6xl text-white/25 group-hover:text-white/40 transition-colors"
                />
              </div>
              <div className="p-5 bg-white/[0.03] backdrop-blur-md">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg text-white font-semibold">{h.title}</h3>
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: h.accent }}>
                    {h.kicker}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{h.blurb}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── ROW · Current anime obsessions ─────────────── */}
        <Card className="p-5 mb-4">
          <CardHeading icon={FaFilm} accent="text-fuchsia-300">
            Current obsessions
          </CardHeading>
          <div className="grid grid-cols-3 gap-3">
            {currentObsessions.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group"
                style={{ background: o.fallback }}
              >
                <img
                  src={o.src}
                  alt={o.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <div className="text-sm font-semibold text-white leading-tight">{o.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-white/40">
            drop cover art at <span className="text-white/70">/public/personal/anime/</span> — auto-fills over the gradient
          </div>
        </Card>

        {/* ── ROW 3 · Photo wall + Bucket list ────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">

          {/* Photo wall */}
          <Card className="md:col-span-8 p-5">
            <CardHeading icon={FaHeart} accent="text-pink-300">
              The wall — moments
            </CardHeading>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {photoWall.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative aspect-square rounded-lg overflow-hidden border border-white/10"
                  title={p.alt}
                  style={{ background: p.style }}
                >
                  <div className="absolute inset-0 opacity-30" style={{
                    background: "radial-gradient(circle at 40% 30%, rgba(255,255,255,0.5) 0%, transparent 60%)",
                  }} />
                  <div className="absolute bottom-1.5 left-2 right-2 text-[9px] font-mono text-white/70 uppercase tracking-wider truncate">
                    {p.alt}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-white/40">
              placeholders — drop real jpgs in <span className="text-white/70">/public/personal/</span> to swap
            </div>
          </Card>

          {/* Bucket list */}
          <Card className="md:col-span-4 p-5" delay={0.05}>
            <CardHeading icon={FaBookOpen} accent="text-amber-300">
              What&apos;s next
            </CardHeading>
            <ul className="space-y-2.5">
              {bucket.map((b) => (
                <li key={b.label} className="flex items-center gap-3 text-sm">
                  {b.done ? (
                    <FaCheckCircle className="text-emerald-400 flex-shrink-0" />
                  ) : (
                    <FaRegCircle className="text-white/30 flex-shrink-0" />
                  )}
                  <span className={b.done ? "text-white/40 line-through" : "text-white/80"}>
                    {b.label}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* ── OUTRO ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
            end of the personal side
          </div>
          <p className="text-2xl md:text-4xl text-white font-semibold tracking-tight">
            for scrolling —{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #c084fc 0%, #f472b6 60%, #fbbf24 100%)" }}
            >
              thank you.
            </span>
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-2xl text-white/60 hover:text-pink-300 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-2xl text-white/60 hover:text-sky-300 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://open.spotify.com/track/7siXHCf5qUbyJrhNYQXKFr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Play song on Spotify"
              className="text-2xl text-white/60 hover:text-emerald-300 transition-colors"
            >
              <FaPlay />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  delay: PropTypes.number,
};

CardHeading.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.node,
  accent: PropTypes.string,
};

export default Personal;
