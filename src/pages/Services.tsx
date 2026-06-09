import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import {
  Truck, Search, Shield, Thermometer, Package, FileCheck, FlaskConical,
} from "lucide-react";
import heroBgOne from "@/assets/herobg/2.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import supplyImg from "@/assets/supply-chain.jpg";

const services = [
  {
    icon: Truck,
    tag: "Import",
    title: "Pharmaceutical Import",
    desc: "End-to-end pharmaceutical importation from source countries to Ethiopia, handling every customs and logistics touchpoint.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80",
  },
  {
    icon: Search,
    tag: "Sourcing",
    title: "Supplier Sourcing",
    desc: "Strategic identification and vetting of WHO-approved pharmaceutical manufacturers worldwide.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
  },
  {
    icon: Shield,
    tag: "Compliance",
    title: "Regulatory Compliance",
    desc: "Complete regulatory support for EFDA product registration, licensing, and ongoing compliance monitoring.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1400&q=80",
  },
  {
    icon: Thermometer,
    tag: "Cold Chain",
    title: "Cold Chain Logistics",
    desc: "Temperature-controlled supply chain maintaining 2–8°C integrity for heat-sensitive pharmaceuticals end to end.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1400&q=80",
  },
  {
    icon: Package,
    tag: "Distribution",
    title: "Wholesale Distribution",
    desc: "Nationwide wholesale distribution serving hospitals, pharmacies, and clinics with reliable, flexible ordering.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=80",
  },
  {
    icon: FileCheck,
    tag: "Quality",
    title: "Quality Assurance",
    desc: "Rigorous quality control including batch verification, shelf-life management, and anti-counterfeit measures.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1400&q=80",
  },
  {
    icon: FlaskConical,
    tag: "R&D",
    title: "Research & Development",
    desc: "Innovative R&D initiatives developing cutting-edge pharmaceutical solutions through clinical trials and scientific research.",
    image: "https://images.unsplash.com/photo-1581093577421-f561a654a353?w=1400&q=80",
  },
];

const PANEL_HEIGHT = 100; // vh per service step

function ServicesScroll() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Total scroll height = one viewport per service
  const totalVh = services.length * PANEL_HEIGHT;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Which service is active based on scroll position
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        services.length - 1,
        Math.floor(v * services.length)
      );
      setActiveIndex(idx);
    });
    return unsub;
  }, [scrollYProgress]);

  // Image stack: each image's vertical position within the clip window
  // goes from 100% (below) to 0% (fully revealed) as its turn comes
  const service = services[activeIndex];
  const Icon = service.icon;

  return (
    <div
      ref={sectionRef}
      style={{ height: `${totalVh}vh`, position: "relative" }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 44% 1fr",
          background: "#f5f5f5",
          overflow: "hidden",
        }}
      >
        {/* LEFT: tag + icon + title */}
        <div
          style={{
            padding: "3.5rem 2rem 3.5rem 3.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: "calc(50vh - 7rem)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex + "-left"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.35)",
                  marginBottom: "1.25rem",
                }}
              >
                {service.tag}
              </span>

              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid rgba(0,0,0,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <Icon size={17} color="black" />
              </div>

              <h2
                className="font-display font-bold text-black"
                style={{
                  fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)",
                  lineHeight: 1.15,
                  maxWidth: "14rem",
                }}
              >
                {service.title}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER: image clip window — images slide up from bottom */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            margin: "3rem 0",
          }}
        >
          {services.map((s, i) => (
            <motion.img
              key={i}
              src={s.image}
              alt={s.title}
              loading={i === 0 ? "eager" : "lazy"}
              animate={{
                y: i < activeIndex ? "-100%" : i === activeIndex ? "0%" : "100%",
              }}
              transition={{
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ))}
        </div>

        {/* RIGHT: description */}
        <div
          style={{
            padding: "3.5rem 3.5rem 3.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: "calc(50vh - 4rem)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex + "-right"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "rgba(0,0,0,0.52)",
                maxWidth: "18rem",
              }}
            >
              {service.desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const Services = () => {
  return (
    <PageTransition>
      <div>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20 bg-foreground">
          <ImageSlider
            images={[
              { src: heroBgOne, alt: "Services" },
              { src: heroBgTwo, alt: "Supply chain" },
              { src: heroBgThree, alt: "Healthcare" },
            ]}
            className="absolute inset-0 z-0"
          />
          <div
            className="absolute inset-0 z-[5]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.75) 100%)",
            }}
          />
          <div className="container-narrow relative z-[6] w-full">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label text-primary block mb-4">What We Do</span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
                Services
              </h1>
              <p className="text-background/55 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
                Complete pharmaceutical supply chain solutions for the Ethiopian market.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro line */}
        <section
          className="bg-[#f5f5f5] py-16"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div className="container-narrow">
            <ScrollReveal>
              <p className="text-black text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
                From international sourcing to last-mile delivery, we provide
                comprehensive pharmaceutical supply chain solutions.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Scroll-driven services */}
        <ServicesScroll />

        {/* End banner */}
        <section className="relative h-[450px]">
          <ImageSlider
            images={[
              { src: supplyImg, alt: "Supply" },
              { src: warehouseImg, alt: "Warehouse" },
            ]}
            className="h-full"
            overlay
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <ScrollReveal>
              <div className="text-center px-6">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-background">
                  End-to-End Supply Chain
                </h2>
                <p className="text-background/60 mt-4 max-w-lg mx-auto text-lg">
                  From manufacturer to patient, we ensure quality at every step.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Process */}
        <section className="bg-primary section-padding-lg">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/60 block mb-3">
                  How It Works
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2">
                  Our Import Process
                </h2>
              </div>
            </ScrollReveal>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {[
                { step: "01", title: "Sourcing", desc: "Identify WHO-approved manufacturers" },
                { step: "02", title: "Procurement", desc: "Negotiate terms and place orders" },
                { step: "03", title: "Import & Clearance", desc: "Handle shipping and customs" },
                { step: "04", title: "Distribution", desc: "Deliver to healthcare providers" },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                  >
                    <div className="font-display text-5xl font-bold text-primary-foreground/25 mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-primary-foreground/60 text-sm">{item.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Services;