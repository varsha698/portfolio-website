import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectModal from "./ProjectModal"; 
import { getTechIcon } from "./TechIcons";

const projects = [
  {
    name: "AI Quiz Generator Website",
    desc: "Built an AI Quiz Generator Website with Angular frontend and C# Web API backend, leveraging Groq API for NLP-based quiz generation. Designed RESTful endpoints using Swagger, implemented responsive UI, containerized with Docker, and automated CI/CD workflows using GitHub Actions.",
    link: "#",
    code: "#",
    techstackused: "Angular, C#, ASP.NET Core, Docker, GitHub Actions, Swagger, Groq API",
    techstackicons: ["angular", "docker", "github"]
  },
  {
    name: "Sentiment Analysis Model",
    desc: "Developed a sentiment classifier for IMDB reviews using PyTorch and a feedforward neural network. Preprocessed text, vectorized input, and trained the model with cross-entropy loss and Adam optimizer.",
    link: "https://github.com/varsha698/nlp_project2025.git",
    code: "https://github.com/varsha698/nlp_project2025.git",
    techstackused: "Python, PyTorch, MLP",
    techstackicons: ["python", "pytorch"]
  },
  {
    name: "Cloud Infrastructure Automation (DevOps Project)",
    desc: "Provisioned AWS EC2 infrastructure using Terraform and secured access via SSH keys. Automated environment setup and Flask deployment using Ansible. Built CI/CD pipeline with GitHub Actions to lint, test, and push Dockerized apps on commit.",
    link: "https://github.com/varsha698/DevOps_Project.git",
    code: "https://github.com/varsha698/DevOps_Project.git",
    techstackused: "Terraform, Ansible, Flask, Docker, GitHub Actions, AWS EC2",
    techstackicons: ["terraform", "ansible", "flask", "docker", "github", "aws"]
  },
  {
    name: "PantryPal – Mobile App",
    desc: "Developing a Flutter app to support low-income families with affordable meal planning. Built recipe recommendations using ingredient tags and pantry tracking. Set up CI/CD using GitHub Actions for testing, linting, and build validation.",
    link: "https://github.com/varsha698/PantryPalApp.git",
    code: "https://github.com/varsha698/PantryPalApp.git",
    techstackused: "Flutter, Firebase, GitHub Actions",
    techstackicons: ["flutter", "firebase", "github"]
  },
  {
    name: "Personal Portfolio Website",
    desc: "A fully responsive portfolio website built with React and Tailwind, featuring animated project modals, tech stacks, and GitHub integration.",
    link: "https://varsha698.github.io/portfolio-website/",
    code: "https://github.com/varsha698/portfolio-website.git",
    techstackused: "React.js, Tailwind CSS, Framer Motion, Vite, GitHub Pages",
    techstackicons: ["reactjs", "tailwindcss", "vite", "github"]
  },
  {
    name: "AI Model Stock Analysis",
    desc: "Built an ML ensemble (XGBoost + LSTM) trading-signal and portfolio-risk platform. FastAPI backend, Next.js 14 frontend, SQLite persistence, containerized with Docker and deployed on Fly.io.",
    link: "https://github.com/varsha698/AI-Model-Stock-Analysis",
    code: "https://github.com/varsha698/AI-Model-Stock-Analysis",
    techstackused: "Python, FastAPI, Next.js, XGBoost, LSTM, SQLite, Docker, Fly.io",
    techstackicons: ["python", "nextjs", "docker"]
  },
  {
    name: "ai-doc-editor",
    desc: "Local-LLM (LLaMA3 / Mistral) writing studio with async FastAPI, retrieval-augmented generation over ChromaDB, and a LoRA fine-tuning harness. Next.js 15 + Tiptap frontend, pgvector storage.",
    link: "https://github.com/varsha698/ai-doc-editor",
    code: "https://github.com/varsha698/ai-doc-editor",
    techstackused: "Next.js, FastAPI, ChromaDB, PyTorch, pgvector, Tiptap",
    techstackicons: ["nextjs", "python", "pytorch"]
  },
  {
    name: "Winter Weather Lab",
    desc: "NOAA / NWS Streamlit app with a RandomForest winter-storm severity predictor. Blends live weather feeds with a trained classifier to surface storm-risk scores.",
    link: "https://github.com/varsha698/-Winter-Weather-Lab",
    code: "https://github.com/varsha698/-Winter-Weather-Lab",
    techstackused: "Python, Streamlit, scikit-learn, pandas",
    techstackicons: ["python"]
  },
  {
    name: "Sales Analytics Project",
    desc: "pandas / numpy sales-KPI pipeline exporting cleaned CSVs for Tableau dashboards. Business-analyst portfolio piece paired with the Microsoft BA certification work.",
    link: "https://github.com/varsha698/Sales-Analytics-Project",
    code: "https://github.com/varsha698/Sales-Analytics-Project",
    techstackused: "Python, pandas, numpy, Tableau",
    techstackicons: ["python"]
  },
  {
    name: "Personal Admin Assistant (iOS)",
    desc: "Native SwiftUI + SwiftData + CloudKit iOS life-admin app with Tasks, Commitments, DailyBrief, and ActionReceipt models, EventKit calendar sync, and local notifications.",
    link: "#",
    code: "#",
    techstackused: "Swift, SwiftUI, SwiftData, CloudKit, EventKit",
    techstackicons: []
  },
  {
    name: "dev-journal",
    desc: "Meta-tool for tracking cross-repo engineering activity. stdlib collect.py → journal.json → self-redeploying GitHub Pages activity timeline. Zero external dependencies.",
    link: "https://github.com/varsha698/dev-journal",
    code: "https://github.com/varsha698/dev-journal",
    techstackused: "Python, GitHub Actions, GitHub Pages",
    techstackicons: ["python", "github"]
  }
];

const shineKeyframes = `
  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const navigateToContact = () => {
    navigate('/contact');
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative transition-colors duration-300 bg-black"
      style={{ 
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
        position: "relative", 
        padding: "6rem 2rem" 
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: shineKeyframes }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={`h-${i}`} 
            className="absolute w-full h-px" 
            style={{ 
              top: `${i * 5}%`, 
              background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
              opacity: '0.3'
            }} 
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`v-${i}`} 
            className="absolute h-full w-px" 
            style={{ 
              left: `${i * 5}%`, 
              background: 'linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
              opacity: '0.3'
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
          marginTop: "2rem"
        }}
      >
        Projects
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto z-10">
        {projects.map((project, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedProject(project)} className="relative cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:border-amber-500/50">
            <div className="relative p-6 backdrop-blur-md rounded-lg border overflow-hidden h-full transition-colors duration-300 bg-black/60 border-amber-900/50">
              <h3 className="text-xl font-semibold mb-2 relative z-10 text-amber-400">{project.name}</h3>
              <p className="mb-4 relative z-10 text-gray-300">{project.desc}</p>

              <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                {project.techstackicons.map((tech, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }} transition={{ duration: 0.3 }} className="text-2xl text-amber-500">
                    {getTechIcon(tech)}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};

export default Projects;
