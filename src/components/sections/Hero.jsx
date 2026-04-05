import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion } from 'framer-motion';

const nodesData = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  size: Math.random() * 60 + 20, // 20px to 80px
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - 0.5) * 1, // Velocity X
  vy: (Math.random() - 0.5) * 1 - 0.2, // Velocity Y (slight upward bias)
  type: Math.random() > 0.5 ? 'circle' : 'card'
}));

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    // 1. Text Animation - Radiant Flow Stagger
    const splitText = new SplitType(titleRef.current, { types: 'words,lines' });
    
    // Wrap words to mask their entrance
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
      delay: 2.2 // wait for preloader
    });

    // 2. Anti-Gravity Engine using GSAP quickSetter
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
      
      nodesData.forEach((data, i) => {
        // Drift
        data.x += data.vx;
        data.y += data.vy;

        // Add some sine wave wobble
        const wobbleX = Math.sin(time + i) * 0.5;
        data.x += wobbleX;

        // Apply mouse repulsion
        const dx = mouseX - data.x;
        const dy = mouseY - data.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const force = (200 - dist) / 200;
          data.vx -= (dx / dist) * force * 0.5;
          data.vy -= (dy / dist) * force * 0.5;
        }

        // Friction to eventually return to normal speed
        data.vx *= 0.98;
        data.vy *= 0.98;

        // Base velocity restoration
        if (Math.abs(data.vx) < 0.1) data.vx += (Math.random() - 0.5) * 0.05;
        if (Math.abs(data.vy) < 0.2) data.vy -= 0.02;

        // Bounds wrapping
        if (data.x < -100) data.x = window.innerWidth + 100;
        if (data.x > window.innerWidth + 100) data.x = -100;
        if (data.y < -100) data.y = window.innerHeight + 100;
        if (data.y > window.innerHeight + 100) data.y = -100;

        // Apply visual updates via quickSetter
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-background to-background -z-20"></div>

      {/* Floating Nodes Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {nodesData.map((data, i) => (
          <div
            key={data.id}
            ref={el => nodesRef.current[i] = el}
            className={`absolute will-change-transform ${
              data.type === 'circle' 
                ? 'rounded-full border border-accent/30 bg-accent/5 blur-[2px]' 
                : 'rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(108,99,255,0.1)]'
            }`}
            style={{
              width: data.size,
              height: data.size,
              left: 0,
              top: 0,
            }}
          />
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
        >
          <span className="text-sm font-medium tracking-wide text-gray-300 uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            Agentic Interface Model
          </span>
        </motion.div>

        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-[100px] font-heading font-bold tracking-tighter leading-[1.1] mb-8 text-gradient-flow drop-shadow-[0_0_20px_rgba(108,99,255,0.4)]"
        >
          Intelligence <br /> Without Gravity.
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Elevate your digital presence with zero-friction AI agents. 
          Experience autonomous interactions rendered at a perfect 60 frames per second.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
