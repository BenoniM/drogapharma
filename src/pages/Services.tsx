import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import {
  Truck, Search, Shield, Thermometer, Package, FileCheck, FlaskConical,
} from "lucide-react";
import heroBgOne from "@/assets/Gallery/498619240_1145316644300791_4232051411002959692_n.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import supplyImg from "@/assets/supply-chain.jpg";

const services = [
  {
    icon: Truck,
    tag: "Import",
    title: "Pharmaceutical Import",
    desc: "End-to-end pharmaceutical importation from source countries to Ethiopia, handling every customs and logistics touchpoint.",
    image: "https://images.pexels.com/photos/19497086/pexels-photo-19497086.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Search,
    tag: "Sourcing",
    title: "Supplier Sourcing",
    desc: "Strategic identification and vetting of WHO-approved pharmaceutical manufacturers worldwide.",
    image: "https://images.pexels.com/photos/14554082/pexels-photo-14554082.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Shield,
    tag: "Compliance",
    title: "Regulatory Compliance",
    desc: "Complete regulatory support for EFDA product registration, licensing, and ongoing compliance monitoring.",
    image: "https://images.pexels.com/photos/9870220/pexels-photo-9870220.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Thermometer,
    tag: "Cold Chain",
    title: "Cold Chain Logistics",
    desc: "Temperature-controlled supply chain maintaining 2–8°C integrity for heat-sensitive pharmaceuticals end to end.",
    image: "https://images.pexels.com/photos/27099094/pexels-photo-27099094.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Package,
    tag: "Distribution",
    title: "Wholesale Distribution",
    desc: "Nationwide wholesale distribution serving hospitals, pharmacies, and clinics with reliable, flexible ordering.",
    image: "https://images.pexels.com/photos/32865457/pexels-photo-32865457.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: FileCheck,
    tag: "Quality",
    title: "Quality Assurance",
    desc: "Rigorous quality control including batch verification, shelf-life management, and anti-counterfeit measures.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
  },
  {
    icon: FlaskConical,
    tag: "R&D",
    title: "Research & Development",
    desc: "Innovative R&D initiatives developing cutting-edge pharmaceutical solutions through clinical trials and scientific research.",
    image: "https://images.pexels.com/photos/8851630/pexels-photo-8851630.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

// ─── Responsive helper ─────────────────────────────────────────────────────

const MOBILE_BREAKPOINT = 768; // matches Tailwind's `md`

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const PANEL_HEIGHT_DESKTOP = 100; // vh per panel on desktop
const PANEL_HEIGHT_MOBILE = 70;   // vh per panel on mobile (shorter image, less scroll distance)
const MOBILE_IMAGE_HEIGHT = "45vh"; // decreased image height on mobile

function ServicesScroll() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const panelHeight = isMobile ? PANEL_HEIGHT_MOBILE : PANEL_HEIGHT_DESKTOP;
  const totalVh = services.length * panelHeight;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.round(v * (services.length - 1));
      setActiveIndex(idx);
    });
    return unsub;
  }, [scrollYProgress]);

  const service = services[activeIndex];
  const Icon = service.icon;

  // On mobile, each "page" of the stacked images is MOBILE_IMAGE_HEIGHT tall
  // (not 100vh like desktop), so the translateY distance is computed from that.
  const mobileImageY = useTransform(
    scrollYProgress,
    [0, 1],
    [`0vh`, `-${(services.length - 1) * parseFloat(MOBILE_IMAGE_HEIGHT)}vh`]
  );

  if (isMobile) {
    return (
      <div ref={sectionRef} style={{ height: `${totalVh}vh`, position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          {/* Top text block (same content/role as desktop's left column) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex + "-top"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: "1.25rem" }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.9)",
                  marginBottom: "0.75rem",
                }}
              >
                {service.tag}
              </span>
              <div
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: "#FFF200",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <Icon size={16} color="black" />
              </div>
              <h2
                className="font-display font-bold text-black"
                style={{
                  fontSize: "1.5rem",
                  lineHeight: 1.15,
                }}
              >
                {service.title}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Centered, shortened image stack — same distribute/scroll pattern as desktop, just shorter, no wrapping box */}
          <div style={{ position: "relative", width: "100%", height: MOBILE_IMAGE_HEIGHT, overflow: "hidden" }}>
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                y: mobileImageY,
              }}
            >
              {services.map((s, i) => (
                <div
                  key={i}
                  style={{
                    height: MOBILE_IMAGE_HEIGHT,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom text block (same content/role as desktop's right column) */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex + "-bottom"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.65,
                color: "rgba(0,0,0,0.52)",
                marginTop: "1.25rem",
              }}
            >
              {service.desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ── Desktop layout (unchanged) ──
  return (
    <div ref={sectionRef} style={{ height: `${totalVh}vh`, position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 44% 1fr",
          overflow: "hidden",
        }}
      >
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
                  color: "rgba(0,0,0,0.9)",
                  marginBottom: "1.25rem",
                }}
              >
                {service.tag}
              </span>
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#FFF200",
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

        <div style={{ position: "relative", height: "100vh", width: "100%" }}>
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              y: useTransform(scrollYProgress, [0, 1], ["0vh", `-${(services.length - 1) * 100}vh`]),
            }}
          >
            {services.map((s, i) => (
              <div
                key={i}
                style={{
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem 0"
                }}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

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

// ─── How It Works ─────────────────────────────────────────────────────────────

const steps = [
  { step: "01", title: "Sourcing", desc: "Identify WHO-approved manufacturers" },
  { step: "02", title: "Procurement", desc: "Negotiate terms and place orders" },
  { step: "03", title: "Import & Clearance", desc: "Handle shipping and customs" },
  { step: "04", title: "Distribution", desc: "Deliver to healthcare providers" },
];

function HowItWorksBlind() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    // ── Entrance: slide in from right, staggered ──
    const reset = () => gsap.set(cards, { xPercent: 110 });
    const play = () =>
      gsap.to(cards, {
        xPercent: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
      });

    reset();

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => { reset(); play(); },
      onEnterBack: () => { reset(); play(); },
    });

    // ── Per-card hover + parallax ──
    cards.forEach((card, index) => {
      if (!card) return;
      const isOdd = index % 2 === 0; // 0,2 = white reveal; 1,3 = black reveal
      const content = card.querySelector<HTMLElement>('.hiw-content');
      const textEls = card.querySelectorAll<HTMLElement>('.hiw-text');

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(content, {
          x: x * 20,
          y: y * 20,
          rotateX: -y * 8,
          rotateY: x * 8,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      };

      card.addEventListener('mousemove', onMove);
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
}

// ─── Page ────────────────────────────────────────────────────────────────────

const Services = () => {
  return (
    <PageTransition>
      <div>
        {/* Dark Hero Section */}
        <section className="page-hero-section">
          <div className="absolute top-[40px] md:top-0 left-0 w-full h-[55%] pointer-events-none overflow-hidden flex items-center justify-center">
            <style>
              {`
                .anim-bg-text {
                  fill: rgba(0, 0, 0, 0);
                  stroke: #000;
                  stroke-width: 5px;

                  /* Long visible line + long gap */
                  stroke-dasharray: 3000 1000;

                  /* Smooth infinite movement */
                  animation: strokeDashBg 20s linear infinite;

                  opacity: 0.85;

                  
                }
                @keyframes strokeDashBg {
                  from { stroke-dashoffset: 0; }
                  to   { stroke-dashoffset: -4000; }
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
                SERVICES
              </text>
            </svg>
          </div>

          {/* Title pinned to top of hero */}
          <div className="relative md:absolute md:top-[275px] left-0 right-0 z-10 px-4 lg:px-12 xl:px-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-black text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
            >
              Services
            </motion.h1>
          </div>

          {/* Description aligned with title on desktop */}
          <div className="w-full relative mt-6 md:mt-0 md:absolute md:top-[255px] z-10 px-4 lg:px-12 xl:px-16 pointer-events-none">
            <div className="flex justify-start md:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm pointer-events-auto md:pt-6 lg:pt-10"
              >
                <p className="text-black font-normal text-lg leading-relaxed">
                  Complete pharmaceutical supply chain solutions for the Ethiopian market.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image overlapping the hero */}
        <section className="relative z-20 pl-4 md:pl-8 pr-0 -mt-24 mb-16 w-full md:w-[90%] lg:w-[85%] ml-auto">
          <div className="w-full h-[250px] md:h-[400px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
            <ImageSlider
              images={[
                { src: heroBgOne, alt: "Services" },
                { src: heroBgTwo, alt: "Supply chain" },
              ]}
              className="absolute inset-0 z-0"
            />
          </div>
        </section>

        {/* Scroll-driven services */}
        <ServicesScroll />
      </div>
    </PageTransition>
  );
};

export default Services;