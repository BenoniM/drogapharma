import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
  // Start deep in the middle so we have plenty of cards on both left and right
  const [currentIndex, setCurrentIndex] = useState(3 * N);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const isMobile = useIsMobile();
  const autoSlideInterval = 5000;

  // Smaller cards for sleeker look
  const cardWidth = isMobile ? 280 : 360;

  // Make an extended array: 7 sets to guarantee the screen never runs out of cards before jumping
  const extendedData = [
    ...TESTIMONIALS_DATA,
    ...TESTIMONIALS_DATA,
    ...TESTIMONIALS_DATA,
    ...TESTIMONIALS_DATA,
    ...TESTIMONIALS_DATA,
    ...TESTIMONIALS_DATA,
    ...TESTIMONIALS_DATA,
  ];

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
    if (currentIndex < 2 * N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev + N);
      }, 600);
      return () => clearTimeout(timer);
    }

    if (currentIndex >= 4 * N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev - N);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, N]);

  return (
    <section className="bg-white pt-4 md:pt-8 overflow-hidden">
      <div className="w-full">
        {/* The Tab centered over the active card */}
        <div
          className="flex justify-center mx-auto"
          style={{ width: `${cardWidth}px` }}
        >
          <div className="relative w-max">
            <div className="bg-[#eff1f3] rounded-t-[20px] px-6 py-3 md:px-8 md:py-4 relative z-10">
              <h2 className="font-display text-base md:text-lg font-medium text-black">
                Experiences Droga Group
              </h2>
            </div>
            {/* Left Swoosh */}
            <div
              className="absolute bottom-0 -left-[20px] w-[20px] h-[20px] pointer-events-none"
              style={{
                borderBottomRightRadius: '20px',
                boxShadow: '10px 0 0 0 #eff1f3',
                zIndex: 10
              }}
            />
            {/* Right Swoosh */}
            <div
              className="absolute bottom-0 -right-[20px] w-[20px] h-[20px] pointer-events-none"
              style={{
                borderBottomLeftRadius: '20px',
                boxShadow: '-10px 0 0 0 #eff1f3',
                zIndex: 10
              }}
            />
          </div>
        </div>

        {/* Main Content Container (Edge to Edge) */}
        <div className="bg-[#eff1f3] pt-8 pb-10 relative overflow-hidden flex flex-col w-full">

          {/* Carousel Track */}
          <div className="relative w-full h-[250px] md:h-[280px]">
            <div className="absolute top-0 h-full w-0" style={{ left: "50%" }}>
              <div
                className="flex items-center w-max h-full"
                style={{
                  transition: isTransitioning
                    ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
                  transform: `translateX(calc(-${currentIndex * cardWidth}px - ${cardWidth / 2}px))`,
                }}
              >
                {extendedData.map((item, index) => {
                  const isActive = index === currentIndex;

                  return (
                    <div
                      key={`${item.id}-${index}`}
                      className="px-3 flex-shrink-0"
                      style={{
                        width: `${cardWidth}px`,
                        opacity: isActive ? 1 : 0.4,
                        filter: isActive ? "none" : "blur(3px)",
                        transform: isActive ? "scale(1)" : "scale(0.85)",
                        zIndex: isActive ? 10 : 5,
                        transition: isTransitioning
                          ? "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                          : "none",
                      }}
                    >
                      <article className="h-full bg-white/40 rounded-2xl p-6 md:p-8 border border-white/60 shadow-sm backdrop-blur-sm">
                        <Quote className="text-primary mb-4 opacity-50" size={24} />
                        <p className="text-black/80 font-medium leading-relaxed text-xs md:text-sm line-clamp-4">
                          "{item.message}"
                        </p>
                        <div className="mt-6 flex flex-col">
                          <h3 className="font-bold text-black text-sm">
                            {item.name}
                          </h3>
                          <p className="text-black/50 text-[10px] md:text-xs mt-1 font-semibold uppercase tracking-wider">
                            {item.role}
                          </p>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Controls - Centered exactly below the active item */}
          <div
            className="flex items-center justify-center gap-4 mt-6 relative z-20 mx-auto"
            style={{ width: `${cardWidth}px` }}
          >
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-black/10 bg-white/50 text-black flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-black hover:border-transparent shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-black/10 bg-white/50 text-black flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-black hover:border-transparent shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
