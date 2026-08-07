import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ParticleBackground from "./components/ParticleBackground";
import CommandPalette from "./components/CommandPalette";
import CustomCursor from "./components/CustomCursor";
import { useMode } from "./context/ModeContext";
import "./App.css";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Certificates = lazy(() => import("./pages/Certificate"));
const Publications = lazy(() => import("./pages/Publications"));
const ContactMe = lazy(() => import("./pages/Contact"));
const Personal = lazy(() => import("./pages/Personal"));

const RouteFallback = ({ isPersonal }) => (
  <div
    className={`min-h-screen flex items-center justify-center ${
      isPersonal ? "bg-[#041825] text-sky-200" : "bg-black text-amber-400"
    }`}
  >
    <div
      className={`animate-pulse text-lg ${
        isPersonal ? "font-serif italic text-2xl" : "font-mono"
      }`}
      style={
        isPersonal
          ? { fontFamily: '"Cormorant Garamond", Georgia, serif' }
          : undefined
      }
    >
      loading…
    </div>
  </div>
);

// Root chooser — Home in work mode, Personal in personal mode
const HomeSwitch = () => {
  const { mode } = useMode();
  return mode === "personal" ? <Personal /> : <Home />;
};

// In personal mode, professional routes redirect home (single-page personal experience)
const WorkOnly = ({ children }) => {
  const { mode } = useMode();
  return mode === "personal" ? <Navigate to="/" replace /> : children;
};

const App = () => {
  const location = useLocation();
  const { mode } = useMode();
  const isPersonal = mode === "personal";
  const isContactPage = location.hash.replace(/\/$/, "") === "#/contact";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, mode]);

  return (
    <>
      {!isPersonal && <ParticleBackground />}
      <CommandPalette />
      {!isPersonal && <CustomCursor />}
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={mode + location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Suspense fallback={<RouteFallback isPersonal={isPersonal} />}>
            <Routes location={location}>
              <Route path="/" element={<HomeSwitch />} />
              <Route
                path="/about"
                element={
                  <WorkOnly>
                    <About />
                  </WorkOnly>
                }
              />
              <Route
                path="/projects"
                element={
                  <WorkOnly>
                    <Projects />
                  </WorkOnly>
                }
              />
              <Route
                path="/certificates"
                element={
                  <WorkOnly>
                    <Certificates />
                  </WorkOnly>
                }
              />
              <Route
                path="/publications"
                element={
                  <WorkOnly>
                    <Publications />
                  </WorkOnly>
                }
              />
              <Route path="/contact" element={<ContactMe />} />
              <Route path="/personal" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>

      {!isContactPage && !isPersonal && <Footer />}
    </>
  );
};

RouteFallback.propTypes = { isPersonal: PropTypes.bool };
WorkOnly.propTypes = { children: PropTypes.node };

export default App;
