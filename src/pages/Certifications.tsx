import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import { Award, ArrowRight, Filter } from "lucide-react";
import heroImg from "@/assets/hero-pharma.jpg";
import labImg from "@/assets/lab-research.jpg";
import supplyImg from "@/assets/supply-chain.jpg";
import medicinesImg from "@/assets/medicines.jpg";
import heroBgOne from "@/assets/herobg/2.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";
import certificateRecognitionImg from "@/assets/CertificateofRecognitionFromMinistryofHealthEthiopia.jpg";
import researchGrant2023Img from "@/assets/DrogaResearchGrant2023Winnerjpg.jpg";
import researchGrant2026Img from "@/assets/DROGARESEARCHGRANT2026.png";
import { staggerContainer, staggerItem, cardHover } from "@/lib/variants";

const certificationCardImages = [
  certificateRecognitionImg,
  researchGrant2023Img,
  researchGrant2026Img,
];

const certifications = [
  {
    title: "ISO 9001:2015",
    full: "Quality Management System — Import Division",
    desc: "Our import division is certified under ISO 9001:2015, demonstrating our commitment to systematic quality management.",
    points: [
      "Process standardization",
      "Continuous improvement",
      "Customer focus",
    ],
    type: "ISO",
    year: 2019,
  },
  {
    title: "ISO 9001:2015",
    full: "Quality Management System — Wholesale Division",
    desc: "Our wholesale division also holds ISO 9001:2015 certification, ensuring quality standards across distribution.",
    points: [
      "Distribution quality",
      "Supply chain management",
      "Service excellence",
    ],
    type: "ISO",
    year: 2020,
  },
  {
    title: "GMP Certified",
    full: "Good Manufacturing Practice",
    desc: "All our supplier partners are certified under Good Manufacturing Practice standards.",
    points: [
      "Production quality control",
      "Facility hygiene standards",
      "Process validation",
    ],
    type: "GMP",
    year: 2017,
  },
  {
    title: "WHO Prequalified",
    full: "World Health Organization",
    desc: "We source exclusively from WHO-prequalified manufacturers, meeting the highest international standards.",
    points: [
      "Global quality benchmark",
      "Rigorous assessment",
      "Ongoing compliance",
    ],
    type: "WHO",
    year: 2018,
  },
  {
    title: "EFDA Approved",
    full: "Ethiopian FDA Regulatory Approval",
    desc: "All imported products are registered and approved by the Ethiopian Food and Drug Authority.",
    points: ["Product registration", "Import licensing", "Pharmacovigilance"],
    type: "Regulatory",
    year: 2015,
  },
  {
    title: "GDP Compliant",
    full: "Good Distribution Practice",
    desc: "Our distribution operations comply with GDP guidelines, ensuring product integrity.",
    points: [
      "Temperature mapping",
      "Transport validation",
      "Traceability systems",
    ],
    type: "GDP",
    year: 2021,
  },
];

const types = ["All", "ISO", "GMP", "WHO", "Regulatory", "GDP"];
const years = ["All", "2015-2018", "2019-2021", "2022+"];

const Certifications = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const filtered = certifications.filter((cert) => {
    if (selectedType !== "All" && cert.type !== selectedType) return false;
    if (selectedYear !== "All") {
      if (
        selectedYear === "2015-2018" &&
        (cert.year < 2015 || cert.year > 2018)
      )
        return false;
      if (
        selectedYear === "2019-2021" &&
        (cert.year < 2019 || cert.year > 2021)
      )
        return false;
      if (selectedYear === "2022+" && cert.year < 2022) return false;
    }
    return true;
  });

  return (
    <PageTransition>
      <div>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20 bg-foreground">
          <ImageSlider
            images={[
              { src: heroBgOne, alt: "Certifications" },
              { src: heroBgTwo, alt: "Quality" },
              { src: heroBgThree, alt: "Medicines" },
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
                Quality Standards
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
                Certifications
              </h1>
              <p className="text-background/55 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
                Our commitment to quality is backed by internationally
                recognized standards.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-[#f5f5f5] section-padding-lg">
          <div className="container-narrow">
            <ScrollReveal>
              <p className="text-black text-xl md:text-2xl font-light leading-relaxed max-w-3xl mb-12">
                We maintain the highest industry standards through rigorous
                certifications and continuous compliance monitoring.
              </p>
            </ScrollReveal>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="flex items-center gap-2 mr-4">
                <Filter size={16} className="text-black" />
                <span className="text-xs font-semibold text-black uppercase tracking-wider">
                  Filter:
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-semibold text-black uppercase tracking-wider self-center mr-1">
                  Type:
                </span>
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedType === t
                        ? "bg-primary text-black"
                        : "bg-background/10 text-black hover:bg-background/20"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-semibold text-black uppercase tracking-wider self-center mr-1">
                  Date:
                </span>
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedYear === y
                        ? "bg-primary text-black"
                        : "bg-background/10 text-black hover:bg-background/20"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((cert, i) => (
                <motion.div key={`${cert.title}-${i}`} variants={staggerItem}>
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={cardHover}
                    className="overflow-hidden border border-background/10 h-full group bg-white hover:bg-primary transition-colors duration-400"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={
                          certificationCardImages[
                            i % certificationCardImages.length
                          ]
                        }
                        alt={cert.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent group-hover:from-foreground/70 transition-all duration-500" />
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                        <Award size={22} className="text-background" />
                        <span className="text-background/70 text-xs font-display font-semibold">
                          {cert.year}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-background/10 text-black group-hover:bg-primary-foreground/10 group-hover:text-primary-foreground transition-colors duration-400">
                        {cert.type}
                      </span>
                      <h3 className="font-display text-xl font-bold mt-4 mb-2 text-black group-hover:text-primary-foreground transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-primary text-xs font-medium mb-3 group-hover:text-primary-foreground/80 transition-colors duration-300">
                        {cert.full}
                      </p>
                      <p className="text-sm leading-relaxed text-black/80 group-hover:text-primary-foreground/70 transition-colors duration-300">
                        {cert.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-background/50 text-lg">
                  No certifications found matching your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Image */}
        <section className="relative h-[450px]">
          <ImageSlider
            images={[
              { src: supplyImg, alt: "Quality" },
              { src: labImg, alt: "Lab" },
            ]}
            className="h-full"
            overlay
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <ScrollReveal>
              <div className="text-center px-6">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-background">
                  Quality Made for Ethiopia
                </h2>
                <p className="text-background/60 mt-4 max-w-lg mx-auto text-lg">
                  Every product meets international quality benchmarks.
                </p>
                <Link to="/contact" className="btn-primary mt-8 inline-flex">
                  Contact us <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Certifications;
