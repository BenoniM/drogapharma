import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import AnimatedCounter from "@/components/AnimatedCounter";
import teamImg from "@/assets/abdi.jpg";
import team from "@/assets/healthcare-team.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import heroImg from "@/assets/hero-pharma.jpg";
import labImg from "@/assets/lab-research.jpg";
import heroBgOne from "@/assets/herobg/2.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";
import healthcareTeamImg from "@/assets/henoknew.jpg";
import supplyImg from "@/assets/supply-chain.jpg";
import Drogaconsult from "@/assets/drogacon.png";
import DrogaPh from "@/assets/drogapha.png";
import drogalab from "@/assets/drogalab.png";
import ema from "@/assets/ema.png";
import trust from "@/assets/trust.png";

const coreValues = [
  {
    category: "Integrity",
    title: "Do The Right Thing",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Integrity",
    title: "Walk The Talk",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Integrity",
    title: "Foster Sound Decisions",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Customer Centric",
    title: "Listen First",
    image:
      "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Customer Centric",
    title: "Go The Extra Mile",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Customer Centric",
    title: "Innovate To Add Value",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Care",
    title: "Care For Us (Employee & Terms)",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Care",
    title: "Care For Community",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Care",
    title: "Care For The Planet",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
  },
];

const clientLogoModules = import.meta.glob(
  "@/assets/Clients/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

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

const timeline = [
  {
    year: "2015",
    title: "BEGINNING",
    image: teamImg,
    event: "Establishment of Droga Pharma PLC (Whole Sale Division)",
  },
  {
    year: "2016",
    title: "SISTER COMPANY",
    image: labImg,
    event: "Establishment of Droga Physiotherapy Clinic",
  },
  {
    year: "2017",
    title: "GET LARGER",
    image: warehouseImg,
    event:
      "Establishment of Droga Pharma PLC (Import Division) and Bole Branch Physiotherapy Clinic",
  },
  {
    year: "2018",
    title: "AWARDED",
    image: supplyImg,
    event: "20+ Million USD Award in International Tender With Our Suppliers",
  },
  {
    year: "2019",
    title: "GROWING",
    image: teamImg,
    event: "Establishment of EMA Private Limited Company",
  },
  {
    year: "2020",
    title: "NEW FACTORY",
    image: heroImg,
    event: "Establishment of Trust Pharmaceuticals Manufacturing PLC",
  },
  {
    year: "2021",
    title: "NEW HEADQUARTER",
    image: healthcareTeamImg,
    event:
      "Establishment of R & D Unit, and 4Killo Branch Physiotherapy Clinic",
  },
  {
    year: "2022",
    title: "EXPANDING",
    image: warehouseImg,
    event: "Opening of hargelsa branch",
  },
  {
    year: "NOW",
    title: "WE ARE",
    image: heroImg,
    event:
      "• The Leading supplier of Diagnostic and Therapeutic Instruments, Devices and Equipments\n• Leading Orthopedics, Quality Sutures & Glucose Strip Supplier in Ethiopia\n• Continuous Supplier of rare Medicine, Consumables & Supplies\n• 1000+ Customers, 150+ Supplier\n• 246+ Employees, 3 Distribution Centers\n• 7 Regional representative offices\n• 25 Million USD Annual Turn Over",
  },
];

const groupCompanies = [
  {
    name: "Trust Pharma",
    desc: "Pharmaceutical manufacturing partner",
    url: "https://www.trustethiopharma.com/",
    logo: trust,
  },
  {
    name: "EMA Ethiopia",
    desc: "Healthcare solutions provider",
    url: "https://www.emaethiopia.com/",
    logo: ema,
  },
  {
    name: "Droga Pharmacy",
    desc: "Pharmaceutical solutions provider",
    url: "https://drogapharma.com/",
    logo: DrogaPh,
  },
  {
    name: "Droga Physiotherapy ",
    desc: "Physiotherapy services provider",
    url: "https://drogapharma.com/",
    logo: drogalab,
  },
  {
    name: "Droga consulting",
    desc: "Distribution and supply chain services",
    url: "https://drogaconsulting.com",
    logo: Drogaconsult,
  },
];

const missionVisionSlides = [
  {
    title: "Our Vision",
    text: "To be the leading group company in Ethiopia that creates health and wealth for human being.",
    image: heroImg,
  },
  {
    title: "Our Mission",
    text: "We build ethical companies that provide quality products and services by our talented members to serve humanity and contribute to socio economic development.",
    image: labImg,
  },
];

const storySlides = [
  {
    image: teamImg,
    alt: "Team",
    title: "Founder’s Message",
    intro:
      "Welcome to Droga Pharma, where our journey began with a simple yet profound vision: to make healthcare accessible, sustainable, and reliable for everyone. As the founder of this organization, my mission has always been to bridge the gap between professional care and the communities we serve, ensuring quality healthcare is within everyone's reach.",
    highlight:
      "The Heart of Droga Pharma lies in our unwavering commitment to making healthcare accessible.",
    outro:
      "Thank you for trusting us with your health and well-being. Together, we are building a brighter and healthier future.",
    signatureName: "Dr. Abdi Ermolo",
    signatureRole: "Deputy CEO, Founder",
  },
  {
    image: healthcareTeamImg,
    alt: "Healthcare",
    title: "Experienced Healthcare Professionals",
    intro:
      "Our team combines technical expertise and strong operational discipline to deliver quality healthcare products across Ethiopia.",
    highlight:
      "We collaborate with public and private health institutions to ensure reliable supply and timely service.",
    outro:
      "By focusing on quality, ethics, and long-term partnerships, we continue to strengthen access to essential medical solutions.",
    signatureName: "Mr. Henok Teka",
    signatureRole: "Group CEO",
  },
];

import OurTeam from "@/components/OurTeam";
import JourneyStepper from "@/components/JourneyStepper";
import Certifications from "@/components/Certifications";
import MarqueeClients from "@/components/MarqueeClients";

const About = () => {
  const [storyCurrent, setStoryCurrent] = useState(0);
  const [missionCurrent, setMissionCurrent] = useState(0);
  const activeStory = storySlides[storyCurrent] ?? storySlides[0];
  const currentMissionSlide =
    missionVisionSlides[missionCurrent] ?? missionVisionSlides[0];
  const currentTitle = currentMissionSlide?.title ?? "";
  const MissionIcon = currentTitle.toLowerCase().includes("vision")
    ? Eye
    : Target;

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionCurrent((prev) => (prev + 1) % missionVisionSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

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
              <span className="section-label text-primary block mb-4">
                About Us
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
                Company
              </h1>
              <p className="text-background/55 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
                Established in 2015, serving Ethiopia's healthcare needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story split */}
        <section className="bg-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[650px]">
            <div className="relative overflow-hidden">
              <ImageSlider
                images={storySlides.map((slide) => ({
                  src: slide.image,
                  alt: slide.alt,
                }))}
                className="min-h-[450px] lg:min-h-full h-full"
                onSlideChange={setStoryCurrent}
              />
            </div>
            <div className="flex items-center p-10 md:p-10 lg:p-16 bg-[#fffdfd] ">
              <ScrollReveal direction="right" key={activeStory.title}>
                <div className="px-8  md:px-12 md:py-14 max-w-[620px] text-center">
                  <h2 className="font-display text-4xl md:text-5xl font-semibold text-black mb-10">
                    {activeStory.title}
                  </h2>

                  <p className="text-[#414040] leading-relaxed text-sm md:text-base">
                    {activeStory.intro}
                  </p>

                  <div className="relative my-8 px-5">
                    <span className="absolute -left-1 -top-2 text-primary text-4xl leading-none font-semibold">
                      "
                    </span>
                    <p className="text-black font-semibold leading-snug text-lg">
                      {activeStory.highlight}
                    </p>
                    <span className="absolute -right-1 -bottom-4 text-primary text-4xl leading-none font-semibold">
                      "
                    </span>
                  </div>

                  <p className="text-[#414040] leading-relaxed text-sm md:text-base">
                    {activeStory.outro}
                  </p>

                  <div className="mt-12 text-left">
                    <p className="text-black font-bold text-lg">
                      {activeStory.signatureName}
                    </p>
                    <p className="text-black/65 text-sm mt-1">
                      {activeStory.signatureRole}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative bg-white py-16 md:py-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-transparent" />
          <div className="w-full px-6 md:px-12 lg:px-14">
            <div className="mx-auto max-w-[1300px] flex items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-[2px] w-36 bg-primary" />
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>

                <motion.h2
                  key={currentMissionSlide.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-display text-5xl md:text-4xl font-semibold text-slate-900 mb-8"
                >
                  {currentMissionSlide.title}
                </motion.h2>

                <motion.p
                  key={currentMissionSlide.text}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="text-slate-700 text-2xl md:text-[1.5rem] leading-[1.35] max-w-4xl"
                >
                  {currentMissionSlide.text}
                </motion.p>

                <div className="mt-8 flex items-center gap-2">
                  {missionVisionSlides.map((slide, index) => (
                    <button
                      key={slide.title}
                      onClick={() => setMissionCurrent(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        missionCurrent === index
                          ? "w-10 bg-primary"
                          : "w-4 bg-slate-300 hover:bg-slate-500"
                      }`}
                      aria-label={`Show ${slide.title}`}
                    />
                  ))}
                </div>
              </div>

              <div className="hidden md:flex flex-1 justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="relative w-36 h-36 lg:w-44 lg:h-44 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border border-black/45"
                    animate={{
                      scale: [1, 1.22, 1],
                      opacity: [0.8, 0.2, 0.8],
                    }}
                    transition={{
                      duration: 2.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-[-16px] rounded-full border border-slate-300"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    animate={{ y: [0, -7, 0], rotate: [0, 4, -4, 0] }}
                    transition={{
                      duration: 2.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <MissionIcon
                      className="w-14 h-14 lg:w-16 lg:h-16 text-black"
                      strokeWidth={2.2}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Values - Curved Carousel */}
        <section className="bg-primary py-10">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-primary" />
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="h-[2px] w-12 bg-primary" />
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-black uppercase tracking-tight">
                    Our Core Values
                  </h2>
                </div>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
              {coreValues.map((value, index) => {
                // Bento layout spans
                let spanClass = "col-span-1 row-span-1";
                if (index === 0) spanClass = "lg:col-span-2 lg:row-span-2"; // Large 1
                if (index === 1) spanClass = "lg:col-span-2 lg:row-span-1"; // Wide 1
                if (index === 4) spanClass = "lg:col-span-2 lg:row-span-2"; // Large 2
                if (index === 5) spanClass = "lg:col-span-2 lg:row-span-1"; // Wide 2
                if (index === 8)
                  spanClass = "sm:col-span-2 lg:col-span-4 lg:row-span-1"; // Full width bottom

                return (
                  <ScrollReveal
                    key={value.title}
                    delay={index * 0.05}
                    className={spanClass}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative h-full w-full rounded-2xl overflow-hidden  bg-[#1a1a1a]"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={value.image}
                          alt={value.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <span className="text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]  backdrop-blur-md px-3 py-1 rounded-md inline-block border border-white/10">
                            {value.category}
                          </span>
                        </div>

                        <h3
                          className={`font-display font-bold text-white transition-all duration-300 group-hover:translate-x-1 ${
                            index === 0 || index === 4 || index === 8
                              ? "text-2xl md:text-3xl max-w-sm"
                              : "text-lg md:text-xl"
                          }`}
                        >
                          {value.title}
                        </h3>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Image break */}
        <section className="relative h-[450px]">
          <ImageSlider
            images={[
              { src: supplyImg, alt: "Supply chain" },
              { src: warehouseImg, alt: "Warehouse" },
            ]}
            className="h-full"
            overlay
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <ScrollReveal>
              <div className="text-center px-6">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-background">
                  Global Pharmaceutical Network
                </h2>
                <p className="text-background/60 mt-4 max-w-lg mx-auto text-lg">
                  Connected to leading manufacturers across Europe, Asia, and
                  the Middle East.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Timeline / Journey */}
        <section className="bg-[#ebebeb] py-10 border-y border-slate-100">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="section-label block mb-3 text-black/60">
                  Our Journey
                </span>
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

        <OurTeam />

        <Certifications />

        {/* Group Companies */}
        <section className="relative section-padding bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f4f6fb_55%,_#eef2f7_100%)] overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  Droga Group Companies
                </h2>
              </div>
            </ScrollReveal>
            <div className="relative overflow-hidden py-3">
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#f4f6fb] to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#f4f6fb] to-transparent pointer-events-none" />

              <div className="flex animate-marquee">
                {[...groupCompanies, ...groupCompanies].map(
                  (company, index) => (
                    <a
                      key={`${company.name}-${index}`}
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 mx-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.03, y: -3 }}
                        className="group relative min-w-[250px] rounded-2xl border border-slate-200/80 bg-white/85 px-7 py-6 text-center shadow-[0_6px_20px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-white hover:shadow-[0_14px_34px_rgba(15,23,42,0.16)]"
                      >
                        <h3 className="absolute inset-0 flex items-center justify-center px-5 font-display text-base md:text-lg font-semibold text-slate-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {company.name}
                        </h3>

                        <div className="h-10 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="h-9 w-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* { Trusted Partners / Clients } */}
        <section className="bg-[#f5f5f5] section-padding ">
          <div className="container-narrow mb-12">
            <ScrollReveal>
              <div className="text-center">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/60 block mb-4">
                  Trusted Partners
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                  Our Clients
                </h2>
                <p className="text-primary-foreground/60 mt-3 max-w-md mx-auto">
                  Serving leading healthcare organizations across Ethiopia
                </p>
              </div>
            </ScrollReveal>
          </div>
          <MarqueeClients clients={clients} />
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
