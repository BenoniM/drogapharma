import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  ChevronRight,
  Tag,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import { staggerContainer, staggerItem } from "@/lib/variants";
import heroImg from "@/assets/hero-pharma.jpg";
import healthcareTeamImg from "@/assets/healthcare-team.jpg";
import teamImg from "@/assets/team.jpg";
import labImg from "@/assets/lab-research.jpg";
import medicinesImg from "@/assets/medicines.jpg";
import medDevicesImg from "@/assets/medical-devices.jpg";
import supplyImg from "@/assets/supply-chain.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import heroBgOne from "@/assets/herobg/2.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";

const categories = [
  "All",
  "Research",
  "News",
  "Health Tips",
  "Awards",
  "Innovation",
];

const posts = [
  {
    id: 1,
    title: "Certificate of Appreciation From The Ministry of Health",
    excerpt:
      "Recognized for our outstanding contribution to Ethiopia's healthcare sector by the Ministry of Health in a prestigious ceremony held in Addis Ababa.",
    img: healthcareTeamImg,
    category: "Awards",
    date: "March 15, 2025",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Certificate of Recognition From Ministry of Health",
    excerpt:
      "In recognition of our financial support in realizing the 2024 safe motherhood month commemoration, contributing to improved maternal health outcomes.",
    img: teamImg,
    category: "Recognition",
    date: "February 28, 2025",
    readTime: "3 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Droga Research Grant 2024 — Open Applications",
    excerpt:
      "The Droga Research Grant is organized annually to encourage and support healthcare research across Ethiopia. Applications are now open for 2024.",
    img: labImg,
    category: "Research",
    date: "January 10, 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 4,
    title: "WHO-Approved Medicines: What It Means for Patients",
    excerpt:
      "Understanding the WHO prequalification process and why it matters for the safety and efficacy of the medicines you rely on every day.",
    img: medicinesImg,
    category: "Health Tips",
    date: "December 5, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Expanding Our Medical Device Portfolio",
    excerpt:
      "Droga Pharma expands its catalog to include next-generation diagnostic and surgical equipment sourced from globally certified manufacturers.",
    img: medDevicesImg,
    category: "Innovation",
    date: "November 20, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Strengthening Cold-Chain Distribution Across Ethiopia",
    excerpt:
      "Our upgraded cold-chain infrastructure now ensures temperature-sensitive medicines reach even the most remote healthcare facilities safely and on time.",
    img: supplyImg,
    category: "News",
    date: "October 8, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 7,
    title: "Inside Our State-of-the-Art Warehouse Facility",
    excerpt:
      "A behind-the-scenes look at how Droga Pharma manages one of Ethiopia's most advanced pharmaceutical warehousing and logistics operations.",
    img: warehouseImg,
    category: "Innovation",
    date: "September 14, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 8,
    title: "Supporting Safe Motherhood Month 2024",
    excerpt:
      "Droga Pharma proudly contributed to the national Safe Motherhood Month, providing essential medicines and medical supplies to government health facilities.",
    img: heroImg,
    category: "News",
    date: "August 22, 2024",
    readTime: "3 min read",
    featured: false,
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = posts.filter((post) => {
    const matchCat =
      activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Dark Hero Section */}
        <section className="relative bg-[#FFF200] pt-40 pb-48 overflow-hidden">
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
                OUR BLOG
              </text>
            </svg>
          </div>
          
          <div className="w-full relative z-10 px-4 lg:px-12 xl:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              <div className="flex flex-col">
                <span className="section-label text-black block mb-4">Insights & Updates</span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-black text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
                >
                  Our Blog
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm"
              >
                <p className="text-black font-normal text-lg leading-relaxed">
                  Stories, research, and news from Droga Pharma — Ethiopia's
                  leading pharmaceutical distributor.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image overlapping the hero - moved to right edge */}
        <section className="relative z-20 pl-4 lg:pl-12 xl:pl-16 pr-0 -mt-24 mb-16 w-full md:w-[90%] lg:w-[85%] ml-auto">
          <div className="w-full h-[250px] md:h-[400px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
            <ImageSlider
              images={[
                { src: heroBgOne, alt: "Droga Pharma blog" },
                { src: heroBgTwo, alt: "Healthcare" },
                { src: heroBgThree, alt: "Research" },
              ]}
              className="absolute inset-0 z-0"
            />
          </div>
        </section>


        {/* ── Filters + Search ── */}
        <section className="bg-[#f5f5f5] pt-10 pb-4 sticky top-0 z-20 border-b border-black/8 shadow-sm">
          <div className="w-full mx-auto px-4 lg:px-12 xl:px-16 flex flex-col md:flex-row md:items-center gap-5">
            {/* Categories */}
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black/15 hover:border-black/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0 w-full md:w-64">
              <Search
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-black/15 bg-white focus:border-primary focus:outline-none transition-colors duration-200 text-black placeholder:text-black/35"
              />
            </div>
          </div>
        </section>

        {/* ── Posts Grid ── */}
        <section className="bg-[#f5f5f5] section-padding">
          <div className="w-full mx-auto px-4 lg:px-12 xl:px-16">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-24"
                >
                  <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Search size={28} className="text-black/40" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-black mb-2">
                    No articles found
                  </h3>
                  <p className="text-[#5c5858] text-sm">
                    Try adjusting your search or category filter.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory + searchQuery}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filtered.map((post) => (
                    <motion.div key={post.id} variants={staggerItem}>
                      <Link to={`/blog/${post.id}`} state={{ post }}>
                        <motion.div
                          whileHover={{ y: -6 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="group overflow-hidden bg-white border border-black/8 h-full flex flex-col cursor-pointer hover:bg-primary transition-colors duration-400"
                          style={{
                            boxShadow: "0 2px 12px -4px rgba(0,0,0,0.08)",
                          }}
                        >
                          {/* Image */}
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <motion.img
                              src={post.img}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent group-hover:from-foreground/70 transition-all duration-500" />
                            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                              {post.featured && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1 bg-black text-white">
                                  Featured Article
                                </span>
                              )}
                              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1 ${post.featured ? "bg-[#FFF200] text-black" : "bg-background/15 text-background backdrop-blur-sm"}`}>
                                <Tag size={10} />
                                {post.category}
                              </span>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-4 text-[#5c5858] text-xs mb-4 group-hover:text-primary-foreground/60 transition-colors duration-300">
                              <span className="flex items-center gap-1.5">
                                <Calendar size={11} />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock size={11} />
                                {post.readTime}
                              </span>
                            </div>

                            <h3 className="font-display font-semibold text-base leading-snug text-black group-hover:text-primary-foreground mb-3 transition-colors duration-300">
                              {post.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-black/70 group-hover:text-primary-foreground/70 mb-5 flex-1 transition-colors duration-300 line-clamp-3">
                              {post.excerpt}
                            </p>

                            <span className="self-start inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black group-hover:text-primary-foreground transition-colors duration-300 border-b-2 border-transparent group-hover:border-primary-foreground/30 pb-0.5">
                              Read more
                              <ChevronRight
                                size={12}
                                className="group-hover:translate-x-1 transition-transform duration-300"
                              />
                            </span>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Blog;
