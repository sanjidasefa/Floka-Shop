import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', animate = true, delay = 0 }) => {
  const baseClasses = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl hover:border-white/20 transition-colors";
  
  if (!animate) {
    return <div className={`${baseClasses} ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }} // elegant cubic bezier
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
