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
      <section style={{ padding: "64px 0 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.15)", paddingTop: 32, marginBottom: 40 }} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "#000000",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Charities and Foundations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: 16,
              fontSize: "1.05rem",
              color: "rgba(0,0,0,0.55)",
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            Our corporate social responsibility work focuses on health,
            education, community support, and sustainable access across the
            ecosystems we serve.
          </motion.p>
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
                style={{
                  background: "#ffffff",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.07)",
                  padding: "12px 12px 0 12px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image with overlay badge */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    background: "#000000",
                    position: "relative",
                    borderRadius: 2,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLImageElement).style.transform = "scale(1.03)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLImageElement).style.transform = "scale(1)")
                    }
                  />
                  {/* Title overlay badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "#ffffff",
                      color: "#000000",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      padding: "5px 12px",
                      borderRadius: 2,
                      letterSpacing: "0.01em",
                      textTransform: "capitalize",
                      whiteSpace: "nowrap",
                      maxWidth: "calc(100% - 24px)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </div>
                </div>

                {/* Polaroid bottom: title + arrow */}
                <div
                  style={{
                    padding: "18px 4px 16px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    minHeight: 80,
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "#000000",
                      margin: 0,
                      letterSpacing: "-0.01em",
                      textTransform: "capitalize",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h2>
                  <div
                    style={{
                      flexShrink: 0,
                      marginLeft: 12,
                      color: "#000000",
                      fontSize: "1.1rem",
                      lineHeight: 1,
                    }}
                  >
                    →
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* More News button */}
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 28px",
                border: "1.5px solid #000000",
                borderRadius: 32,
                background: "transparent",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#000000",
                cursor: "pointer",
              }}
            >
              More News <ArrowRight size={14} />
            </button>
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