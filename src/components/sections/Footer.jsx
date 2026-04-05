import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoLogoGithub } from "react-icons/io5";
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
const Footer = () => {
  const footerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle background particle animation
      particlesRef.current.forEach((particle, i) => {
        gsap.to(particle, {
          x: () => Math.random() * 100 - 50,
          y: () => Math.random() * 50 - 25,
          rotation: () => Math.random() * 360,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * -2 
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const linkClass = "group flex items-center text-gray-400 hover:text-white transition-all duration-300 w-fit";
  const hoverEffect = "relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:scale-x-0 after:origin-right group-hover:after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-500";

  const letterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } }
  };

  return (
    <footer ref={footerRef} className="relative pt-24 pb-8 px-6 bg-background overflow-hidden border-t border-white/5">
      {/* GSAP Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`particle-${i}`}
            ref={el => particlesRef.current[i] = el}
            className={`absolute top-1/2 left-1/4 w-[30vh] h-[30vh] rounded-full blur-[100px] opacity-20 will-change-transform ${
              i % 2 === 0 ? 'bg-accent' : 'bg-purple-600'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        {/* Subtle grid pattern map */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Column 1: Company */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <a href="#home" className="text-4xl font-bold font-heading flex items-center gap-1 group">
              <motion.span 
                variants={letterContainer} 
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true }}
                className="flex text-white group-hover:drop-shadow-[0_0_10px_rgba(108,99,255,0.8)] transition-all duration-300"
              >
                {Array.from("Floka").map((char, i) => (
                  <motion.span key={i} variants={letterVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </motion.span>
              <span className="w-2 h-2 rounded-full bg-accent drop-shadow-[0_0_8px_rgba(108,99,255,1)] mt-4"></span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Engineering intelligent digital interfaces. We merge striking visual aesthetics with cutting-edge anti-gravity physics to build platforms that convert.
            </p>
            <div className="flex gap-4 mt-2">
              {[
                { icon: FaTwitter, href: '#' },
                { icon: FaLinkedin, href: '#' },
                { icon: IoLogoGithub, href: '#' }
              ].map((Social, idx) => (
                <a key={idx} href={Social.href} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 hover:scale-110 hover:rotate-6 hover:shadow-[0_0_15px_rgba(108,99,255,0.4)] transition-all duration-300">
                  <Social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h3 className="text-white font-bold font-heading text-lg">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              {['Home', 'About', 'Services', 'Portfolio', 'Testimonials'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className={linkClass}>
                    <FiArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-accent" />
                    <span className={hoverEffect}>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h3 className="text-white font-bold font-heading text-lg">Services</h3>
            <ul className="flex flex-col gap-4">
              {['Web Design', 'Interface Engineering', 'UI/UX Architecture', 'Brand Dynamics'].map((service) => (
                <li key={service}>
                  <a href="#services" className={linkClass}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-accent/50 mr-3 group-hover:scale-150 group-hover:bg-accent transition-all duration-300`}></span>
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h3 className="text-white font-bold font-heading text-lg">Contact Studio</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="mailto:hello@floka.ai" className="group flex items-start gap-4 text-gray-400 hover:text-white transition-colors duration-300">
                  <div className="mt-1 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent group-hover:text-accent transition-all duration-300 shrink-0">
                    <FiMail size={14} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Email</p>
                    <span className="text-sm">hello@floka.ai</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-start gap-4 text-gray-400 hover:text-white transition-colors duration-300">
                  <div className="mt-1 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent group-hover:text-accent transition-all duration-300 shrink-0">
                    <FiPhone size={14} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Direct Line</p>
                    <span className="text-sm">+1 (555) 789-0123</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="group flex items-start gap-4 text-gray-400">
                  <div className="mt-1 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent group-hover:text-accent transition-all duration-300 shrink-0">
                    <FiMapPin size={14} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">HQ</p>
                    <span className="text-sm">101 Cyber Avenue, Matrix Station, NY 10001</span>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Floka AI Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
