import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/hero-pharma.jpg";
import labImg from "@/assets/lab-research.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDES = [
  {
    id: "mission",
    label: "Our Mission",
    text: "We build ethical companies that provide quality products and services by our talented members to serve humanity and contribute to socio economic development.",
    image: "https://images.pexels.com/photos/6203641/pexels-photo-6203641.jpeg",
  },
  {
    id: "vision",
    label: "Our Vision",
    text: "To be the leading group company in Ethiopia that creates health and wealth for human being.",
    image: "https://images.pexels.com/photos/1331386/pexels-photo-1331386.jpeg",
  },
];

const CORE_VALUES = [
  {
    id: "integrity",
    category: "Integrity",
    titles: ["Do The Right Thing", "Walk The Talk", "Foster Sound Decisions"],
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "customer",
    category: "Customer Centric",
    titles: ["Listen First", "Go The Extra Mile", "Innovate To Add Value"],
    image:
      "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "care",
    category: "Care",
    titles: [
      "Care For Us (Employee & Terms)",
      "Care For Community",
      "Care For The Planet",
    ],
    image:
      "https://images.pexels.com/photos/3874523/pexels-photo-3874523.jpeg",
  },
];

const TOTAL_STEPS = 2;

export function MissionVisionValues() {
  const sectionRef     = useRef<HTMLElement>(null);
  const slideLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valuesGridRef  = useRef<HTMLDivElement | null>(null);
  const middleColRef   = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ease  = gsap.parseEase("power2.inOut");
      const clamp = gsap.utils.clamp(0, 1);

      function getFullClip(idx: number, sp: number) {
        let topClip = 100, bottomClip = 0;
        const revealStart = (idx - 1) / TOTAL_STEPS;
        const revealEnd   = idx       / TOTAL_STEPS;
        const hideStart   = idx       / TOTAL_STEPS;
        const hideEnd     = (idx + 1) / TOTAL_STEPS;

        if (idx === 0) {
          topClip = 0;
          if (sp >= hideEnd)        bottomClip = 100;
          else if (sp > hideStart)  bottomClip = clamp(ease((sp - hideStart) / (hideEnd - hideStart))) * 100;
        } else if (idx === 1) {
          if (sp <= revealStart)     { topClip = 100; bottomClip = 0; }
          else if (sp <= revealEnd) {
            const p = (sp - revealStart) / (revealEnd - revealStart);
            topClip    = (1 - clamp(ease(p))) * 100;
            bottomClip = 0;
          } else {
            topClip    = 0;
            bottomClip = 0;
          }
        } else {
          if      (sp <= revealStart) { topClip = 100; bottomClip = 0; }
          else if (sp >= hideEnd)     { topClip = 0;   bottomClip = 100; }
          else if (sp <= revealEnd) {
            const p = (sp - revealStart) / (revealEnd - revealStart);
            topClip = (1 - clamp(ease(p))) * 100;
            bottomClip = 0;
          } else {
            const p = (sp - hideStart) / (hideEnd - hideStart);
            topClip    = 0;
            bottomClip = clamp(ease(p)) * 100;
          }
        }
        return `inset(${topClip}% 0 ${bottomClip}% 0)`;
      }

      function getValuesGridClip(sp: number) {
        const start = 1 / TOTAL_STEPS;
        const end   = 1;
        if (sp <= start) return "inset(100% 0 0 0)";
        if (sp >= end)   return "inset(0 0 0 0)";
        const p = clamp(ease((sp - start) / (end - start)));
        return `inset(${(1 - p) * 100}% 0 0 0)`;
      }

      function getMiddleColClip(sp: number) {
        const start = 1 / TOTAL_STEPS;
        const end   = 1;
        if (sp <= start) return "inset(0 0 100% 0)";
        if (sp >= end)   return "inset(0 0 0 0)";
        const p = clamp(ease((sp - start) / (end - start)));
        return `inset(0 0 ${(1 - p) * 100}% 0)`;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start:   "top top",
        end:     `+=${TOTAL_STEPS * 100}%`,
        scrub:   1.2,
        snap: {
          snapTo: (value) => {
            const step = 1 / TOTAL_STEPS;
            return Math.round(value / step) * step;
          },
          duration: { min: 0.2, max: 0.6 },
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const sp = self.progress;

          SLIDES.forEach((_, i) => {
            const el = slideLayerRefs.current[i];
            if (el) el.style.clipPath = getFullClip(i, sp);
          });

          if (valuesGridRef.current) {
            valuesGridRef.current.style.clipPath = getValuesGridClip(sp);
          }
          if (middleColRef.current) {
            middleColRef.current.style.clipPath = getMiddleColClip(sp);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mvv-section"
      aria-label="Mission, Vision and Core Values"
      style={{ height: `${(TOTAL_STEPS + 1) * 100}vh` }}
    >
      <div className="mvv-sticky">

        {/* ── Mission + Vision full-screen layers ─────────────────────── */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => { slideLayerRefs.current[i] = el; }}
            className="mvv-full-layer"
            style={{
              zIndex:   i,
              clipPath: i === 0 ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
            }}
          >
            <img src={slide.image} alt={slide.label} className="mvv-bg-img" />
            <div className="mvv-scrim" />
            <div className="mvv-slide-content">
              <div className="mvv-slide-card">
                <span className="mvv-eyebrow">
                  {slide.label}
                </span>
                <p className="mvv-headline">{slide.text}</p>
                <div className="mvv-rule" />
              </div>
            </div>
          </div>
        ))}

        {/* ── Core Values: left + right columns (wipe from bottom) ────── */}
        <div
          ref={valuesGridRef}
          className="mvv-full-layer mvv-values-grid"
          style={{
            zIndex:   SLIDES.length,
            clipPath: "inset(100% 0 0 0)",
            willChange: "clip-path",
          }}
        >
          <ValueCol val={CORE_VALUES[0]} showSep />
          <div style={{ visibility: "hidden", pointerEvents: "none" }}>
            <ValueCol val={CORE_VALUES[1]} showSep={false} />
          </div>
          <ValueCol val={CORE_VALUES[2]} showSep={false} />
        </div>

        {/* ── Middle column (Customer Centric) — wipe from top ─────────── */}
        <div
          ref={middleColRef}
          className="mvv-full-layer mvv-middle-col-layer"
          style={{
            zIndex:   SLIDES.length + 1,
            clipPath: "inset(0 0 100% 0)",
            willChange: "clip-path",
          }}
        >
          <ValueCol val={CORE_VALUES[1]} showSep={false} />
          <div className="mvv-mid-sep mvv-mid-sep-left" />
          <div className="mvv-mid-sep mvv-mid-sep-right" />
        </div>

      </div>

      <style>{`
        .mvv-section  { position: relative; z-index: 25; }
        .mvv-sticky { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; background: transparent; }

        .mvv-full-layer { position: absolute; inset: 0; will-change: clip-path;}

        .mvv-bg-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          transform: scale(1.03);
        }

        .mvv-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.72) 0%,
            rgba(0,0,0,0.22) 50%,
            rgba(0,0,0,0.08) 100%
          );
        }

        .mvv-slide-content {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center;
          padding: 0 clamp(2.5rem, 7vw, 6rem);
        }
        .mvv-slide-card { max-width: min(680px, 55vw); }
        .mvv-eyebrow {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #FFF200;
          margin-bottom: 1rem;
        }
        .mvv-headline {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(1.6rem, 3.8vw, 2.6rem);
          font-weight: 400;
          line-height: 1.28;
          color: #fff;
          margin: 0 0 1.5rem;
          letter-spacing: -0.01em;
        }
        .mvv-rule {
          width: 3rem; height: 2px;
          background: #FFF200;
          border-radius: 2px;
        }

        .mvv-ghost-label {
          position: absolute;
          bottom: clamp(1.5rem, 4vh, 3rem);
          right: clamp(1.5rem, 4vw, 3.5rem);
          z-index: 2;
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(4rem, 12vw, 9rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: rgba(255,255,255,0.045);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          text-transform: uppercase;
        }
        .mvv-ghost-sm { font-size: clamp(2rem, 5vw, 4rem); }

        .mvv-values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }

        .mvv-middle-col-layer {
          left: 33.333%;
          right: 33.333%;
          width: 33.333%;
        }

        .mvv-value-col {
          position: relative;
          overflow: hidden;
          height: 100vh;
        }
        .mvv-col-sep {
          position: absolute; right: 0; top: 0; bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.10);
          z-index: 10;
        }

        .mvv-mid-sep {
          position: absolute; top: 0; bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.10);
          z-index: 10;
        }
        .mvv-mid-sep-left  { left: 0; }
        .mvv-mid-sep-right { right: 0; }

        .mvv-value-text {
          position: absolute; inset: 0; z-index: 3;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 0 clamp(1.25rem, 3.5vw, 2.5rem);
          padding-bottom: clamp(2.5rem, 6vh, 4rem);
        }
        .mvv-value-list {
          list-style: none; padding: 0; margin: 0.65rem 0 0;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .mvv-value-item {
          font-size: clamp(0.72rem, 1.3vw, 0.88rem);
          font-weight: 600;
          color: #ffffffff;
          line-height: 1.3;
          letter-spacing: 0.02em;
          padding: 0.35rem 0.8rem;
          border: 1px solid rgba(255, 242, 0, 0.25);
          border-radius: 6px;
          background: rgba(255, 242, 0, 0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: inline-block;
        }

        @media (max-width: 768px) {
          .mvv-values-grid {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 1fr;
          }
          .mvv-middle-col-layer {
            left: 0; right: 0; width: 100%;
            top: 33.333%; bottom: 33.333%; height: 33.333%;
          }
          .mvv-col-sep {
            right: auto; bottom: 0; top: auto;
            left: 0; width: 100%; height: 1px;
          }
          .mvv-slide-card { max-width: 90vw; }
          .mvv-ghost-label { display: none; }
        }
      `}</style>
    </section>
  );
}

function ValueCol({ val, showSep }: { val: typeof CORE_VALUES[0]; showSep: boolean }) {
  return (
    <div className="mvv-value-col">
      <img src={val.image} alt={val.category} className="mvv-bg-img" />
      <div
        className="mvv-scrim"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.30) 55%, transparent 100%)",
        }}
      />
      <div className="mvv-value-text">
        <div>
          <span className="mvv-eyebrow">
            {val.category}
          </span>
          <ul className="mvv-value-list">
            {val.titles.map((t, ti) => (
              <li
                key={t}
                className="mvv-value-item"
                style={{ opacity: ti === 0 ? 1 : 0.8 }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showSep && <div className="mvv-col-sep" />}
    </div>
  );
}

export default MissionVisionValues;