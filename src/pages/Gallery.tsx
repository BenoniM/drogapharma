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
        <section className="relative h-[60vh] min-h-[460px] flex items-end pb-20 bg-foreground overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/75" />
          <div className="container-narrow relative z-10 w-full">
            <ScrollReveal>
              <div className="max-w-2xl">
                <span className="section-label text-primary block mb-4">
                  Media
                </span>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
                  Gallery
                </h1>
                <p className="text-background/70 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
                  Visual moments from our operations, teams, and healthcare
                  partnerships.
                </p>
              </div>
            </ScrollReveal>
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
