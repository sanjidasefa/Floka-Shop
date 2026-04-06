import { useEffect, useRef, useState } from 'react';
import { useRef as useAnimRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const subtitleRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setDone(true);
        if (onComplete) onComplete();
      }
    });

    // Animate percentage count
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setPercent(Math.round(counter.val)),
    });

    tl
      // Logo blur-in
      .fromTo(logoRef.current,
        { opacity: 0, y: 30, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' }
      )
      // Subtitle fade
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      // Hold
      .to({}, { duration: 0.8 })
      // Exit: everything up
      .to(logoRef.current, {
        opacity: 0, y: -40, filter: 'blur(8px)', duration: 0.5, ease: 'power3.in'
      })
      .to(containerRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1, ease: 'expo.inOut'
      }, '-=0.2');

    return () => tl.kill();
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      style={{ background: '#030307', clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 orb orb-accent opacity-20 animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 orb orb-alt opacity-15 animate-float-med" />
      <div className="absolute inset-0 grid-overlay opacity-20" />

      {/* Content */}
      <div className="flex flex-col items-center gap-6 relative z-10">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2">
          <span className="text-5xl md:text-7xl font-black font-heading text-white tracking-tight">Floka</span>
          <motion.span
            animate={{ boxShadow: ['0 0 8px rgba(108,99,255,1)', '0 0 20px rgba(108,99,255,1)', '0 0 8px rgba(108,99,255,1)'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-3 h-3 rounded-full bg-accent mt-4"
          />
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="text-gray-600 text-xs uppercase tracking-[0.5em] font-black">
          Design Studio
        </div>

        {/* Progress bar */}
        <div className="w-48 md:w-64 h-px bg-white/10 relative overflow-hidden mt-4">
          <motion.div
            className="absolute inset-y-0 left-0 h-full"
            style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-alt))' }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.05 }}
          />
          <div
            className="absolute inset-y-0 right-0 h-full w-16 opacity-60"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.5))' }}
          />
        </div>

        {/* Percentage */}
        <span className="text-accent text-xs font-black tracking-widest">{percent}%</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </div>
  );
};

export default Preloader;
