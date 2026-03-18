import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface TextPressureProps {
  text: string;
  className?: string;
}

const TextPressure = ({ text, className = "" }: TextPressureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`inline-block cursor-default ${className}`}
    >
      <div className="flex flex-wrap justify-center md:justify-start">
        {words.map((word, wi) => (
          <span key={wi} className="inline-flex mr-[0.3em]">
            {word.split("").map((char, ci) => (
              <PressureChar
                key={`${wi}-${ci}`}
                char={char}
                containerRef={containerRef}
                mouseX={mouseX}
                mouseY={mouseY}
                isHovering={isHovering}
              />
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

const PressureChar = ({
  char,
  containerRef,
  mouseX,
  mouseY,
  isHovering,
}: {
  char: string;
  containerRef: React.RefObject<HTMLDivElement>;
  mouseX: any;
  mouseY: any;
  isHovering: boolean;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [charCenter, setCharCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePos = () => {
      if (!ref.current || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const charRect = ref.current.getBoundingClientRect();
      setCharCenter({
        x: charRect.left - containerRect.left + charRect.width / 2,
        y: charRect.top - containerRect.top + charRect.height / 2,
      });
    };
    updatePos();
    window.addEventListener("resize", updatePos);
    return () => window.removeEventListener("resize", updatePos);
  }, [containerRef]);

  const distance = useTransform([mouseX, mouseY], ([mx, my]: number[]) => {
    if (!isHovering) return 200;
    const dx = mx - charCenter.x;
    const dy = my - charCenter.y;
    return Math.sqrt(dx * dx + dy * dy);
  });

  const fontWeight = useTransform(distance, [0, 150, 300], [900, 700, 400]);
  const scale = useTransform(distance, [0, 100, 300], [1.15, 1.05, 1]);

  const springWeight = useSpring(fontWeight, { stiffness: 300, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 300, damping: 30 });

  return (
    <motion.span
      ref={ref}
      style={{
        fontWeight: springWeight,
        scale: springScale,
        fontVariationSettings: useTransform(springWeight, (w) => `"wght" ${w}`),
      }}
      className="inline-block transition-colors duration-150"
    >
      {char}
    </motion.span>
  );
};

export default TextPressure;
