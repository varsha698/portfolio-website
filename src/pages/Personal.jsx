import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FaArrowRight,
  FaWater,
  FaDumbbell,
  FaFilm,
  FaUserFriends,
} from "react-icons/fa";

// ── Editorial "chapter" heading ──────────────────────────────
const Chapter = ({ index, kicker }) => (
  <div className="flex items-baseline gap-6 mb-8">
    <span className="font-mono text-xs tracking-[0.3em] text-sky-300/70">
      {String(index).padStart(2, "0")}
    </span>
    <div className="h-px flex-grow bg-gradient-to-r from-sky-300/40 via-sky-200/20 to-transparent" />
    <span className="font-mono text-xs tracking-[0.3em] uppercase text-sky-200/70">
      {kicker}
    </span>
  </div>
);

// ── Big serif display ────────────────────────────────────────
const Display = ({ children, className = "" }) => (
  <h2
    className={
      "font-serif italic text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight " +
      className
    }
    style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif' }}
  >
    {children}
  </h2>
);

// ── Animated caustics / water ripple SVG background ──────────
const WaterBackdrop = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    viewBox="0 0 800 600"
  >
    <defs>
      <filter id="ripple" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="4">
          <animate
            attributeName="baseFrequency"
            dur="24s"
            values="0.008 0.02;0.012 0.03;0.008 0.02"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="40" />
      </filter>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.35" />
        <stop offset="50%" stopColor="#0288d1" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#01579b" stopOpacity="0.55" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#sea)" filter="url(#ripple)" />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────
const animeFavs = [
  { title: "Your Name",         note: "the one that hits every rewatch" },
  { title: "Spirited Away",     note: "comfort in a bathhouse" },
  { title: "Attack on Titan",   note: "for the scale of it" },
  { title: "Demon Slayer",      note: "for the animation" },
  { title: "Jujutsu Kaisen",    note: "for the fights" },
  { title: "A Silent Voice",    note: "cry every time" },
];

const workoutLog = [
  { day: "Mon", split: "Push",  note: "chest / shoulders / tri" },
  { day: "Tue", split: "Pull",  note: "back / bi / rear delt" },
  { day: "Wed", split: "Legs",  note: "squat + posterior chain" },
  { day: "Thu", split: "Swim",  note: "long easy laps" },
  { day: "Fri", split: "Push",  note: "heavy day" },
  { day: "Sat", split: "Pull",  note: "volume day" },
  { day: "Sun", split: "Rest",  note: "walk + stretch" },
];

const friendMoments = [
  "late-night drives with the windows down",
  "coffee that turns into a four-hour conversation",
  "cooking together and eating on the floor",
  "no-plan weekends that become the best ones",
  "text chains that never actually end",
];

// ── Page ─────────────────────────────────────────────────────
const Personal = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      className="relative min-h-screen text-stone-100"
      style={{
        background:
          "linear-gradient(180deg, #041825 0%, #062a3f 25%, #0a3a55 55%, #0e4a6c 80%, #041825 100%)",
      }}
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06] mix-blend-overlay z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ──────────────── HERO ──────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col justify-end overflow-hidden pb-16 md:pb-24 px-6 md:px-12"
      >
        <WaterBackdrop />

        {/* Marker chips */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex items-center gap-4 mb-8"
        >
          <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-sky-200/70">
            Varshini
          </span>
          <span className="h-px w-12 bg-sky-200/40" />
          <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-sky-200/70">
            off the clock
          </span>
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
          <h1
            className="font-serif italic text-[15vw] md:text-[11vw] lg:text-[9rem] leading-[0.9] tracking-tight text-transparent bg-clip-text"
            style={{
              fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
              backgroundImage:
                "linear-gradient(180deg, #e0f7fa 0%, #b3e5fc 40%, #4fc3f7 100%)",
              textShadow: "0 0 80px rgba(79, 195, 247, 0.35)",
            }}
          >
            hi, i&apos;m me.
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="max-w-md text-stone-200/85 text-lg md:text-xl leading-relaxed font-light">
              Not the resume.
              <br />
              Not the job title. Just —
              <br />
              <span className="text-sky-200 italic">
                water, friends, animated worlds, the log book.
              </span>
            </p>

            <span className="text-xs font-mono tracking-widest uppercase text-stone-300/70 self-start md:self-end">
              scroll for the rest ↓
            </span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-sky-200/60">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-sky-200/70 to-transparent"
          />
        </motion.div>
      </section>

      {/* ──────────────── I. IN THE WATER ──────────────── */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <Chapter index={1} kicker="element · water" />

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7"
          >
            <Display className="text-sky-50">
              Just being in it
              <br />
              <span className="text-sky-300/90">is enough.</span>
            </Display>
            <p className="mt-8 max-w-xl text-stone-200/85 leading-relaxed text-lg font-light">
              Pools, lakes, oceans — I don&apos;t care what shape it takes.
              Something about the weightlessness, the way sound goes muffled and
              time slows down. The best kind of quiet.
            </p>
            <p className="mt-4 max-w-xl text-stone-300/70 leading-relaxed">
              Duluth sits on the biggest lake I&apos;ve ever seen. When the wind
              is right and the ore boats drift out at dusk, Superior looks like
              an ocean pretending to be a lake.
            </p>
          </motion.div>

          {/* Column card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-sky-200/10">
              {/* Layered gradient "ocean" placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #7dd3fc 0%, #38bdf8 20%, #0284c7 45%, #075985 70%, #082f49 100%)",
                }}
              />
              {/* Sun */}
              <div
                className="absolute top-[18%] left-1/2 -translate-x-1/2 w-24 h-24 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,241,208,0.95) 0%, rgba(255,200,120,0.5) 40%, transparent 70%)",
                  filter: "blur(2px)",
                }}
              />
              {/* Wave lines */}
              <svg
                className="absolute inset-x-0 bottom-0 w-full h-2/3"
                viewBox="0 0 400 300"
                preserveAspectRatio="none"
              >
                {[...Array(14)].map((_, i) => (
                  <path
                    key={i}
                    d={`M0 ${60 + i * 18} Q 100 ${50 + i * 18} 200 ${65 + i * 18} T 400 ${55 + i * 18}`}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}
              </svg>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-sky-100/80">
                    field note
                  </div>
                  <div
                    className="font-serif italic text-2xl text-white mt-1"
                    style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                  >
                    Superior, at dusk
                  </div>
                </div>
                <FaWater className="text-sky-100/80 text-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider mark */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent" />
      </div>

      {/* ──────────────── II. ANIME NIGHTS ──────────────── */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <Chapter index={2} kicker="watchlist · animated worlds" />

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <Display className="text-sky-50">
              Worlds
              <br />
              <span className="text-rose-200/90">worth</span>
              <br />
              <span className="italic">disappearing into.</span>
            </Display>
            <p className="mt-8 text-stone-200/85 leading-relaxed text-lg font-light max-w-md">
              Anime got me through the exam weeks and the flight home layovers
              and every stretch where the real world was a little too loud.
              Give me a Studio Ghibli marathon and a rainy afternoon and
              I&apos;m good for the day.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-sky-200/70 font-mono">
              <FaFilm />
              <span>currently rewatching · Frieren</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-7"
          >
            <div className="border-t border-sky-200/20">
              {animeFavs.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group flex items-baseline justify-between py-5 border-b border-sky-200/15 hover:bg-sky-200/[0.03] transition-colors px-2 -mx-2"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-[11px] text-sky-300/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-serif text-2xl md:text-3xl text-sky-50 italic tracking-tight"
                      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                    >
                      {a.title}
                    </span>
                  </div>
                  <span className="hidden md:inline text-sm text-stone-300/60 italic max-w-xs text-right">
                    {a.note}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent" />
      </div>

      {/* ──────────────── III. THE LOG ──────────────── */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <Chapter index={3} kicker="log · strength & swim" />

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6"
          >
            <Display className="text-sky-50">
              Show up.
              <br />
              <span className="text-amber-200/90">Log it.</span>
              <br />
              <span className="italic">Repeat.</span>
            </Display>
            <p className="mt-8 text-stone-200/85 leading-relaxed text-lg font-light max-w-md">
              Lifting is my meditation. Push / pull / legs, a little cardio,
              sometimes a swim day. The point isn&apos;t hitting a number, the
              point is being someone who shows up on a random Tuesday when
              nobody&apos;s watching.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-6"
          >
            <div className="rounded-sm border border-sky-200/10 bg-black/25 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-sky-200/10 bg-black/30">
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-sky-200/70">
                  training week
                </span>
                <FaDumbbell className="text-sky-200/60" />
              </div>
              <div>
                {workoutLog.map((row) => (
                  <div
                    key={row.day}
                    className="grid grid-cols-12 items-center px-5 py-3 border-b border-sky-200/5 last:border-b-0 hover:bg-sky-200/[0.03] transition-colors"
                  >
                    <span className="col-span-2 font-mono text-xs uppercase text-sky-300/70">
                      {row.day}
                    </span>
                    <span
                      className="col-span-3 font-serif italic text-lg text-sky-50"
                      style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                    >
                      {row.split}
                    </span>
                    <span className="col-span-7 text-sm text-stone-300/70 text-right">
                      {row.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent" />
      </div>

      {/* ──────────────── IV. THE PEOPLE ──────────────── */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <Chapter index={4} kicker="the people · off the record" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          <Display className="text-sky-50">
            The best hours
            <br />
            <span className="italic text-rose-100/90">
              are the ones we don&apos;t plan.
            </span>
          </Display>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-stone-200/85 leading-relaxed text-lg font-light">
              I have the kind of friends who&apos;ll pick up on the second ring
              at 2 a.m., and the kind who&apos;ll sit next to me on the couch
              for three hours without saying anything. Both count. I try to be
              both.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sky-200/70">
              <FaUserFriends />
              <span className="font-mono text-xs tracking-[0.3em] uppercase">
                small circle · deep well
              </span>
            </div>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="space-y-4"
          >
            {friendMoments.map((moment) => (
              <motion.li
                key={moment}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0 },
                }}
                className="flex items-start gap-4 group"
              >
                <span className="mt-2 h-px w-8 bg-sky-200/40 group-hover:w-12 transition-all" />
                <span
                  className="font-serif italic text-xl md:text-2xl text-stone-100/90 leading-snug"
                  style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                >
                  {moment}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ──────────────── COLOPHON / OUTRO ──────────────── */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-[11px] tracking-[0.4em] uppercase text-sky-200/60 mb-6">
              end of chapter
            </div>
            <p
              className="font-serif italic text-3xl md:text-5xl text-sky-50 leading-tight"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              That&apos;s the rest of me.
              <br />
              <span className="text-sky-300/80">Thanks for reading.</span>
            </p>

            <div className="mt-14 flex items-center justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-sky-100 text-sky-900 hover:bg-white transition-colors text-sm tracking-widest font-mono uppercase"
              >
                say hi
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

Chapter.propTypes = {
  index: PropTypes.number.isRequired,
  kicker: PropTypes.string.isRequired,
};

Display.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Personal;
