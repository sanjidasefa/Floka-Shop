import { useEffect, useRef } from 'react';
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

const Services = () => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // 1. GSAP Blur-to-clear entrance for title
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

    // 2. Cinematic Card Staggered Entrance
    gsap.fromTo(cardsRef.current, 
        { 
            opacity: 0, 
            y: 100, 
            rotateX: -15,
            scale: 0.9,
            transformOrigin: "center top"
        },
        {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            stagger: 0.2,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: cardsRef.current[0],
                start: "top 85%",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-[1000px]">
          {servicesList.map((srv, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative glass-card p-10 overflow-hidden will-change-transform"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
