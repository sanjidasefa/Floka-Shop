import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io5';
import { FiMail, FiPhone, FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router';

const Footer = () => {
  const footerRef = useRef(null);
  const orbsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      orbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          x: `random(-60, 60)`,
          y: `random(-40, 40)`,
          duration: `random(14, 20)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * -3,
        });
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
  };

  const linkCls = 'group flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors duration-300 relative w-fit';
  const underline = 'after:content-[\'\'] after:absolute after:-bottom-px after:left-0 after:w-full after:h-px after:bg-accent after:scale-x-0 after:origin-right group-hover:after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-500';

  const socials = [
    { Icon: FaInstagram, href: '#' }, { Icon: FaLinkedin, href: '#' },
    { Icon: FaTwitter, href: '#' }, { Icon: IoLogoGithub, href: '#' },
  ];

  return (
    <footer ref={footerRef} className="relative pt-24 pb-10 overflow-hidden border-t border-white/5 "
      
    >
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {[
          { cls: 'orb-accent', size: '40vh', left: '10%', top: '20%' },
          { cls: 'orb-alt',    size: '30vh', left: '70%', top: '60%' },
          { cls: 'orb-accent', size: '25vh', left: '50%', top: '10%' },
          { cls: 'orb-alt',    size: '20vh', left: '85%', top: '30%' },
          { cls: 'orb-accent', size: '35vh', left: '30%', top: '70%' },
        ].map((o, i) => (
          <div
            key={i}
            ref={el => orbsRef.current[i] = el}
            className={`absolute orb ${o.cls} opacity-[0.06] will-change-transform`}
            style={{ width: o.size, height: o.size, left: o.left, top: o.top }}
          />
        ))}
        <div className="absolute inset-0 grid-overlay opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* Brand column */}
          <motion.div variants={item} className="flex flex-col gap-7 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="group inline-flex items-center gap-1.5">
              <span className="text-2xl font-black font-heading text-white group-hover:text-accent transition-colors duration-300">Floka</span>
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(108,99,255,1)] animate-pulse" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              We design and build digital experiences that inspire change and empower global communities through nature-centered innovation.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl glassmorphism flex items-center justify-center text-gray-500 hover:text-accent hover:border-accent/40 hover:shadow-[0_0_15px_rgba(108,99,255,0.3)] transition-all duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Studio Links */}
          <motion.div variants={item} className="flex flex-col gap-7">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.3em]">Studio</h4>
            <ul className="flex flex-col gap-4">
              {[['Home', '/'], ['About', '/about'], ['Services', '/#services'], ['Portfolio', '/#portfolio'], ['Testimonials', '/#testimonials']].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className={`${linkCls} ${underline}`}>
                    <FiArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Impact Links */}
          <motion.div variants={item} className="flex flex-col gap-7">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.3em]">Our Impact</h4>
            <ul className="flex flex-col gap-4">
              {['Community Hubs', 'Eco-Platforms', 'Human Design', 'Education Tools', 'Research Lab'].map(label => (
                <li key={label}>
                  <a href="#" className={`${linkCls} ${underline}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent group-hover:shadow-[0_0_6px_rgba(108,99,255,0.8)] transition-all duration-300 shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item} className="flex flex-col gap-7">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.3em]">Connect</h4>
            <div className="flex flex-col gap-6">
              {[
                { Icon: FiMail, label: 'Email Us', val: 'hello@flokashop.com', href: 'mailto:hello@flokashop.com' },
                { Icon: FiPhone, label: 'Call Us', val: '+1 (800) GROW-PLAN', href: '#' },
              ].map(({ Icon, label, val, href }) => (
                <a key={label} href={href}
                  className="group flex items-start gap-4 text-gray-500 hover:text-white transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-xl glassmorphism flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:text-accent group-hover:shadow-[0_0_15px_rgba(108,99,255,0.2)] transition-all duration-400">
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">{label}</p>
                    <span className="text-sm">{val}</span>
                  </div>
                </a>
              ))}

              {/* Newsletter */}
              <div className="mt-2">
                <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">Newsletter</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all duration-300 min-w-0"
                  />
                  <button className="w-10 h-10 rounded-xl bg-accent hover:bg-accent/80 flex items-center justify-center text-white shrink-0 transition-all duration-300 hover:shadow-[0_0_15px_rgba(108,99,255,0.5)] hover:scale-105">
                    <FiArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-xs text-gray-600 tracking-wide">
            © {new Date().getFullYear()} Floka Design Studio. Crafting a better digital future.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            {['Privacy Policy', 'Terms of Service', 'Sustainability Report'].map(link => (
              <a key={link} href="#" className="hover:text-accent transition-colors duration-300">{link}</a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
