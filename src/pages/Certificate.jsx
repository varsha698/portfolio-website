import { motion } from "framer-motion";

const certificates = [
  {
    certificate: "AWS Certified Solutions Architect (Incoming)",
    provider: "Amazon Web Services",
    issuedate: "Expected: JUL 2025",
    desc: "Preparing for AWS Certified Solutions Architect Associate exam.",
    image: "", // optional: you can add image later
    url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
  }
];

const Certificate = () => {
  return (
    <section
      id="certificates"
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
        position: "relative",
        padding: "6rem 2rem",
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
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textShadow:
            "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        Certifications
      </motion.h1>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto z-10">
        {certificates.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-6 bg-black/60 backdrop-blur-md rounded-lg border border-amber-900/50 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Image placeholder (optional) */}
            {cert.image && (
              <img
                src={`/certificates/${cert.image}`}
                alt={cert.certificate}
                className="w-full h-40 object-contain mb-4 rounded-md"
              />
            )}
            <h3 className="text-xl font-semibold text-amber-400">{cert.certificate}</h3>
            <p className="text-gray-400 mt-2">
              <strong>Provider:</strong> {cert.provider}<br />
              <strong>Issued:</strong> {cert.issuedate}
            </p>
            <p className="text-gray-300 mt-4">{cert.desc}</p>
          </motion.a>
        ))}
      </div>

      {/* Incoming Certifications Note */}
      <motion.div
        className="text-center text-gray-400 mt-12 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Incoming Certifications: Google Cloud Associate, AWS Developer Associate, Microsoft Azure Fundamentals.
      </motion.div>
    </section>
  );
};

export default Certificate;
