import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import healthcareTeamImg from "@/assets/healthcare-team.jpg";
import teamImg from "@/assets/team.jpg";
import medicinesImg from "@/assets/medicines.jpg";
import medDevicesImg from "@/assets/medical-devices.jpg";
import supplyImg from "@/assets/supply-chain.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import labImg from "@/assets/lab-research.jpg";
import { Briefcase, MapPin, Clock, ArrowRight, Pill, TrendingUp, Truck, FileCheck } from "lucide-react";
import TickerBanner from "@/components/TickerBanner";
import CyclingWave from "@/components/CyclingWave";
import TextPressure from "@/components/TextPressure";
import AccordGallery from "@/components/AccordGallery";
import ImageSlider from "@/components/ImageSlider";
import { cardHover } from "@/lib/variants";
import HeroImage from "@/assets/Gallery/photo_2026-06-25_10-02-58.jpg";

const careersHeroImages = [
  {
    src: HeroImage,
    alt: "Careers at Droga Pharma",
  },
];

const openings = [
  {
    title: "Retail Pharmacist",
    department: "Retail Pharmacy",
    location: "Addis Ababa",
    type: "Full-time",
    image: teamImg,
    description:
      "Dispense medications, offer patient counseling, and ensure strict compliance with pharmacy laws in our retail network.",
  },
  {
    title: "Pharmaceutical Sales Representative",
    department: "Sales & Marketing",
    location: "Regional Offices",
    type: "Full-time",
    image: healthcareTeamImg,
    description:
      "Promote our WHO-approved medicine portfolio to physicians, hospitals, and pharmacies, and manage client accounts.",
  },
  {
    title: "Logistics & Warehousing Coordinator",
    department: "Supply Chain",
    location: "Addis Ababa",
    type: "Full-time",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    description:
      "Coordinate day-to-day warehouse operations, monitor cold-chain logistics, and ensure accurate distribution of medical devices.",
  },
  {
    title: "Quality Assurance Officer",
    department: "Compliance",
    location: "Addis Ababa",
    type: "Full-time",
    image: healthcareTeamImg,
    description:
      "Validate cold-chain operations, maintain regulatory compliance documentation, and implement standard GMP guidelines.",
  },
];

const whyDrogaItems = [
  {
    image: medicinesImg,
    label: "WHO-Approved Medicines",
    description:
      "Work with globally trusted products and contribute to safer treatment outcomes for patients. Build deep product knowledge while supporting essential healthcare access across Ethiopia.",
  },
  {
    image: medDevicesImg,
    label: "Medical Devices Portfolio",
    description:
      "Build expertise with advanced devices while supporting modern diagnostics and care delivery. Grow your technical capability through practical exposure to diverse technologies.",
  },
  {
    image: supplyImg,
    label: "End-to-End Supply Chain",
    description:
      "Gain hands-on experience across sourcing, planning, and delivery in a high-impact network. Learn how integrated operations drive reliability at national scale.",
  },
  {
    image: warehouseImg,
    label: "Cold-Chain Distribution",
    description:
      "Join a quality-driven logistics environment that protects product integrity at every stage. Strengthen your logistics and process-control skills in real operations.",
  },
  {
    image: labImg,
    label: "Quality Assurance & Compliance",
    description:
      "Grow your career with strong standards, continuous improvement, and professional accountability. Develop a disciplined quality mindset valued across healthcare industries.",
  },
  {
    image: healthcareTeamImg,
    label: "Healthcare Partner Network",
    description:
      "Collaborate with leading institutions and expand your impact through meaningful partnerships. Work with multidisciplinary teams and build a strong professional network.",
  },
];

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Dark Hero Section */}
      <section className="page-hero-section">
        {/* Subtle curved lines background element (matching image) */}
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
                CAREERS
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
              Careers
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
                  Build your career with us and help shape the future of healthcare
                  access in Ethiopia.
                </p>
              </motion.div>
            </div>
          </div>
      </section>

      {/* Image overlapping the hero - moved to right edge */}
      <section className="relative z-20 pl-4 lg:pl-12 xl:pl-16 pr-0 -mt-24 w-full md:w-[90%] lg:w-[85%] ml-auto">
        <div className="w-full h-[250px] md:h-[400px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
          <ImageSlider
            images={careersHeroImages}
            className="absolute inset-0 z-0"
          />
        </div>
      </section>

      {/* Open positions */}
      <section id="openings" className="bg-[#fcfcfc] pt-20 pb-0">
        <div className="w-full mx-auto px-4 lg:px-12 xl:px-16 mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40 mb-3"
          >
            Join the team
          </motion.p>
          <div className="flex items-end justify-between">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-black tracking-tight leading-none"
            >
              Open Positions
            </motion.h2>
            <span className="text-xs text-black/40 tracking-wide hidden md:block">
              4 roles · Ethiopia
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col">
          {openings.map((job, idx) => {
            const icons = [
              <Pill size={26} strokeWidth={1.5} />,
              <TrendingUp size={26} strokeWidth={1.5} />,
              <Truck size={26} strokeWidth={1.5} />,
              <FileCheck size={26} strokeWidth={1.5} />,
            ];

            return (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex flex-col md:grid group hover:bg-[#FFF200] transition-colors duration-300 cursor-pointer p-6 md:p-8 md:py-10 gap-6 md:gap-0 px-4 lg:px-12 xl:px-16 odd:bg-zinc-200/50 even:bg-transparent"
                style={{ gridTemplateColumns: "180px 1fr 1fr" }}
                onClick={() => window.location.href = `mailto:info@drogapharma.com?subject=Application for ${job.title}`}
              >
                {/* Left: icon + apply */}
                <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start gap-4 md:pr-6">
                  <div className="w-[52px] h-[52px] flex items-center justify-center shrink-0 text-black">
                    {icons[idx]}
                  </div>
                  <a
                    href={`mailto:info@drogapharma.com?subject=Application for ${job.title}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.07em] px-4 py-2 text-black bg-black/10 group-hover:bg-black group-hover:text-white transition-all duration-300"
                  >
                    Apply
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                </div>

                {/* Center: title + tags */}
                <div className="flex flex-col justify-center gap-3 md:px-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-black leading-tight tracking-tight">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-[5px]">
                    {[job.department, job.location, job.type].map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold uppercase tracking-[0.09em] px-[10px] py-1 bg-black/5 text-black/50 group-hover:bg-black/10 group-hover:text-black transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: description */}
                <div className="flex items-center md:pl-6">
                  <p className="text-sm leading-relaxed text-black/55 group-hover:text-black transition-colors duration-300">
                    {job.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#fcfcfc] pt-20 pb-20">
        <div className="w-full mx-auto px-4 lg:px-12 xl:px-16 mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40 mb-3"
          >
            Our environment
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-black tracking-tight leading-none"
          >
            Why Droga Pharma?
          </motion.h2>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {whyDrogaItems.map((item, idx) => {
              const isLeftCol = idx % 2 === 0;
              const row = Math.floor(idx / 2);
              const col = idx % 2;
              const isGreyDesktop = (row + col) % 2 === 0;
              const isGreyMobile = idx % 2 === 0;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className={`group flex flex-col hover:bg-[#FFF200] transition-colors duration-300 py-12 px-4
                    ${isLeftCol ? "md:pl-12 md:pr-10 xl:pl-16 xl:pr-10" : "md:pl-10 md:pr-12 xl:pl-10 xl:pr-16"}
                    ${isGreyMobile ? "bg-zinc-200/50" : "bg-transparent"}
                    ${isGreyDesktop ? "md:bg-zinc-200/50" : "md:bg-transparent"}
                  `}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30 group-hover:text-black/50 transition-colors duration-300 mb-6">
                    {["Product", "Technology", "Operations", "Logistics", "Standards", "Partnerships"][idx]}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-black tracking-tight leading-tight mb-4">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/50 group-hover:text-black/75 transition-colors duration-300 max-w-prose">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
