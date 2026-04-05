import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const projects = [
  { id: 1, title: 'Quantum OS', category: 'Interface', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800' },
  { id: 2, title: 'Neural Finance', category: 'Platform', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800' },
  { id: 3, title: 'Cyber Analytics', category: 'Interface', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800' },
  { id: 4, title: 'Vortex Protocol', category: 'Web3', image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800' },
];

const categories = ['All', 'Interface', 'Platform', 'Web3'];

const typeContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const typeChar = {
  hidden: { opacity: 0, display: 'none' },
  visible: { opacity: 1, display: 'inline-block' }
};

const Portfolio = () => {
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All' ? projects : projects.filter(p => p.category === activeCat);
  const titleString = Array.from("Selected Works");

  return (
    <section id="portfolio" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.h2 
              variants={typeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 flex"
            >
              {titleString.map((char, i) => (
                <motion.span key={i} variants={typeChar}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-[4px] h-[1em] bg-accent ml-2 inline-block"
              ></motion.span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }} // wait for typewriter mostly
              className="text-gray-400 max-w-md"
            >
              A showcase of our most advanced digital deployments. Hover to preview the matrix.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCat === cat 
                    ? 'border-accent bg-accent/10 text-accent' 
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] glassmorphism"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-accent text-sm font-medium tracking-wide drop-shadow-md">
                      {project.category}
                    </span>
                    <div className="flex justify-between items-end mt-2">
                      <h3 className="text-3xl font-bold font-heading text-white hover-glitch cursor-default">{project.title}</h3>
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                        <FiArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-all duration-300">
             Load More Archives
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
