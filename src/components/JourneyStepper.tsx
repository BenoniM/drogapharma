import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface TimelineItem {
  year: string;
  event: string;
  title?: string;
  image?: string;
}

interface JourneyStepperProps {
  timeline: TimelineItem[];
}

const AUTOPLAY_DURATION = 6000; // 6 seconds per slide

const JourneyStepper = ({ timeline }: JourneyStepperProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  if (!timeline?.length) return null;

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timeline.length);
    }, AUTOPLAY_DURATION);

    return () => clearInterval(timer);
  }, [timeline.length]);

  // Auto-scroll the track so the active item is visible
  useEffect(() => {
    if (trackRef.current) {
      const activeElement = trackRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        // Calculate the scroll position to center the active element tightly
        const trackCenter = trackRef.current.offsetWidth / 2;
        const elementCenter = activeElement.offsetLeft + activeElement.offsetWidth / 2;
        trackRef.current.scrollTo({
          left: elementCenter - trackCenter,
          behavior: "smooth"
        });
      }
    }
  }, [activeIndex]);

  const activeItem = timeline[activeIndex];

  return (
    <div className="w-full flex flex-col gap-8 lg:gap-10">
      {/* Visual Display Card (Story Style) */}
      <div className="relative w-full h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden rounded-[2rem] bg-black shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {activeItem.image ? (
              <img
                src={activeItem.image}
                alt={activeItem.title || activeItem.year}
                className="w-full h-full object-cover opacity-75"
              />
            ) : (
              <div className="w-full h-full bg-slate-900" />
            )}
            
            {/* Elegant Gradient Overlays for High Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 lg:p-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <div className="flex items-center gap-4 md:gap-6 mb-5 md:mb-6">
                  <span className="text-primary font-display text-5xl md:text-7xl font-black tracking-tighter drop-shadow-md">
                    {activeItem.year}
                  </span>
                  <div className="h-px w-12 md:w-20 bg-primary/60" />
                  <span className="text-white/90 font-bold tracking-[0.25em] uppercase text-[10px] md:text-sm">
                    Milestone
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-5 md:mb-6 leading-tight drop-shadow-md">
                  {activeItem.title || "Company Journey"}
                </h3>
                
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-2xl drop-shadow-sm whitespace-pre-wrap">
                  {activeItem.event}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Auto-Playing Progress Track */}
      <div className="w-full px-2 md:px-6">
        <div 
          ref={trackRef}
          className="flex items-start gap-3 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
        >
          {timeline.map((item, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            return (
              <button
                key={item.year}
                onClick={() => setActiveIndex(index)}
                className="group relative flex flex-col gap-4 min-w-[140px] md:min-w-[180px] snap-start py-2 outline-none"
              >
                {/* Progress Bar Container */}
                <div className="h-1 md:h-1.5 w-full bg-slate-200 relative overflow-hidden rounded-full transition-colors group-hover:bg-slate-300">
                  {/* The filled progress line */}
                  {(isActive || isPast) && (
                    <motion.div
                      initial={{ width: isPast ? "100%" : "0%" }}
                      animate={{ width: isPast ? "100%" : isActive ? "100%" : "0%" }}
                      transition={{ 
                        duration: isActive ? AUTOPLAY_DURATION / 1000 : 0.3, 
                        ease: isActive ? "linear" : "easeOut" 
                      }}
                      className={`absolute top-0 left-0 h-full rounded-full ${isActive ? 'bg-primary' : 'bg-slate-800'}`}
                    />
                  )}
                </div>

                {/* Typography Labels */}
                <div className="text-left flex flex-col gap-1 md:gap-1.5">
                  <span 
                    className={`font-display text-xl md:text-2xl font-bold transition-colors duration-300 ${
                      isActive ? "text-slate-900" : isPast ? "text-slate-600" : "text-slate-400 group-hover:text-slate-700"
                    }`}
                  >
                    {item.year}
                  </span>
                  <span 
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-widest line-clamp-2 transition-all duration-300 ${
                      isActive ? "text-primary opacity-100" : "text-slate-500 opacity-60 group-hover:opacity-100"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyStepper;
