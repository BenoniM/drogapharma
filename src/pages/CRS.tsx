import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Clock, ChevronRight } from "lucide-react";

const crsImageModules = import.meta.glob(
  "@/assets/crs/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" }
) as Record<string, string>;

const initiatives = Object.entries(crsImageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image]) => {
    const filename = path.split("/").pop() ?? "";
    const title = filename.replace(/\.[^.]+$/, "");
    return {
      category: "Community",
      title,
      description: `${title} activity under our CRS program.`,
      image,
      readTime: "4min Read",
      gallery: [image, image, image, image],
    };
  });

export default function CRS() {
  const [selected, setSelected] = useState<(typeof initiatives)[0] | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>
      {/* Header */}
      <section className="relative bg-[#111317] pt-40 pb-48 overflow-hidden">
        {/* Subtle curved lines background element (matching image) */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
            <style>
              {`
                .anim-bg-text {
                  fill: rgba(0, 0, 0, 0);
                  stroke: #FFF200;
                  stroke-width: 2px;

                  /* Long visible line + long gap */
                  stroke-dasharray: 3000 1000;

                  /* Smooth infinite movement */
                  animation: strokeDashBg 20s linear infinite;

                  opacity: 0.55;

                  filter:
                    drop-shadow(0 0 6px rgba(255,242,0,0.7))
                    drop-shadow(0 0 16px rgba(255,242,0,0.4));
                }

                @keyframes strokeDashBg {
                  from {
                    stroke-dashoffset: 0;
                  }
                  to {
                    /* -(3000 + 1000) */
                    stroke-dashoffset: -4000;
                  }
                }
              `}
            </style>

            <svg
              className="absolute w-full h-full"
              viewBox="0 0 1600 300"
              preserveAspectRatio="xMidYMid meet"
            >
              <text
                x="200%"
                y="-50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="anim-bg-text uppercase"
                style={{
                  fontSize: "90rem",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                }}
              >
                CHARITY
              </text>
            </svg>
          </div>
        
        <div className="container-wide relative z-10 px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="flex flex-col">
              <span className="section-label text-primary block mb-4">CRS</span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
              >
                Charities and<br />Foundations
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-sm"
            >
              <p className="text-white font-medium text-lg leading-relaxed">
                Our corporate social responsibility work focuses on health,
                education, community support, and sustainable access across the
                ecosystems we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image overlapping the hero - moved to right edge */}
      <section className="relative z-20 pl-4 md:pl-8 pr-0 -mt-24 mb-16 w-full md:w-[90%] lg:w-[85%] ml-auto">
        <div className="w-full h-[250px] md:h-[400px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
          <img src={initiatives[0]?.image || "https://images.unsplash.com/photo-1593113589914-075568e09f58?auto=format&fit=crop&w=1200"} alt="Charity" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Card Grid */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {initiatives.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                onClick={() => setSelected(item)}
                className="relative bg-black/5 p-6 cursor-pointer group hover:bg-black hover:text-white transition-colors duration-300 flex flex-col h-full border-2 border-transparent hover:border-black"
              >
                <div className="flex justify-between items-start mb-6 gap-4">
                  <h3 className="font-bold text-[16px] leading-snug w-3/4 group-hover:text-white transition-colors capitalize">{item.title}</h3>
                  <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-black bg-white px-2 py-1.5 uppercase tracking-widest border border-black/10 group-hover:border-transparent group-hover:text-black shrink-0">
                    {item.category}
                  </div>
                </div>

                <div className="w-full relative flex items-center justify-center mb-8 overflow-hidden bg-white aspect-[4/3] border border-black/5 group-hover:border-white/20 p-2 md:p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-auto pt-5 border-t-2 border-black/10 group-hover:border-white/20 flex justify-between items-end">
                  <div className="text-right text-black group-hover:text-white">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Side Panel Overlay */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 40,
              }}
            />

            {/* Panel */}
            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(640px, 100vw)",
                background: "#ffffff",
                zIndex: 50,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "#000000",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <X size={18} color="#ffffff" />
              </button>

              {/* Panel Content */}
              <div style={{ padding: "56px 52px 0", textAlign: "center" }}>
                {/* Category pill */}
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 18px",
                    borderRadius: 999,
                    background: "#FFF200",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#000000",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {selected.category}
                </span>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    fontWeight: 700,
                    color: "#000000",
                    margin: "20px 0 10px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {selected.title}
                </h2>

                {/* Read time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    color: "rgba(0,0,0,0.45)",
                    fontSize: "0.85rem",
                    marginBottom: 28,
                  }}
                >
                  <Clock size={13} />
                  {selected.readTime}
                </div>

                {/* Gallery thumbnails */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {selected.gallery.slice(0, 3).map((img, i) => (
                    <div
                      key={i}
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: 8,
                        overflow: "hidden",
                        border: i === 0 ? "2.5px solid #FFF200" : "2px solid rgba(0,0,0,0.12)",
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      {i === 2 && selected.gallery.length > 3 && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFF200",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                          }}
                        >
                          +{selected.gallery.length - 3}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* View gallery link */}
                <a
                  href="#"
                  style={{
                    display: "inline-block",
                    fontSize: "0.85rem",
                    color: "#000000",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                    marginBottom: 28,
                  }}
                >
                  View gallery
                </a>

                {/* Keep Reading cta */}
                <div style={{ marginBottom: 24 }}>
                  <a
                    href="#panel-body"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "0.85rem",
                      color: "rgba(0,0,0,0.45)",
                      textDecoration: "none",
                    }}
                  >
                    Keep Reading ↓
                  </a>
                </div>
              </div>

              {/* Hero image */}
              <div style={{ width: "100%", flexShrink: 0 }}>
                <img
                  src={selected.image}
                  alt={selected.title}
                  style={{ width: "100%", display: "block", objectFit: "cover" }}
                />
              </div>

              {/* Body text */}
              <div id="panel-body" style={{ padding: "36px 52px 60px" }}>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: "rgba(0,0,0,0.65)",
                    margin: 0,
                  }}
                >
                  {selected.description} Learn more about the impact this
                  initiative has had on the communities we serve and how our
                  ongoing commitment to social responsibility drives meaningful
                  change at every level.
                </p>

                <a
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 28,
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#000000",
                    textDecoration: "none",
                    background: "#FFF200",
                    padding: "10px 20px",
                    borderRadius: 4,
                  }}
                >
                  Learn more <ChevronRight size={14} />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}