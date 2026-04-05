import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The interface they built feels less like software and more like a sentient extension of our team. Absolute game changer.",
    author: "Sarah Jenkins",
    role: "CTO, Nexus Corp."
  },
  {
    quote: "We've experienced a 400% increase in user retention because simply navigating the site is highly addictive.",
    author: "Marcus Vance",
    role: "Founder, Vortex Protocol"
  },
  {
    quote: "An Awwwards-level execution translated into real-world conversion metrics. Their anti-gravity engine is sheer brilliance.",
    author: "Elena Rostov",
    role: "Creative Director"
  }
];

const Testimonials = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const splitText = new SplitType(titleRef.current, { types: 'words' });
    
    gsap.fromTo(splitText.words, 
      { 
        opacity: 0, 
        y: 40,
        rotationZ: 15, 
        transformOrigin: "left bottom",
        scale: 1.2
      },
      {
        opacity: 1,
        y: 0,
        rotationZ: 0,
        scale: 1,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        }
      }
    );

    return () => splitText.revert();
  }, []);

  return (
    <section id="testimonials" className="relative py-32 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        <div className="w-full lg:w-1/3">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold font-heading mb-6"
          >
            Don't just take our word for it.
          </h2>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mb-8"
          >
            Hear from the partners who've integrated our agentic interfaces to scale their operations globally.
          </motion.p>
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/20 blur-[120px] rounded-full -z-10"></div>
          
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`glass-card p-8 flex flex-col justify-between ${
                i === 2 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex gap-1 mb-6 text-accent">
                {[...Array(5)].map((_, j) => <FaStar key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg text-gray-200 mb-8 font-medium leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-purple-600 p-[2px]">
                   <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-bold text-sm">
                      {t.author.charAt(0)}
                   </div>
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.author}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
