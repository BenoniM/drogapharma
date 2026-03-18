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
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const autoSlideInterval = 5000;

  const cardWidth = isMobile ? 300 : 400;
  const centerOffset = cardWidth / 2;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [autoSlideInterval]);

  return (
    <section className="bg-primary py-24 overflow-hidden">
      <div className="container-narrow">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-black mb-14">
          Testimonials
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex items-center w-max transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                transform: `translateX(calc(40% - ${centerOffset}px - ${currentIndex * cardWidth}px))`,
              }}
            >
              {TESTIMONIALS_DATA.map((item, index) => {
                const isActive = index === currentIndex;

                return (
                  <div
                    key={item.id}
                    className="w-[300px] md:w-[400px] px-1 transition-all duration-700"
                    style={{
                      opacity: isActive ? 1 : 0.3,
                      filter: isActive ? "none" : "blur(4px)",
                      transform: isActive ? "scale(1.08)" : "scale(0.86)",
                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    <article className="h-full rounded-2xl  bg-[#fffdfd] p-7 md:p-9 shadow-sm">
                      <Quote className="text-gray-500 mb-4" size={24} />
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {item.message}
                      </p>
                      <div className="mt-6 pt-5 ">
                        <h3 className="font-semibold text-black text-sm md:text-base">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm mt-1">
                          {item.role}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-10 max-w-[600px] mx-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center transition-colors duration-300 hover:bg-gray-100 hover:border-gray-400"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-semibold text-sm">...</span>
              <div className="w-11 h-11 rounded-full border-2 border-gray-400 text-gray-700 font-bold flex items-center justify-center text-sm tabular-nums">
                {String(currentIndex + 1).padStart(2, "0")}
              </div>
              <span className="text-gray-400 font-semibold text-sm tabular-nums">
                {String(TESTIMONIALS_DATA.length).padStart(2, "0")}
              </span>
            </div>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center transition-colors duration-300 hover:bg-gray-100 hover:border-gray-400"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
