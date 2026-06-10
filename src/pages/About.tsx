import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import { MissionVisionValues } from "@/components/Missionvisionvalues";
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

const STORY_LEFT_BG = "https://images.pexels.com/photos/15571631/pexels-photo-15571631.jpeg";
const STORY_RIGHT_BG = "https://images.pexels.com/photos/5407246/pexels-photo-5407246.jpeg";

function StoryContent({ slide }: { slide: typeof storySlides[0] }) {
  return (
    <div className="max-w-sm text-center px-4">
      <div className="mx-auto mb-5 h-[3px] w-8 rounded-full bg-[#FFF200]" />
      <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-5">
        {slide.title}
      </h2>
      <p className="text-sm leading-relaxed text-white/65 mb-6">{slide.intro}</p>
      <p className="text-base font-semibold leading-snug mb-6 text-[#FFF200]">
        "{slide.highlight}"
      </p>
      <p className="text-sm leading-relaxed text-white/65 mb-8">{slide.outro}</p>
      <div className="inline-block text-left">
        <p className="font-bold text-sm text-white">{slide.signatureName}</p>
        <p className="text-xs mt-0.5 text-white/50">{slide.signatureRole}</p>
      </div>
    </div>
  );
}

import OurTeam from "@/components/OurTeam";
import JourneyStepper from "@/components/JourneyStepper";
import Certifications from "@/components/Certifications";
import MarqueeClients from "@/components/MarqueeClients";

const About = () => {
  const [missionCurrent, setMissionCurrent] = useState(0);

  // Story drag-reveal state
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const [dividerPct, setDividerPct] = useState(50);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionCurrent((prev) => (prev + 1) % missionVisionSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const getDividerPct = useCallback((clientX: number) => {
    const rect = storyContainerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.min(95, Math.max(5, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onMouseDown = () => setDragging(true);
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      setDividerPct(getDividerPct(e.clientX));
    },
    [dragging, getDividerPct],
  );
  const onMouseUp = () => setDragging(false);

  const onTouchStart = () => setDragging(true);
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragging) return;
      setDividerPct(getDividerPct(e.touches[0].clientX));
    },
    [dragging, getDividerPct],
  );
  const onTouchEnd = () => setDragging(false);

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

        {/* Story split — drag reveal */}
        <section
          ref={storyContainerRef}
          className="relative overflow-hidden"
          style={{
            height: "min(720px, 92vh)",
            cursor: dragging ? "col-resize" : "default",
            userSelect: "none",
          }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* ── RIGHT panel: bg + Group CEO Text (Clipped to the right) ── */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${dividerPct}%)` }}
          >
            <div
              className="absolute inset-0 brightness-50"
              style={{
                backgroundImage: `url(${STORY_RIGHT_BG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/78" />
            
            {/* Kept at absolute inset-0 so text stays dead-centered while clipPath cuts over it */}
            <div className="absolute inset-0 flex items-center justify-center px-10 py-16 pointer-events-none">
              <StoryContent slide={storySlides[1]} />
            </div>
          </div>

          {/* ── LEFT panel: bg + Founder Text (Clipped to the left) ── */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - dividerPct}% 0 0)` }}
          >
            <div
              className="absolute inset-0 brightness-50"
              style={{
                backgroundImage: `url(${STORY_LEFT_BG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/78" />
            
            {/* Kept at absolute inset-0 so text stays dead-centered while clipPath cuts over it */}
            <div className="absolute inset-0 flex items-center justify-center px-10 py-16 pointer-events-none">
              <StoryContent slide={storySlides[0]} />
            </div>
          </div>

          {/* ── Divider line + draggable handle ── */}
          <div
            className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
            style={{
              left: `${dividerPct}%`,
              transform: "translateX(-50%)",
              width: "2px",
              background: "rgba(255,242,0,0.5)",
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <motion.div
              animate={{ scale: dragging ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute flex items-center justify-center rounded-full shadow-xl"
              style={{ width: 48, height: 48, cursor: "col-resize", background: "#FFF200" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="3" width="2" height="12" rx="1" fill="#1a1a1a" />
                <rect x="8" y="3" width="2" height="12" rx="1" fill="#1a1a1a" />
                <rect x="14" y="3" width="2" height="12" rx="1" fill="#1a1a1a" />
              </svg>
            </motion.div>
          </div>
        </section>

        <MissionVisionValues />

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