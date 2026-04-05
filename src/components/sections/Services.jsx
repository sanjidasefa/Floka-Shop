import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiGlobe, FiZap } from 'react-icons/fi';
import { FaInfinity } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    title: 'Neural Architecture',
    desc: 'Designing deep networks that interface perfectly with human intention and cognitive biases.',
    icon: <FiCpu size={32} className="text-accent" />
  },
  {
    title: 'Global Latency Ops',
    desc: 'Deploying edge-computed platforms that guarantee near-zero load times worldwide.',
    icon: <FiGlobe size={32} className="text-accent" />
  },
  {
    title: 'Continuous Scaling',
    desc: 'Elastic node generation that scales infinitely alongside your incoming traffic load.',
    icon: <FaInfinity size={32} className="text-accent" />
  },
  {
    title: 'Kinetic Interactions',
    desc: 'Micro-animations built on physics-based engines (GSAP, Frame Motion) for peak engagement.',
    icon: <FiZap size={32} className="text-accent" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const Services = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    // GSAP Blur-to-clear entrance
    const splitText = new SplitType(titleRef.current, { types: 'words' });
    
    gsap.fromTo(splitText.words, 
      { opacity: 0, filter: 'blur(15px)', scale: 1.1 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => splitText.revert();
  }, []);

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-sm font-medium tracking-wide text-accent uppercase">
              Operative Capabilities
            </span>
          </div>
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading py-2"
          >
            Capabilities that scale.
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {servicesList.map((srv, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="group relative glass-card p-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                  {srv.icon}
                </div>
                
                <h3 className="text-2xl font-bold font-heading text-white">{srv.title}</h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {srv.desc}
                </p>
                
                <div className="mt-4 flex items-center text-sm font-medium text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <span>Initialize Protocol</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Background Glow Effect on Hover */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
