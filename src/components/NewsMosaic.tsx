import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import healthcareTeamImg from "@/assets/CertificateofAppreciationFromTheMinistryofHealth.jpg";
import teamImg from "@/assets/CertificateofRecognitionFromMinistryofHealthEthiopia.jpg";
import labImg from "@/assets/DrogaResearchGrant2023Winnerjpg.jpg";

const items = [
  {
    title: "Certificate of Appreciation From The Ministry of Health",
    desc: "Recognized for our outstanding contribution to Ethiopia's healthcare sector by the Ministry of Health.",
    img: healthcareTeamImg,
    tag: "AWARD",
  },
  {
    title: "Certificate of Recognition From Ministry of Health",
    desc: "In recognition of our financial support in realizing the 2024 safe motherhood month commemoration.",
    img: teamImg,
    tag: "RECOGNITION",
  },
  {
    title: "Droga Research Grant 2023 Winner",
    desc: "Droga research grant is organized annually to encourage & support research in healthcare.",
    img: labImg,
    tag: "RESEARCH",
  },
  {
    title: "",
    desc: "",
    img: null,
    tag: "SEE ALL NEWS",
  },
];

/* ─── Constants ────────────────────────────────────────────────────
   All 4 boxes share ONE centre point and expand outward into their
   own quadrant. They can never overlap — they grow away from centre.
   ─────────────────────────────────────────────────────────────── */
const BASE     = 210;  // default square side (px)
const MIN_SIZE = 145;  // smallest (cursor very far)
const MAX_SIZE = 300;  // largest (cursor directly on box)
const SEP      = 1;    // 1px line between boxes at the shared centre
const FALLOFF  = 460;  // decay distance (px)
const LERP     = 0.07;

// Container must fit the largest possible state: MAX_SIZE each side + sep
const CONT = (MAX_SIZE + SEP) * 2;
const CX   = CONT / 2; // centre x/y within container
const CY   = CONT / 2;

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

/** Returns the current viewport centre of each box given its size */
function boxCenter(i: number, s: number, containerLeft: number, containerTop: number) {
  const half = s / 2 + SEP;
  switch (i) {
    case 0: return [containerLeft + CX - half, containerTop + CY - half]; // TL
    case 1: return [containerLeft + CX + half, containerTop + CY - half]; // TR
    case 2: return [containerLeft + CX - half, containerTop + CY + half]; // BL
    default:return [containerLeft + CX + half, containerTop + CY + half]; // BR
  }
}

/** Returns position (left, top) in container so box corner touches centre */
function boxPos(i: number, s: number) {
  switch (i) {
    case 0: return { left: CX - s - SEP, top: CY - s - SEP }; // TL
    case 1: return { left: CX + SEP,     top: CY - s - SEP }; // TR
    case 2: return { left: CX - s - SEP, top: CY + SEP     }; // BL
    default:return { left: CX + SEP,     top: CY + SEP     }; // BR
  }
}

/* ════════════════════════════════════════════════════════════════ */
const NewsMosaic = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const squareRefs   = useRef<(HTMLElement | null)[]>([]);
  const rafRef       = useRef<number | null>(null);
  const mousePos     = useRef<{ x: number; y: number } | null>(null);
  const curSizes     = useRef<number[]>(items.map(() => BASE));

  const applyLayout = useCallback(() => {
    const container = containerRef.current;
    const mouse     = mousePos.current;

    if (container) {
      const rect = container.getBoundingClientRect();

      squareRefs.current.forEach((el, i) => {
        if (!el) return;

        // Compute current box centre in viewport space
        const [cx, cy] = boxCenter(i, curSizes.current[i], rect.left, rect.top);

        // Target size from cursor distance
        let target = BASE;
        if (mouse) {
          const dist = Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);
          const norm = Math.max(0, 1 - dist / FALLOFF);
          target = MIN_SIZE + (MAX_SIZE - MIN_SIZE) * easeOut(norm);
        }

        curSizes.current[i] += (target - curSizes.current[i]) * LERP;
        const s = curSizes.current[i];
        const pos = boxPos(i, s);

        el.style.width  = `${s}px`;
        el.style.height = `${s}px`;
        el.style.left   = `${pos.left}px`;
        el.style.top    = `${pos.top}px`;
      });
    }

    rafRef.current = requestAnimationFrame(applyLayout);
  }, []);

  useEffect(() => {
    const onMove  = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mousePos.current = null; };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(applyLayout);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyLayout]);

  /* ── Original hover-text positioning ──────────────────────────── */
  const getTextPosition = (index: number | null) => {
    switch (index) {
      case 0: return { top: "15%",    left: "3%",  textAlign: "left"  as const, alignItems: "flex-start" };
      case 1: return { top: "15%",    right: "3%", textAlign: "right" as const, alignItems: "flex-end"   };
      case 2: return { bottom: "15%", left: "3%",  textAlign: "left"  as const, alignItems: "flex-start" };
      default:return { top: "0%",     left: "0%",  textAlign: "left"  as const, alignItems: "flex-start" };
    }
  };
  const pos = getTextPosition(hoveredIndex);

  return (
    <section id="news" className="bg-[#fcfcfc] min-h-[80vh] relative flex items-center justify-center overflow-hidden py-24 border-t border-black/10">

      {/* Corner Labels */}
      <div className="absolute top-10 left-10 md:left-16 z-30">
        <span className="font-display text-lg md:text-2xl text-black/90 font-bold tracking-tight uppercase">AWARD</span>
      </div>
      <div className="absolute top-10 right-10 md:right-16 z-30">
        <span className="font-display text-lg md:text-2xl text-black/90 font-bold tracking-tight uppercase">RECOGNITION</span>
      </div>
      <div className="absolute bottom-10 left-10 md:left-16 z-30">
        <span className="font-display text-lg md:text-2xl text-black/90 font-bold tracking-tight uppercase">RESEARCH</span>
      </div>
      <div className="absolute bottom-10 right-10 md:right-16 z-30">
        <Link to="/blog" className="font-display text-lg md:text-2xl text-black/90 font-bold tracking-tight uppercase hover:text-primary transition-colors flex items-center gap-2">
          SEE ALL NEWS <ArrowUpRight size={20} className="hidden md:block" />
        </Link>
      </div>

      {/* Hover Content */}
      <div className="absolute inset-0 pointer-events-none z-40">
        <AnimatePresence>
          {hoveredIndex !== null && hoveredIndex !== 3 && (
            <>
              {/* Corner Text */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute w-[45%] md:w-auto md:min-w-[280px] max-w-[250px] md:max-w-[320px] flex flex-col z-50"
                style={{ top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right, textAlign: pos.textAlign, alignItems: pos.alignItems }}
              >
                <h3 className="font-display text-lg md:text-2xl font-bold text-black mb-3 leading-tight tracking-tight">
                  {items[hoveredIndex].title}
                </h3>
                <p className="text-black/70 text-xs md:text-sm leading-relaxed font-semibold">
                  {items[hoveredIndex].desc}
                </p>
              </motion.div>
              
              {/* Central Full Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
              >
                <img
                  src={items[hoveredIndex].img!}
                  alt={items[hoveredIndex].title}
                  className="w-auto h-auto max-w-[85%] md:max-w-[70%] max-h-[75%] md:max-h-[65%] object-contain"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── 2×2 cluster expanding from centre ─────────────────────── */}
      <div className="relative z-20" style={{ width: CONT, height: CONT }}>
        <div
          ref={containerRef}
          style={{ position: "absolute", inset: 0 }}
        >
          {items.map((item, i) => {
            const initPos = boxPos(i, BASE);

            const commonStyle: React.CSSProperties = {
              position: "absolute",
              left: initPos.left,
              top:  initPos.top,
              width:  BASE,
              height: BASE,
              overflow: "hidden",
            };

            const imgClass = `w-full h-full object-cover transition-all duration-700 ${
              hoveredIndex !== null
                ? "blur-[4px] grayscale opacity-30 scale-100"
                : "grayscale-0 scale-100"
            }`;

            if (i === 3) {
              return (
                <Link
                  key={i}
                  to="/blog"
                  ref={(el) => { squareRefs.current[i] = el; }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`bg-black flex flex-col items-center justify-center group transition-all duration-500 ${hoveredIndex !== null && hoveredIndex !== 3 ? "opacity-30 blur-[4px]" : "opacity-100 hover:bg-primary"}`}
                  style={commonStyle}
                >
                  <span className="font-display text-base md:text-xl font-bold text-white group-hover:text-black transition-colors text-center px-4 leading-tight">
                    SEE ALL<br />NEWS
                  </span>
                  <ArrowUpRight className="text-white group-hover:text-black transition-colors mt-2" size={24} strokeWidth={2} />
                </Link>
              );
            }

            return (
              <div
                key={i}
                ref={(el) => { squareRefs.current[i] = el; }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ ...commonStyle, cursor: "pointer" }}
              >
                <img src={item.img!} alt={item.tag} className={imgClass} />
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default NewsMosaic;
