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
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import TickerBanner from "@/components/TickerBanner";
import CyclingWave from "@/components/CyclingWave";
import TextPressure from "@/components/TextPressure";
import AccordGallery from "@/components/AccordGallery";
import ImageSlider from "@/components/ImageSlider";
import { cardHover } from "@/lib/variants";

const careersHeroImages = [
  {
    src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1920&q=80",
    alt: "Careers at Droga Pharma",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
    alt: "Career growth opportunities",
  },
  {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80",
    alt: "Professional hiring process",
  },
];

const openings = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Addis Ababa",
    type: "Full-time",
    image: teamImg,
    description:
      "Build scalable enterprise applications using modern tech stacks.",
  },
  {
    title: "UI/UX Designer",
    department: "Product Design",
    location: "Addis Ababa",
    type: "Full-time",
    image: healthcareTeamImg,
    description:
      "Design intuitive user experiences for web and mobile platforms.",
  },
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Addis Ababa / Remote",
    type: "Full-time",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    description:
      "Drive data-driven marketing campaigns and build brand presence.",
  },
  {
    title: "IT Support Engineer",
    department: "IT Services",
    location: "Addis Ababa",
    type: "Full-time",
    image: healthcareTeamImg,
    description:
      "Provide technical support and manage infrastructure for enterprise clients.",
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
                CAREERS
              </text>
            </svg>
          </div>
        
        <div className="container-wide relative z-10 px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="flex flex-col">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
              >
                Careers
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-sm"
            >
              <p className="text-white font-medium text-lg leading-relaxed">
                Build your career with us and help shape the future of healthcare
                access in Ethiopia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image overlapping the hero - moved to right edge */}
      <section className="relative z-20 pl-4 md:pl-8 pr-0 -mt-24 mb-16 w-full md:w-[90%] lg:w-[85%] ml-auto">
        <div className="w-full h-[400px] md:h-[600px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
          <ImageSlider
            images={careersHeroImages}
            className="absolute inset-0 z-0"
          />
        </div>
      </section>

      {/* Why Droga — AccordGallery */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center mb-12"
          >
            Why Droga Pharma?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AccordGallery items={whyDrogaItems} height="450px" />
          </motion.div>
        </div>
      </section>

      {/* Open positions */}
      <section id="openings" className="bg-[#fcfcfc] pt-16 pb-0 border-t border-black/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight tracking-tight"
          >
            Open Positions
          </motion.h2>
        </div>

        <div className="flex flex-col w-full border-t border-black/10">
          {openings.map((job, idx) => (
            <motion.div
              key={job.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.1 } }
              }}
              className="w-full border-b border-black/10 group hover:bg-primary transition-colors duration-400 cursor-pointer"
            >
              <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row w-full px-4 sm:px-6 lg:px-8">
                {/* Left: Image */}
                <div className="w-full md:w-[30%] lg:w-[25%] py-4 shrink-0 pr-0 md:pr-6">
                  <div className="aspect-[16/9] w-full overflow-hidden relative">
                    <motion.img
                      src={job.image}
                      alt={job.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <span className="absolute top-4 left-4 inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-1 bg-black/60 text-white backdrop-blur-sm">
                      {job.type}
                    </span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="w-full md:w-[70%] lg:w-[75%] py-4 pl-0 md:pl-6 flex flex-col justify-center relative">
                  <div className="flex flex-col justify-start mb-2">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl leading-tight text-black group-hover:text-primary-foreground transition-colors duration-400 pr-4 max-w-[85%]">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-[#888] group-hover:text-primary-foreground/70 transition-colors duration-300 mt-2">
                      <span className="flex items-center gap-1">
                        <Briefcase size={11} />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <div className="pr-12 md:pr-16 lg:pr-24">
                    <p className="text-sm md:text-base leading-relaxed text-black/70 group-hover:text-primary-foreground/80 transition-colors duration-400">
                      {job.description}
                    </p>
                  </div>

                  <div className="mt-5">
                    <motion.a
                      href={`mailto:info@drogapharma.com?subject=Application for ${job.title}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold bg-black text-white px-5 py-2.5 shadow-sm group-hover:bg-white group-hover:text-black transition-all duration-300"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply Now
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300"
                      />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="pb-16"></div>
      </section>
    </div>
  );
};

export default CareersPage;
