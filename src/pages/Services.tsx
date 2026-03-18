import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import {
  Truck,
  Search,
  Shield,
  Thermometer,
  Package,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import warehouseImg from "@/assets/warehouse.jpg";
import supplyImg from "@/assets/supply-chain.jpg";
import labImg from "@/assets/lab-research.jpg";
import healthcareTeamImg from "@/assets/healthcare-team.jpg";
import { staggerContainer, staggerItem, cardHover } from "@/lib/variants";

const services = [
  {
    icon: Truck,
    title: "Pharmaceutical Import",
    desc: "End-to-end pharmaceutical importation from source countries to Ethiopia.",
    features: ["Global sourcing", "Customs clearance", "Door-to-door delivery"],
  },
  {
    icon: Search,
    title: "Supplier Sourcing",
    desc: "Strategic identification and vetting of WHO-approved pharmaceutical manufacturers.",
    features: [
      "Manufacturer audits",
      "Quality verification",
      "Price negotiation",
    ],
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    desc: "Complete regulatory support for EFDA product registration and licensing.",
    features: [
      "EFDA registration",
      "License management",
      "Compliance monitoring",
    ],
  },
  {
    icon: Thermometer,
    title: "Cold Chain Logistics",
    desc: "Temperature-controlled supply chain for heat-sensitive pharmaceuticals.",
    features: ["2-8°C storage", "Temperature monitoring", "GDP compliance"],
  },
  {
    icon: Package,
    title: "Wholesale Distribution",
    desc: "Nationwide wholesale distribution serving hospitals, pharmacies and clinics.",
    features: ["National coverage", "Flexible ordering", "Reliable delivery"],
  },
  {
    icon: FileCheck,
    title: "Quality Assurance",
    desc: "Rigorous quality control including batch verification and shelf-life management.",
    features: [
      "Batch testing",
      "Shelf-life tracking",
      "Anti-counterfeit measures",
    ],
  },
];

const Services = () => {
  return (
    <PageTransition>
      <div>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20 bg-foreground">
          <ImageSlider
            images={[
              { src: warehouseImg, alt: "Services" },
              { src: supplyImg, alt: "Supply chain" },
              { src: healthcareTeamImg, alt: "Healthcare" },
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
                What We Do
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
                Services
              </h1>
              <p className="text-background/55 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
                Complete pharmaceutical supply chain solutions for the Ethiopian
                market.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-[#b8b6b6] section-padding-lg">
          <div className="container-narrow">
            <ScrollReveal>
              <p className="text-black text-xl md:text-2xl font-light leading-relaxed max-w-3xl mb-16">
                From international sourcing to last-mile delivery, we provide
                comprehensive pharmaceutical supply chain solutions.
              </p>
            </ScrollReveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service) => (
                <motion.div key={service.title} variants={staggerItem}>
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={cardHover}
                    className="group h-full p-8 border border-background/10 bg-foreground hover:bg-primary transition-colors duration-400"
                  >
                    <div className="w-12 h-12 bg-background/10 flex items-center justify-center mb-6 group-hover:bg-primary-foreground/20 transition-colors duration-400">
                      <service.icon
                        size={22}
                        className="text-background group-hover:text-primary-foreground transition-colors duration-400"
                      />
                    </div>
                    <h3 className="font-display text-xl font-bold text-background group-hover:text-primary-foreground mb-3 transition-colors duration-400">
                      {service.title}
                    </h3>
                    <p className="text-background/50 text-sm leading-relaxed mb-6 group-hover:text-primary-foreground/70 transition-colors duration-400">
                      {service.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <span
                          key={f}
                          className="bg-background/10 text-background/50 text-xs font-medium px-3 py-1.5 group-hover:bg-primary-foreground/10 group-hover:text-primary-foreground/70 transition-colors duration-400"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Image */}
        <section className="relative h-[450px]">
          <ImageSlider
            images={[
              { src: supplyImg, alt: "Supply" },
              { src: warehouseImg, alt: "Warehouse" },
            ]}
            className="h-full"
            overlay
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <ScrollReveal>
              <div className="text-center px-6">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-background">
                  End-to-End Supply Chain
                </h2>
                <p className="text-background/60 mt-4 max-w-lg mx-auto text-lg">
                  From manufacturer to patient, we ensure quality at every step.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Process */}
        <section className="bg-primary section-padding-lg">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/60 block mb-3">
                  How It Works
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2">
                  Our Import Process
                </h2>
              </div>
            </ScrollReveal>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {[
                {
                  step: "01",
                  title: "Sourcing",
                  desc: "Identify WHO-approved manufacturers",
                },
                {
                  step: "02",
                  title: "Procurement",
                  desc: "Negotiate terms and place orders",
                },
                {
                  step: "03",
                  title: "Import & Clearance",
                  desc: "Handle shipping and customs",
                },
                {
                  step: "04",
                  title: "Distribution",
                  desc: "Deliver to healthcare providers",
                },
              ].map((item) => (
                <motion.div key={item.step} variants={staggerItem}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                  >
                    <motion.div
                      className="font-display text-5xl font-bold text-primary-foreground/25 mb-4"
                      whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-primary-foreground/60 text-sm">
                      {item.desc}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground py-16">
          <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="font-display text-xl md:text-2xl font-bold text-background">
              Ready to partner with us?
            </h3>
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-8 py-3.5 font-semibold text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0"
            >
              Get in touch <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Services;
