import PropTypes from "prop-types";
import {
  SiAirtable,
  SiAngular,
  SiAnsible,
  SiAmazonwebservices,
  SiAstro,
  SiCaddy,
  SiClaude,
  SiCloudflare,
  SiDart,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiGithubactions,
  SiJavascript,
  SiJupyter,
  SiLinux,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOdoo,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiProxmox,
  SiPython,
  SiPytorch,
  SiReact,
  SiRuby,
  SiRubyonrails,
  SiScikitlearn,
  SiSqlite,
  SiStreamlit,
  SiStripe,
  SiSupabase,
  SiSwift,
  SiTailwindcss,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
  SiVite,
} from "react-icons/si";

// One registry for every tech logo on the site. Uses react-icons/si (Simple
// Icons) so only the icons listed here end up in the bundle. Colors are the
// brand colors, lightened where the official one is black (unreadable on the
// dark background).
const ICONS = {
  airtable: { Icon: SiAirtable, color: "#18BFFF", label: "Airtable" },
  angular: { Icon: SiAngular, color: "#DD0031", label: "Angular" },
  ansible: { Icon: SiAnsible, color: "#E5E7EB", label: "Ansible" },
  astro: { Icon: SiAstro, color: "#FF5D01", label: "Astro" },
  aws: { Icon: SiAmazonwebservices, color: "#FF9900", label: "AWS" },
  caddy: { Icon: SiCaddy, color: "#1F88C0", label: "Caddy" },
  claude: { Icon: SiClaude, color: "#D97757", label: "Claude" },
  cloudflare: { Icon: SiCloudflare, color: "#F38020", label: "Cloudflare" },
  csharp: { Icon: SiDotnet, color: "#A179DC", label: ".NET / C#" },
  dart: { Icon: SiDart, color: "#0175C2", label: "Dart" },
  django: { Icon: SiDjango, color: "#44B78B", label: "Django" },
  docker: { Icon: SiDocker, color: "#2496ED", label: "Docker" },
  fastapi: { Icon: SiFastapi, color: "#009688", label: "FastAPI" },
  firebase: { Icon: SiFirebase, color: "#FFCA28", label: "Firebase" },
  flask: { Icon: SiFlask, color: "#E5E7EB", label: "Flask" },
  flutter: { Icon: SiFlutter, color: "#02569B", label: "Flutter" },
  github: { Icon: SiGithubactions, color: "#2088FF", label: "GitHub Actions" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  jupyter: { Icon: SiJupyter, color: "#F37626", label: "Jupyter" },
  kubernetes: { Icon: SiKubernetes, color: "#326CE5", label: "Kubernetes" },
  linux: { Icon: SiLinux, color: "#FCC624", label: "Linux" },
  mongodb: { Icon: SiMongodb, color: "#47A248", label: "MongoDB" },
  nextjs: { Icon: SiNextdotjs, color: "#E5E7EB", label: "Next.js" },
  nodejs: { Icon: SiNodedotjs, color: "#5FA04E", label: "Node.js" },
  odoo: { Icon: SiOdoo, color: "#A24689", label: "Odoo" },
  openai: { Icon: SiOpenai, color: "#E5E7EB", label: "OpenAI" },
  pandas: { Icon: SiPandas, color: "#E5E7EB", label: "pandas" },
  postgresql: { Icon: SiPostgresql, color: "#4169E1", label: "PostgreSQL" },
  proxmox: { Icon: SiProxmox, color: "#E57000", label: "Proxmox" },
  python: { Icon: SiPython, color: "#3776AB", label: "Python" },
  pytorch: { Icon: SiPytorch, color: "#EE4C2C", label: "PyTorch" },
  react: { Icon: SiReact, color: "#61DAFB", label: "React" },
  ruby: { Icon: SiRuby, color: "#CC342D", label: "Ruby" },
  rails: { Icon: SiRubyonrails, color: "#D30001", label: "Rails" },
  sklearn: { Icon: SiScikitlearn, color: "#F7931E", label: "scikit-learn" },
  sqlite: { Icon: SiSqlite, color: "#44A8E0", label: "SQLite" },
  streamlit: { Icon: SiStreamlit, color: "#FF4B4B", label: "Streamlit" },
  stripe: { Icon: SiStripe, color: "#635BFF", label: "Stripe" },
  supabase: { Icon: SiSupabase, color: "#3FCF8E", label: "Supabase" },
  swift: { Icon: SiSwift, color: "#F05138", label: "Swift" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4", label: "Tailwind" },
  tensorflow: { Icon: SiTensorflow, color: "#FF6F00", label: "TensorFlow" },
  terraform: { Icon: SiTerraform, color: "#844FBA", label: "Terraform" },
  typescript: { Icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  vite: { Icon: SiVite, color: "#646CFF", label: "Vite" },
};

export const TechIcon = ({ name, className = "", title }) => {
  const entry = ICONS[name];
  if (!entry) {
    return <span className={`text-xs font-mono ${className}`}>{name}</span>;
  }
  const { Icon, color, label } = entry;
  return (
    <Icon
      className={className}
      style={{ color }}
      title={title ?? label}
      aria-label={label}
      role="img"
    />
  );
};

TechIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};
