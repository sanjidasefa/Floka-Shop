import React from "react";
import heroVideo from "/home-1-video.mp4";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-70"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>

      {/* Hero Content with Framer Motion */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-serif font-bold mb-6 tracking-tighter leading-tight"
        >
          Floka <br /> <span className="text-gray-300">Studio</span>
        </motion.h1>

        <div className="bg-white flex justify-between items-center rounded-2xl p-4">
         <img src="" alt="" />
        <div>
          <h1 className="capitalize text-gray-300">head of idea</h1>
          <h1 className="text-black">Almond D. Nelsi</h1>
         <div>  
           <button  animate={{ rotate: 360 }}
            transition={{ duration: 1 }}>
            <div className="bg-black rounded-full p-4"> f</div>
          </button>
          <h1 className="text-black">LET'S TALK</h1>
         </div>
        </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl max-w-xl mx-auto mb-10 font-light mr-2 opacity-80"
        >
          No cookie-cutter websites. No fluff .
          <span className="text-gray-300">
            {" "}
             Just real tools and smart strategies to grow your business and
            elevate your brand.
          </span>
        </motion.p>
        
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-4 bg-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
