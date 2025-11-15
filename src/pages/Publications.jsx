import { motion } from "framer-motion";

const publications = [
  {
    title: "Mental Health and Robotics",
    authors: "Varshini Bhavanam, Ayesha Noshin and Dr. Arshia Khan", // Update with co-authors if applicable
    conference: "ICICT (International Conference on Information and Communication Technology)",
    year: "2025",
    status: "Under Review",
    url: "/portfolio-website/ICICT_Mental_Health_and_Robotics.pdf",
    abstract: "Research paper on the intersection of mental health and robotics technology, currently under review.",
  },
];

const Publications = () => {
  return (
    <section
      id="publications"
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
        Publications
      </motion.h1>

      {/* Publications List */}
      {publications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto z-10">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              className="relative p-6 backdrop-blur-md rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 bg-black/60 border-amber-900/50 hover:shadow-amber-500/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    pub.status === "Published"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : pub.status === "Accepted"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                      : pub.status === "Under Review"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                  }`}
                >
                  {pub.status}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 pr-20 text-amber-400">
                {pub.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-2">
                <strong>Authors:</strong> {pub.authors}
              </p>
              
              <p className="text-gray-300 mb-2">
                <strong>Conference:</strong> {pub.conference}
                {pub.location && `, ${pub.location}`}
              </p>
              
              <p className="text-sm mb-3 text-gray-400">
                <strong>Year:</strong> {pub.year}
              </p>

              {pub.abstract && (
                <p className="text-sm mb-4 italic text-gray-300">{pub.abstract}</p>
              )}

              {pub.url && (
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-amber-400 hover:text-amber-300 text-sm font-semibold transition"
                >
                  {pub.url.endsWith('.pdf') ? 'Download PDF →' : 'View Paper →'}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="text-center mt-12 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-lg">Publications will be displayed here.</p>
          <p className="text-sm mt-2">Add your conference papers to the publications array in Publications.jsx</p>
        </motion.div>
      )}
    </section>
  );
};

export default Publications;

