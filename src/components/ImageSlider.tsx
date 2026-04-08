import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ImageSliderProps {
  images: { src: string; alt: string }[];
  interval?: number;
  className?: string;
  overlay?: boolean;
  onSlideChange?: (index: number) => void;
  effect?: "fade" | "slide-rtl";
}

const ImageSlider = ({
  images,
  interval = 5000,
  className = "",
  overlay = false,
  onSlideChange,
  effect = "fade",
}: ImageSliderProps) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval]);

  useEffect(() => {
    onSlideChange?.(current);
  }, [current, onSlideChange]);

  return (
    <div className={`overflow-hidden ${className}`}>
      {effect === "slide-rtl" ? (
        <AnimatePresence initial={false}>
          <motion.img
            key={`${images[current]?.src ?? "slide"}-${current}`}
            src={images[current]?.src}
            alt={images[current]?.alt}
            initial={{ x: "100%", scale: 1.01 }}
            animate={{ x: "0%", scale: 1 }}
            exit={{ x: "-100%", scale: 1.01 }}
            transition={{ duration: 1, ease: [0.45, 0, 0.55, 1] }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 2,
            }}
          />
        </AnimatePresence>
      ) : (
        images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: i === current ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              zIndex: i === current ? 2 : 1,
            }}
          />
        ))
      )}
      {overlay && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
            background: "rgba(0,0,0,0.4)",
          }}
        />
      )}
    </div>
  );
};

export default ImageSlider;
