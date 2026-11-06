import PropTypes from "prop-types";
import { ICONS } from "./techIconRegistry";



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
