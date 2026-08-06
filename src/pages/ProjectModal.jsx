import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";

// Accordion Component
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border rounded-md transition-colors duration-300 mb-2 border-amber-700/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 font-semibold transition text-amber-300 bg-black/40 hover:bg-black/60"
      >
        <span>{title}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden px-4 py-2 bg-black/20"
      >
        {isOpen && children}
      </motion.div>
    </div>
  );
};

// Static README data per project
const projectReadmes = {
  "AI Quiz Generator Website": {
    features: [
      "Angular frontend with responsive UI design",
      "C# Web API backend with RESTful architecture",
      "Groq API integration for NLP-based quiz generation",
      "Swagger documentation for API endpoints",
      "Docker containerization for easy deployment",
      "CI/CD pipeline with GitHub Actions"
    ],
    techstack: "Angular, C#, ASP.NET Core, Docker, GitHub Actions, Swagger, Groq API",
    setup: `git clone <repository-url>
cd ai-quiz-generator
docker-compose up`,
    output: "A fully functional quiz generator website with AI-powered question generation."
  },
  "Cloud Infrastructure Automation (DevOps Project)": {
    features: [
      "Terraform for infrastructure-as-code",
      "Ansible for configuration management",
      "Flask web app containerized with Docker",
      "CI/CD pipeline with GitHub Actions",
      "Hosted on AWS EC2"
    ],
    techstack: "Terraform, Ansible, Flask, Docker, GitHub Actions, AWS EC2",
    setup: `git clone https://github.com/varsha698/DevOps_Project.git
cd DevOps_Project
terraform init
terraform apply`,
    output: "Once deployed, your Flask app will run on the EC2 instance at the configured public IP address."
  },
  "Sentiment Analysis Model": {
    features: [
      "Built with PyTorch and a feedforward neural network (MLP)",
      "Uses IMDB movie reviews dataset",
      "Performs text preprocessing and vectorization",
      "Trains with cross-entropy loss and Adam optimizer",
      "Classifies reviews as positive or negative"
    ],
    techstack: "Python, PyTorch, MLP",
    setup: `git clone https://github.com/varsha698/sentiment-analysis-model.git
cd sentiment-analysis-model
pip install -r requirements.txt
python train.py`,
    output: "Model classifies reviews as positive or negative with accuracy metrics printed after training."
  },
  "PantryPal – Mobile App": {
    features: [
      "🧾 Pantry Tracker – Add and manage pantry inventory with expiration dates",
      "🍲 Smart Recipe Matching – Get recipe suggestions based on available ingredients",
      "🏷️ Tags & Filters – Filter recipes by dietary needs, time, and budget",
      "💬 Community Chat & Comments – Discuss tips and suggestions with others",
      "🛒 Food Resource Directory – Connect to local pantries and assistance programs",
      "🔁 CI/CD – GitHub Actions integrated for automated testing and deployment"
    ],
    techstack: "Flutter, Firebase (Auth, Firestore, Storage), GitHub Actions, Dart, Python (for NLP experiments)",
    setup: `git clone https://github.com/varsha698/pantrypal.git
cd pantrypal
flutter pub get
flutter run`,
    output: "Cross-platform app with pantry tracking, recipe suggestions, chat features, and CI/CD workflows for deployment."
  },
  "Personal Portfolio Website": {
    features: [
      "🌐 Built with React.js and Tailwind CSS for a fast, responsive interface",
      "🖼️ Smooth animations with Framer Motion",
      "📂 Dynamic project modal with dropdown README sections",
      "☀️ Dark/light theme toggle with localStorage",
      "📱 Fully responsive on all devices"
    ],
    techstack: "React.js, Tailwind CSS, Framer Motion, Vite, GitHub Pages",
    setup: `git clone https://github.com/varsha698/portfolio-website.git
cd portfolio-website
npm install
npm run dev`,
    output: "A polished developer portfolio to showcase your projects and skills, hosted on GitHub Pages.",
    design: [
      "🎨 Clean and minimal layout with dark mode",
      "💡 Animations for user engagement and interactivity",
      "📱 Grid and flexbox structure for mobile-first design",
      "📎 External links and modal popups for project details",
    ]
  }
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  const readme = projectReadmes[project.name];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 bg-black/80"
            onClick={onClose}
            style={{
              background: "radial-gradient(circle at center, rgba(15, 21, 35, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%)"
            }}
    >
      <motion.div
              className="relative backdrop-blur-md p-8 rounded-lg border max-w-4xl w-full mx-4 overflow-y-auto max-h-[80vh] transition-colors duration-300 bg-black/60 border-amber-900/50"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-400 hover:text-amber-300 focus:outline-none"
          whileHover={{ scale: 1.2, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Header */}
        <motion.h2
                className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                  textShadow: "0 0 15px rgba(255, 153, 102, 0.5)"
                }}
        >
          {project.name}
        </motion.h2>

        <motion.p
                className="mb-6 leading-relaxed text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {project.desc}
        </motion.p>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
                <h3 className="text-lg font-semibold mb-2 text-amber-300">Tech Stack:</h3>
                <p className="text-gray-400">{project.techstackused || "Various technologies"}</p>
        </motion.div>

        {/* Dynamic README Accordion Sections */}
        {readme && (
          <motion.div
            className="mt-8 border-t border-amber-900/50 pt-6 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
                <h3 className="text-lg font-semibold mb-4 text-amber-300">For Nerds:</h3>

                <Accordion title="🚀 Features">
                  <ul className="list-disc ml-5 text-sm space-y-1 text-gray-300">
                    {readme.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </Accordion>

                <Accordion title="🧰 Tech Stack">
                  <p className="text-sm text-gray-300">{readme.techstack}</p>
                </Accordion>

                <Accordion title="📂 Setup">
                  <pre className="p-3 rounded-md overflow-x-auto text-sm whitespace-pre-wrap bg-gray-800 text-green-400">{readme.setup}</pre>
                </Accordion>

                <Accordion title="✅ Output">
                  <p className="text-sm text-gray-300">{readme.output}</p>
                </Accordion>

                {readme.design && (
                  <Accordion title="🎨 Design Decisions">
                    <ul className="list-disc ml-5 text-sm space-y-1 text-gray-300">
                      {readme.design.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </Accordion>
                )}
          </motion.div>
        )}

        {/* Links */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-amber-400 rounded-lg font-bold border border-amber-400 hover:bg-amber-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 153, 102, 0.3)" }}
              style={{ textShadow: "0 0 5px rgba(255, 153, 102, 0.5)" }}
            >
              View Live Demo
            </motion.a>
          )}
          {project.code && (
            <motion.a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-amber-400 rounded-lg font-bold border border-amber-400 hover:bg-amber-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 153, 102, 0.3)" }}
              style={{ textShadow: "0 0 5px rgba(255, 153, 102, 0.5)" }}
            >
              View Source Code
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

ProjectModal.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    techstackused: PropTypes.string,
    link: PropTypes.string,
    code: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default ProjectModal;
