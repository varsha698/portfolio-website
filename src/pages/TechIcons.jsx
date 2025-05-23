import {
  SiFlutter, SiHtml5, SiCss3, SiJavascript, SiFigma,
  SiFlask, SiTerraform, SiAnsible, SiDocker, SiFirebase,
  SiMysql, SiPython, SiPytorch, SiTensorflow, SiServer, SiCode
} from "react-icons/si";

const fallbackIcons = {
  Flutter: <SiFlutter />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  JavaScript: <SiJavascript />,
  Figma: <SiFigma />,
  Flask: <SiFlask />,
  Terraform: <SiTerraform />,
  Ansible: <SiAnsible />,
  Docker: <SiDocker />,
  Firebase: <SiFirebase />,
  SQL: <SiMysql />,
  "AWS EC2": <SiServer />, // 👈 replaced invalid import
  Python: <SiPython />,
  PyTorch: <SiPytorch />,
  TensorFlow: <SiTensorflow />
};

const TechIcon = ({ tech, theme }) => {
  const icon = fallbackIcons[tech] || <SiCode />;

  return (
    <div className="flex flex-col items-center w-14 h-14">
      <div className="text-2xl text-white">{icon}</div>
      <span className="text-xs text-gray-300 mt-1 text-center">{tech}</span>
    </div>
  );
};

export default TechIcon;
