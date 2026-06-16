import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import supplyImg from "@/assets/ourexpert.jpg";
import grp1  from "@/assets/HeroGroups/2.jpg";
import grp2  from "@/assets/HeroGroups/photo_2026-06-04_09-09-38.jpg";
import grp3  from "@/assets/HeroGroups/img_2004.jpg";
import grp4  from "@/assets/HeroGroups/FullStore13.jpg";
import grp5  from "@/assets/HeroGroups/IMG_3651.jpg";
import grp6  from "@/assets/HeroGroups/teams.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ─── LAYOUT CONSTANTS ─────────────────────────────────────────────────────── */
const FS    = 0.35;
const TOTAL = +(100 / FS).toFixed(3);
const SIDE  = +((TOTAL - 100) / 2).toFixed(3);
const GAP   = 8;
const GB    = "#0d0d0d";
const YELLOW = "hsl(58 100% 50%)";

/* ─── CELL HELPER ──────────────────────────────────────────────────────────── */
function Cell({ style, imgSrc }: { style: React.CSSProperties; imgSrc: string }) {
  return (
    <div style={{ position: "absolute", overflow: "hidden", willChange: "opacity", ...style }}>
      <img
        src={imgSrc}
        draggable={false}
        className="brightness-[85%]"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        className="img-yellow-overlay"
        style={{
          position: "absolute", inset: "-2px",
          background: YELLOW,
          opacity: 0,
          pointerEvents: "none",
          willChange: "opacity",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function ScrollHero() {
  const wrapRef         = useRef<HTMLDivElement>(null);
  const mosaicRef       = useRef<HTMLDivElement>(null);
  const centerImgRef    = useRef<HTMLImageElement>(null);
  const centerYellowRef = useRef<HTMLDivElement>(null);
  const gridBgRef       = useRef<HTMLDivElement>(null);
  const baseBgRef       = useRef<HTMLDivElement>(null);
  const text1Ref        = useRef<HTMLDivElement>(null);
  const text2Ref        = useRef<HTMLDivElement>(null);
  const text3Ref        = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrap = wrapRef.current!;
      const yellows = gsap.utils.toArray<HTMLElement>(".img-yellow-overlay");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,           // tight follow — no lag buildup
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      });

      /* ── 0 → 33%: zoom out — GPU composited via willChange on mosaicRef ── */
      tl.fromTo(mosaicRef.current,
        { scale: 1 },
        { scale: FS, ease: "none", duration: 33 },
        0,
      );

      /* Phase-1 text: ONLY opacity — no blur, no x. Blur = software repaint every frame */
      tl.to(text1Ref.current, { opacity: 0, ease: "power2.inOut", duration: 10 }, 20);

      /* Phase-2 text in */
      tl.fromTo(text2Ref.current,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out", duration: 10 },
        23,
      );

      /* ── 33 → 66%: yellow transition ─────────────────────────────────── */
      tl.to(centerImgRef.current,    { opacity: 0, ease: "none", duration: 12 }, 34);
      tl.to(centerYellowRef.current, { opacity: 1, ease: "none", duration: 12 }, 34);
      tl.to(gridBgRef.current,       { backgroundColor: YELLOW, ease: "none", duration: 14 }, 34);
      tl.to(baseBgRef.current,       { backgroundColor: YELLOW, ease: "none", duration: 14 }, 34);
      tl.to(yellows, { opacity: 1, ease: "none", duration: 14, stagger: 0.3 }, 34);

      /* Phase-2 out */
      tl.to(text2Ref.current, { opacity: 0, ease: "power2.inOut", duration: 10 }, 34);

      /* Phase-3 in */
      tl.fromTo(text3Ref.current,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out", duration: 10 },
        39,
      );
    });

    return () => ctx.revert();
  }, []);
  const textBase = "absolute z-[30] flex items-end justify-start px-6 md:px-16 pb-0 md:pb-0";

  return (
    <div ref={wrapRef} style={{ height: "300vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden" }}>

        {/* Dark base */}
        <div ref={baseBgRef} style={{ position: "absolute", inset: 0, backgroundColor: GB }} />

        {/* ── Mosaic ── */}
        <div
          style={{
            position: "absolute",
            left: `calc(50% - ${(TOTAL / 2).toFixed(3)}vw)`,
            top:  `calc(50% - ${(TOTAL / 2).toFixed(3)}vh)`,
            width: `${TOTAL}vw`,
            height: `${TOTAL}vh`,
            zIndex: 10,
          }}
        >
          <div
            ref={mosaicRef}
            style={{
              position: "absolute",
              inset: 0,
              transformOrigin: "center center",
              willChange: "transform", // GPU layer for the scale — necessary
            }}
          >
            {/* Surrounding grid */}
            <div ref={gridBgRef} style={{ position: "absolute", inset: 0, backgroundColor: GB }}>
              <Cell imgSrc={grp1} style={{ left: 0, top: 0, width: `calc(50% - ${GAP/2}px)`, height: `calc(${SIDE}vh - ${GAP}px)` }} />
              <Cell imgSrc={grp2} style={{ right: 0, top: 0, width: `calc(50% - ${GAP/2}px)`, height: `calc(${SIDE}vh - ${GAP}px)` }} />
              <Cell imgSrc={grp5} style={{ left: 0, top: `${SIDE}vh`, width: `calc(${SIDE}vw - ${GAP}px)`, height: "100vh" }} />
              <Cell imgSrc={grp6} style={{ right: 0, top: `${SIDE}vh`, width: `calc(${SIDE}vw - ${GAP}px)`, height: "100vh" }} />
              <Cell imgSrc={grp3} style={{ left: 0, bottom: 0, width: `calc(50% - ${GAP/2}px)`, height: `calc(${SIDE}vh - ${GAP}px)` }} />
              <Cell imgSrc={grp4} style={{ right: 0, bottom: 0, width: `calc(50% - ${GAP/2}px)`, height: `calc(${SIDE}vh - ${GAP}px)` }} />
            </div>

            {/* Hero centre cell */}
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                left: `${SIDE}vw`,
                top: `${SIDE}vh`,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <img
                ref={centerImgRef}
                src={supplyImg}
                alt="Our Experts"
                draggable={false}
                className="brightness-[85%]"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                  willChange: "opacity",
                }}
              />
              {/* Legibility gradient */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)",
              }} />
              {/* Yellow for center */}
              <div
                ref={centerYellowRef}
                style={{
                  position: "absolute", inset: "-2px", zIndex: 2,
                  background: YELLOW,
                  opacity: 0, pointerEvents: "none",
                  willChange: "opacity",
                }}
              />
            </div>

          </div>
        </div>

        {/* ── TEXT OVERLAYS — opacity only, no filter/blur ── */}
        <div
          ref={text1Ref}
          className={textBase}
          style={{ inset: 0, position: "absolute", willChange: "opacity" }}
        >
          <div style={{ textAlign: "left", maxWidth: 800 }}>
            <p style={{ color: "rgba(255,255,255,0.95)", fontSize: "clamp(0.85rem,1.2vw,1rem)", marginBottom: "1.75rem", lineHeight: 1.65, fontWeight: 400, maxWidth: "450px" }}>
              Highly experienced pharmacists and manufacturing industry professionals that drive our partners' success.
            </p>
            <Link to="/about" className="inline-flex items-center gap-[10px] px-[20px] py-[10px] bg-white text-black font-semibold text-[13px] md:text-[14px] hover:bg-primary transition-colors" style={{ textDecoration: "none" }}>
              About Us →
            </Link>
            <h1 style={{ fontSize: "clamp(4rem,7vw,7rem)", fontWeight: 900, color: "#fff", marginTop: "1.5rem", marginBottom: "1rem", lineHeight: 0.9, textTransform: "uppercase", whiteSpace: "nowrap" }}>
              <span style={{ display: "block" }}>Serving</span>
              <span style={{ display: "block" }}>the people!</span>
            </h1>
          </div>
        </div>

        <div
          ref={text2Ref}
          className={textBase}
          style={{ inset: 0, position: "absolute", opacity: 0, willChange: "opacity" }}
        >
          <div style={{ textAlign: "left", maxWidth: 800 }}>
            <p style={{ color: "rgba(255,255,255,0.95)", fontSize: "clamp(0.85rem,1.2vw,1rem)", marginBottom: "1.75rem", lineHeight: 1.65, fontWeight: 400, maxWidth: "450px" }}>
              WHO-approved products from globally certified manufacturers ensuring the highest standards.
            </p>
            <Link to="/about" className="inline-flex items-center gap-[10px] px-[20px] py-[10px] bg-white text-black font-semibold text-[13px] md:text-[14px] hover:bg-primary transition-colors" style={{ textDecoration: "none" }}>
              About Us →
            </Link>
            <h2 style={{ fontSize: "clamp(4rem,7vw,7rem)", fontWeight: 900, color: "#fff", marginTop: "1.5rem", marginBottom: "1rem", lineHeight: 0.9, textTransform: "uppercase", whiteSpace: "nowrap" }}>
              <span style={{ display: "block" }}>Serving</span>
              <span style={{ display: "block" }}>the people !</span>
            </h2>
          </div>
        </div>

        <div
          ref={text3Ref}
          className={textBase}
          style={{ inset: 0, position: "absolute", opacity: 0, willChange: "opacity" }}
        >
          {/* Animated Text from About Page placed Top Right */}
          <div className="absolute -top-20 md:-top-32 right-0 w-[40vw] md:w-[35vw] h-[50vh] pointer-events-none overflow-visible flex items-start justify-start z-[-1]">
            <style>
              {`
                .hero-anim-bg-text {
                  fill: rgba(0, 0, 0, 0);
                  stroke: #000000;
                  stroke-width: 4px;
                  stroke-dasharray: 4000 4000;
                  animation: heroStrokeDashBg 5s ease-in-out infinite alternate;
                }
                @keyframes heroStrokeDashBg {
                  from { stroke-dashoffset: 0; }
                  to { stroke-dashoffset: 4000; }
                }
              `}
            </style>
            <svg
              className="absolute w-[200%] h-[200%]"
              viewBox="0 0 1600 600"
              preserveAspectRatio="xMinYMin meet"
              style={{ transform: "translate(0, 0)" }}
            >
              <text
                x="0"
                y="0"
                textAnchor="start"
                dominantBaseline="hanging"
                className="hero-anim-bg-text uppercase"
                style={{
                  fontSize: "55rem",
                  fontWeight: 900,
                  letterSpacing: "0.02em",
                }}
              >
                DROGA
              </text>
            </svg>
          </div>

          <div style={{ textAlign: "left", maxWidth: 800 }}>
            <p style={{ color: "rgba(0,0,0,0.95)", fontSize: "clamp(0.85rem,1.2vw,1rem)", marginBottom: "1.75rem", lineHeight: 1.65, fontWeight: 400, maxWidth: "450px" }}>
              Droga Pharma Pvt.Ltd Co. is a private limited company based in Addis Ababa, Ethiopia, aiming on sustainable supply of quality medicines, sutures, orthopedic implants and medical devices.
            </p>
            <Link to="/about" className="inline-flex items-center gap-[10px] px-[20px] py-[10px] bg-black text-white font-semibold text-[13px] md:text-[14px] hover:bg-white hover:text-black transition-colors" style={{ textDecoration: "none" }}>
              About Us →
            </Link>
            <h2 style={{ fontSize: "clamp(4rem,7vw,7rem)", fontWeight: 900, color: "#000", marginTop: "1.5rem", marginBottom: "1rem", lineHeight: 0.9, textTransform: "uppercase", whiteSpace: "nowrap" }}>
              <span style={{ display: "block" }}>Serving</span>
              <span style={{ display: "block" }}>the people !</span>
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}
