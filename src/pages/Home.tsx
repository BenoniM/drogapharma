import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Pill,
  FlaskConical,
  Stethoscope,
  Bone,
  Award,
  Globe,
  Users,
  TrendingUp,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSlider from "@/components/HeroSlider";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import AnimatedCounter from "@/components/AnimatedCounter";
import MarqueeClients from "@/components/MarqueeClients";
import TestimonialsSection from "@/components/TestimonialsSection";
import CMSBanner from "@/components/CMSBanner";
import heroImg from "@/assets/hero-pharma.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import productsImg from "@/assets/products.jpg";
import teamImg from "@/assets/CertificateofRecognitionFromMinistryofHealthEthiopia.jpg";

import labImg from "@/assets/DrogaResearchGrant2023Winnerjpg.jpg";
import supplyImg from "@/assets/supply-chain.jpg";
import heroBgMain from "@/assets/herobg/IMG_2004.jpg";
import heroBgSecondary from "@/assets/herobg/5.jpg";
import Headquarters from "@/assets/building.jpg";
import medicinesImg from "@/assets/medicines.jpg";
import healthcareTeamImg from "@/assets/CertificateofAppreciationFromTheMinistryofHealth.jpg";
import medDevicesImg from "@/assets/medical-devices.jpg";
import { staggerContainer, staggerItem, cardHover } from "@/lib/variants";

const heroSlides = [
  {
    image: heroBgMain,
    title: "Serving The People!",
    subtitle:
      "Droga Pharma Pvt.Ltd Co. is a private limited company based in Addis Ababa, Ethiopia, aiming on sustainable supply of quality medicines, sutures, orthopedic implants and medical devices.",
    cta: { label: "More about us", to: "/about" },
  },
  {
    image: heroBgSecondary,
    title: "Quality You Can Trust",
    subtitle:
      "WHO-approved products from globally certified manufacturers ensuring the highest standards.",
    cta: { label: "Our Products", to: "/products" },
  },
  {
    image: supplyImg,
    title: "Our Experts",
    subtitle:
      "Highly experienced pharmacists and manufacturing industry professionals that drive our partners' success.",
    cta: { label: "Our Team", to: "/about" },
  },
];

const categories = [
  {
    icon: Pill,
    title: "Pharmaceuticals",
    desc: "Quality medicines from WHO-approved global manufacturers",
    img: medicinesImg,
    count: "500+",
  },
  {
    icon: Bone,
    title: "Orthopedic Implants",
    desc: "High-quality orthopedic implants and surgical instruments",
    img: medDevicesImg,
    count: "200+",
  },
  {
    icon: Stethoscope,
    title: "Medical Devices",
    desc: "Disposable medical devices and diagnostic equipment",
    img: labImg,
    count: "150+",
  },
  {
    icon: FlaskConical,
    title: "Sutures & Supplies",
    desc: "Surgical sutures and essential medical supplies",
    img: productsImg,
    count: "100+",
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

const Home = () => {
  const clientLogoModules = import.meta.glob(
    "@/assets/OurPartners/*.{png,jpg,jpeg,webp,svg}",
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

  return (
    <PageTransition>
      <div>
        <HeroSlider slides={heroSlides} />

        {/* Quick nav strip */}
        <section className="bg-[#eeeaea] border-b border-background/10">
          <div className="container grid grid-cols-2 md:grid-cols-5">
            {[
              { label: "Medical", icon: Pill, to: "/products" },
              { label: "Medical Devices", icon: Stethoscope, to: "/products" },
              { label: "Laboratory", icon: FlaskConical, to: "/products" },
              { label: "Medical Equipment", icon: TrendingUp, to: "/products" },
              {
                label: "Orthopedics and Surgical Instruments and Implants",
                icon: Bone,
                to: "/products",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + i * 0.08,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={item.to}
                  className="group flex items-center gap-3 py-5 px-6 text-sm font-semibold text-background border-r border-background/10 last:border-r-0 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <item.icon
                    size={16}
                    className="opacity-40 group-hover:opacity-100 transition-opacity duration-300 text-black"
                  />
                  <span className="hidden md:inline text-black ">
                    {item.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white section-padding-lg">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="max-w-4xl">
                <span className="section-label block mb-6 text-black ">
                  About Droga Pharma
                </span>
                <h2 className="font-display text-3xl md:text-[2.75rem] font-bold text-black leading-[1.15] mb-8">
                  Established in 2015, we are working in the pharmaceuticals
                  import, wholesale and retail business, targeting the public as
                  well as the private health sector of Ethiopia.
                </h2>
                <p className="text-[#5c5858] text-lg leading-relaxed max-w-2xl">
                  Our team is made up of highly experienced pharmacists and
                  manufacturing industry professionals who utilize their unique
                  knowledge to create and implement cutting-edge management
                  systems.
                </p>
                <Link
                  to="/about"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-black border-b-2 border-background/20 pb-1 hover:border-[#7a7979] hover:text-[#7a7979] transition-all duration-300 group"
                >
                  Learn more about our company
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats — Yellow background */}
        <section className="bg-primary overflow-hidden">
          <div className="container-narrow py-20 md:py-24">
            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                {[
                  { value: "400+", label: "Employees", icon: Users },
                  { value: "1000+", label: "Products In Stock", icon: Pill },
                  { value: "$25M+", label: "Annual Sales", icon: TrendingUp },
                  {
                    value: "$60M+",
                    label: "Government Tenders Won",
                    icon: Award,
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <stat.icon
                      size={18}
                      className="text-primary-foreground/50 mx-auto mb-4"
                    />
                    <AnimatedCounter
                      value={stat.value}
                      className="font-display text-4xl md:text-5xl font-bold text-primary-foreground"
                    />
                    <div className="text-primary-foreground/60 text-sm mt-3 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Split — HQ */}
        <section className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[650px] ">
            <div className="relative overflow-hidden bg-[#f5f5f5] min-h-[450px] lg:min-h-full h-full flex items-center justify-center p-4 md:p-6">
              <img
                src={Headquarters}
                alt="Droga Pharma headquarters"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center p-10 md:p-16 lg:p-20">
              <ScrollReveal direction="right">
                <span className="section-label text-[#5c5858]">
                  Our Headquarters
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-4 mb-6 leading-tight">
                  Quality Products for Ethiopia
                </h2>
                <p className="text-[#5c5858] leading-relaxed mb-4">
                  Our headquarter is located in the center of Addis Ababa. This
                  is where we come up with new ideas and products to make
                  people's lives better.
                </p>
                <p className="text-[#5c5858] leading-relaxed mb-8">
                  Our team creates and implements cutting-edge management
                  systems and programs that drive our partners' success.
                </p>
                <Link to="/about" className="btn-primary">
                  Learn more
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Products — Yellow hover cards */}
        <section className="bg-[#f5f5f5] section-padding-lg">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                <div className="max-w-2xl">
                  <span className="section-label block mb-4 text-[#5c5858]">
                    What We Offer
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-black leading-tight">
                    Products
                  </h2>
                  <p className="text-[#5c5858] mt-4 text-lg leading-relaxed">
                    Quality pharmaceutical products, medical devices, and
                    surgical supplies from trusted international manufacturers.
                  </p>
                </div>
                <Link
                  to="/products"
                  className=" text-sm flex-shrink-0 bg-primary text-black px-6 py-3 inline-flex items-center gap-2 transition-all duration-300 hover:bg-primary/90"
                >
                  View all products <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categories.map((cat) => (
                <motion.div key={cat.title} variants={staggerItem}>
                  <Link to="/products" className="group block">
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      variants={cardHover}
                      className="overflow-hidden bg-white border border-background/10 group-hover:bg-primary transition-colors duration-400"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <motion.img
                          src={cat.img}
                          alt={cat.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.06 }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent group-hover:from-foreground/70 transition-all duration-500" />
                        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                          <cat.icon size={22} className="text-background" />
                          <span className="text-background/50 text-xs font-display font-semibold">
                            {cat.count} items
                          </span>
                        </div>
                      </div>
                      <div className="px-5 py-4">
                        <h3 className="font-display font-semibold text-lg text-black group-hover:text-primary-foreground transition-colors duration-300">
                          {cat.title}
                        </h3>
                        <p className="text-sm mt-1.5 leading-relaxed text-black group-hover:text-primary-foreground/70 transition-colors duration-300">
                          {cat.desc}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Full-width CTA banner */}
        <section className="relative h-[500px]">
          <ImageSlider
            images={[
              { src: supplyImg, alt: "Supply chain" },
              { src: warehouseImg, alt: "Warehouse" },
              { src: medDevicesImg, alt: "Medical devices" },
            ]}
            className="h-full"
            overlay
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <ScrollReveal>
              <div className="text-center px-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-14 h-14 bg-primary/20 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm"
                >
                  <Globe size={24} className="text-primary" />
                </motion.div>
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-background leading-tight">
                  Do you have questions
                  <br className="hidden md:block" /> about our products?
                </h2>
                <p className="text-background/55 mt-5 max-w-lg mx-auto text-lg">
                  Our team is ready to help you find the right solutions for
                  your healthcare needs.
                </p>
                <Link
                  to="/contact"
                  className="btn-primary text-base px-10 py-4 mt-10 inline-flex"
                >
                  Contact us <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Reverse split */}
        <section className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px]">
            <div className="flex p-10 md:p-16 lg:p-20 order-2 lg:order-1">
              <ScrollReveal
                direction="left"
                className="h-full w-full flex flex-col"
              >
                <span className="section-label text-[#5c5858]">
                  Our Experts
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-4 mb-6 leading-tight">
                  Industry Leaders
                </h2>
                <p className="text-[#5c5858] leading-relaxed mb-8">
                  Our team is made up of highly experienced and renowned
                  pharmacists and manufacturing industry professionals that
                  utilize their unique knowledge to create and implement
                  cutting-edge management systems.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["WHO Approved", "ISO Certified", "GMP Compliant"].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2"
                      >
                        <Award size={12} />
                        {badge}
                      </span>
                    ),
                  )}
                </div>
                <Link
                  to="/about"
                  className="bg-[#eae6e6] p-2 mt-auto self-start hover:bg-[#d1caca] transition-colors duration-300 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Learn more
                </Link>
              </ScrollReveal>
            </div>
            <div className="relative overflow-hidden order-1 lg:order-2">
              <ImageSlider
                images={[
                  { src: warehouseImg, alt: "Distribution" },
                  { src: supplyImg, alt: "Supply chain" },
                ]}
                className="min-h-[450px] lg:min-h-full h-full"
              />
            </div>
          </div>
        </section>

        {/* News — yellow hover cards */}
        <section id="news" className="bg-[#f5f5f5] section-padding-lg">
          <div className="container-narrow">
            <ScrollReveal>
              <div className="mb-16">
                <span className="section-label block mb-4 text-[#5c5858]">
                  Latest Updates
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-black leading-tight">
                  News & Achievements
                </h2>
              </div>
            </ScrollReveal>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title:
                    "Certificate of Appreciation From The Ministry of Health",
                  desc: "Recognized for our outstanding contribution to Ethiopia's healthcare sector by the Ministry of Health.",
                  img: healthcareTeamImg,
                  tag: "Award",
                },
                {
                  title: "Certificate of Recognition From Ministry of Health",
                  desc: "In recognition of our financial support in realizing the 2024 safe motherhood month commemoration.",
                  img: teamImg,
                  tag: "Recognition",
                },
                {
                  title: "Droga Research Grant 2023 Winner",
                  desc: "Droga research grant is organized annually to encourage & support research in healthcare.",
                  img: labImg,
                  tag: "Research",
                },
              ].map((news) => (
                <motion.div key={news.title} variants={staggerItem}>
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={cardHover}
                    className="overflow-hidden border border-background/10 h-full group bg-white hover:bg-primary transition-colors duration-400"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <motion.img
                        src={news.img}
                        alt={news.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <div className="p-7">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-background/10 text-black group-hover:bg-primary-foreground/10 group-hover:text-primary-foreground transition-colors duration-400">
                        {news.tag}
                      </span>
                      <h3 className="font-display text-lg font-semibold mt-4 mb-3 leading-snug text-black group-hover:text-primary-foreground transition-colors duration-300">
                        {news.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-black group-hover:text-primary-foreground/70 transition-colors duration-300">
                        {news.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <TestimonialsSection />

        {/* Clients */}
        <section className="bg-[#fffdfd] section-padding border-t border-primary-foreground/10">
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

        <CMSBanner />
      </div>
    </PageTransition>
  );
};

export default Home;
