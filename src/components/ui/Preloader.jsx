import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setComplete(true);
        if (onComplete) onComplete();
      }
    });

    tl.fromTo(textRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      delay: 0.5,
      ease: 'power3.in' // slight hang then exit
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut'
    }, "-=0.2");

    return () => tl.kill();
  }, [onComplete]);

  if (complete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
    >
      <h1 ref={textRef} className="text-4xl md:text-6xl font-bold tracking-tight text-white/90">
        Floka<span className="text-accent">.</span>AI
      </h1>
    </div>
  );
};

export default Preloader;
