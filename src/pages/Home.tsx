import { useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimationFrame } from "framer-motion";
import {
  ArrowRight,
  Pill,
  FlaskConical,
  Stethoscope,
  Bone,
  Award,
  BadgeCheck,
  Globe,
  Users,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollHero from "@/components/ScrollHero";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import NewsMosaic from "@/components/NewsMosaic";
import AnimatedCounter from "@/components/AnimatedCounter";
import SlidingPartners from "@/components/SlidingPartners";
import TestimonialsSection from "@/components/TestimonialsSection";
import MarqueeClients from "@/components/MarqueeClients";
import CMSBanner from "@/components/CMSBanner";
import heroImg from "@/assets/hero-pharma.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import productsImg from "@/assets/products.jpg";
import teamImg from "@/assets/certificateofrecognitionfromministryofhealthethiopia.jpg";

import labImg from "@/assets/drogaresearchgrant2023winnerjpg.jpg";
import medecialImg from "@/assets/medicaldevice.jpg";
import supplyImg from "@/assets/ourexpert.jpg";
import expertsImg from "@/assets/herobg/2.jpg";

import Headquarters from "@/assets/building.png";
import medicinesImg from "@/assets/medicines.jpg";
import healthcareTeamImg from "@/assets/certificateofappreciationfromtheministryofhealth.jpg";
import medDevicesImg from "@/assets/medical-devices.jpg";
import pharmacyNewImg from "@/assets/ProductSection/pharmacy.png";
import orthopedicNewImg from "@/assets/ProductSection/orthopedic.png";
import medicalDeviceNewImg from "@/assets/ProductSection/medical device.png";
import sutureNewImg from "@/assets/ProductSection/suture.png";
import { staggerContainer, staggerItem, cardHover } from "@/lib/variants";

// ── Wave Stats ──────────────────────────────────────────────────────────────
const WAVE_STATS = [
  { value: "400+", label: "Employees", icon: Users, delayFraction: 0 },
  { value: "1,000+", label: "Products In Stock", icon: Pill, delayFraction: 0.25 },
  { value: "$25M+", label: "Annual Sales", icon: TrendingUp, delayFraction: 0.5 },
  { value: "$60M+", label: "Government Tenders Won", icon: Award, delayFraction: 0.75 },
];

const WAVE_CFG = [
  { waveLength: 580, amplitude: 28 },
  { waveLength: 580, amplitude: 22 },
  { waveLength: 580, amplitude: 28 },
  { waveLength: 580, amplitude: 22 },
];

// Read the computed primary colour once at module level (avoids CSS var inside canvas)
const getPrimaryColor = () => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  if (raw.startsWith("#")) return raw;
  return `hsl(${raw})`;
};

const WaveStatRow = ({
  stat,
  index,
}: {
  stat: (typeof WAVE_STATS)[number];
  index: number;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  // Width cached by ResizeObserver — NEVER read in RAF to avoid layout thrashing
  const wRef = useRef(0);

  const { waveLength, amplitude } = WAVE_CFG[index];
  const speed = 0.09; // px per ms

  const pathData = useMemo(() => {
    let d = `M -${waveLength * 2} 0`;
    for (let x = -waveLength * 2; x <= 5000; x += 8) {
      const y = amplitude * Math.sin((x * 2 * Math.PI) / waveLength);
      d += ` L ${x} ${y}`;
    }
    return d;
  }, [waveLength, amplitude]);

  useAnimationFrame((t) => {
    if (!textRef.current || !pathRef.current || wRef.current === 0) return;
    const W = wRef.current;
    const loop = W + 600;
    const raw = ((t * speed) + stat.delayFraction * loop) % loop;
    const textX = raw - 300;
    const wavePhase = t * 0.03;
    const textY = amplitude * Math.sin(((textX - wavePhase) * 2 * Math.PI) / waveLength);

    // GPU-composited: no layout reads, completely jank-free
    textRef.current.style.transform = `translate3d(${textX}px, ${textY}px, 0)`;
    pathRef.current.style.transform = `translate3d(${wavePhase % waveLength}px, 0, 0)`;
  });

  return (
    <div
      ref={(el) => {
        if (!el) return;
        const ro = new ResizeObserver(() => { wRef.current = el.offsetWidth; });
        ro.observe(el);
        wRef.current = el.offsetWidth;
      }}
      className="relative w-full h-[110px] overflow-hidden"
    >
      {/* Wave line — rendered inside the container via a centred <g> */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: "visible" }}
      >
        <g transform="translate(0, 55)">
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.65"
            style={{ willChange: "transform" }}
          />
        </g>
      </svg>

      {/*
        top:50% centres the anchor vertically.
        marginTop pulls it up by half its own height so the content is centred.
        The JS translate3d then moves it along X (travel) and Y (wave).
        NO Tailwind translate classes — those would conflict with JS transforms.
      */}
      <div
        ref={textRef}
        className="absolute flex items-center gap-4 whitespace-nowrap z-10"
        style={{
          left: 0,
          top: "50%",
          marginTop: "-20px",          // ~half of label height; keeps text vertically centred
          transform: "translate3d(-500px, 0, 0)", // hidden until first RAF tick
          willChange: "transform",
        }}
      >
        <stat.icon size={26} className="text-primary shrink-0" />
        <span className="font-display text-3xl md:text-4xl font-bold text-black leading-none">
          {stat.value}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-black/45">
          {stat.label}
        </span>
      </div>
    </div>
  );
};
// ────────────────────────────────────────────────────────────────────────────





const categories = [
  {
    icon: Pill,
    title: "Medicine",
    desc: "Quality medicines from WHO-approved global manufacturers",
    primaryImg: pharmacyNewImg,
    localImg: medicinesImg,
    count: "28",
  },
  {
    icon: Stethoscope,
    title: "Diagnostics",
    desc: "Disposable medical devices and diagnostic equipment",
    primaryImg: medicalDeviceNewImg,
    localImg: medecialImg,
    count: "8",
  },
  {
    icon: FlaskConical,
    title: "Surgical",
    desc: "Surgical sutures and essential medical supplies",
    primaryImg: sutureNewImg,
    localImg: productsImg,
    count: "23",
  },
];

const clients = [
  "Engender Health",
  "Marie Stopes",
  "UNOPS",
  "World Vision",
  "Save the Children",
  "EPSA",
  "AFD",
  "Hawassa University",
  "Landmark Hospital",
  "Semah Hospital",
  "Pathfinder International",
  "St. Paul's Hospital",
  "Gondar Hospital",
  "Menelik Referral Hospital",
  "Orbis International",
  "Soddo Christian Hospital",
  "Abet Hospital",
  "Samaritan Surgical Center",
  "Yordanos Hospital",
  "AGHMO",
  "CMS",
];

const Home = () => {
  const ourPartnersLogoModules = import.meta.glob(
    "@/assets/OurPartners/*.{png,jpg,jpeg,webp,svg}",
    {
      eager: true,
      import: "default",
    },
  ) as Record<string, string>;

  const clientsFolderLogoModules = import.meta.glob(
    "@/assets/Clients/*.{png,jpg,jpeg,webp,svg}",
    {
      eager: true,
      import: "default",
    },
  ) as Record<string, string>;

  const clientLogoModules = {
    ...ourPartnersLogoModules,
    ...clientsFolderLogoModules,
  };

  const clients = Object.entries(clientLogoModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => {
      const filename = path.split("/").pop() ?? "Client";
      const baseName = filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      return {
        src,
        alt: `${baseName} logo`,
      };
    });

  return (
    <PageTransition>
      <div>
        <ScrollHero />

        {/* Quick nav strip */}
        <section className="hidden bg-[#eeeaea] border-b border-background/10">
          <div className="container grid grid-cols-1 md:grid-cols-3">
            {[
              { label: "Medicine", icon: Pill, to: "/products" },
              { label: "Diagnostics", icon: Stethoscope, to: "/products" },
              { label: "Surgical", icon: FlaskConical, to: "/products" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + i * 0.08,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={item.to}
                  className="group flex items-center gap-3 py-5 px-6 text-sm font-semibold text-background border-r border-background/10 last:border-r-0 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <item.icon
                    size={16}
                    className="opacity-40 group-hover:opacity-100 transition-opacity duration-300 text-black"
                  />
                  <span className=" md:inline text-black text-xs md:text-md">
                    {item.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="relative pt-10 md:pt-16 lg:pt-20 pb-0 overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute w-full h-[120%] object-cover -top-[0%]"
            >
              <source src="https://www.pexels.com/download/video/35347660/" type="video/mp4" />
            </video>
            {/* Dark overlay to ensure white text readability */}
            <div className="absolute inset-0 bg-black/5" />
          </div>

          <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row justify-between items-end gap-10 lg:gap-16">
                <div className="relative bottom-48 flex items-start gap-4 md:gap-8 lg:w-[45%] xl:w-[40%] pb-16 lg:pb-32">
                  <div className="w-16 md:w-20 flex-shrink-0 pt-1">
                    <span className="text-sm font-medium text-white/80">
                      About Us
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col gap-4 max-w-[480px]">
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white font-normal">
                      Established in 2015, we are working in the pharmaceuticals
                      import, wholesale and retail business, targeting the public
                      as well as the private health sector of Ethiopia.
                    </p>
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white font-normal">
                      Our team is made up of highly experienced pharmacists and
                      manufacturing industry professionals who utilize their
                      unique knowledge to create and implement cutting-edge
                      management systems.
                    </p>
                    <Link
                      to="/about"
                      className="mt-4 relative self-start inline-flex items-center text-base lg:text-lg text-white group"
                    >
                      {/* Left Arrow (sliding in from left) */}
                      <div className="flex items-center justify-end overflow-hidden w-0 group-hover:w-[28px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        <ArrowRight size={20} className="mr-2 shrink-0" />
                      </div>

                      {/* Text */}
                      <span className="relative whitespace-nowrap font-bold">
                        More About Droga Pharma
                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                      </span>

                      {/* Right Arrow (sliding out to right) */}
                      <div className="flex items-center justify-start overflow-hidden w-[28px] group-hover:w-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        <ArrowRight size={20} className="ml-2 shrink-0" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Headquarters Image - placed flush at very bottom, increased size */}
                <div className="w-full lg:w-[55%] xl:w-[60%] flex justify-end">
                  <img
                    src={Headquarters}
                    alt="Droga Pharma headquarters"
                    className="w-[125%] max-w-[500px] lg:max-w-[900px] xl:max-w-[1200px] h-auto object-contain rounded-t-lg drop-shadow-2xl translate-y-[180px] translate-x-[400px] brightness-[90%] scale-[1.35] origin-bottom-right"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Reverse split (Our Experts) moved here as requested */}
        <section className="bg-white border-y-[2px] border-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px]">
            <div className="flex items-center p-10 md:p-16 lg:p-20 order-2 lg:order-1">
              <ScrollReveal
                direction="left"
                className="w-full flex flex-col"
              >
                <div className="flex items-center gap-4">
                  <span className="section-label text-[#5c5858] m-0">
                    Our Experts
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-wider font-bold px-2.5 py-1">
                    <BadgeCheck size={14} />
                    ISO Certified
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-4 mb-6 leading-tight">
                  Industry Leaders
                </h2>
                <p className="text-[#5c5858] leading-relaxed mb-8">
                  Our team is made up of highly experienced and renowned
                  pharmacists and manufacturing industry professionals that
                  utilize their unique knowledge to create and implement
                  cutting-edge management systems.
                </p>
                <Link
                  to="/about"
                  className="bg-black text-white px-8 py-4 self-start hover:bg-primary hover:text-black transition-colors duration-300 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Learn more
                </Link>
              </ScrollReveal>
            </div>
            <div className="relative overflow-hidden order-1 lg:order-2">
              <ImageSlider
                images={[
                  { src: expertsImg, alt: "Supply chain" },
                ]}
                className="min-h-[450px] lg:min-h-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Stats — Wave animation */}
        <section className="bg-white py-12">
          <div className="w-full">
            {WAVE_STATS.map((stat, i) => (
              <WaveStatRow key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </section>

        {/* Split — HQ */}
        {/* <section className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[650px] ">
            <div className="relative overflow-hidden bg-[#f5f5f5] min-h-[450px] lg:min-h-full h-full flex items-center justify-center p-4 md:p-6">
              <img
                src={Headquarters}
                alt="Droga Pharma headquarters"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center p-10 md:p-16 lg:p-20">
              <ScrollReveal direction="right">
                <span className="section-label text-[#5c5858]">
                  Our Headquarters
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-4 mb-6 leading-tight">
                  Quality Products for Ethiopia
                </h2>
                <p className="text-[#5c5858] leading-relaxed mb-4">
                  Our headquarter is located in the center of Addis Ababa. This
                  is where we come up with new ideas and products to make
                  people's lives better.
                </p>
                <p className="text-[#5c5858] leading-relaxed mb-8">
                  Our team creates and implements cutting-edge management
                  systems and programs that drive our partners' success.
                </p>
                <Link to="/about" className="btn-primary">
                  Learn more
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section> */}

        {/* Products — Image Hover Cards */}
        <section className="bg-white py-16 md:py-24">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-black uppercase tracking-wide">
                  Product Categories
                </h2>
              </div>
            </ScrollReveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categories.map((cat) => (
                <motion.div key={cat.title} variants={staggerItem}>
                  <Link to="/products" className="relative group overflow-hidden aspect-[2/3] block bg-white">
                    <img
                      src={cat.primaryImg}
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    />
                    <img
                      src={cat.localImg}
                      alt={`${cat.title} alternate`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 scale-110 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-100"
                    />

                    {/* Subtle overlay to make text readable if image is bright */}
                    <div className="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:opacity-0 z-10 pointer-events-none" />

                    {/* White info box overlay on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-[20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-20">
                      <div className="flex flex-col shadow-lg">
                        <div className="bg-primary p-5">
                          <h3 className="font-display font-bold text-lg text-black uppercase tracking-wider">{cat.title}</h3>
                          <p className="text-sm text-black/70 mt-2 line-clamp-2">{cat.desc}</p>
                        </div>
                        <div className="bg-white px-5 py-4 flex items-center justify-between">
                          <span className="font-bold text-black text-sm">{cat.count} items</span>
                          <ArrowRight size={18} className="text-black transform transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <ScrollReveal>
              <div className="mt-16 text-center">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-black hover:bg-primary hover:text-black hover:border-primary transition-colors duration-300"
                >
                  View all products <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Full-width CTA banner */}
        {/* 
        <section className="relative h-[500px]">
          <ImageSlider
            images={[
              { src: supplyImg, alt: "Supply chain" },
              { src: warehouseImg, alt: "Warehouse" },
              { src: medDevicesImg, alt: "Medical devices" },
            ]}
            className="h-full"
            overlay
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <ScrollReveal>
              <div className="text-center px-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-14 h-14 bg-primary/20 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
                >
                  <Globe size={24} className="text-primary" />
                </motion.div>
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-background leading-tight">
                  Do you have questions
                  <br className="hidden md:block" /> about our products?
                </h2>
                <p className="text-background/55 mt-5 max-w-lg mx-auto text-lg">
                  Our team is ready to help you find the right solutions for
                  your healthcare needs.
                </p>
                <Link
                  to="/contact"
                  className="btn-primary text-base px-10 py-4 mt-10 inline-flex"
                >
                  Contact us <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
        */}


        <NewsMosaic />

        <TestimonialsSection />

        {/* Clients */}
        <section className="bg-[#fffdfd] section-padding border-t border-primary-foreground/10">
          <div className="container-narrow mb-12">
            <ScrollReveal>
              <div className="text-center">
                <span className="text-md font-semibold tracking-[0.2em] uppercase text-primary-foreground/60 block mb-4">
                  Our Partners
                </span>

                <p className="text-black mt-3  mx-auto text-2xl">
                  Serving leading healthcare organizations across Ethiopia
                </p>
              </div>
            </ScrollReveal>
          </div>
          <div className="max-w-7xl mx-auto w-full">
            {/* <SlidingPartners clients={clients} /> */}
            <MarqueeClients
              clients={clients}
              variant="vertical-3"
              additionalSlides={2}
            />
          </div>
        </section>

        <CMSBanner />
      </div>
    </PageTransition>
  );
};

export default Home;
