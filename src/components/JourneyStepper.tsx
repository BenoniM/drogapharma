import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  event: string;
}

interface JourneyStepperProps {
  timeline: TimelineItem[];
}

const JourneyStepper = ({ timeline }: JourneyStepperProps) => {
  // Wavy path constants
  const width = 1200;
  const height = 400;
  const canvasHeight = height + 100;
  const paddingX = 100;
  const nodeSpacing = (width - paddingX * 2) / (timeline.length - 1);

  // Custom Y-offsets for organic wave (higher, lower, etc.)
  const yOffsets = [200, 250, 150, 280, 180, 100];

  const nodes = timeline.map((item, index) => {
    const x = paddingX + index * nodeSpacing;
    const y = yOffsets[index] || 200;
    return { ...item, x, y };
  });

  const generatePath = () => {
    if (nodes.length < 2) return "";
    let path = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 0; i < nodes.length - 1; i++) {
      const curr = nodes[i];
      const next = nodes[i + 1];
      const cp1x = curr.x + nodeSpacing * 0.4;
      const cp1y = curr.y;
      const cp2x = next.x - nodeSpacing * 0.4;
      const cp2y = next.y;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return path;
  };

  return (
    <div className="w-full py-16">
      <div className="relative mx-auto w-full max-w-[1200px] h-[520px] md:h-[560px]">
        {/* SVG Path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${width} ${canvasHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff200" />
              <stop offset="100%" stopColor="#fff200" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feOffset dx="2" dy="2" result="offsetBlur" />
              <feComposite
                in="SourceGraphic"
                in2="offsetBlur"
                operator="over"
              />
            </filter>
          </defs>
          <motion.path
            d={generatePath()}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.25 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => {
          // Circle sizes can varies like the image
          const size =
            index === nodes.length - 1
              ? "w-28 h-28"
              : index === 2
                ? "w-24 h-24"
                : "w-20 h-20";
          const innerSize =
            index === nodes.length - 1
              ? "w-20 h-20"
              : index === 2
                ? "w-16 h-16"
                : "w-14 h-14";

          return (
            <motion.div
              key={index}
              className="absolute flex flex-col items-center group"
              style={{
                left: `${(node.x / width) * 100}%`,
                top: `${(node.y / canvasHeight) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              {/* Year Label (Above) */}
              <div className="absolute -top-16 whitespace-nowrap">
                <span className="font-display font-bold text-xl text-[#b8b6b6] group-hover:scale-110 transition-transform inline-block">
                  {node.year}
                </span>
              </div>

              {/* Circle Node */}
              <div className="relative cursor-pointer">
                {/* Glow Background */}
                <div
                  className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity bg-[#b8b6b6] scale-150`}
                />

                {/* Main Circle */}
                <div
                  className={`${size} rounded-full bg-white border-[8px] border-[#b8b6b6]/80 flex items-center justify-center shadow-[0_10px_25px_rgba(184,182,182,0.3)] group-hover:border-[#b8b6b6] transition-colors relative z-10`}
                >
                  <div
                    className={`${innerSize} rounded-full border-[3px] border-[#fff200]/40 flex items-center justify-center text-black font-bold`}
                  >
                    <span
                      className={
                        index === nodes.length - 1 ? "text-2xl" : "text-base"
                      }
                    >
                      {index === 0
                        ? "Start"
                        : index === nodes.length - 1
                          ? "+43%"
                          : `+${30 + index * 4}%`}
                    </span>
                  </div>
                </div>

                {/* Vertical Connector Line to text */}
                <div className="absolute top-full left-1/2 w-[2px] h-10 bg-[#b8b6b6]/20 -translate-x-1/2 group-hover:h-12 transition-all" />
              </div>

              {/* Content (Below) */}
              <div className="absolute top-24 w-44 md:w-56 text-center">
                <h4 className="font-bold text-sm text-black mb-1">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1} Journey Detail
                </h4>
                <p className="text-[10px] md:text-[11px] text-foreground/70 leading-relaxed max-w-[180px] mx-auto italic">
                  {node.event}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyStepper;
