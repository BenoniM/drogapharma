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
  // Start at the first element of the middle set
  const [currentIndex, setCurrentIndex] = useState(N);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const isMobile = useIsMobile();
  const autoSlideInterval = 5000;

  const cardWidth = isMobile ? 300 : 400;

  // Make an extended array: 3 sets of the testimonials
  const extendedData = [
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
    // If we move into (or past) the first set while moving backward
    if (currentIndex < N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev + N); // jump back to middle set
      }, 600); // Wait for transiton ease to mostly complete (0.6s)
      return () => clearTimeout(timer);
    }

    // If we move into (or past) the third set while moving forward
    if (currentIndex >= 2 * N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => prev - N); // jump back to middle set
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, N]);

  // Modulo index for displaying "01", "02" safely
  const realIndex = currentIndex % N;

  return (
    <section className="bg-primary py-16 md:py-10 overflow-hidden">
      <div className="container-narrow mb-16">
        <h2 className="font-display text-3xl md:text-5xl font-medium text-center text-black mb-4">
          Experiences Droga Group
        </h2>
      </div>

      <div className="relative w-full overflow-hidden h-[450px]">
        {/* The absolute positioning places the left edge of this wrapper horizontally at the exact center of the screen */}
        <div className="absolute left-1/2 top-0 h-full w-0">
          <div
            className="flex items-center w-max h-full"
            style={{
              transition: isTransitioning
                ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
              transform: `translateX(calc(-${
                currentIndex * cardWidth
              }px - ${cardWidth / 2}px))`,
            }}
          >
            {extendedData.map((item, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="px-4 transition-all duration-600 ease-out"
                  style={{
                    width: `${cardWidth}px`,
                    opacity: isActive ? 1 : 0.3,
                    filter: isActive ? "none" : "blur(4px)",
                    transform: isActive ? "scale(1.1)" : "scale(0.85)",
                    zIndex: isActive ? 2 : 1,
                  }}
                >
                  <article className="h-full   p-7 md:p-9  border-black/5">
                    <Quote className="text-black mb-6 opacity-30" size={36} />
                    <p className="text-black font-medium leading-relaxed text-sm md:text-lg line-clamp-4">
                      {item.message}
                    </p>
                    <div className="mt-8">
                      <h3 className="font-bold text-black text-sm md:text-base">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm mt-1.5 font-medium">
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

      <div className="flex items-center justify-between mt-10 max-w-[600px] mx-auto relative z-10 px-6">
        <button
          onClick={handlePrev}
          className="w-[50px] h-[50px] rounded-full border border-black/20 text-black flex items-center justify-center transition-all duration-300 hover:bg-black/10 hover:border-black/40"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex items-center gap-5">
          <div className="w-[45px] h-[45px] rounded-full border-2 border-blue-500 flex items-center justify-center text-black font-bold text-lg leading-none">
            {`0${realIndex + 1}`}
          </div>
          <span className="text-black/30 font-semibold tracking-widest">
            ...
          </span>
          <span className="text-black/40 font-bold text-lg">{`0${N}`}</span>
        </div>

        <button
          onClick={handleNext}
          className="w-[50px] h-[50px] rounded-full border border-black/20 text-black flex items-center justify-center transition-all duration-300 hover:bg-black/10 hover:border-black/40"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
