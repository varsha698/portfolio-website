import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const imageSrc = "/image.JPG";

// Optional: to enable real form delivery, create a free Formspree
// endpoint at https://formspree.io and set it here (or via a
// VITE_FORMSPREE_ENDPOINT env var). If unset, the form falls back to
// opening the user's default mail client.
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

const ContactMe = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in every field.");
      return;
    }

    if (!FORMSPREE_ENDPOINT) {
      // Fallback: open user's mail client
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:bhava008@d.umn.edu?subject=${subject}&body=${body}`;
      setStatus("ok");
      return;
    }

    try {
      setStatus("sending");
      setErrorMsg("");
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please email me directly.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center overflow-hidden relative transition-colors duration-300 bg-black"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${i * 5}%`,
              background:
                "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)",
              opacity: "0.3",
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px"
            style={{
              left: `${i * 5}%`,
              background:
                "linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)",
              opacity: "0.3",
            }}
          />
        ))}
      </div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textShadow:
            "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)",
        }}
      >
        Contact Me
      </motion.h1>
      <p className="text-gray-400 text-center max-w-xl relative z-10 mb-10 px-4">
        Open to collaboration, internships, and interesting problems. The
        fastest way to reach me is email — or drop a note below.
      </p>

      <div className="relative z-10 grid md:grid-cols-[auto,1fr] gap-10 md:gap-12 items-start w-full max-w-5xl px-4">
        {/* Left: Photo + contact info */}
        <motion.div
          className="flex flex-col items-center md:items-start"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <picture>
            <source
              srcSet="/varshini.webp"
              type="image/webp"
            />
            <motion.img
              src={imageSrc}
              alt="Varshini Bhavanam"
              className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-amber-400/50"
              style={{
                boxShadow:
                  "0 0 20px rgba(255, 153, 102, 0.5), 0 0 40px rgba(255, 153, 102, 0.3)",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              loading="eager"
              onError={(e) => {
                if (!e.target.src.endsWith("/image.JPG")) {
                  e.target.src = "/image.JPG";
                }
              }}
            />
          </picture>

          <div className="mt-6 space-y-2 text-gray-300 text-center md:text-left">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400" />
              <a
                href="mailto:bhava008@d.umn.edu"
                className="hover:text-amber-400 transition"
              >
                bhava008@d.umn.edu
              </a>
            </p>
            <p className="flex items-center gap-3">
              <FaPhone className="text-amber-400" />
              <a
                href="tel:+16513591842"
                className="hover:text-amber-400 transition"
              >
                651-359-1842
              </a>
            </p>
          </div>

          <div className="mt-6 flex gap-5">
            <a
              href="https://github.com/varsha698"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-2xl text-gray-300 hover:text-amber-400 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/varshinikb/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-2xl text-gray-300 hover:text-amber-400 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          onSubmit={onSubmit}
          className="w-full backdrop-blur-md rounded-lg border border-amber-900/50 bg-black/60 p-6 md:p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-amber-300/90">Name</span>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                className="mt-1 w-full bg-black/60 border border-amber-900/50 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-amber-400 transition"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-sm text-amber-300/90">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                className="mt-1 w-full bg-black/60 border border-amber-900/50 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-amber-400 transition"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="block mt-4">
            <span className="text-sm text-amber-300/90">Message</span>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              className="mt-1 w-full bg-black/60 border border-amber-900/50 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:border-amber-400 transition resize-y"
              placeholder="Say hi, share a project idea, or ask about my work…"
            />
          </label>

          {/* Honeypot to trap bots */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-5000px", height: 0, width: 0 }}
            aria-hidden="true"
          />

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-black bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
              style={{ boxShadow: "0 0 15px rgba(255, 153, 102, 0.4)" }}
            >
              <FaPaperPlane className="text-sm" />
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "ok" && (
              <p className="text-green-400 text-sm">
                Thanks — your message is on its way!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}
            {!FORMSPREE_ENDPOINT && (
              <p className="text-gray-500 text-xs italic">
                Submitting opens your email client.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactMe;
