import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const nodesRef = useRef([]);

  // Data generated once
  const nodesData = useRef(Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 50 + 20,
    x: Math.random() * 1000, 
    y: Math.random() * 800,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1 - 0.2,
    type: Math.random() > 0.5 ? 'circle' : 'card'
  })));

  useEffect(() => {
    // 1. Text Animation Logic (Keeping your original logic)
    const splitText = new SplitType(titleRef.current, { types: 'words,lines' });
    
    splitText.words.forEach(word => {
       word.style.overflow = 'hidden';
       const inner = document.createElement('span');
       inner.innerHTML = word.innerHTML;
       inner.style.display = 'inline-block';
       inner.style.willChange = 'transform, opacity';
       word.innerHTML = '';
       word.appendChild(inner);
    });

    gsap.from(splitText.words.map(w => w.firstChild), {
      opacity: 0,
      y: 80,
      scale: 0.8,
      stagger: 0.15,
      duration: 1.4,
      ease: 'power4.out',
      delay: 1.5 // Slightly reduced for better UX
    });

    const nodes = nodesRef.current.filter(Boolean);
    const setters = nodes.map(node => ({
        x: gsap.quickSetter(node, "x", "px"),
        y: gsap.quickSetter(node, "y", "px"),
        rotation: gsap.quickSetter(node, "rotation", "deg")
    }));

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Physics Loop
    let time = 0;
    const renderLoop = (timeDelta, deltaTime) => {
      time += deltaTime * 0.05;
      nodesData.current.forEach((data, i) => {
        data.x += data.vx;
        data.y += data.vy;
        data.x += Math.sin(time + i) * 0.5;

        const dx = mouseX - data.x;
        const dy = mouseY - data.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const force = (200 - dist) / 200;
          data.vx -= (dx / dist) * force * 0.5;
          data.vy -= (dy / dist) * force * 0.5;
        }

        data.vx *= 0.98;
        data.vy *= 0.98;

        if (data.x < -100) data.x = window.innerWidth + 100;
        if (data.x > window.innerWidth + 100) data.x = -100;
        if (data.y < -100) data.y = window.innerHeight + 100;
        if (data.y > window.innerHeight + 100) data.y = -100;

        if (setters[i]) {
            setters[i].x(data.x);
            setters[i].y(data.y);
            setters[i].rotation(data.x * 0.1);
        }
      });
    };
    
    gsap.ticker.add(renderLoop);

    return () => {
      splitText.revert();
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(renderLoop);
    };
  }, []);

  return (
    <section 
      id="home"
      ref={containerRef} 
      className="relative min-h-fit flex items-center justify-center overflow-hidden px-6 py-10 md:py-20"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-background to-background -z-20"></div>

      {/* Floating Nodes */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {nodesData.current.map((data, i) => (
          <div
            key={data.id}
            ref={el => nodesRef.current[i] = el}
            className={`absolute will-change-transform ${
              data.type === 'circle' 
                ? 'rounded-full border border-accent/30 bg-accent/5 blur-[2px]' 
                : 'rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg'
            }`}
            style={{ width: data.size, height: data.size, left: 0, top: 0 }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto flex flex-col items-center mt-14">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 md:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">
            Building the Digital Future
          </span>
        </motion.div>

        {/* Heading: Fluid typography for all devices */}
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-bold tracking-tighter leading-[1.1] mb-6 text-white"
        >
          Nature's Blueprint <br className="hidden sm:block" /> 
          For Digital Experiences.
        </h1>

        {/* Description: Better width control for readability */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-base md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10 px-4"
        >
          We architect digital ecosystems that mirror organic intelligence — fusing human-centered innovation with technical precision.
        </motion.p>

        {/* Stats Section: Optimized spacing and alignment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-24 w-full"
        >
          {[
            { value: '250+', label: 'Communities' },
            { value: '5M+', label: 'Global Users' },
            { value: '98%', label: 'Satisfaction' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center min-w-[100px]">
              <span className="text-2xl md:text-4xl font-black text-white">{s.value}</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator: Hidden on small height devices */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;