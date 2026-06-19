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

const ourPartnersLogoModules = import.meta.glob("@/assets/OurPartners/New/*.{png,jpg,jpeg,webp,svg}", { eager: true, import: "default" }) as Record<string, string>;

const clientLogoModules = {
  ...ourPartnersLogoModules,
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
    image: healthcareTeamImg,
    alt: "Healthcare",
    title: "Experienced Healthcare Professionals",
    intro: "Our team combines technical expertise and strong operational discipline to deliver quality healthcare products across Ethiopia.",
    highlight: "We collaborate with public and private health institutions to ensure reliable supply and timely service.",
    outro: "By focusing on quality, ethics, and long-term partnerships, we continue to strengthen access to essential medical solutions.",
    signatureName: "Mr. Henok Teka",
    signatureRole: "Group CEO",
  },
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
];

const BalanceScale = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
      }
      .ripple-ring {
        position: absolute;
        top: 50%; left: 50%;
        width: 14px; height: 14px;
        border-radius: 50%;
        border: 2px solid #000000;
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
    icon: <Heart className="w-10 h-10 text-black" strokeWidth={1.75} />,
    animation: { scale: [1, 1.2, 1], transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } }
  }
];

function CoreValuesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="mb-12 text-left">
          <span className="section-label block text-black/60">Our Beliefs</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-2">
            Core Values
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {coreValuesCards.map((cv, i) => (
            <div key={i} className="bg-[#FFF200] p-8 md:p-10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
              <motion.div 
                className="mb-40 inline-flex"
                animate={cv.animation as any}
              >
                {cv.icon}
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-6">
                {cv.category}
              </h3>
              <ul className="space-y-1">
                {cv.titles.map((t, idx) => (
                  <li key={idx} className="text-slate-600 text-base leading-snug">
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

const qualityPolicyData = {
  ENG: {
    title: "Quality Policy",
    ceoName: "Henok Teka",
    ceoTitle: "Group CEO",
    description: (
      <div className="space-y-8">
        <p className="text-base lg:text-lg text-slate-900 leading-snug font-light tracking-tight">
          <strong className="font-medium">Droga Group</strong> is established to sustainably provide quality, safe and effective pharmaceutical products, medical devices and services by its talented and motivated members to enhance health and create wealth for the nation.
        </p>
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">We will achieve this through:</h3>
          <ul className="space-y-1.5">
            {[
              "Continual improvement of our processes and systems",
              "Adherence to regulatory and statutory requirements",
              "Ensuring customer loyalty and satisfaction",
              "Ensuring financial sustainability",
              "Collaboration and partnership with interested parties",
              "Engaging, recognizing and capacitating of our employees",
              "Promoting collaboration and team work",
              "Automation and digitalization of our processes",
            ].map((item, i) => (
              <li key={i} className="flex items-start text-slate-700 text-xs lg:text-sm leading-snug">
                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-slate-800 mt-1.5 mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs lg:text-sm text-slate-600 leading-snug font-light">
          The top management is committed to maintaining an effective quality management system that meets or exceeds the needs and expectations of customers and interested parties through compliance with all applicable regulations.
        </p>
      </div>
    )
  },
  AMH: {
    title: "የጥራት ፖሊሲ",
    ceoName: "ሔኖክ ተካ",
    ceoTitle: "ግሩፕ CEO",
    description: (
      <div className="space-y-8">
        <p className="text-base lg:text-lg text-slate-900 leading-snug font-light tracking-tight">
          <strong className="font-medium">ድሮጋ ግሩፕ</strong> ጥራት ያላቸው ፣ ደህንነታቸው የተጠበቀ እና ፈዋሽነታቸው የተረጋገጠ መድኃኒቶችን፣ የህክምና መገልገያዎችን እና አገልግሎቶችን ብቃትና ተነሳሽነት ባላቸው ባለሙያዎቹ ለማህበረሰብ ጤና መሻሻል እና ሀብትን ለመፍጠር የተቀቋቋመ የግል ድርጅት ነው፡፡
        </p>
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">ይህንንም ለማሳካት የሚከተሉትን መርሆዎች ይተገብራል፡</h3>
          <ul className="space-y-1.5">
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
              <li key={i} className="flex items-start text-slate-700 text-xs lg:text-sm leading-snug">
                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-slate-800 mt-1.5 mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs lg:text-sm text-slate-600 leading-snug font-light">
          የድሮጋ ግሩፕ ከፍተኛ አመራርም የደንበኞችን ፍላጎት ዘርፉ የሚጠይቀውን መመሪያ በመተግበር በላቀ ደረጃ ለማሟላት ቁርጠኛ ነው፡፡
        </p>
      </div>
    )
  }
};

function QualityPolicySection() {
  const [lang, setLang] = useState<'ENG' | 'AMH'>('ENG');

  const variants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="bg-[#EBEBEB] w-full">
      <div className="flex flex-col lg:flex-row min-h-[850px] md:min-h-[600px] lg:min-h-[540px] max-w-[1920px] mx-auto">
        
        {/* Left Side */}
        <div className="w-full lg:w-[45%] p-8 md:p-12 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${lang}`}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                <span className="section-label block text-black/60">Quality Assurance</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight max-w-lg mt-2">
                  {qualityPolicyData[lang].title}
                </h2>
              </div>

              <div className="mt-12 lg:mt-auto pt-4">
                <div className="text-lg font-medium text-slate-900">
                  {qualityPolicyData[lang].ceoName}
                </div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1">
                  {qualityPolicyData[lang].ceoTitle}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[55%] p-8 md:p-12 flex flex-col relative overflow-hidden bg-[#F2F2F2]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${lang}`}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col justify-between"
            >
              <div className="mb-8 max-w-3xl lg:min-h-[400px]">
                {qualityPolicyData[lang].description}
              </div>
              
              <div className="mt-auto pt-4 flex justify-end">
                <button
                  onClick={() => setLang(lang === 'ENG' ? 'AMH' : 'ENG')}
                  className="bg-[#FFF200] text-black px-6 py-2.5 rounded-md text-xs font-semibold shadow-lg hover:bg-[#FFF200] hover:text-black hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
                >
                  {lang === 'ENG' ? 'አማ' : 'ENG'}
                  <svg 
                    className="w-3.5 h-3.5 text-gray-400 group-hover:text-black transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  );
}

const About = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.story-card');
    cards.forEach((card) => {
      const content = card.querySelector('.parallax-content');
      if (!content) return;

      card.addEventListener('mouseleave', () => {
        gsap.to(content, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
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
        <section className="page-hero-section">
          {/* Subtle curved lines background element (matching image) */}
          <div className="absolute top-0 left-0 w-full h-[55%] pointer-events-none overflow-hidden flex items-center justify-center">
            <style>
              {`
                .anim-bg-text {
                  fill: rgba(0, 0, 0, 0);
                  stroke: #000;
                  stroke-width: 2px;

                  /* Long visible line + long gap */
                  stroke-dasharray: 3000 1000;

                  /* Smooth infinite movement */
                  animation: strokeDashBg 20s linear infinite;

                  opacity: 0.55;

                  
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
          
          {/* Title pinned to top of hero */}
          <div className="absolute top-[140px] md:top-[275px] left-0 right-0 z-10 px-4 lg:px-12 xl:px-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-black text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
            >
              About Us
            </motion.h1>
          </div>

          {/* Description aligned with title on desktop */}
          <div className="w-full relative md:absolute md:top-[255px] z-10 px-4 lg:px-12 xl:px-16 pointer-events-none">
            <div className="flex justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm pointer-events-auto md:pt-6 lg:pt-10"
              >
                <p className="text-black font-normal text-lg leading-relaxed">
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
  <div className="w-full relative px-4 md:px-8 lg:px-12 xl:px-16 z-10">
    
    {/* Left Top Header */}
    <div className="text-left mb-16 md:mb-20">
      <span className="section-label block text-black/60">Leadership</span>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-2">
        Founders' Message
      </h2>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 relative">

      {/* Left Card */}
      <div className="lg:col-span-5 story-card group relative py-4 cursor-default">
        <div className="parallax-content relative z-10">
          <ScrollReveal>
            <div className="px-6 md:px-8 py-4 h-full flex flex-col">
              <p className="text-base leading-relaxed text-slate-600 mb-8">
                {storySlides[0].intro}
              </p>
              
              {/* Blockquote with Large Quote Marks */}
              <div className="mb-8 relative flex items-start gap-3">
                <span className="font-serif text-5xl md:text-6xl text-[#FFF200] leading-none select-none">
                  “
                </span>
                <p className="text-lg md:text-xl font-semibold leading-snug text-slate-900 italic pt-1">
                  {storySlides[0].highlight}’’
                </p>
              </div>

              <p className="text-base leading-relaxed text-slate-600 mb-10">
                {storySlides[0].outro}
              </p>
              <div className="inline-block text-left mt-auto pt-6 border-t border-slate-200">
                <p className="font-bold text-base text-slate-900">
                  {storySlides[0].signatureName}
                </p>
                <p className="text-sm mt-1 text-slate-500">
                  {storySlides[0].signatureRole}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Divider on large screens */}
      <div className="hidden lg:block lg:col-span-2 relative h-full">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 origin-top story-divider scale-y-100" />
      </div>

      {/* Right Card */}
      <div className="lg:col-span-5 story-card group relative py-4 cursor-default">
        <div className="parallax-content relative z-10 h-full">
          <ScrollReveal delay={0.2}>
            <div className="px-6 md:px-8 py-4 h-full flex flex-col">
              <p className="text-base leading-relaxed text-slate-600 mb-8">
                {storySlides[1].intro}
              </p>
              
              {/* Blockquote with Large Quote Marks */}
              <div className="mb-8 relative flex items-start gap-3">
                <span className="font-serif text-5xl md:text-6xl text-[#FFF200] leading-none select-none">
                  “
                </span>
                <p className="text-lg md:text-xl font-semibold leading-snug text-slate-900 italic pt-1">
                  {storySlides[1].highlight}’’
                </p>
              </div>

              <p className="text-base leading-relaxed text-slate-600 mb-10">
                {storySlides[1].outro}
              </p>
              <div className="inline-block text-left mt-auto pt-6 border-t border-slate-200">
                <p className="font-bold text-base text-slate-900">
                  {storySlides[1].signatureName}
                </p>
                <p className="text-sm mt-1 text-slate-500">
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
        <section className="py-20 border-y border-slate-100 bg-white">
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
            <JourneyStepper timeline={timeline} />
          </div>
        </section>

        <Certifications />

        <QualityPolicySection />

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
          <div className="w-full">
            <MarqueeClients clients={clients} variant="horizontal" />
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;