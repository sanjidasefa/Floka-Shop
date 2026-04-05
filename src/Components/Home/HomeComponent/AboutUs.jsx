import React from "react";
import { motion } from "framer-motion";
import RotatingCircle from "../../ui/RotatingCircle";

const AboutUs = () => {
  const text = "Our approach is straightforward— prioritizing functionality, speed, and clarity for solutions.";
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container mx-auto px-6 py-15 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <RotatingCircle />
        </motion.div>
        
        <div className="space-y-4">
          <h4 className="text-yellow-600 uppercase tracking-[5px] text-xs font-bold">
            Our Philosophy
          </h4>
          <p className="text-gray-600 font-light text-2xl md:text-3xl leading-snug font-serif ">
            We design every project with <br className="hidden md:block" />
            <span className="text-black font-semibold not-italic border-b-2 border-yellow-200/50">
              long-term success
            </span> in mind.
          </p>
        </div>
      </div>
      <motion.div
        className="flex flex-wrap text-black font-serif font-medium text-4xl md:text-6xl leading-[1.1] tracking-tighter"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            key={index}
            className="mr-3" 
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

    </div>
  );
};

export default AboutUs;