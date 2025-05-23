import React from "react";
import TechIcon from "./TechIcons";

const techCategories = [
  {
    category: "Frontend",
    theme: "neural",
    techs: ["Flutter", "HTML", "CSS", "JavaScript", "Figma"]
  },
  {
    category: "Backend",
    theme: "terminal",
    techs: ["Flask", "Terraform", "Ansible", "Docker"]
  },
  {
    category: "Database & Cloud",
    theme: "vortex",
    techs: ["Firebase", "SQL", "AWS EC2"]
  },
  {
    category: "AI/Automation",
    theme: "ai",
    techs: ["Python", "PyTorch", "TensorFlow", "Natural Language Processing"]
  }
];

const TechStackDisplay = () => {
  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">Tech Stack Showcase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techCategories.map(({ category, techs }) => (
          <div key={category} className="border border-gray-700 p-6 rounded-xl bg-gray-900 bg-opacity-30">
            <h2 className="text-xl font-semibold mb-4">{category}</h2>
            <div className="flex flex-wrap gap-4">
              {techs.map((tech) => (
                <TechIcon key={tech} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackDisplay;
