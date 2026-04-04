import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; 
import { Link } from 'react-router';
import { MotionConfig} from "framer-motion";
import Logo from '/Logo.png'
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`fixed w-full z-[100] top-0 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5'}`}>
      <div className="w-full mx-auto px-10 md:px-20 flex items-center justify-between">
        
        {/* Logo*/}
        <div className="flex items-center cursor-pointer">
         <img src={Logo} alt="Logo-Floka"  className='w-50'/>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex text-xl font-bold items-center gap-8 text-black">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/pages'>Pages</Link></li>
            <li><Link to='/portfolio'>Portfolio</Link></li>
            <li><Link to='/blog'>Blog</Link></li>
          </ul>
        </nav>

    
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <AnimatedHamburgerButton
            active={mobileMenu} 
            setActive={setMobileMenu} 
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl md:hidden px-7"
          >
            <div className="flex flex-col p-6 gap-4 ">
              <label className="input bg-gray-200 rounded-xl text-black w-full">
  <input type="search" className=' font-bold text-lg' placeholder="Keywords..." />
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
</label>
           <ul className="text-xl  font-bold text-black">
            <li className='border-b-3 border-gray-200 my-3'><Link to='/'>Home</Link></li>
            <li className='border-b-3 border-gray-200 my-3'><Link to='/pages'>Pages</Link></li>
            <li className='border-b-3 border-gray-200 my-3'><Link to='/portfolio'>Portfolio</Link></li>
            <li className='border-b-3 border-gray-200 my-3'><Link to='/blog'>Blog</Link></li>
          </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const AnimatedHamburgerButton = ({ active, setActive }) => {
  return (
    <MotionConfig transition={{ duration: 0.5, ease: "easeInOut" }}>
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive(!active)}
        className="relative h-12 w-12 rounded-full transition-colors hover:bg-black/10"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-0.5 w-6 bg-black"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-0.5 w-6 bg-black"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-0.5 w-3 bg-black"
          style={{ x: "-50%", y: "50%", bottom: "35%", left: "calc(50% + 6px)" }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: { rotate: ["0deg", "0deg", "45deg"], top: ["35%", "50%", "50%"] },
    closed: { rotate: ["45deg", "0deg", "0deg"], top: ["50%", "50%", "35%"] },
  },
  middle: {
    open: { rotate: ["0deg", "0deg", "-45deg"], opacity: 1 },
    closed: { rotate: ["-45deg", "0deg", "0deg"], opacity: 1 },
  },
  bottom: {
    open: { rotate: ["0deg", "0deg", "45deg"], bottom: ["35%", "50%", "50%"], left: "50%", w: "24px" },
    closed: { rotate: ["45deg", "0deg", "0deg"], bottom: ["50%", "50%", "35%"], left: "calc(50% + 6px)", w: "12px" },
  },
};

export default Header;