import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import AccordGallery from "@/components/AccordGallery";
import PageTransition from "@/components/PageTransition";
import heroBgOne from "@/assets/herobg/2.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import supplyImg from "@/assets/supply-chain.jpg";
import healthcareTeamImg from "@/assets/healthcare-team.jpg";
import labImg from "@/assets/lab-research.jpg";

const galleryItems = [
  { image: heroBgOne, label: "Corporate overview" },
  { image: healthcareTeamImg, label: "Healthcare team" },
  { image: warehouseImg, label: "Warehouse operations" },
  { image: supplyImg, label: "Supply chain network" },
  { image: labImg, label: "Research and development" },
  { image: heroBgTwo, label: "Distribution support" },
  { image: heroBgThree, label: "Healthcare partnerships" },
];

const Gallery = () => {
  return (
    <PageTransition>
      <div className="bg-[#f5f5f5]">
        {/* Dark Hero Section */}
        <section className="relative bg-[#FFF200] pt-40 pb-48 overflow-hidden">
          {/* Subtle curved lines background element (matching image) */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
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
                GALLERY
              </text>
            </svg>
          </div>
          
          <div className="container-wide relative z-10 px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              <div className="flex flex-col">
                <span className="section-label text-black block mb-4">Media</span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-black text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
                >
                  Gallery
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm"
              >
                <p className="text-black font-medium text-lg leading-relaxed">
                  Visual moments from our operations, teams, and healthcare
                  partnerships.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image overlapping the hero - moved to right edge */}
        <section className="relative z-20 pl-4 md:pl-8 pr-0 -mt-24 mb-16 w-full md:w-[90%] lg:w-[85%] ml-auto">
          <div className="w-full h-[250px] md:h-[400px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
            <img src={heroBgOne} alt="Gallery" className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="section-padding-lg">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-black">
                  Droga in Pictures
                </h2>
                <p className="text-black/65 mt-3 max-w-2xl mx-auto text-lg">
                  A curated look at our facilities, people, and work across the
                  group.
                </p>
              </div>
            </ScrollReveal>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <AccordGallery items={galleryItems} height="560px" />
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Gallery;
