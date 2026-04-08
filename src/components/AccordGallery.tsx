import { useState } from "react";
import { motion } from "framer-motion";

interface AccordGalleryItem {
  image: string;
  label: string;
  description?: string;
}

interface AccordGalleryProps {
  items: AccordGalleryItem[];
  height?: string;
  borderRadius?: number;
}

const AccordGallery = ({
  items,
  height = "500px",
  borderRadius = 16,
}: AccordGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(items.length - 1);

  return (
    <div
      className="flex gap-2 w-full overflow-hidden"
      style={{ height, borderRadius }}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={index}
            className="relative overflow-hidden cursor-pointer"
            style={{ borderRadius }}
            animate={{
              flex: isActive ? 5 : 0.6,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <img
              src={item.image}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Caption — horizontal when active, vertical when collapsed */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4"
              animate={{ opacity: 1 }}
            >
              {isActive ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <p className="text-white text-base sm:text-lg font-semibold">
                    {item.label}
                  </p>
                  {item.description && (
                    <p className="text-white/85 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-[90%] line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              ) : (
                <p
                  className="text-white text-xs sm:text-sm font-medium whitespace-nowrap"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg) translateX(50%)",
                    position: "absolute",
                    bottom: "16px",
                    left: "50%",
                  }}
                >
                  {item.label}
                </p>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AccordGallery;
