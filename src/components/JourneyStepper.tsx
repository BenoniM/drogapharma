import {
  User,
  Search,
  Settings,
  BarChart3,
  ArrowUp,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";

const milestones = [
  {
    year: "2015",
    title: "Droga Pharma Established",
    description:
      "Founded in Addis Ababa by healthcare professionals with a mission to improve access to reliable medical products.",
    icon: User,
    colorClass: "bg-milestone-purple",
    status: "completed" as const,
  },
  {
    year: "2017",
    title: "Sector Expansion",
    description:
      "Expanded operations to support both public and private healthcare institutions across Ethiopia.",
    icon: Search,
    colorClass: "bg-milestone-blue",
    status: "completed" as const,
  },
  {
    year: "2019",
    title: "Major Tender Success",
    description:
      "Secured key government pharmaceutical tenders and strengthened nationwide supply capability.",
    icon: Settings,
    colorClass: "bg-milestone-green",
    status: "completed" as const,
  },
  {
    year: "2023",
    title: "Growth Milestone",
    description:
      "Annual sales surpassed $25M USD and the Droga Research Grant was launched to support healthcare innovation.",
    icon: BarChart3,
    colorClass: "bg-milestone-orange",
    status: "current" as const,
  },
  {
    year: "2025",
    title: "ISO 9001 Achievement",
    description:
      "Import and wholesale divisions achieved ISO 9001 certification, reinforcing quality and operational excellence.",
    icon: ArrowUp,
    colorClass: "bg-milestone-red",
    status: "upcoming" as const,
  },
];

const JourneyStepper = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    milestones.forEach((_, i) => {
      setTimeout(
        () => {
          setVisibleItems((prev) => [...prev, i]);
        },
        300 + i * 200,
      );
    });
  }, []);

  return (
    <div className=" py-10 px-4">
      {/* Desktop: perspective path */}
      <div
        className="hidden md:block max-w-5xl mx-auto relative"
        style={{ height: 700 }}
      >
        {/* The ascending colored path */}
        <svg
          viewBox="0 0 900 600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 80 520 Q 200 500 250 420 Q 300 340 400 310 Q 500 280 520 220 Q 540 160 650 130 Q 760 100 820 50"
            stroke="hsl(var(--primary))"
            strokeWidth="60"
            fill="none"
            strokeLinecap="round"
            opacity="0.25"
          />
          <path
            d="M 80 520 Q 200 500 250 420 Q 300 340 400 310 Q 500 280 520 220 Q 540 160 650 130 Q 760 100 820 50"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Node circles on the path */}
          {[
            { cx: 80, cy: 520 },
            { cx: 260, cy: 410 },
            { cx: 420, cy: 300 },
            { cx: 560, cy: 200 },
            { cx: 780, cy: 70 },
          ].map((pos, i) => (
            <g key={i}>
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r="16"
                fill="white"
                stroke="hsl(220,13%,91%)"
                strokeWidth="3"
              />
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r="8"
                fill={
                  [
                    "hsl(263,70%,50%)",
                    "hsl(207,90%,54%)",
                    "hsl(145,63%,42%)",
                    "hsl(32,95%,55%)",
                    "hsl(348,83%,47%)",
                  ][i]
                }
              />
            </g>
          ))}
        </svg>

        {/* Milestone cards positioned absolutely */}
        {milestones.map((m, i) => {
          const positions = [
            { left: "0%", top: "58%", align: "left" },
            { left: "18%", top: "36%", align: "left" },
            { left: "38%", top: "18%", align: "left" },
            { left: "54%", top: "2%", align: "left" },
            { left: "78%", top: "-10%", align: "left" },
          ];
          const pos = positions[i];
          const Icon = m.icon;
          const isVisible = visibleItems.includes(i);

          return (
            <div
              key={i}
              className={`absolute w-52 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ left: pos.left, top: pos.top }}
            >
              <div
                className={`${m.colorClass} text-white rounded-xl p-4 shadow-lg relative`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-black">{m.year}</span>
                  {m.status === "completed" && (
                    <Check className="w-5 h-5 opacity-80" />
                  )}
                </div>
                <h3 className="font-bold text-sm mb-1">{m.title}</h3>
                <p className="text-xs leading-relaxed opacity-90">
                  {m.description}
                </p>
                <div className="absolute bottom-3 right-3 opacity-30">
                  <Icon className="w-6 h-6" />
                </div>
                {/* Arrow pointer */}
                <div
                  className={`absolute -bottom-2 left-6 w-4 h-4 ${m.colorClass} rotate-45`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical stepper */}
      <div className="md:hidden max-w-sm mx-auto relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary/70 rounded-full" />
        <div className="space-y-8">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            const isVisible = visibleItems.includes(i);
            return (
              <div
                key={i}
                className={`relative pl-20 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              >
                <div
                  className={`absolute left-4 top-4 w-9 h-9 rounded-full ${m.colorClass} flex items-center justify-center shadow-md`}
                >
                  {m.status === "completed" ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Icon className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`${m.colorClass} text-white rounded-xl p-4 shadow-lg`}
                >
                  <span className="text-xl font-black">{m.year}</span>
                  <h3 className="font-bold text-sm mt-1">{m.title}</h3>
                  <p className="text-xs leading-relaxed opacity-90 mt-1">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyStepper;
