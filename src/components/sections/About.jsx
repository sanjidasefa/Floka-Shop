import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const headingRef = useRef(null);
  const countRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const img2Parallax = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading: character stagger reveal
      const split = new SplitType(headingRef.current, { types: 'chars,words' });
      gsap.from(split.chars, {
        opacity: 0,
        y: 50,
        rotateX: -60,
        stagger: 0.025,
        duration: 1,
        ease: 'back.out(1.5)',
        transformOrigin: '50% 100%',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      });

      // 2. Image mask reveal — left wipe
      gsap.fromTo(imgRef1.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.6, ease: 'expo.inOut',
          scrollTrigger: { trigger: imgRef1.current, start: 'top 80%' },
        }
      );
      // Bottom-up wipe for second image
      gsap.fromTo(imgRef2.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.6, ease: 'expo.inOut', delay: 0.25,
          scrollTrigger: { trigger: imgRef2.current, start: 'top 80%' },
        }
      );

      // 3. Count-up
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 94, duration: 2.5, ease: 'power3.out',
        scrollTrigger: { trigger: countRef.current, start: 'top 90%' },
        onUpdate: () => { if (countRef.current) countRef.current.textContent = Math.round(obj.val) + '%'; }
      });

      // 4. Feature list stagger
      gsap.from('.about-feature-item', {
        opacity: 0, x: -30, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-feature-list', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32 overflow-hidden ">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[40%] h-[60%] orb orb-accent opacity-10" />
        <div className="absolute bottom-0 left-0 w-[35%] h-[50%] orb orb-alt opacity-8"/>
        <div className="absolute inset-0 grid-overlay opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* ── Image Grid ── */}
          <div className="w-full lg:w-1/2 relative flex-shrink-0">
            <div className="grid grid-cols-2 gap-5 relative">
              {/* Column 1 */}
              <div className="flex flex-col gap-5 pt-12">
                <motion.div
                  ref={imgRef1}
                  style={{ y: imgParallax }}
                  className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=900"
                    alt="Nature"
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030307]/60 via-transparent to-transparent" />
                  {/* Inner glass frame */}
                  <div className="absolute inset-[1px] rounded-2xl border border-white/8 pointer-events-none" />
                </motion.div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-5">
                <motion.div
                  ref={imgRef2}
                  style={{ y: img2Parallax }}
                  className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=900"
                    alt="Community"
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030307]/60 via-transparent to-transparent" />
                  <div className="absolute inset-[1px] rounded-2xl border border-white/8 pointer-events-none" />
                </motion.div>

                {/* Stat card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, type: 'spring', damping: 15 }}
                  className="stat-card p-6 flex flex-col items-center text-center"
                >
                  <span ref={countRef} className="text-4xl md:text-5xl font-black font-heading text-gradient-static block">0%</span>
                  <div className="line-accent mx-auto my-3" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Public Impact</span>
                </motion.div>
              </div>

              {/* Floating accent badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 glassmorphism rounded-2xl p-4 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-xs font-black">Est. 2021</div>
                    <div className="text-gray-500 text-[10px]">Global Impact</div>
                  </div>
                </div>
              </motion.div>

              {/* Glow behind images */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 orb orb-accent opacity-20 -z-10" />
            </div>
          </div>

          {/* ── Text Content ── */}
          <div className="w-full lg:w-1/2">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-tag"
            >
              <span className="section-tag-dot" />
              <span>Our Philosophy</span>
            </motion.div>

            {/* Heading with char stagger */}
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-black font-heading mb-6 tracking-tight leading-[1.15] text-white mt-4"
            >
              Building profound<br />
              <span className="text-gradient-flow">digital connections.</span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="line-accent mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-base md:text-lg text-gray-400 leading-relaxed mb-10 max-w-lg"
            >
              We believe technology should serve humanity. Our approach fuses the organic
              beauty of the natural world with the precision of modern engineering to create
              digital spaces that feel alive, intuitive, and deeply human.
            </motion.p>

            {/* Feature list */}
            <ul className="about-feature-list grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {[
                { label: 'Community-Focused Design', icon: '🌱' },
                { label: 'Sustainable Innovation', icon: '♻️' },
                { label: 'Human-Centered Interfaces', icon: '👥' },
                { label: 'Inclusive Interaction Models', icon: '✨' },
              ].map((item, i) => (
                <li key={i} className="about-feature-item flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300 text-sm">
                    {item.icon}
                  </div>
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors font-medium">{item.label}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex"
            >
              Explore Our Impact
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
