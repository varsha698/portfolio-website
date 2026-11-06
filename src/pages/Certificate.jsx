// src/pages/Certificate.jsx
import { asset } from "../utils/asset";
import { motion } from "framer-motion";
import { SheetHeader } from "../components/Blueprint";

const certificates = [
  {
    certificate: "Google Cybersecurity Professional Certificate V2",
    provider: "Google (via Coursera)",
    issuedate: "18 May 2025",
    desc: "Completed an 8-course certification covering security best practices, threat detection, risk management, and incident response.",
    image: "GoogleCybersecurityProfessionalCertificateV2_Badge20250518-27-k82hcp_page-0001.jpg",
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
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        position: "relative",
        padding: "6rem 2rem",
      }}
    >
      <SheetHeader sheet="04" kicker="credentials" title="Certifications" />

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto z-10">
        {certificates.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bp-corner relative p-6 backdrop-blur-md rounded-lg border overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300 bg-black/60 border-amber-900/50 hover:shadow-amber-500/30"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Optional Badge Image */}
            {cert.image && (
              <img
                src={asset(`/certificates/${cert.image}`)}
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
            <span className="mt-auto pt-4 text-sm font-mono text-amber-400">
              view credential →
            </span>
          </motion.a>
        ))}
      </div>

    </section>
  );
};

export default Certificate;
