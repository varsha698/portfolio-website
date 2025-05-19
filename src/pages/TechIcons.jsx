import React from "react";
import { SiExpress, SiFirebase, SiTensorflow, SiOpencv } from "react-icons/si";
import StackIcon from "tech-stack-icons";

// Icons known to break from `tech-stack-icons`
const failingIcons = new Set([
  "expressjs",
  "opencv",
  "tesseract-ocr",
  "tensorflow",
  "deep-learning",
  "image-processing",
  "pygame",
  "selenium",
  "web-scraping",
  "multithreading",
  "file-io",
  "ncurses"
]);

// Fallback Icons for known cases
const fallbackIcons = {
  expressjs: <SiExpress />,
  firebase: <SiFirebase />,
  tensorflow: <SiTensorflow />,
  opencv: <SiOpencv />
};

// Function to get tech icon with error handling
export const getTechIcon = (tech) => {
  const key = tech.toLowerCase();

  if (failingIcons.has(key)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn("Using fallback icon for:", key);
    }
    return fallbackIcons[key] || <span className="text-sm text-gray-400">{tech}</span>;
  }

  try {
    const icon = <StackIcon name={tech} style={{ fontSize: '1.5rem', width: '24px', height: '24px' }} />;
    return React.isValidElement(icon)
      ? icon
      : fallbackIcons[key] || <span className="text-sm text-gray-400">{tech}</span>;
  } catch (error) {
    console.error("Error fetching icon for:", tech, error);
    return fallbackIcons[key] || <span className="text-sm text-gray-400">{tech}</span>;
  }
};
