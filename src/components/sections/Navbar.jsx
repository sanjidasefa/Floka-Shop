import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { Link, useLocation } from 'react-router';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Testimonials', href: '/#testimonials' },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 60);
    const max = document.body.scrollHeight - window.innerHeight;
    setScrollProgress(max > 0 ? (v / max) * 100 : 0);
  });

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Main Bar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'py-3 bg-[#030307]/40 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent via-accent-alt to-accent transition-all duration-100"
          style={{ width: `${scrollProgress}%`, boxShadow: '0 0 8px rgba(108,99,255,0.8)' }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-1.5 relative z-50">
            <motion.span
              whileHover={{ letterSpacing: '0.05em' }}
              transition={{ duration: 0.3 }}
              className="text-xl font-black font-heading text-white group-hover:text-accent transition-colors duration-300"
            >
              Floka
            </motion.span>
            <motion.span
              animate={{ boxShadow: ['0 0 6px rgba(108,99,255,1)', '0 0 12px rgba(108,99,255,1)', '0 0 6px rgba(108,99,255,1)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-accent"
            />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.split('#')[0]));
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative group text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 py-2"
                  style={{ color: isActive ? 'var(--color-accent)' : 'rgba(156,163,175,1)' }}
                >
                  <span className="group-hover:text-white transition-colors duration-300">{link.name}</span>

                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-accent to-accent-alt scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 w-full h-px"
                      style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-alt))' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/#contact"
                className="btn-primary text-xs py-3 px-6 tracking-[0.2em]"
              >
                Start Impact
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-50 w-10 h-10 rounded-xl glassmorphism flex items-center justify-center text-white hover:border-accent/50 hover:text-accent transition-all duration-300"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FiX size={20} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FiMenu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 lg:hidden flex flex-col pt-28 pb-10 px-8"
            style={{  backdropFilter: 'blur(30px)' }}
          >
            {/* Background orbs in menu */}
            <div className="absolute top-20 right-10 w-48 h-48 orb orb-accent opacity-15 pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-36 h-36 orb orb-alt opacity-10 pointer-events-none" />

            <nav className="flex flex-col gap-2 flex-1 justify-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between py-4 border-b border-white/5 hover:border-accent/20 transition-colors duration-300"
                  >
                    <span className="text-4xl font-black font-heading text-white group-hover:text-accent transition-colors duration-300">
                      {link.name}
                    </span>
                    <FiArrowRight size={20} className="text-gray-600 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/#contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center text-sm py-4"
              >
                Start Your Impact
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
