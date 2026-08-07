import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ParticleBackground from "./components/ParticleBackground";
import CommandPalette from "./components/CommandPalette";
import CustomCursor from "./components/CustomCursor";
import "./App.css";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Certificates = lazy(() => import("./pages/Certificate"));
const Publications = lazy(() => import("./pages/Publications"));
const ContactMe = lazy(() => import("./pages/Contact"));
const Personal = lazy(() => import("./pages/Personal"));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black text-amber-400">
    <div className="animate-pulse text-lg font-mono">loading…</div>
  </div>
);

const App = () => {
  const location = useLocation();
  const isContactPage = location.hash.replace(/\/$/, "") === "#/contact";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <ParticleBackground />
      <CommandPalette />
      <CustomCursor />
      <Header />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<ContactMe />} />
            <Route path="/personal" element={<Personal />} />
          </Routes>
        </Suspense>
      </main>
      {!isContactPage && <Footer />}
    </>
  );
};

export default App;
