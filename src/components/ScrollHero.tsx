import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import supplyImg from "@/assets/ourexpert.jpg";
import grp1 from "@/assets/HeroGroups/2.jpg";
import grp2 from "@/assets/HeroGroups/photo_2026-06-04_09-09-38.jpg";
import grp3 from "@/assets/HeroGroups/img_2004.jpg";
import grp4 from "@/assets/HeroGroups/FullStore13.jpg";
import grp5 from "@/assets/HeroGroups/IMG_3651.jpg";
import grp6 from "@/assets/HeroGroups/teams.jpg";
import isoCert from "@/assets/iso-certificate.jpg";
import wholesaleCert from "@/assets/drogawholesalecertificate.jpg";

gsap.registerPlugin(ScrollTrigger);

const FS = 0.35;
const TOTAL_H = +(100 / FS).toFixed(3);
const SIDE_H = +((TOTAL_H - 100) / 2).toFixed(3);
const TOTAL_W = +(62 / FS).toFixed(3);
const SIDE_W = +((TOTAL_W - 100) / 2).toFixed(3);
const GAP = 8;
const GB = "#0d0d0d";
const YELLOW = "#FFF200";

// All hero images — preload so GPU has textures ready before scroll starts
const HERO_SRCS = [supplyImg, grp1, grp2, grp3, grp4, grp5, grp6];

// (Preload removed — delaying ScrollTrigger creation until network responses finish causes a massive scroll disconnect on initial load)

function Cell({
  style,
  imgSrc,
  fetchpriority,
}: {
  style: React.CSSProperties;
  imgSrc: string;
  fetchpriority?: "high" | "low" | "auto";
}) {
  return (
    <div style={{ position: "absolute", overflow: "hidden", backgroundColor: "#000", ...style }}>
      <img
        src={imgSrc}
        draggable={false}
        // Tell browser the decoded size ≈ its display size so it doesn't
        // keep the full-res bitmap in GPU memory during compositing.
        // These cells are displayed at ~30vw × ~30vh max.
        width={600}
        height={450}
        fetchPriority={fetchpriority ?? "auto"}
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          // Override the global `img { transition: opacity 500ms }` rule.
          transition: "none",
          // Use opacity instead of CSS filter: brightness() for huge performance gain
          opacity: 0.85,
        }}
      />
    </div>
  );
}

export default function ScrollHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const centerImgRef = useRef<HTMLImageElement>(null);
  const gridBgRef = useRef<HTMLDivElement>(null);
  const baseBgRef = useRef<HTMLDivElement>(null);

  // Yellow panel: now uses clipPath instead of scaleX so NO counter-scale
  // is needed and NO JS runs per scroll frame.
  const yellowPanelRef = useRef<HTMLDivElement>(null);
  const desc1Ref = useRef<HTMLDivElement>(null);
  const desc2Ref = useRef<HTMLDivElement>(null);
  const desc3Ref = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // We create the ScrollTrigger immediately so it perfectly syncs with the
    // user's scroll from frame 1. Delaying it behind an image preload causes
    // the scroll to feel disconnected or stuck on initial load.
    const ctx = gsap.context(() => {
      const wrap = wrapRef.current!;

      // Promote mosaic to its own GPU layer immediately
      gsap.set(mosaicRef.current, { z: 0, force3D: true });

        // ── Yellow panel: start clipped so only 38 vw shows on the right ──
        // clipPath inset(top right bottom left)
        // "62%" from the left = the leftmost 62vw is hidden, right 38vw is visible.
        // This exactly matches the original visual.
        // When we animate to inset(0 0 0 0%) the full panel is visible.
        // clipPath is compositor-only (no layout, no JS per frame).
        gsap.set(yellowPanelRef.current, {
          clipPath: "inset(0 0 0 62%)",
          force3D: true,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "bottom bottom",
            // scrub: 1.5 creates a 1.5-second smoothing lag.
            // This is CRITICAL for performance. It decouples the heavy GSAP
            // animation calculations from the browser's raw scroll events.
            // If the main thread drops a frame, the animation still glides
            // smoothly to the target instead of snapping/stuttering.
            scrub: 2,
          },
        });

        // ── 0→33: zoom out mosaic ──────────────────────────────────────────
        tl.fromTo(
          mosaicRef.current,
          { scale: 1, x: 0 },
          { scale: FS, x: "-19vw", ease: "none", duration: 33, force3D: true },
          0,
        );

        // desc swap
        tl.to(desc1Ref.current, { opacity: 0, ease: "power2.inOut", duration: 6 }, 24);
        tl.fromTo(
          desc2Ref.current,
          { opacity: 0 },
          { opacity: 1, ease: "power2.out", duration: 6 },
          27,
        );

        // ── 33→66: panel expand via clipPath ──────────────────────────────
        // Animating a percentage inset is pure compositor work —
        // zero layout reflow, zero JS per frame.
        tl.to(certsRef.current, { opacity: 0, ease: "power2.inOut", duration: 8 }, 35);

        tl.fromTo(
          yellowPanelRef.current,
          { clipPath: "inset(0 0 0 62%)" },
          {
            clipPath: "inset(0 0 0 0%)",
            ease: "power2.inOut",
            duration: 18,
            force3D: true,
          },
          38,
        );

        tl.to(desc2Ref.current, { opacity: 0, ease: "power2.inOut", duration: 6 }, 40);
        tl.fromTo(
          desc3Ref.current,
          { opacity: 0 },
          { opacity: 1, ease: "power2.out", duration: 8 },
          46,
        );
    });

    return () => ctx.revert();
  }, []);

  const headingStyle: React.CSSProperties = {
    fontSize: "clamp(3.5rem, 7vw, 7.5rem)",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 0.85,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    margin: 0,
  };

  return (
    <div ref={wrapRef} style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          ref={baseBgRef}
          style={{ position: "absolute", inset: 0, backgroundColor: GB }}
        />

        {/* ── Mosaic ── */}
        <div
          style={{
            position: "absolute",
            left: `calc(50% - ${(TOTAL_W / 2).toFixed(3)}vw)`,
            top: `calc(50% - ${(TOTAL_H / 2).toFixed(3)}vh)`,
            width: `${TOTAL_W}vw`,
            height: `${TOTAL_H}vh`,
            zIndex: 10,
          }}
        >
          <div
            ref={mosaicRef}
            style={{
              position: "absolute",
              inset: 0,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <div
              ref={gridBgRef}
              style={{ position: "absolute", inset: 0, backgroundColor: GB }}
            >
              <Cell
                imgSrc={grp1}
                fetchpriority="high"
                style={{
                  left: 0,
                  top: 0,
                  width: `calc(50% - ${GAP / 2}px)`,
                  height: `calc(${SIDE_H}vh - ${GAP}px)`,
                }}
              />
              <Cell
                imgSrc={grp2}
                fetchpriority="high"
                style={{
                  right: 0,
                  top: 0,
                  width: `calc(50% - ${GAP / 2}px)`,
                  height: `calc(${SIDE_H}vh - ${GAP}px)`,
                }}
              />
              <Cell
                imgSrc={grp5}
                style={{
                  left: 0,
                  top: `${SIDE_H}vh`,
                  width: `calc(${SIDE_W}vw - ${GAP}px)`,
                  height: "100vh",
                }}
              />
              <Cell
                imgSrc={grp6}
                style={{
                  right: 0,
                  top: `${SIDE_H}vh`,
                  width: `calc(${SIDE_W}vw - ${GAP}px)`,
                  height: "100vh",
                }}
              />
              <Cell
                imgSrc={grp3}
                style={{
                  left: 0,
                  bottom: 0,
                  width: `calc(50% - ${GAP / 2}px)`,
                  height: `calc(${SIDE_H}vh - ${GAP}px)`,
                }}
              />
              <Cell
                imgSrc={grp4}
                style={{
                  right: 0,
                  bottom: 0,
                  width: `calc(50% - ${GAP / 2}px)`,
                  height: `calc(${SIDE_H}vh - ${GAP}px)`,
                }}
              />
            </div>

            <div
              style={{
                position: "absolute",
                zIndex: 2,
                left: `${SIDE_W}vw`,
                top: `${SIDE_H}vh`,
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
                width={1200}
                height={800}
                fetchPriority="high"
                decoding="async"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transform: "scale(1.12) translateY(-30px)",
                  display: "block",
                  transition: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 75%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ══ YELLOW PANEL
            Uses clipPath instead of scaleX — no counter-scale wrapper needed,
            no JS runs per scroll frame, pure compositor animation.
            Panel is full 100vw; clipPath hides the left portion until revealed.
        ══ */}
        <div
          ref={yellowPanelRef}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100vw",
            height: "100%",
            backgroundColor: YELLOW,
            zIndex: 20,
            willChange: "clip-path",
            overflow: "hidden",
            clipPath: "inset(0 0 0 62%)",
          }}
        >
          {/* ── Inner content wrapper — same layout as original ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "38vw",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 3vw 6vh",
            }}
          >
            <div style={{ position: "relative", minHeight: "18rem", flexShrink: 0 }}>
              <div ref={desc1Ref} style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                <p
                  style={{
                    color: "#000",
                    fontSize: "clamp(1.2rem, 1.6vw, 1.8rem)",
                    lineHeight: 1.4,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    maxWidth: "95%",
                  }}
                >
                  Highly experienced pharmacists and manufacturing industry professionals that drive
                  our partners' success.
                </p>
              </div>

              <div
                ref={desc2Ref}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0 }}
              >
                <p
                  style={{
                    color: "#000",
                    fontSize: "clamp(1.2rem, 1.6vw, 1.8rem)",
                    lineHeight: 1.4,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    maxWidth: "95%",
                  }}
                >
                  WHO-approved products from globally certified manufacturers ensuring the highest
                  standards.
                </p>
              </div>

              <div
                ref={desc3Ref}
                style={{ position: "absolute", top: "5rem", left: 0, right: 0, opacity: 0 }}
              >
                <p
                  style={{
                    color: "#000",
                    fontSize: "clamp(1.2rem, 1.6vw, 1.8rem)",
                    lineHeight: 1.4,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    maxWidth: "95%",
                  }}
                >
                  Droga Pharma Pvt.Ltd Co. is a private limited company based in Addis Ababa,
                  Ethiopia, aiming on sustainable supply of quality medicines, sutures, orthopedic
                  implants and medical devices.
                </p>
              </div>
            </div>

            <div
              ref={certsRef}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "60px",
                marginTop: "2rem",
                width: "100%",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {[
                { src: isoCert, label: "ISO / Import" },
                { src: wholesaleCert, label: "Wholesale License" },
              ].map((cert) => (
                <Link
                  to="/about"
                  key={cert.label}
                  className="group"
                  style={{
                    width: "200px",
                    position: "relative",
                    cursor: "pointer",
                    overflow: "hidden",
                    display: "block",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <img
                    src={cert.src}
                    alt={cert.label}
                    width={400}
                    height={400}
                    decoding="async"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  {/* White gradient at the bottom so the black plus sign is visible */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "44px",
                      background: "linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="1.5"
                    className="transition-transform duration-300 group-hover:rotate-90"
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      width: "24px",
                      height: "24px",
                      zIndex: 2,
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Phase-3 full-width black text overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100vw",
              height: "100%",
              pointerEvents: "none",
              zIndex: 35,
            }}
          >
            <div style={{ position: "absolute", left: "4vw", bottom: "6vh" }}>
              <p
                style={{
                  color: "#000",
                  fontSize: "clamp(1.5rem, 2.5vw, 3rem)",
                  fontWeight: 700,
                  textTransform: "none",
                  margin: 0,
                  marginBottom: "1.25rem",
                }}
              >
                Droga Pharma
              </p>
              <h1
                style={{
                  ...headingStyle,
                  color: "#000",
                  letterSpacing: "-0.05em",
                }}
              >
                <span style={{ display: "block" }}>Serving The</span>
                <span style={{ display: "block" }}>People !</span>
              </h1>
            </div>
          </div>
        </div>

        {/* White text overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100vw",
            height: "100%",
            zIndex: 15,
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "absolute", left: "4vw", bottom: "6vh" }}>
            <p
              style={{
                color: "#fff",
                fontSize: "clamp(1.5rem, 2.5vw, 3rem)",
                fontWeight: 700,
                textTransform: "none",
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              Droga Pharma
            </p>
            <h1
              style={{
                ...headingStyle,
                letterSpacing: "-0.05em",
              }}
            >
              <span style={{ display: "block" }}>Serving The</span>
              <span style={{ display: "block" }}>People !</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}