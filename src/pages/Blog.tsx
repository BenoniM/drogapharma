import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Search,
  ChevronRight,
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

  const featuredPost = posts.find((p) => p.featured)!;
  const regularPosts = posts.filter((p) => !p.featured);

  const filtered = regularPosts.filter((post) => {
    const matchCat =
      activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* ── Hero ── */}
        <section className="relative h-[70vh] min-h-[560px] flex items-end pb-20 bg-foreground overflow-hidden">
          <ImageSlider
            images={[
              { src: heroBgOne, alt: "Droga Pharma blog" },
              { src: heroBgTwo, alt: "Healthcare" },
              { src: heroBgThree, alt: "Research" },
            ]}
            className="absolute inset-0 z-0"
          />
          <div
            className="absolute inset-0 z-[5]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.82) 100%)",
            }}
          />
          <div className="container-narrow relative z-[6] w-full">
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label text-primary block mb-4">
                Insights & Updates
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
                Our Blog
              </h1>
              <p className="text-background/55 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
                Stories, research, and news from Droga Pharma — Ethiopia's
                leading pharmaceutical distributor.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Featured Post ── */}
        <section className="bg-white section-padding">
          <div className="container-narrow">
            <ScrollReveal>
              <span className="section-label block mb-8 text-[#5c5858]">
                Featured Story
              </span>
            </ScrollReveal>
            <ScrollReveal>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#f5f5f5] overflow-hidden border border-black/8 cursor-pointer"
              >
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <motion.img
                    src={featuredPost.img}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/20 group-hover:to-foreground/30 transition-all duration-500" />
                  <span className="absolute top-5 left-5 inline-block bg-primary text-black text-xs font-bold uppercase tracking-widest px-4 py-1.5">
                    {featuredPost.category}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-10 md:p-14 lg:p-16">
                  <div className="flex items-center gap-5 text-[#5c5858] text-xs mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-black leading-tight mb-5 group-hover:text-black/80 transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="text-[#5c5858] leading-relaxed mb-8 text-base">
                    {featuredPost.excerpt}
                  </p>
                  <button className="btn-primary self-start text-sm">
                    Read Story <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Yellow divider strip ── */}
        <div className="bg-primary py-4">
          <div className="container-narrow flex items-center justify-between gap-4 flex-wrap">
            <p className="text-black font-semibold text-sm tracking-wide uppercase">
              All Articles
            </p>
            <span className="text-black/50 text-xs font-medium">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </div>

        {/* ── Filters + Search ── */}
        <section className="bg-[#f5f5f5] pt-10 pb-4 sticky top-0 z-20 border-b border-black/8 shadow-sm">
          <div className="container-narrow flex flex-col md:flex-row md:items-center gap-5">
            {/* Categories */}
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-black text-primary border-black"
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
          <div className="container-narrow">
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
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1 bg-background/15 text-background backdrop-blur-sm">
                            <Tag size={10} />
                            {post.category}
                          </span>
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

                          <button className="self-start inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black group-hover:text-primary-foreground transition-colors duration-300 border-b-2 border-transparent group-hover:border-primary-foreground/30 pb-0.5">
                            Read more
                            <ChevronRight
                              size={12}
                              className="group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </button>
                        </div>
                      </motion.div>
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
