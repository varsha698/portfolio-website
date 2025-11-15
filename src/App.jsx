import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ContactMe from "./pages/Contact";
import Footer from "./components/Footer";
import Certificates from "./pages/Certificate";
import Publications from "./pages/Publications";
import "./App.css";

const App = () => {
  const location = useLocation();

  const isContactPage = location.hash.replace(/\/$/, "") === "#/contact";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/contact" element={<ContactMe />} />
        </Routes>
      </main>
      {!isContactPage && <Footer />}
    </>
  );
};

export default App;
