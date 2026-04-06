import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    title: 'Community Foundations',
    desc: 'Building sustainable, inclusive digital spaces that empower local voices and nurture long-term connections.',
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    number: '01',
    gradient: 'from-accent/20 to-purple-600/5',
  },
  {
    title: 'Environmental Stewardship',
    desc: 'Eco-friendly digital frameworks that minimize carbon footprints while amplifying global positive impact.',
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    number: '02',
    gradient: 'from-emerald-500/15 to-accent/5',
  },
  {
    title: 'Empowering Creativity',
    desc: 'Experimental tools and sandboxes that help artists and visionary thinkers manifest their boldest concepts.',
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    number: '03',
    gradient: 'from-yellow-500/10 to-accent/5',
  },
  {
    title: 'Human-Centered Design',
    desc: 'Intuitive, accessible interfaces that prioritize empathy, equity, and inclusive experiences for all users.',
    icon: (
      <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    number: '04',
    gradient: 'from-rose-500/10 to-accent/5',
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blur-to-clear heading
      const split = new SplitType(titleRef.current, { types: 'words' });
      gsap.fromTo(split.words,
        { opacity: 0, filter: 'blur(8px)', y: 30 },
        {
          opacity: 1, filter: 'blur(0px)', y: 0,
          stagger: 0.08, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      // Cards: orbital entry (alternating left/right)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 40, scale: 0.95 },
          {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: 1.2, ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
            delay: (i % 2) * 0.1,
          }
        );

        // Number counter reveal
        const numEl = card.querySelector('.srv-number');
        if (numEl) {
          gsap.fromTo(numEl,
            { opacity: 0, scale: 2 },
            { opacity: 0.12, scale: 1, duration: 1.5, ease: 'expo.out',
              scrollTrigger: { trigger: card, start: 'top 88%' } }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="border-b-2 relative py-4 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none"  
      />
      <div className="absolute inset-0 grid-overlay opacity-20 -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] orb orb-accent opacity-5 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-20 max-w-3xl mx-auto">
          <motion.div className="section-tag justify-center mx-auto mb-6 w-fit"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="section-tag-dot" />
            <span>Our Capabilities</span>
          </motion.div>
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-black font-heading tracking-tight leading-[1.15] text-white mb-6">
            Digital experiences <br /> built for a better world.
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            We combine purpose-driven design with cutting-edge technology to create meaningful digital footprints.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesList.map((srv, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="glass-card group cursor-pointer"
            >
              {/* Gradient top band */}
              <div className={`absolute inset-0 bg-gradient-to-br ${srv.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[20px] pointer-events-none`} />
              {/* Top border glow */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

              <div className="relative z-10 p-8 md:p-10">
                {/* Number (background) */}
                <span className="srv-number absolute top-6 right-8 text-7xl font-black font-heading text-white opacity-[0.06] select-none leading-none pointer-events-none">
                  {srv.number}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent/20 group-hover:border-accent/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_20px_rgba(108,99,255,0.15)]">
                  {srv.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-black font-heading text-white mb-4 group-hover:text-gradient-static transition-all duration-300">
                  {srv.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-8">
                  {srv.desc}
                </p>

                {/* CTA link */}
                <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest translate-x-0 group-hover:translate-x-2 transition-transform duration-500">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Hover glow orb */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 orb orb-accent opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
