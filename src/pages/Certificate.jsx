// src/pages/Certificate.jsx
import { motion } from "framer-motion";

const certificates = [
  {
    certificate: "Google Cybersecurity Professional Certificate V2",
    provider: "Google (via Coursera)",
    issuedate: "18 May 2025",
    desc: "Completed an 8-course certification covering security best practices, threat detection, risk management, and incident response.",
    // If you want to show the badge, put the image file inside public/certificates/
    // and uncomment the line below with the correct filename:
    // image: "GoogleCybersecurityProfessionalCertificateV2_Badge20250518-27-k82hcp_page-0001.jpg",
    url: "https://www.credly.com/badges/ed51ce48-72c1-40bf-9aeb-faebd2924e2b/public_url",
  },
  {
    certificate: "Microsoft Business Analyst Professional Certificate",
    provider: "Microsoft (via Coursera)",
    issuedate: "Oct 2025",
    desc: "Completed a multi-course program focused on business process analysis, requirements gathering, stakeholder communication, and data-driven decision making using tools like Visio and Excel.",
    // Add your badge image to public/certificates/ and set the filename here:
    // image: "MicrosoftBusinessAnalystCertificate_Badge20251001.jpg",
    url: "https://www.coursera.org/account/accomplishments/specialization/GZ13WSR6DMFP",
  },
];

const Certificate = () => {
  return (
    <section
      id="certificates"
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative transition-colors duration-300 bg-black"
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
              background: "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)",
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
              background: "linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)",
              opacity: "0.3",
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textShadow: "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)",
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
            className="relative p-6 backdrop-blur-md rounded-lg border overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all duration-300 bg-black/60 border-amber-900/50 hover:shadow-amber-500/30"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Optional Badge Image */}
            {cert.image && (
              <img
                src={`/certificates/${cert.image}`}
                alt={cert.certificate}
                className="w-full h-40 object-contain mb-4 rounded-md"
              />
            )}

            <h3 className="text-xl font-semibold text-amber-400">
              {cert.certificate}
            </h3>
            <p className="text-gray-400 mt-2">
              <strong>Provider:</strong> {cert.provider}
              <br />
              <strong>Issued:</strong> {cert.issuedate}
            </p>
            <p className="text-gray-300 mt-4">{cert.desc}</p>
          </motion.a>
        ))}
      </div>

      {/* Incoming Certifications Note */}
      <motion.div
        className="text-center mt-12 text-lg text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Incoming Certifications: Google Cloud Associate, AWS Developer
        Associate, Microsoft Azure Fundamentals.
      </motion.div>
    </section>
  );
};

export default Certificate;
