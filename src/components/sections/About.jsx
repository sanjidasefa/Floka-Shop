import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Image Grid Side */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 pt-12"
          >
            <div className="relative rounded-2xl overflow-hidden glassmorphism aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600" 
                alt="Cyber Studio" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-accent/20 mix-blend-overlay"></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden glassmorphism aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600" 
                alt="Code Matrix" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-accent/20 mix-blend-overlay"></div>
            </div>
            
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold font-heading text-white">99%</span>
              <span className="text-sm text-gray-400 mt-2">AI Accuracy</span>
            </div>
          </motion.div>

          {/* Decorative Blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/30 rounded-full blur-[100px] -z-10"></div>
        </div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-sm font-medium tracking-wide text-accent uppercase">
              About Our Engine
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight overflow-hidden pb-2">
            <motion.span 
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              We build digital <span className="text-accent underline decoration-white/20 underline-offset-8">autonomy.</span>
            </motion.span>
          </h2>
          
          <div className="overflow-hidden mb-8">
            <motion.p 
              className="text-lg text-gray-400 leading-relaxed inline-block"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              Unlike traditional web studios, we engineer intelligent interfaces designed to adapt, respond, and scale seamlessly. By leveraging advanced heuristics and micro-interaction algorithms, your platform works as a sophisticated digital agent.
            </motion.p>
          </div>

          <ul className="space-y-4 mb-10">
            {['Parametric User Routing', 'Dynamic Layout Generation', 'Zero-Latency State Sync'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-black bg-white rounded-full hover:bg-accent hover:text-white transition-colors duration-300"
          >
            Discover the Core
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
