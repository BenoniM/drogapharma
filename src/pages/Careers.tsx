import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import TickerBanner from "@/components/TickerBanner";
// import CyclingWave from "@/components/CyclingWave";
// import TextPressure from "@/components/TextPressure";
// import AccordGallery from "@/components/AccordGallery";
import heroImg from "@/assets/hero-pharma.jpg";
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
    image: heroImg,
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
  },
  {
    image: medDevicesImg,
    label: "Medical Devices Portfolio",
  },
  {
    image: supplyImg,
    label: "End-to-End Supply Chain",
  },
  {
    image: warehouseImg,
    label: "Cold-Chain Distribution",
  },
  {
    image: labImg,
    label: "Quality Assurance & Compliance",
  },
  {
    image: healthcareTeamImg,
    label: "Healthcare Partner Network",
  },
];

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero with team photo */}
      <section className="relative h-[70vh] min-h-[600px] flex items-end pb-20 bg-foreground">
        <ImageSlider
          images={[
            { src: heroImg, alt: "Contact" },
            { src: healthcareTeamImg, alt: "Team" },
            { src: teamImg, alt: "Our team" },
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
        <div className="container-narrow relative z-[6] w-full">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label text-primary block mb-4">
              Vacancy
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
              Careers
            </h1>
            <p className="text-background/55 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
              We'd love to hear from you. Get Here.
            </p>
          </motion.div>
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
      <section id="openings" className="section-padding bg-[#f5f5f5]">
        <div className="container-narrow">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center mb-12 text-black"
          >
            Open positions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {openings.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                variants={cardHover}
                // initial="rest"
                whileHover="hover"
                className="overflow-hidden border border-background/10 h-full group bg-white hover:bg-primary transition-colors duration-400"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <motion.img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent group-hover:from-foreground/70 transition-all duration-500" />
                  <span className="absolute top-4 left-4 inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-background/15 text-background backdrop-blur-sm">
                    {job.type}
                  </span>
                </div>

                <div className="p-7 flex flex-col">
                  <h3 className="font-display text-lg font-semibold mb-3 leading-snug text-black group-hover:text-primary-foreground transition-colors duration-300">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-xs text-black/70 group-hover:text-primary-foreground/80 transition-colors duration-300">
                    <span className="flex items-center gap-1">
                      <Briefcase size={11} />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-black/80 mt-3 flex-1 group-hover:text-primary-foreground/70 transition-colors duration-300">
                    {job.description}
                  </p>
                  <motion.a
                    href={`mailto:info@drogapharma.com?subject=Application for ${job.title}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold bg-primary text-black px-5 py-2.5 self-start shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:bg-white  group-hover:text-black transition-all duration-300"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300"
                    />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
