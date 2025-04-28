import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechStackShowcase from "./TechStackDisplay";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const h3Ref = useRef(null);
  const sectionRef = useRef(null);
  const spiralRef = useRef(null);

  useEffect(() => {
    if (!h3Ref.current) return;

    const splitText = new SplitType(h3Ref.current, { types: "words" });

    gsap.timeline({
      scrollTrigger: {
        trigger: h3Ref.current,
        start: "top 90%",
        end: "+=100%",
        scrub: 1,
      },
    }).fromTo(
      splitText.words,
      { color: "#ffcc66", opacity: 0.1 },
      { color: "#ff9966", opacity: 1, stagger: 0.1, duration: 1 }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  useEffect(() => {
    if (!spiralRef.current) return;

    gsap.to(spiralRef.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "linear"
    });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="flex flex-col justify-center items-center text-center bg-black overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #0f1523 0%, #000000 100%)",
        minHeight: "100vh",
        position: "relative"
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full h-px" style={{ top: `${i * 5}%`, background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)', opacity: '0.3' }} />
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full w-px" style={{ left: `${i * 5}%`, background: 'linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.2), transparent)', opacity: '0.3' }} />
        ))}
      </div>

      <div ref={spiralRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-10 pointer-events-none" style={{ background: `conic-gradient(from 0deg, rgba(255, 153, 102, 0), rgba(255, 153, 102, 0.3), rgba(255, 153, 102, 0.5), rgba(255, 153, 102, 0.3), rgba(255, 153, 102, 0))`, borderRadius: '50%', filter: 'blur(8px)' }}></div>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10 flex flex-col justify-center items-center w-full">
        <div className="z-20 w-full flex justify-center" style={{ marginTop: "30vh", marginBottom: "30vh" }}>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 pb-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ textShadow: "0 0 15px rgba(255, 153, 102, 0.7), 0 0 30px rgba(255, 153, 102, 0.5)" }}>
            Hey, I'm Varshini! <br />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
              Welcome to my portfolio!
            </motion.span>
          </motion.h1>
        </div>

        <div className="relative z-10 w-full flex justify-center h-auto mb-20">
          <TechStackShowcase />
        </div>

        <div className="relative z-10 mt-10 text-center min-h-[70vh]">
          <h3 ref={h3Ref} className="text-xl mb-20 md:text-2xl font-bold text-white tracking-wide px-4 md:px-0" style={{ textShadow: "0 0 5px rgba(255, 153, 102, 0.3)" }}>
            Computer Science major passionate about AI, cybersecurity, and building impactful apps. <br />
            Developing solutions to real-world challenges using technology and innovation.
          </h3>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;