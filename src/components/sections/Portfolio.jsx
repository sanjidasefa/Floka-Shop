import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1, title: 'Earth Guardians', category: 'Environment',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200',
    year: '2024', tags: ['UI/UX', 'Web'],
  },
  {
    id: 2, title: 'Scholar Pathways', category: 'Education',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200',
    year: '2024', tags: ['Platform', 'Mobile'],
  },
  {
    id: 3, title: 'Unity Network', category: 'Community',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200',
    year: '2023', tags: ['Web App', 'Brand'],
  },
  {
    id: 4, title: 'Creative Pulse', category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200',
    year: '2023', tags: ['Motion', 'Design'],
  },
];

const categories = ['All', 'Education', 'Environment', 'Community', 'Innovation'];

const Portfolio = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const filtered = activeCat === 'All' ? projects : projects.filter(p => p.category === activeCat);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide-up cascade for heading chars
      const split = new SplitType(titleRef.current, { types: 'chars' });
      gsap.from(split.chars, {
        opacity: 0, y: 80, rotateX: -80,
        stagger: 0.03, duration: 1, ease: 'back.out(1.4)',
        transformOrigin: '50% 100%',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-24 md:py-32 overflow-hidden ">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute top-0 left-0 w-[50%] h-[50%] orb orb-accent opacity-10" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] orb orb-alt opacity-8" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <motion.div className="section-tag mb-6"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              <span className="section-tag-dot" />
              <span>Selected Works</span>
            </motion.div>
            <h2 ref={titleRef} className="text-4xl md:text-5xl font-black font-heading tracking-tight leading-[1.15] text-white mb-6">
              Stories of Change.
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg"
            >
              Explore how we've helped communities grow, children learn, and the environment thrive through
              thoughtful, purpose-driven digital solutions.
            </motion.p>
          </div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 shrink-0"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-400 border ${
                  activeCat === cat
                    ? 'bg-accent/20 border-accent/60 text-accent shadow-[0_0_20px_rgba(108,99,255,0.3)]'
                    : 'border-white/10 bg-white/3 text-gray-500 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden rounded-2xl aspect-[16/10] cursor-pointer"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              >
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                    style={{ filter: hoveredId === project.id ? 'brightness(0.95)' : 'brightness(0.6)' }}
                  />
                </div>

                {/* Glass border frame */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-accent/30 transition-colors duration-700 pointer-events-none z-20" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030307] via-[#030307]/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />

                {/* Corner accent glow */}
                <div className="absolute -bottom-4 -left-4 w-32 h-32 orb orb-accent opacity-0 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Year badge */}
                <div className="absolute top-5 right-5 z-30">
                  <div className="glassmorphism px-3 py-1 rounded-full">
                    <span className="text-[10px] text-accent font-black tracking-widest">{project.year}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="absolute top-5 left-5 z-30 flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md border border-white/8">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-7 md:p-10 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">
                      {project.category}
                    </span>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="text-2xl md:text-3xl font-black font-heading text-white leading-tight">
                        {project.title}
                      </h3>
                      <motion.div
                        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-2xl hover:bg-accent hover:text-white transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={hoveredId === project.id ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <a href="#" className="btn-ghost inline-flex items-center gap-3">
            View All Case Studies
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
