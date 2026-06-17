import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  message: string;
};

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Selamawit Tadesse",
    role: "Procurement Lead, Landmark Hospital",
    message:
      "Droga Group has been a reliable partner with consistent product quality and on-time delivery for our critical needs.",
  },
  {
    id: 2,
    name: "Abebe Girma",
    role: "Supply Chain Manager, EPSA Partner Facility",
    message:
      "Their team is responsive, professional, and proactive. We value the transparency and support they provide at every stage.",
  },
  {
    id: 3,
    name: "Sister Hanna Bekele",
    role: "Clinical Administrator, Samaritan Surgical Center",
    message:
      "From pharmaceuticals to devices, Droga Group helps us maintain dependable inventory and better patient service outcomes.",
  },
  {
    id: 4,
    name: "Mikiyas Wondimu",
    role: "Operations Officer, World Vision Program",
    message:
      "We trust their standards and documentation. Working with Droga Group makes cross-team coordination much easier.",
  },
];

const TestimonialsSection = () => {
  const N = TESTIMONIALS_DATA.length;
  const MULTIPLIER = 20; // Massive buffer to prevent ever reaching the end
  const middleIndex = Math.floor(MULTIPLIER / 2) * N;
  
  const [currentIndex, setCurrentIndex] = useState(middleIndex);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const isMobile = useIsMobile();
  const autoSlideInterval = 5000;

  const cardWidth = isMobile ? 300 : 380;
  const gap = 16;
  const itemWidth = cardWidth + gap;

  // Extended array for infinite loop
  const extendedData = Array(MULTIPLIER).fill(TESTIMONIALS_DATA).flat();

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [autoSlideInterval]);

  useEffect(() => {
    // Infinite loop jump logic
    // If we move 2 sets left of the middle, jump right by 2 sets
    if (currentIndex <= middleIndex - 2 * N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev + 2 * N);
      }, 500);
      return () => clearTimeout(timer);
    }

    // If we move 2 sets right of the middle, jump left by 2 sets
    if (currentIndex >= middleIndex + 2 * N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev - 2 * N);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, N, middleIndex]);

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden relative">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-8 relative">
          {/* Left Column (Covers sliding cards with solid background) */}
          <div className="md:w-1/3 flex flex-col justify-between shrink-0 min-h-[300px] md:min-h-[350px] pb-4 relative z-20 bg-white pr-4 md:pr-8">
            {/* White cover stretching to the far left of the screen */}
            <div className="absolute top-0 right-full w-[100vw] h-full bg-white z-20" />
            
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-black leading-[1.1] tracking-tight relative z-30">
              Our <br className="hidden md:block" />
              Testimonials
            </h2>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-8 md:mt-0 relative z-30">
              <button
                onClick={handlePrev}
                className="w-14 h-14 rounded-full border border-black/20 text-black flex items-center justify-center transition-all duration-300 hover:bg-[#FFF200] hover:text-black hover:border-transparent group"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={24} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 rounded-full border border-black/20 text-black flex items-center justify-center transition-all duration-300 hover:bg-[#FFF200] hover:text-black hover:border-transparent group"
                aria-label="Next testimonial"
              >
                <ArrowRight size={24} strokeWidth={1} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Column - Carousel */}
          <div className="md:w-2/3 min-w-0 relative z-10">
            <div
              className="flex"
              style={{
                width: "max-content",
                gap: `${gap}px`,
                transition: isTransitioning
                  ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
                transform: `translateX(-${currentIndex * itemWidth}px)`,
              }}
            >
              {extendedData.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="bg-[#F5F5F5] p-8 md:p-10 flex-shrink-0 flex flex-col justify-between group hover:bg-[#EBEBEB] transition-colors duration-300"
                  style={{
                    width: `${cardWidth}px`,
                    height: isMobile ? "320px" : "350px",
                  }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-black font-bold text-xl md:text-2xl pr-4">
                        {item.name}
                      </h3>
                      <ExternalLink
                        className="text-black shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                        size={24}
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-black leading-relaxed text-sm md:text-base font-medium">
                      "{item.message}"
                    </p>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <span className="text-black/70 font-semibold text-xs md:text-sm text-right max-w-[200px] uppercase tracking-wide">
                      {item.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
