import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Their dedication to community-driven design has transformed how we connect with our students and families. It's more than technology; it's a bridge to a better future.",
    author: "Sarah Jenkins",
    role: "Director of Education, Bright Horizons",
    avatar: 'S',
    color: 'from-violet-500 to-indigo-600',
  },
  {
    quote: "By focusing on human-centered experiences, they helped us create a platform that truly resonates with our mission of environmental sustainability. Our community is more engaged than ever.",
    author: "Marcus Vance",
    role: "Founder, Green Path Initiative",
    avatar: 'M',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    quote: "They blend creative innovation with a deep sense of purpose. Our community hub is now a vibrant space for artistic expression — bringing people together in ways we never imagined.",
    author: "Elena Rostov",
    role: "Cultural Coordinator",
    avatar: 'E',
    color: 'from-rose-500 to-pink-600',
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  const goTo = (idx) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };
  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading: rotationZ swing stagger
      const split = new SplitType(titleRef.current, { types: 'words' });
      gsap.from(split.words, {
        opacity: 0, y: 50, rotationZ: 8,
        transformOrigin: 'left bottom',
        stagger: 0.08, duration: 1.2, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * 80, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: -dir * 60, scale: 0.96 }),
  };

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-24 md:py-32 overflow-hidden border-t-2 "
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 grid-overlay opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] orb orb-accent opacity-8" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* ── Left sticky panel ── */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-28">
            <motion.div className="section-tag mb-6"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <span className="section-tag-dot" />
              <span>Voices of Change</span>
            </motion.div>

            <h2 ref={titleRef} className="text-4xl md:text-5xl font-black font-heading leading-[1.15] tracking-tight text-white mb-8">
              What our <br /> partners say.
            </h2>

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg text-gray-400 leading-relaxed max-w-sm mb-10"
            >
              Discover the stories of impact from visionary leaders and communities we've had the honour to partner with.
            </motion.p>

            {/* Navigation */}
            <div className="flex items-center gap-5">
              <button onClick={prev}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-accent/20 hover:border-accent/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(108,99,255,0.3)]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? 'w-8 bg-accent shadow-[0_0_10px_rgba(108,99,255,0.7)]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <button onClick={next}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-accent/20 hover:border-accent/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(108,99,255,0.3)]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <div className="mt-6 w-32 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                animate={{ width: `${((active + 1) / testimonials.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* ── Right: Slider ── */}
          <div className="w-full lg:w-3/5 relative min-h-[380px]">
            {/* Glow behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 orb orb-accent opacity-15 -z-10" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="glass-card p-10 md:p-14"
                style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: j * 0.07, type: 'spring', damping: 12 }}
                    >
                      <FaStar size={18} className="text-accent drop-shadow-[0_0_6px_rgba(108,99,255,0.8)]" />
                    </motion.span>
                  ))}
                </div>

                {/* Quote mark */}
                <div className="text-7xl font-black text-accent/10 leading-none mb-2 font-heading select-none">"</div>

                <p className="text-xl md:text-2xl text-gray-100 mb-10 font-bold leading-relaxed italic tracking-tight">
                  {testimonials[active].quote}
                </p>

                <div className="flex items-center gap-5 border-t border-white/5 pt-8">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[active].color} p-px shadow-2xl`}>
                    <div className="w-full h-full rounded-full bg-[#060612] flex items-center justify-center font-black text-xl text-white">
                      {testimonials[active].avatar}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg">{testimonials[active].author}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-black mt-0.5">{testimonials[active].role}</p>
                  </div>
                  {/* Decorative quote mark corner */}
                  <div className="ml-auto text-5xl font-black text-accent/10 leading-none font-heading select-none">"</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stacked card shadows */}
            <div className="absolute -bottom-3 left-4 right-4 h-full glass-card rounded-2xl -z-10 opacity-40 scale-[0.97]" />
            <div className="absolute -bottom-6 left-8 right-8 h-full glass-card rounded-2xl -z-20 opacity-20 scale-[0.94]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
