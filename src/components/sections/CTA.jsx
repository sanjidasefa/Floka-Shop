import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import gsap from 'gsap';

const CTA = () => {
  const sectionRef = useRef(null);
  const orbsRef = useRef([]);

  // Mouse parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 120 });
  const headX = useTransform(springX, [0, 1], [-25, 25]);
  const headY = useTransform(springY, [0, 1], [-15, 15]);
  const glowX = useTransform(springX, [0, 1], ['-15%', '15%']);
  const glowY = useTransform(springY, [0, 1], ['-15%', '15%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulsing aurora animation for background rings
      orbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          scale: 1.15 + i * 0.1,
          opacity: 0.04 - i * 0.01,
          duration: 3 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  return (
    <section
      ref={sectionRef}
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-32 md:py-44 overflow-hidden "
    >
      {/* Animated concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        {[400, 600, 800, 1000].map((size, i) => (
          <div
            key={i}
            ref={el => orbsRef.current[i] = el}
            className="absolute rounded-full border border-accent/10"
            style={{ width: size, height: size }}
          />
        ))}
        {/* Animated aurora glow */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute w-[600px] h-[600px] orb orb-accent opacity-15"
        />
        <div className="absolute w-[300px] h-[300px] orb orb-alt opacity-8 animate-float-slow" />
      </div>

      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="section-tag w-fit mx-auto mb-10"
        >
          <span className="section-tag-dot" />
          <span>Let's Build Together</span>
        </motion.div>

        {/* Heading with mouse parallax */}
        <motion.h2
          style={{ x: headX, y: headY }}
          className="text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tighter leading-[1.05] text-white mb-10 cursor-crosshair"
        >
          Ready to build <br />
          <span className="text-gradient-flow">something that matters?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Whether it's supporting local education or protecting our natural world, 
          we're committed to building lasting digital impact. Let's start a conversation.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center mb-20"
        >
          <motion.a
            href="mailto:hello@flokashop.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary group text-base px-10 py-5"
          >
            <FiMail className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={18} />
            Start a Conversation
          </motion.a>
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ghost text-base px-10 py-5 group"
          >
            View Our Work
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </motion.a>
        </motion.div>

        {/* Contact info row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600"
        >
          <a href="mailto:hello@flokashop.com" className="flex items-center gap-2 hover:text-accent transition-colors duration-300 group">
            <FiMail size={14} className="group-hover:scale-110 transition-transform" />
            hello@flokashop.com
          </a>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for new projects
          </span>
        </motion.div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
};

export default CTA;
