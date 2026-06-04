import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  image: string;
  title: string;
  subtitle: string;
  cta?: { label: string; to: string };
};

interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

const HeroSlider = ({ slides, autoPlayInterval = 7000 }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval]);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-[#111]">
      {/* Background media with crossfade */}
      {slides.map((s, i) => (
        <motion.div
          key={s.image + i}
          initial={false}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1.05 : 1, // Subtle scale in instead of scale out
          }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0"
          style={{ zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}

      {/* Minimalist uniform overlay */}
      <div className="absolute inset-0 z-[2] bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pb-56">
        <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-16 flex flex-col items-center text-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl flex flex-col items-center"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 text-white tracking-tight">
                {slide.title}
              </h1>

              <p className="text-white/90 text-base md:text-lg mb-10 max-w-2xl font-light leading-relaxed">
                {slide.subtitle}
              </p>

              {slide.cta && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <Link
                    to={slide.cta.to}
                    className="group inline-flex items-center gap-4 bg-white text-black px-8 py-4 font-medium text-sm transition-all duration-500 hover:bg-primary"
                  >
                    {slide.cta.label}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-500"
                    />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Navigation & Indicators */}
        <div className="absolute bottom-40 left-0 right-0 w-full flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <span className="text-white font-display text-sm tracking-widest">
              {String(current + 1).padStart(2, "0")}
            </span>
            <div className="w-24 h-[2px] bg-white/20 relative overflow-hidden">
              <motion.div
                key={current}
                className="absolute top-0 left-0 bottom-0 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
              />
            </div>
            <span className="text-white/50 font-display text-sm tracking-widest">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-primary transition-colors duration-300"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-primary transition-colors duration-300"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
