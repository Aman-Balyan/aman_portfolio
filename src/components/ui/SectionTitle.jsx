
import { motion } from "framer-motion";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <motion.div
      className="section-title"
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
    >
      <p>{subtitle}</p>

      <h2>{title}</h2>
    </motion.div>
  );
};

export default SectionTitle;