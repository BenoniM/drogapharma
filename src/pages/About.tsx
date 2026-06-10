import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Target, Scale, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import MissionVisionValues from "@/components/Missionvisionvalues";
import teamImg from "@/assets/abdi.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import heroImg from "@/assets/hero-pharma.jpg";
import labImg from "@/assets/lab-research.jpg";
import heroBgOne from "@/assets/herobg/2.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";
import healthcareTeamImg from "@/assets/henoknew.jpg";
import supplyImg from "@/assets/supply-chain.jpg";

const coreValues = [
  {
    category: "Integrity",
    title: "Do The Right Thing",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Integrity",
    title: "Walk The Talk",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Integrity",
    title: "Foster Sound Decisions",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Customer Centric",
    title: "Listen First",
    image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Customer Centric",
    title: "Go The Extra Mile",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Customer Centric",
    title: "Innovate To Add Value",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Care",
    title: "Care For Us (Employee & Terms)",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Care",
    title: "Care For Community",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Care",
    title: "Care For The Planet",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80",
  },
];

const coreValueGroups = Object.values(
  coreValues.reduce<Record<string, { category: string; image: string; titles: string[] }>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = {
        category: item.category,
        image: item.image,
        titles: [item.title],
      };
    } else {
      acc[item.category].titles.push(item.title);
    }
    return acc;
  }, {}),
);

const ourPartnersLogoModules = import.meta.glob("@/assets/OurPartners/*.{png,jpg,jpeg,webp,svg}", { eager: true, import: "default" }) as Record<string, string>;
const clientsFolderLogoModules = import.meta.glob("@/assets/Clients/*.{png,jpg,jpeg,webp,svg}", { eager: true, import: "default" }) as Record<string, string>;

const clientLogoModules = {
  ...ourPartnersLogoModules,
  ...clientsFolderLogoModules,
};

const clients = Object.entries(clientLogoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const filename = path.split("/").pop() ?? "Client";
    const baseName = filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    return { src, alt: `${baseName} logo` };
  });

const ourJourneyImageModules = import.meta.glob("@/assets/OurJourney/*.{png,jpg,jpeg,webp,svg}", { eager: true, import: "default" }) as Record<string, string>;

const ourJourneyImages = Object.entries(ourJourneyImageModules).reduce<Record<string, string>>((acc, [path, src]) => {
  const filename = path.split("/").pop() ?? "";
  const normalizedName = filename.replace(/\.[^.]+$/, "").toLowerCase();
  acc[normalizedName] = src;
  return acc;
}, {});

const getJourneyImage = (name: string, fallback: string) => {
  const normalizedName = name.replace(/\s+/g, "").toLowerCase();
  return ourJourneyImages[normalizedName] ?? fallback;
};

const timeline = [
  { year: "2015", title: "BEGINNING", image: getJourneyImage("BEGINNING", teamImg), event: "Establishment of Droga Pharma PLC (Whole Sale Division)" },
  { year: "2016", title: "SISTER COMPANY", image: getJourneyImage("SISTER COMPANY", labImg), event: "Establishment of Droga Physiotherapy Clinic" },
  { year: "2017", title: "GET LARGER", image: warehouseImg, event: "Establishment of Droga Pharma PLC (Import Division) and Bole Branch Physiotherapy Clinic" },
  { year: "2018", title: "AWARDED", image: supplyImg, event: "20+ Million USD Award in International Tender With Our Suppliers" },
  { year: "2019", title: "GROWING", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80", event: "Establishment of EMA Private Limited Company" },
  { year: "2020", title: "NEW FACTORY", image: getJourneyImage("NEW FACTORY", heroImg), event: "Establishment of Trust Pharmaceuticals Manufacturing PLC" },
  { year: "2021", title: "NEW HEADQUARTER", image: getJourneyImage("NEW HEADQUARTER", healthcareTeamImg), event: "Establishment of R & D Unit, and 4Killo Branch Physiotherapy Clinic" },
  { year: "2022", title: "EXPANDING", image: warehouseImg, event: "Opening of hargelsa branch" },
  { year: "NOW", title: "WE ARE", image: heroImg, event: "• The Leading supplier of Diagnostic and Therapeutic Instruments, Devices and Equipments\n• Leading Orthopedics, Quality Sutures & Glucose Strip Supplier in Ethiopia\n• Continuous Supplier of rare Medicine, Consumables & Supplies\n• 1000+ Customers, 150+ Supplier\n• 246+ Employees, 3 Distribution Centers\n• 7 Regional representative offices\n• 25 Million USD Annual Turn Over" },
];

const missionVisionSlides = [
  { title: "Our Vision", text: "To be the leading group company in Ethiopia that creates health and wealth for human being.", image: heroImg },
  { title: "Our Mission", text: "We build ethical companies that provide quality products and services by our talented members to serve humanity and contribute to socio economic development.", image: labImg },
];

const storySlides = [
  {
    image: teamImg,
    alt: "Team",
    title: "Founder's Message",
    intro: "Welcome to Droga Pharma, where our journey began with a simple yet profound vision: to make healthcare accessible, sustainable, and reliable for everyone",
    highlight: "The Heart of Droga Pharma lies in our unwavering commitment to making healthcare accessible.",
    outro: "Thank you for trusting us with your health and well-being. Together, we are building a brighter and healthier future.",
    signatureName: "Dr. Abdi Ermolo",
    signatureRole: "Deputy CEO, Founder",
  },
  {
    image: healthcareTeamImg,
    alt: "Healthcare",
    title: "Experienced Healthcare Professionals",
    intro: "Our team combines technical expertise and strong operational discipline to deliver quality healthcare products across Ethiopia.",
    highlight: "We collaborate with public and private health institutions to ensure reliable supply and timely service.",
    outro: "By focusing on quality, ethics, and long-term partnerships, we continue to strengthen access to essential medical solutions.",
    signatureName: "Mr. Henok Teka",
    signatureRole: "Group CEO",
  },
];

const BalanceScale = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#FFF200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Stand */}
    <path d="M20 35 L20 8" />
    <path d="M12 35 L28 35" />
    <path d="M18 8 L22 8" />
    
    {/* Beam (tilting) */}
    <motion.g animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: '20px 10px' }}>
      <path d="M6 10 L34 10" />
      {/* Left Pan */}
      <motion.g animate={{ rotate: [15, -15, 15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: '6px 10px' }}>
        <path d="M6 10 L2 20 L10 20 Z" />
      </motion.g>
      {/* Right Pan */}
      <motion.g animate={{ rotate: [15, -15, 15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: '34px 10px' }}>
        <path d="M34 10 L30 20 L38 20 Z" />
      </motion.g>
    </motion.g>
  </svg>
);

const RippleTarget = () => (
  <>
    <style>{`
      @keyframes ripple {
        0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
      }
      .ripple-ring {
        position: absolute;
        top: 50%; left: 50%;
        width: 14px; height: 14px;
        border-radius: 50%;
        border: 2px solid #FFF200;
        animation: ripple 2.4s ease-out infinite;
        will-change: transform, opacity;
      }
    `}</style>
    <div style={{ position: 'relative', width: 40, height: 40, overflow: 'visible' }}>
      <div className="ripple-ring" style={{ animationDelay: '0s' }} />
      <div className="ripple-ring" style={{ animationDelay: '0.8s' }} />
      <div className="ripple-ring" style={{ animationDelay: '1.6s' }} />
    </div>
  </>
);


const coreValuesCards = [
  {
    category: "Integrity",
    titles: ["Do The Right Thing", "Walk The Talk", "Foster Sound Decisions"],
    icon: <BalanceScale />,
    animation: {}
  },
  {
    category: "Customer Centric",
    titles: ["Listen First", "Go The Extra Mile", "Innovate To Add Value"],
    icon: <RippleTarget />,
    animation: {}
  },
  {
    category: "Care",
    titles: ["Care For Us (Employee & Terms)", "Care For Community", "Care For The Planet"],
    icon: <Heart className="w-10 h-10 text-[#FFF200]" strokeWidth={2.5} />,
    animation: { scale: [1, 1.2, 1], transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } }
  }
];

function CoreValuesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {coreValuesCards.map((cv, i) => (
            <div key={i} className="bg-white p-8 md:p-10 border border-slate-200 rounded-xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
              <motion.div 
                className="mb-10 inline-flex"
                animate={cv.animation as any}
              >
                {cv.icon}
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-6">
                {cv.category}
              </h3>
              <ul className="space-y-3">
                {cv.titles.map((t, idx) => (
                  <li key={idx} className="text-slate-600 text-base leading-relaxed">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import OurTeam from "@/components/OurTeam";
import JourneyStepper from "@/components/JourneyStepper";
import Certifications from "@/components/Certifications";
import MarqueeClients from "@/components/MarqueeClients";

const About = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.story-card');
    cards.forEach((card, index) => {
      const content = card.querySelector('.parallax-content');
      const bg = card.querySelector('.hover-bg');
      if (!content || !bg) return;

      const isLeft = index === 0;

      gsap.set(bg, {
        clipPath: isLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
        opacity: 1,
      });

      // For the right card, collect all text/border elements to animate with GSAP
      const isRight = index === 1;
      const rightTextEls = isRight ? card.querySelectorAll<HTMLElement>('.gsap-text') : null;
      const rightBorderEls = isRight ? card.querySelectorAll<HTMLElement>('.gsap-border') : null;

      card.addEventListener('mouseenter', () => {
        // Sweep the background in
        gsap.to(bg, { clipPath: "inset(0 0% 0 0%)", duration: 0.8, ease: "power3.inOut" });

        if (isRight && rightTextEls && rightBorderEls) {
          // Stagger text color change to follow the sweep (bg takes 0.8s from right→left)
          // Elements higher up in DOM get a shorter delay so the color wave follows the bg
          rightTextEls.forEach((el, i) => {
            const delay = 0.35 + i * 0.06;
            gsap.to(el, {
              color: el.dataset.hoverColor ?? '#ffffff',
              duration: 0.35,
              delay,
              ease: "power2.out",
            });
          });
          rightBorderEls.forEach((el) => {
            gsap.to(el, {
              borderColor: el.dataset.hoverBorder ?? 'rgba(255,255,255,0.2)',
              duration: 0.35,
              delay: 0.5,
              ease: "power2.out",
            });
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(bg, {
          clipPath: isLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
          duration: 0.6,
          ease: "power3.inOut",
        });
        gsap.to(content, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.3)" });

        if (isRight && rightTextEls && rightBorderEls) {
          rightTextEls.forEach((el, i) => {
            gsap.to(el, {
              color: el.dataset.baseColor ?? '',
              duration: 0.3,
              delay: i * 0.03,
              ease: "power2.in",
            });
          });
          rightBorderEls.forEach((el) => {
            gsap.to(el, {
              borderColor: el.dataset.baseBorder ?? '',
              duration: 0.3,
              ease: "power2.in",
            });
          });
        }
      });

      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(content, {
          x: x * 30,
          y: y * 30,
          rotateX: -y * 10,
          rotateY: x * 10,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      });
    });

    gsap.fromTo(".story-divider", { scaleY: 0 }, {
      scaleY: 1, duration: 1.5, ease: "power4.inOut", scrollTrigger: { trigger: storyRef.current, start: "top 70%" }
    });
  }, { scope: storyRef });

  return (
    <PageTransition>
      <div>
        {/* Dark Hero Section */}
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
                ABOUT US
              </text>
            </svg>
          </div>
          
          <div className="container-wide relative z-10 px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              <div className="flex flex-col">
                <span className="section-label text-primary block mb-4">About Us</span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
                >
                  Company
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm"
              >
                <p className="text-white font-medium text-lg leading-relaxed">
                  Established in 2015, serving Ethiopia's healthcare needs.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image overlapping the hero - moved to right edge */}
        <section className="relative z-20 pl-4 md:pl-8 pr-0 -mt-24 w-full md:w-[90%] lg:w-[85%] ml-auto">
          <div className="w-full h-[250px] md:h-[400px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
            <ImageSlider
              images={[
                { src: heroBgOne, alt: "About" },
                { src: heroBgTwo, alt: "Healthcare team" },
                { src: heroBgThree, alt: "Lab" },
              ]}
              className="absolute inset-0 z-0"
            />
          </div>
        </section>

        {/* Story section */}
        <section ref={storyRef} className="bg-white py-16 md:py-24 relative overflow-hidden border-t border-slate-100">
          <div className="container-wide relative px-6 md:px-12 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 relative">

              {/* CEO 1 — yellow hover */}
              <div className="lg:col-span-5 story-card group relative py-4 transition-colors duration-500 cursor-pointer">
                {/* Sliding Yellow Background */}
                <div className="hover-bg absolute top-0 bottom-0 bg-[#FFF200] z-0"
                  style={{ left: '-100vw', right: '-20%' }} />

                <div className="parallax-content relative z-10">
                  <ScrollReveal>
                    <div className="px-6 md:px-8 py-4 h-full flex flex-col">
                      <div className="mb-8 h-[3px] w-12 bg-[#FFF200] group-hover:bg-black transition-colors duration-500" />
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6 group-hover:text-black transition-colors">
                        {storySlides[0].title}
                      </h2>
                      <p className="text-base leading-relaxed text-slate-600 group-hover:text-black mb-8 transition-colors">{storySlides[0].intro}</p>
                      <p className="text-lg md:text-xl font-semibold leading-snug mb-8 text-slate-900 border-l-4 border-[#FFF200] group-hover:border-black group-hover:text-black pl-6 italic transition-colors">
                        "{storySlides[0].highlight}"
                      </p>
                      <p className="text-base leading-relaxed text-slate-600 group-hover:text-black mb-10 transition-colors">{storySlides[0].outro}</p>
                      <div className="inline-block text-left mt-auto pt-6 border-t border-slate-200 group-hover:border-black/20 transition-colors">
                        <p className="font-bold text-base text-slate-900 group-hover:text-black transition-colors">{storySlides[0].signatureName}</p>
                        <p className="text-sm mt-1 text-slate-500 group-hover:text-black/70 transition-colors">{storySlides[0].signatureRole}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              {/* Divider on large screens */}
              <div className="hidden lg:block lg:col-span-2 relative h-full">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 origin-top story-divider scale-y-100" />
              </div>

              {/* CEO 2 — black hover, GSAP-driven text sync */}
              <div className="lg:col-span-5 story-card group relative py-4 cursor-pointer">
                {/* Sliding Black Background */}
                <div className="hover-bg absolute top-0 bottom-0 bg-black z-0"
                  style={{ left: '-20%', right: '-100vw' }} />

                <div className="parallax-content relative z-10 h-full">
                  <ScrollReveal delay={0.2}>
                    <div className="px-6 md:px-8 py-4 h-full flex flex-col">
                      <div className="mb-8 h-[3px] w-12 bg-[#FFF200]" />
                      <h2
                        className="gsap-text font-display text-3xl md:text-4xl font-bold mb-6"
                        data-base-color="#0f172a"
                        data-hover-color="#ffffff"
                        style={{ color: '#0f172a' }}
                      >
                        {storySlides[1].title}
                      </h2>
                      <p
                        className="gsap-text text-base leading-relaxed mb-8"
                        data-base-color="#475569"
                        data-hover-color="rgba(255,255,255,0.8)"
                        style={{ color: '#475569' }}
                      >
                        {storySlides[1].intro}
                      </p>
                      <p
                        className="gsap-text text-lg md:text-xl font-semibold leading-snug mb-8 border-l-4 border-[#FFF200] pl-6 italic"
                        data-base-color="#0f172a"
                        data-hover-color="#ffffff"
                        style={{ color: '#0f172a' }}
                      >
                        "{storySlides[1].highlight}"
                      </p>
                      <p
                        className="gsap-text text-base leading-relaxed mb-10"
                        data-base-color="#475569"
                        data-hover-color="rgba(255,255,255,0.8)"
                        style={{ color: '#475569' }}
                      >
                        {storySlides[1].outro}
                      </p>
                      <div
                        className="gsap-border inline-block text-left mt-auto pt-6 border-t"
                        data-base-border="#e2e8f0"
                        data-hover-border="rgba(255,255,255,0.2)"
                        style={{ borderColor: '#e2e8f0' }}
                      >
                        <p
                          className="gsap-text font-bold text-base"
                          data-base-color="#0f172a"
                          data-hover-color="#ffffff"
                          style={{ color: '#0f172a' }}
                        >
                          {storySlides[1].signatureName}
                        </p>
                        <p
                          className="gsap-text text-sm mt-1"
                          data-base-color="#64748b"
                          data-hover-color="rgba(255,255,255,0.6)"
                          style={{ color: '#64748b' }}
                        >
                          {storySlides[1].signatureRole}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>

            </div>
          </div>
        </section>

        <MissionVisionValues />
        <CoreValuesSection />

        {/* Timeline / Journey */}
        <section className="pt-10 border-y border-slate-100">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="text-center">
                <span className="section-label block text-black/60">Our Journey</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-2">
                  Company Evolution
                </h2>
              </div>
            </ScrollReveal>
          </div>

          <div className="w-full px-4 md:px-8 lg:px-12">
            <JourneyStepper timeline={timeline} />
          </div>
        </section>

        <Certifications />

        <section className="py-10 md:py-12 flex items-center justify-center min-h-screen md:min-h-0">
          <div className="container-wide w-full">
            <ScrollReveal>
              <div className="text-center mb-6 lg:mb-8">
                <span className="section-label block mb-2 text-[#b3a800] font-bold tracking-widest uppercase">DROGA GROUP</span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mt-2">
                  Quality Policy / የጥራት ፖሊሲ
                </h2>
                <p className="text-base text-slate-500 mt-2 italic max-w-2xl mx-auto">"Serving the people!"</p>
              </div>
            </ScrollReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto max-w-7xl overflow-hidden bg-white border border-slate-100 p-6 md:p-10 lg:p-14 flex flex-col gap-8"
            >
              {/* Moving Background Pattern */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <style>
                  {`
                    @keyframes panBg {
                      0% { background-position: 0 0; }
                      100% { background-position: -30px -30px; }
                    }
                  `}
                </style>
                <div 
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 242, 0, 0.4) 2px, transparent 0)`,
                    backgroundSize: '30px 30px',
                    animation: 'panBg 3s linear infinite',
                  }}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
                {/* English Section */}
                <div className="flex flex-col h-full space-y-5">
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base text-justify">
                    <strong className="text-slate-900 font-bold">Droga Group</strong> is established to sustainably provide quality, safe and effective pharmaceutical products, medical devices and services by its talented and motivated members to enhance health and create wealth for the nation.
                  </p>
                  
                  <div className="bg-slate-50/80 p-5 border border-slate-100 flex-grow shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-xs md:text-sm uppercase tracking-wider">We will achieve this through:</h3>
                    <ul className="space-y-3">
                      {[
                        "Continual improvement of our processes and systems",
                        "Adherence to regulatory and statutory requirements",
                        "Ensuring customer loyalty and satisfaction",
                        "Ensuring Financial Sustainability",
                        "Collaboration and partnership with interested parties",
                        "Engaging, recognizing and capacitating of our employees",
                        "Promoting collaboration and team work",
                        "Automation and digitalization of our processes",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-slate-700 text-sm leading-snug">
                          <span className="flex-shrink-0 w-1.5 h-1.5 bg-[#FFF200] border border-[#d4c900] mt-1.5 mr-3" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-sm text-justify">
                    The top management committed to maintain an effective quality management system that meets or exceeds the needs and expectations of customers and interested parties through compliance with all applicable regulations.
                  </p>
                </div>

                {/* Amharic Section */}
                <div className="flex flex-col h-full space-y-5">
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base text-justify">
                    <strong className="text-slate-900 font-bold">ድሮጋ ግሩፕ</strong> ጥራት ያላቸው ፣ ደህንነታቸው የተጠበቀ እና ፈዋሽነታቸው የተረጋገጠ መድኃኒቶችን፣ የህክምና መገልገያዎችን እና አገልግሎቶችን ብቃትና ተነሳሽነት ባላቸው ባለሙያዎቹ ለማህበረሰብ ጤና መሻሻል እና ሀብትን ለመፍጠር የተቀቋቋመ የግል ድርጅት ነው፡፡
                  </p>
                  
                  <div className="bg-slate-50/80 p-5 border border-slate-100 flex-grow shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-xs md:text-sm uppercase tracking-wider">ይህንንም ለማሳካት የሚከተሉትን መርሆዎች ይተገብራል፡-</h3>
                    <ul className="space-y-3">
                      {[
                        "ቀጣይነት ያለው የአሰራር ስርዓት መዘርጋት",
                        "ዘርፉ የሚመራባቸውን የቁጥጥር እና የህግ መመሪያዎችን ማክበር",
                        "የደንበኞችን አመኔታና እርካታን ማረጋገጥ",
                        "የፋይናንስ ዘላቂነትን ማረጋገጥ",
                        "ከባለድርሻ አካላት ጋር በትብብር መስራት",
                        "የባለሙያዎቻችንን ተሳትፎ ማሳደግ፣ እውቅና መስጠት እና አቅምን መገንባት",
                        "የአብሮነትና እና የቡድን ስራን ማበረታታት",
                        "ወረቀት አልባ የአሰራር ሂደትን መዘርጋት",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-slate-700 text-sm leading-snug">
                          <span className="flex-shrink-0 w-1.5 h-1.5 bg-[#FFF200] border border-[#d4c900] mt-1.5 mr-3" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed text-sm text-justify">
                    የድሮጋ ግሩፕ ከፍተኛ አመራርም የደንበኞችን ፍላጎት ዘርፉ የሚጠይቀውን መመሪያ በመተግበር በላቀ ደረጃ ለማሟላት ቁርጠኛ ነው፡፡
                  </p>
                </div>
              </div>

              {/* Signature Section */}
              <div className="mt-4 pt-6 border-t border-slate-100 flex justify-center md:justify-end relative z-10">
                <div className="text-center md:text-right relative">
                  <p className="text-slate-400 text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-4">Approved by</p>
                  
                  <div className="group relative cursor-default inline-block px-6 py-3 bg-white/50 backdrop-blur-sm border border-transparent hover:border-slate-200 hover:shadow-sm transition-all duration-300">
                    {/* Fancy Default View */}
                    <div className="transition-opacity duration-300 group-hover:opacity-0 flex flex-col items-center md:items-end">
                      <div className="text-4xl md:text-5xl text-slate-800 select-none leading-none -rotate-2" style={{ fontFamily: "'Brush Script MT', 'Caveat', cursive" }}>
                        Henok Teka
                      </div>
                      <div className="text-lg md:text-xl text-[#a19800] select-none mt-2 -rotate-2" style={{ fontFamily: "'Brush Script MT', 'Caveat', cursive" }}>
                        Group CEO
                      </div>
                    </div>
                    
                    {/* Normal Font Hover View */}
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col items-center md:items-end justify-center px-6">
                      <h4 className="font-bold text-slate-900 text-lg md:text-xl whitespace-nowrap">Henok Teka</h4>
                      <p className="text-[#a19800] font-bold text-sm md:text-base tracking-wide whitespace-nowrap uppercase">Group CEO</p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Clients */}
        <section className="bg-[#fffdfd] section-padding">
          <div className="container-narrow mb-12">
            <ScrollReveal>
              <div className="text-center">
                <span className="text-md font-semibold tracking-[0.2em] uppercase text-primary-foreground/60 block mb-4">
                  Our Partners
                </span>
                <p className="text-black mt-3 mx-auto text-2xl">
                  Serving leading healthcare organizations across Ethiopia
                </p>
              </div>
            </ScrollReveal>
          </div>
          <div className="max-w-7xl mx-auto">
            <MarqueeClients clients={clients} variant="vertical-3" additionalSlides={2} />
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;