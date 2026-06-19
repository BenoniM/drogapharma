import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Clock, ChevronRight } from "lucide-react";

const crsImageModules = import.meta.glob(
  "@/assets/crs/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" }
) as Record<string, string>;

const CSR_CATEGORIES = ["Environment", "Education", "Health", "Community", "Philanthropy"];

const initiatives = Object.entries(crsImageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image], index) => {
    const filename = path.split("/").pop() ?? "";
    const rawTitle = filename.replace(/\.[^.]+$/, "");
    const title = rawTitle
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      category: CSR_CATEGORIES[index % CSR_CATEGORIES.length],
      title,
      description: [
        `${title} stands as one of the cornerstone initiatives within our Corporate Social Responsibility program, reflecting a deliberate, ongoing investment in the wellbeing of the communities we serve.`,
        `Through ${title}, we work directly alongside local communities to identify pressing needs and respond with solutions that are practical, sustainable, and built to last well beyond a single project cycle.`,
        `Looking ahead, our commitment to expanding ${title} and initiatives like it remains central to how we define corporate responsibility — not as an obligation to be fulfilled, but as a promise we intend to keep.`,
      ],
      image,
      readTime: "4 min read",
      gallery: [image, image, image, image],
    };
  });

export default function CRS() {
  const [selected, setSelected] = useState<(typeof initiatives)[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterOptions = ["All", ...CSR_CATEGORIES];
  const filteredInitiatives =
    activeFilter === "All"
      ? initiatives
      : initiatives.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>

      {/* Header */}
      <section className="page-hero-section">
        <div className="absolute top-0 left-0 w-full h-[55%] pointer-events-none overflow-hidden flex items-center justify-center">
          <style>
            {`
              .anim-bg-text {
                fill: rgba(0, 0, 0, 0);
                stroke: #000;
                stroke-width: 2px;
                stroke-dasharray: 3000 1000;
                animation: strokeDashBg 20s linear infinite;
                opacity: 0.55;
                
              }
              @keyframes strokeDashBg {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: -4000; }
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
              style={{ fontSize: "90rem", fontWeight: 900, letterSpacing: "-0.04em" }}
            >
              CHARITY
            </text>
          </svg>
        </div>

          {/* Title pinned to top of hero */}
          <div className="absolute top-[140px] md:top-[255px] left-0 right-0 z-10 px-4 lg:px-12 xl:px-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-black text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
            >
              Charities and<br />Foundations
            </motion.h1>
          </div>

          {/* Description aligned with title on desktop */}
          <div className="w-full relative md:absolute md:top-[235px] z-10 px-4 lg:px-12 xl:px-16 pointer-events-none">
            <div className="flex justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm pointer-events-auto md:pt-6 lg:pt-10"
              >
                <p className="text-black font-normal text-lg leading-relaxed">
                  Our corporate social responsibility work focuses on health,
                  education, community support, and sustainable access across the
                  ecosystems we serve.
                </p>
              </motion.div>
            </div>
          </div>
      </section>

      {/* Image overlapping the hero */}
      <section className="relative z-20 pl-4 lg:pl-12 xl:pl-16 pr-0 -mt-24 mb-16 w-full md:w-[90%] lg:w-[85%] ml-auto">
        <div className="w-full h-[250px] md:h-[400px] overflow-hidden relative bg-black">
          <img
            src={initiatives[0]?.image || "https://images.unsplash.com/photo-1593113589914-075568e09f58?auto=format&fit=crop&w=1200"}
            alt="Charity"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Card Grid */}
      <section style={{ paddingBottom: 80 }}>
        <div className="w-full mx-auto px-4 lg:px-12 xl:px-16">
          <div className="flex flex-wrap gap-3 mb-10">
            {filterOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${
                  activeFilter === cat
                    ? "bg-[#FFF200] border-[#FFF200] text-black"
                    : "bg-zinc-100 text-black hover:bg-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredInitiatives.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                onClick={() => setSelected(item)}
                className="relative cursor-pointer group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="font-display font-bold text-xl leading-snug text-black capitalize group-hover:scale-105 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <div className="text-black group-hover:text-[#FFF200] transition-colors shrink-0">
                    <ArrowRight size={24} className="-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>

                <div className="w-full relative flex items-center justify-center overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
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
                width: "min(840px, 100vw)",
                background: "#ffffff",
                zIndex: 50,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center bg-black text-white hover:bg-[#FFF200] hover:text-black transition-colors duration-300 z-10 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div style={{ padding: "56px 52px 0", textAlign: "center" }}>
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

                <h2
                  className="font-display capitalize"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    fontWeight: 700,
                    color: "#000000",
                    margin: "20px 0 28px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {selected.title}
                </h2>

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
                        overflow: "hidden",
                        background: i === 0 ? "#FFF200" : "#f0f0f0",
                        padding: i === 0 ? 2.5 : 0,
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
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

                {/* Fixed missing <a> tags below */}
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
              </div>

              <div style={{ width: "100%", flexShrink: 0 }}>
                <img
                  src={selected.image}
                  alt={selected.title}
                  style={{ width: "100%", display: "block", objectFit: "cover" }}
                />
              </div>

              <style>
                {`
                  .crs-article p { hyphens: auto; }
                  .crs-dropcap::first-letter {
                    font-weight: 800;
                    font-size: 3.2em;
                    line-height: 0.78;
                    float: left;
                    margin: 0.04em 0.09em -0.05em 0;
                    color: #000000;
                  }
                `}
              </style>

              <div
                id="panel-body"
                className="crs-article"
                style={{ padding: "36px 52px 60px", maxWidth: 760, margin: "0 auto" }}
              >

                {selected.description.map((paragraph, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "crs-dropcap" : undefined}
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.8,
                      color: "rgba(0,0,0,0.7)",
                      margin: i === 0 ? 0 : "22px 0 0",
                      textIndent: i === 0 ? 0 : "2em",
                      textAlign: "justify",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-7 text-[0.875rem] font-bold text-black no-underline bg-[#FFF200] px-5 py-2.5 transition-colors duration-300 hover:bg-black hover:text-white"
                >
                  Contact Us <ChevronRight size={14} />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}