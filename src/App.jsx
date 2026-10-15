import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ParticleBackground from "./components/ParticleBackground";
import CommandPalette from "./components/CommandPalette";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const SalesTaxCaseStudy = lazy(() => import("./pages/SalesTaxCaseStudy"));
const Certificates = lazy(() => import("./pages/Certificate"));
const Publications = lazy(() => import("./pages/Publications"));
const ContactMe = lazy(() => import("./pages/Contact"));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black text-amber-400">
    <div className="animate-pulse text-lg font-mono">loading…</div>
  </div>
);

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isContactPage = location.pathname.replace(/\/$/, "") === "/contact";

  // The site used hash routing until late 2026; keep old /#/projects style
  // links (resumes, LinkedIn, bookmarks) working.
  useEffect(() => {
    if (location.hash.startsWith("#/")) {
      navigate(location.hash.slice(1), { replace: true });
    }
  }, [location.hash, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <ParticleBackground />
      <CommandPalette />
      <Header />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/sales-tax" element={<SalesTaxCaseStudy />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<ContactMe />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!isContactPage && <Footer />}
    </>
  );
};

export default App;
