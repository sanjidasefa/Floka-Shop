import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const CTA = () => {
  const ref = useRef(null);
  
  // Parallax Text Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const xTransform = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const yTransform = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);
  const shadowTransform = useTransform(
    [smoothX, smoothY], 
    ([x, y]) => `${-x * 40}px ${-y * 40}px 30px rgba(108, 99, 255, 0.2)`
  );

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="contact" 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-48 px-6 overflow-hidden perspective-[1000px]"
    >
      <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full pb-32 -z-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          className="text-6xl md:text-8xl lg:text-[120px] font-bold font-heading mb-8 tracking-tighter cursor-crosshair"
          style={{ x: xTransform, y: yTransform, textShadow: shadowTransform }}
        >
          Ready to scale?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto pointer-events-none"
        >
          Stop building websites. Start building intelligent digital agents. Let's engineer your next digital leap.
        </motion.p>

        <motion.a 
          href="mailto:hello@floka.ai"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="group relative inline-flex flex-col items-center justify-center font-bold text-white text-2xl"
        >
          <span className="relative flex items-center gap-2 mb-2">
            Initiate Project 
            <FiArrowRight size={24} className="group-hover:translate-x-2 group-hover:text-accent transition-all duration-300" />
          </span>
          {/* Smooth left-to-right underline reveal */}
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white/20"></span>
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out shadow-[0_0_10px_rgba(108,99,255,0.8)]"></span>
        </motion.a>
      </div>
    </section>
  );
};

export default CTA;
