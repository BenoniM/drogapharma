import { motion } from "framer-motion";
import { useMemo, useCallback } from "react";

interface CyclingWaveProps {
  waveCount?: number;
  waveSize?: number;
  rotationSpeed?: number;
  tiltAngle?: number;
  strokeWidth?: number;
  accentColor?: string;
  blurAmount?: number;
  opacity?: number;
}

const CyclingWave = ({
  waveCount = 10,
  waveSize = 140,
  rotationSpeed = 4,
  tiltAngle = 45,
  strokeWidth = 2,
  accentColor = "hsl(213, 94%, 52%)",
  blurAmount = 20,
  opacity = 0.8,
}: CyclingWaveProps) => {
  const waves = useMemo(
    () =>
      Array.from({ length: waveCount }, (_, i) => ({
        id: i,
        delay: i * 0.2,
        scale: 1 + i * 0.1,
        opacity: opacity * (1 - i * 0.1),
      })),
    [waveCount, opacity]
  );

  const backgroundGradientStyle = useMemo(
    () => ({
      position: "absolute" as const,
      inset: 0,
      background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
      filter: `blur(${blurAmount}px)`,
    }),
    [accentColor, blurAmount]
  );

  const getWaveStyle = useCallback(
    (wave: (typeof waves)[0]) => ({
      position: "absolute" as const,
      width: waveSize * wave.scale,
      height: waveSize * wave.scale,
      border: `${strokeWidth}px solid ${accentColor}`,
      borderRadius: "50%",
      opacity: wave.opacity,
      willChange: "transform" as const,
    }),
    [waveSize, strokeWidth, accentColor]
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden flex items-center justify-center"
      style={{ perspective: 800 }}
    >
      <div style={backgroundGradientStyle} />
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          style={getWaveStyle(wave)}
          animate={{
            rotateZ: [0, 360],
            rotateY: [0, 360],
            rotateX: [tiltAngle, tiltAngle + 360],
          }}
          transition={{
            duration: rotationSpeed,
            repeat: Infinity,
            ease: "linear",
            delay: wave.delay,
          }}
        />
      ))}
    </div>
  );
};

export default CyclingWave;
