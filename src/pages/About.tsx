import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import AnimatedCounter from "@/components/AnimatedCounter";
import teamImg from "@/assets/team.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import heroImg from "@/assets/hero-pharma.jpg";
import labImg from "@/assets/lab-research.jpg";
import healthcareTeamImg from "@/assets/healthcare-team.jpg";
import supplyImg from "@/assets/supply-chain.jpg";
import Drogaconsult from "@/assets/drogacon.png";
import DrogaPh from "@/assets/drogapha.png";
import drogalab from "@/assets/drogalab.png";
import ema from "@/assets/ema.png";
import trust from "@/assets/trust.png";
import { staggerContainer, staggerItem, cardHover } from "@/lib/variants";

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
      "https://images.unsplash.com/photo-1454165833767-14639454174b?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Customer Centric",
    title: "Listen First",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Customer Centric",
    title: "Go The Extra Mile",
    image:
      "https://images.unsplash.com/photo-1461896756913-c8b40e72c514?auto=format&fit=crop&w=800&q=80",
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

const timeline = [
  {
    year: "2015",
    event:
      "Droga Pharma PLC established in Addis Ababa by healthcare professionals",
  },
  {
    year: "2017",
    event:
      "Expanded operations to serve both public and private health sectors",
  },
  {
    year: "2019",
    event: "Won first major government tenders for pharmaceutical supply",
  },
  {
    year: "2021",
    event: "Reached 1000+ products in stock, grew to 400+ employees",
  },
  {
    year: "2023",
    event:
      "Annual sales surpassed $25 million USD, launched Droga Research Grant",
  },
  {
    year: "2025",
    event: "Achieved ISO 9001 certification for import and wholesale divisions",
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

const missionBackgroundByTitle: Record<string, string> = {
  "Our Vision": healthcareTeamImg,
  "Our Mission": supplyImg,
};

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
              { src: heroImg, alt: "About" },
              { src: healthcareTeamImg, alt: "Healthcare team" },
              { src: labImg, alt: "Lab" },
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
        <section className="relative h-[420px] md:h-[360px] overflow-hidden">
          {missionVisionSlides.map((slide, index) => (
            <motion.div
              key={slide.title}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: index === missionCurrent ? 1 : 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: index === missionCurrent ? 2 : 1 }}
            >
              <img
                src={missionBackgroundByTitle[slide.title] ?? slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}

          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/95 via-black/70 to-black/25" />

          <div className="absolute inset-0 z-20 flex items-center">
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
                    className="font-display text-5xl md:text-4xl font-semibold text-white mb-8"
                  >
                    {currentMissionSlide.title}
                  </motion.h2>

                  <motion.p
                    key={currentMissionSlide.text}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                    className="text-white/95 text-2xl md:text-[1.5rem] leading-[1.35] max-w-4xl"
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
                            : "w-4 bg-white/40 hover:bg-white/70"
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
                    className="relative w-36 h-36 lg:w-44 lg:h-44 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border border-primary/60"
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
                      className="absolute inset-[-16px] rounded-full border border-white/25"
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
                        className="w-14 h-14 lg:w-16 lg:h-16 text-primary"
                        strokeWidth={2.2}
                      />
                    </motion.div>
                  </motion.div>
                </div>
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
        <section className="bg-primary section-padding">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                  Droga Group Companies
                </h2>
              </div>
            </ScrollReveal>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            >
              {groupCompanies.map((company) => (
                <motion.div key={company.name} variants={staggerItem}>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      variants={cardHover}
                      className="relative overflow-hidden rounded-2xl p-8 text-center border border-white/25 bg-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.22)] transition-all duration-400 hover:bg-white/15 hover:border-white/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.28)] group"
                    >
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/18 via-white/6 to-transparent" />

                      <div className="relative w-14 h-14 mx-auto mb-4 flex items-center justify-center overflow-hidden ">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="w-10 h-10 object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-display text-sm font-bold text-primary">
                            {company.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 3)
                              .toUpperCase()}
                          </span>
                        )}
                      </div>

                      <h3 className="relative font-display text-lg font-semibold text-primary-foreground group-hover:text-black mb-2 transition-colors duration-400">
                        {company.name}
                      </h3>
                      <p className="relative text-primary-foreground/70 text-sm group-hover:text-gray-300 transition-colors duration-400">
                        {company.desc}
                      </p>
                    </motion.div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

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
