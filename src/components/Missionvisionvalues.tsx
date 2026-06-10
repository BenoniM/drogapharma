import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDES = [
  {
    id: "mission",
    label: "Our Mission",
    text: "We build ethical companies that provide quality products and services by our talented members to serve humanity and contribute to socio economic development.",
    image: "https://images.pexels.com/photos/9301292/pexels-photo-9301292.jpeg",
  },
  {
    id: "vision",
    label: "Our Vision",
    text: "To be the leading group company in Ethiopia that creates health and wealth for human being.",
    image: "https://images.pexels.com/photos/1331386/pexels-photo-1331386.jpeg",
  },
];

const TOTAL_STEPS = 1;

export function MissionVisionValues() {
  const sectionRef     = useRef<HTMLElement>(null);
  const slideLayerRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        }
        return `inset(${topClip}% 0 ${bottomClip}% 0)`;
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
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mvv-section"
      aria-label="Mission and Vision"
      style={{ height: `${(TOTAL_STEPS + 1) * 100}vh` }}
    >
      <div className="mvv-sticky">
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
        @media (max-width: 768px) {
          .mvv-slide-card { max-width: 90vw; }
        }
      `}</style>
    </section>
  );
}

export default MissionVisionValues;