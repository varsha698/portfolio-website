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
