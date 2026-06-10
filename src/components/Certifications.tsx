import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";
import isoCert from "../assets/iso-certificate.jpg";
import wholesaleCert from "../assets/drogawholesalecertificate.jpg";

const certs = [
  { id: "iso", src: isoCert, alt: "ISO Certification", label: "ISO / Import" },
  { id: "wholesale", src: wholesaleCert, alt: "Droga Wholesale Certificate", label: "Wholesale License" },
];

const Certifications = () => {
  const [active, setActive] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const leftY = useTransform(scrollYProgress, [0, 0.4], ["100vh", "0vh"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const rightY = useTransform(scrollYProgress, [0.45, 0.85], ["100vh", "0vh"]);
  const rightOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeCert = certs.find((c) => c.id === active);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: "300vh" }}
        aria-labelledby="cert-heading"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

          {/* Title — z-10, cards will render above it at z-20 */}
          <div className="pointer-events-none flex flex-col items-center z-10 relative">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-black/40 mb-3">
              Certifications
            </span>
            <h2
              id="cert-heading"
              className="font-display text-5xl md:text-6xl font-bold text-slate-900 tracking-tight text-center"
            >
              ISO Certificates
            </h2>
          </div>

          {/* Blur overlay — sits above title but below cards */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            animate={{
              backdropFilter: hoveredId ? "blur(12px)" : "blur(0px)",
              backgroundColor: hoveredId ? "rgba(235,235,235,0.5)" : "rgba(235,235,235,0)",
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Cards — z-30, always above blur and title */}
          <div className="absolute inset-0 flex items-center justify-center gap-16 md:gap-40 lg:gap-64 px-6 z-30">
            {certs.map((cert, i) => {
              const isHovered = hoveredId === cert.id;
              const isOther = hoveredId !== null && !isHovered;
              const yMotion = i === 0 ? leftY : rightY;
              return (
                <motion.div
                  key={cert.id}
                  style={{ y: yMotion, opacity: 100 }}
                  animate={{
                    scale: isHovered ? 1.5 : 1,
                    x: isHovered
                      ? i === 0
                        ? "35%"   // left card shifts right toward center
                        : "-35%"  // right card shifts left toward center
                      : "0%",
                    filter: isOther ? "blur(4px)" : "blur(0px)",
                    zIndex: isHovered ? 40 : 30,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onHoverStart={() => setHoveredId(cert.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => setActive(cert.id)}
                  className="relative w-[180px] md:w-[240px] lg:w-[360px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.18)] cursor-zoom-in bg-white border border-black/5"
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${cert.label}`}
                  onKeyDown={(e) => e.key === "Enter" && setActive(cert.id)}
                >
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="block w-full h-auto object-cover"
                  />
                  <div className="px-3 py-2.5">
                    <p className="text-[10px] md:text-xs font-semibold tracking-[0.1em] uppercase text-slate-500">
                      {cert.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && activeCert && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backdropFilter: "blur(10px)", background: "rgba(0,0,0,0.55)" }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 16 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.28)] max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close certificate"
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-black/70" />
              </button>
              <img
                src={activeCert.src}
                alt={activeCert.alt}
                className="block w-full h-auto object-contain"
              />
              <div className="px-5 py-3 border-t border-slate-100">
                <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400">
                  {activeCert.label}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certifications;