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

const PANEL_HEIGHT = 100;

function ServicesScroll() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalVh = services.length * PANEL_HEIGHT;

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
  { step: "01", title: "Sourcing",           desc: "Identify WHO-approved manufacturers" },
  { step: "02", title: "Procurement",        desc: "Negotiate terms and place orders" },
  { step: "03", title: "Import & Clearance", desc: "Handle shipping and customs" },
  { step: "04", title: "Distribution",       desc: "Deliver to healthcare providers" },
];

function HowItWorksBlind() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;

    // ── Entrance: slide in from right, staggered ──
    const reset = () => gsap.set(cards, { xPercent: 110 });
    const play  = () =>
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
      onEnter:     () => { reset(); play(); },
      onEnterBack: () => { reset(); play(); },
    });

    // ── Per-card hover + parallax ──
    cards.forEach((card, index) => {
      if (!card) return;
      const isOdd   = index % 2 === 0; // 0,2 = white reveal; 1,3 = black reveal
      const bg      = card.querySelector<HTMLElement>('.hiw-hover-bg');
      const content = card.querySelector<HTMLElement>('.hiw-content');
      const textEls = card.querySelectorAll<HTMLElement>('.hiw-text');

      if (!bg || !content) return;

      gsap.set(bg, {
        clipPath: isOdd ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
      });

      const onEnter = () => {
        gsap.to(bg, {
          clipPath: "inset(0 0% 0 0%)",
          duration: 0.8,
          ease: "power3.inOut",
        });
        textEls.forEach((el, i) => {
          gsap.to(el, {
            color: el.dataset.hoverColor ?? '',
            duration: 0.35,
            delay: 0.3 + i * 0.06,
            ease: "power2.out",
          });
        });
      };

      const onLeave = () => {
        gsap.to(bg, {
          clipPath: isOdd ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
          duration: 0.6,
          ease: "power3.inOut",
        });
        gsap.to(content, {
          x: 0, y: 0, rotateX: 0, rotateY: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
        textEls.forEach((el, i) => {
          gsap.to(el, {
            color: el.dataset.baseColor ?? '',
            duration: 0.3,
            delay: i * 0.03,
            ease: "power2.in",
          });
        });
      };

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

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('mousemove', onMove);
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} style={{ overflow: "hidden", backgroundColor: "#FFF200" }}>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "5rem 1rem 3rem" }}>
        <span
          style={{
            display: "block",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.4)",
            marginBottom: "0.75rem",
          }}
        >
          How It Works
        </span>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 700,
            color: "#000000",
            margin: 0,
          }}
        >
          Our Import Process
        </h2>
      </div>

      {/* 4 cards */}
      <div style={{ display: "flex", width: "100%" }}>
        {steps.map((item, i) => {
          const isOdd = i % 2 === 0;

          // Yellow base colors (sitting on #FFF200)
          const baseNumberColor = "rgba(0,0,0,0.4)";
          const baseTitleColor  = "#000000";
          const baseDescColor   = "rgba(0,0,0,0.5)";

          // Hover colors — adapt to the revealed bg
          // odd  → white bg  → dark text
          // even → black bg  → light text
          const hoverNumberColor = isOdd ? "rgba(0,0,0,0.4)"         : "rgba(255,255,255,0.4)";
          const hoverTitleColor  = isOdd ? "#000000"                   : "#ffffff";
          const hoverDescColor   = isOdd ? "rgba(0,0,0,0.5)"          : "rgba(255,255,255,0.6)";

          return (
            <div
              key={item.step}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              style={{
                flex: "1 1 25%",
                backgroundColor: "#FFF200",
                position: "relative",
                overflow: "hidden",
                borderRight: i < steps.length - 1 ? "2px solid rgba(0,0,0,0.08)" : "none",
                cursor: "default",
              }}
            >
              {/* Sliding bg */}
              <div
                className="hiw-hover-bg"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: isOdd ? "#ffffff" : "#000000",
                  zIndex: 0,
                }}
              />

              {/* Content */}
              <div
                className="hiw-content"
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "4rem 2rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  className="hiw-text"
                  data-base-color={baseNumberColor}
                  data-hover-color={hoverNumberColor}
                  style={{
                    fontSize: "clamp(3rem, 5vw, 4.5rem)",
                    fontWeight: 900,
                    color: baseNumberColor,
                    lineHeight: 1,
                  }}
                >
                  {item.step}
                </div>
                <h3
                  className="hiw-text"
                  data-base-color={baseTitleColor}
                  data-hover-color={hoverTitleColor}
                  style={{
                    fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                    fontWeight: 700,
                    color: baseTitleColor,
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="hiw-text"
                  data-base-color={baseDescColor}
                  data-hover-color={hoverDescColor}
                  style={{
                    fontSize: "0.82rem",
                    color: baseDescColor,
                    lineHeight: 1.65,
                    maxWidth: "12rem",
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const Services = () => {
  return (
    <PageTransition>
      <div>
        {/* Dark Hero Section */}
        <section className="relative bg-[#FFF200] pt-40 pb-48 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
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

          <div className="container-wide relative z-10 px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              <div className="flex flex-col">
                <span className="section-label text-black block mb-4">What We Do</span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-black text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
                >
                  Services
                </motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm"
              >
                <p className="text-black font-medium text-lg leading-relaxed">
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
                { src: heroBgThree, alt: "Healthcare" },
              ]}
              className="absolute inset-0 z-0"
            />
          </div>
        </section>

        {/* Scroll-driven services */}
        <ServicesScroll />

        {/* How It Works */}
        <HowItWorksBlind />
      </div>
    </PageTransition>
  );
};

export default Services;