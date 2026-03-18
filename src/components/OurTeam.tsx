import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import abdiImg from "../assets/abdi.png";
import henokImg from "../assets/henok.png";

// Sample team members for the carousel
const teamMembers = [
  {
    name: "Abayneh Tilahun",
    role: "Production Director - Trust",
    image: "https://i.pravatar.cc/300?u=1",
  },
  {
    name: "Member Two",
    role: "Department Head",
    image: "https://i.pravatar.cc/300?u=2",
  },
  {
    name: "Member Three",
    role: "Operations Manager",
    image: "https://i.pravatar.cc/300?u=3",
  },
  {
    name: "Member Four",
    role: "Quality Control",
    image: "https://i.pravatar.cc/300?u=4",
  },
  {
    name: "Member Five",
    role: "Logistics Lead",
    image: "https://i.pravatar.cc/300?u=5",
  },
  {
    name: "Member Six",
    role: "Supply Chain",
    image: "https://i.pravatar.cc/300?u=6",
  },
  {
    name: "Member Seven",
    role: "Financing Director",
    image: "https://i.pravatar.cc/300?u=7",
  },
];

const OurTeam = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
    );
  };

  const resetTimer = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(nextSlide, 5000);
    }
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  return (
    <section className="bg-primary py-20 overflow-hidden">
      <div className="container-narrow">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl font-bold text-black tracking-tight">
            Our Team
          </h2>
        </div>

        {/* Featured Leaders */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-24">
          {/* Henok */}
          <div className="flex items-center gap-8">
            <div className="text-right">
              <h3 className="font-display text-2xl font-bold text-black mb-1">
                Henok Teka
              </h3>
              <p className="text-black/60 text-sm md:text-base">Group CEO</p>
            </div>
            <div className="w-[180px] md:w-[220px] aspect-[3/4] overflow-hidden">
              <img
                src={henokImg}
                alt="Henok Teka"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Abdi */}
          <div className="flex items-center gap-8">
            <div className="w-[180px] md:w-[220px] aspect-[3/4] overflow-hidden">
              <img
                src={abdiImg}
                alt="Dr. Abdi Ermolo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="font-display text-2xl font-bold text-black mb-1">
                Dr. Abdi Ermolo
              </h3>
              <p className="text-black/60 text-sm md:text-base">Deputy CEO</p>
            </div>
          </div>
        </div>

        {/* Team Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="flex justify-center items-end gap-2 md:gap-3 h-[280px] overflow-hidden px-4">
            {teamMembers.map((member, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  layout
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    resetTimer();
                  }}
                  whileHover={{ scale: isActive ? 1 : 1.05 }}
                  className={`cursor-pointer transition-all duration-700 flex flex-col items-center flex-shrink-0 ${
                    isActive
                      ? "w-40 md:w-56 h-[280px] z-10 mx-2"
                      : "w-16 md:w-28 h-[180px] z-0"
                  }`}
                  initial={false}
                  animate={{
                    filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                    opacity: isActive ? 1 : 0.4,
                    y: isActive ? -12 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    layout: { duration: 0.6 },
                  }}
                >
                  <div className="w-full h-full overflow-hidden border border-white/5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Member Label */}
          <div className="text-center mt-6 h-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-display text-xl font-bold text-black uppercase tracking-wider">
                  {teamMembers[activeIndex].name}
                </h4>
                <p className="text-black/60 text-sm mt-1">
                  {teamMembers[activeIndex].role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                prevSlide();
                resetTimer();
              }}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-black hover:bg-white hover:text-[#3D3D3D] transition-colors"
              aria-label="Previous team member"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => {
                nextSlide();
                resetTimer();
              }}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-black hover:bg-white hover:text-[#3D3D3D] transition-colors"
              aria-label="Next team member"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
