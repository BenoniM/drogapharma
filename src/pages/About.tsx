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
import qualityPolicyImg from "@/assets/droga-quality-policy.jpg";

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
        {/* Hero */}
        <section className="relative h-[75vh] min-h-[550px] flex items-end pb-20 bg-foreground">
          <ImageSlider
            images={[
              { src: heroBgOne, alt: "About" },
              { src: heroBgTwo, alt: "Healthcare team" },
              { src: heroBgThree, alt: "Lab" },
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
          <div className="relative z-[6] w-full px-6 md:px-12 lg:px-36">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl mr-auto text-left"
            >
              <span className="section-label text-primary block mb-4">About Us</span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
                Company
              </h1>
              <p className="text-background/55 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
                Established in 2015, serving Ethiopia's healthcare needs.
              </p>
            </motion.div>
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

        <section className="bg-[#ebebeb] py-12 md:py-16">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="section-label block mb-3 text-black/60">Quality Policy</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-2">
                  Droga Quality Policy
                </h2>
              </div>
            </ScrollReveal>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-[0_18px_60px_rgba(15,23,42,0.16)]"
            >
              <img
                src={qualityPolicyImg}
                alt="Droga Quality Policy"
                className="block w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Clients */}
        <section className="bg-[#fffdfd] section-padding border-t border-primary-foreground/10">
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