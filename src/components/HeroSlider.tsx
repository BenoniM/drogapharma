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

const HeroSlider = ({ slides, autoPlayInterval = 6000 }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const total = slides.filter((s) => s.image).length;
    if (total === 0) {
      setImagesLoaded(true);
      return;
    }
    slides.forEach((s) => {
      if (!s.image) return;
      const img = new Image();
      img.src = s.image;
      img.onload = () => {
        loaded++;
        if (loaded >= total) setImagesLoaded(true);
      };
    });
  }, [slides]);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-foreground">
      {/* Loading skeleton */}
      {/* <AnimatePresence>
        {!imagesLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-30 bg-foreground flex items-center justify-center"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-background/20 font-display text-2xl font-bold tracking-wider"
            >
              DROGA PHARMA
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Background media with crossfade */}
      {slides.map((s, i) => (
        <motion.div
          key={s.image + i}
          initial={false}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1 : 1.05,
          }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
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

      {/* Cinematic gradient overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-narrow w-full text-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="h-[3px] bg-primary rounded-full mb-8"
              />

              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6 text-background tracking-tight">
                {slide.title}
              </h1>

              <p className="text-background text-base sm:text-lg md:text-xl mb-10 max-w-2xl font-light leading-relaxed">
                {slide.subtitle}
              </p>

              {slide.cta && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Link
                    to={slide.cta.to}
                    className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_30px_hsl(58_100%_50%/0.35)] hover:-translate-y-0.5"
                  >
                    {slide.cta.label}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-background/10">
        <motion.div
          key={current}
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
        />
      </div>

      {/* Nav arrows */}
      <div className="absolute bottom-12 right-8 z-20 flex items-center gap-2">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full border border-background/20 text-background/60 flex items-center justify-center hover:border-background/60 hover:text-background transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="w-11 h-11 rounded-full border border-background/20 text-background/60 flex items-center justify-center hover:border-background/60 hover:text-background transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-8 z-20 flex items-center gap-3">
        <span className="text-background/40 font-display text-xs font-semibold tabular-nums">
          {String(current + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 h-1.5 bg-primary"
                  : "w-4 h-1.5 bg-background/25 hover:bg-background/40"
              }`}
            />
          ))}
        </div>
        <span className="text-background/40 font-display text-xs font-semibold tabular-nums">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
};

export default HeroSlider;
