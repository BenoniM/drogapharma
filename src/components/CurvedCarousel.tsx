import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  category: string;
  title: string;
  image: string;
}

interface CurvedCarouselProps {
  items: CarouselItem[];
}

const CurvedCarousel = ({ items }: CurvedCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const resetTimer = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(nextSlide, 6000);
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-16">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="container-narrow relative h-[600px] flex items-center justify-center">
        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-0 z-40 pointer-events-none">
          <button
            onClick={() => {
              prevSlide();
              resetTimer();
            }}
            className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 pointer-events-auto backdrop-blur-md shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={() => {
              nextSlide();
              resetTimer();
            }}
            className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 pointer-events-auto backdrop-blur-md shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Carousel Items Container */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
          <AnimatePresence initial={false}>
            {/* Previous Item (Back-left) */}
            <motion.div
              key={`prev-${index}`}
              className="absolute w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl opacity-30 border border-white/5 pointer-events-none"
              initial={{ opacity: 0, x: -400, z: -400, rotateY: 45 }}
              animate={{ opacity: 0.3, x: -450, z: -450, rotateY: 55 }}
              exit={{ opacity: 0, x: -600, z: -600 }}
              transition={{ duration: 0.8 }}
            >
              <img src={items[(index - 1 + items.length) % items.length].image} className="w-full h-full object-cover filter blur-[2px]" />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Next Item (Back-right) */}
            <motion.div
              key={`next-${index}`}
              className="absolute w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl opacity-30 border border-white/5 pointer-events-none"
              initial={{ opacity: 0, x: 400, z: -400, rotateY: -45 }}
              animate={{ opacity: 0.3, x: 450, z: -450, rotateY: -55 }}
              exit={{ opacity: 0, x: 600, z: -600 }}
              transition={{ duration: 0.8 }}
            >
              <img src={items[(index + 1) % items.length].image} className="w-full h-full object-cover filter blur-[2px]" />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Active Item */}
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                rotateY: direction > 0 ? 30 : -30, 
                scale: 0.9,
                z: -100,
                x: direction > 0 ? 200 : -200
              }}
              animate={{ 
                opacity: 1, 
                rotateY: 0, 
                scale: 1,
                z: 0,
                x: 0
              }}
              exit={{ 
                opacity: 0, 
                rotateY: direction > 0 ? -30 : 30, 
                scale: 0.9,
                z: -100,
                x: direction > 0 ? -200 : 200
              }}
              transition={{ 
                type: "spring", 
                stiffness: 180, 
                damping: 20,
                opacity: { duration: 0.3 }
              }}
              className="absolute w-full max-w-[650px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border border-white/10 z-20"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={items[index].image} 
                  alt={items[index].title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                <div>
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md px-3 py-1 rounded-md inline-block border border-white/10"
                  >
                    {items[index].category}
                  </motion.span>
                </div>

                <div className="max-w-md">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
                  >
                    {items[index].title}
                  </motion.h3>
                  
                  {/* Indicators */}
                  <div className="flex gap-2">
                    {items.map((_, i) => (
                      <button 
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDirection(i > index ? 1 : -1);
                          setIndex(i);
                          resetTimer();
                        }}
                        className={`h-1 rounded-full transition-all duration-500 pointer-events-auto ${
                          i === index ? "w-10 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CurvedCarousel;
