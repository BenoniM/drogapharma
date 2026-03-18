import { useState } from "react";
import { motion } from "framer-motion";

interface SmoothImageProps {
  src: string;
  alt: string;
  className?: string;
  hoverScale?: number;
}

const SmoothImage = ({ src, alt, className = "", hoverScale = 1.05 }: SmoothImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        whileHover={{ scale: hoverScale }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </motion.div>
  );
};

export default SmoothImage;
