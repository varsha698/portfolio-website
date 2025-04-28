import { Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import Certificate from "./pages/Certificate.jsx";
import "./App.css";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      {/* Navigation bar */}
      <nav className="fixed top-0 w-full flex justify-center bg-black/30 backdrop-blur-md p-4 z-50 text-white text-lg font-semibold">
        <ul className="flex gap-8">
          <li className="hover:text-amber-400 hover:scale-110 transition duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-amber-400 hover:scale-110 transition duration-300">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-amber-400 hover:scale-110 transition duration-300">
            <Link to="/projects">Projects</Link>
          </li>
          <li className="hover:text-amber-400 hover:scale-110 transition duration-300">
            <Link to="/certificates">Certificates</Link>
          </li>
          <li className="hover:text-amber-400 hover:scale-110 transition duration-300">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificate />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
