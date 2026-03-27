import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import { Search, X, ArrowRight, Plus, Check, ShoppingBag } from "lucide-react";
import { useInquiryStore } from "@/stores/inquiryStore";
import productsImg from "@/assets/products.jpg";
import medicinesImg from "@/assets/medicines.jpg";
import medDevicesImg from "@/assets/medical-devices.jpg";
import labImg from "@/assets/lab-research.jpg";
import heroBgOne from "@/assets/herobg/2.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";
import { staggerContainer, staggerItem, cardHover } from "@/lib/variants";

const allProducts = [
  {
    name: "Amoxicillin 500mg",
    category: "Pharmaceuticals",
    manufacturer: "Cipla",
    origin: "India",
    desc: "Broad-spectrum antibiotic capsules for bacterial infections",
  },
  {
    name: "Metformin 850mg",
    category: "Pharmaceuticals",
    manufacturer: "Denk Pharma",
    origin: "Germany",
    desc: "Oral hypoglycemic agent for type 2 diabetes",
  },
  {
    name: "Amlodipine 10mg",
    category: "Pharmaceuticals",
    manufacturer: "Sun Pharma",
    origin: "India",
    desc: "Calcium channel blocker for hypertension",
  },
  {
    name: "Omeprazole 20mg",
    category: "Pharmaceuticals",
    manufacturer: "Julphar",
    origin: "UAE",
    desc: "Proton pump inhibitor for acid reflux",
  },
  {
    name: "Ciprofloxacin 500mg",
    category: "Pharmaceuticals",
    manufacturer: "Stada",
    origin: "Germany",
    desc: "Fluoroquinolone antibiotic for infections",
  },
  {
    name: "Losartan 50mg",
    category: "Pharmaceuticals",
    manufacturer: "Hikma",
    origin: "Jordan",
    desc: "Angiotensin II receptor blocker",
  },
  {
    name: "Surgical Sutures (Polyglactin)",
    category: "Sutures",
    manufacturer: "Partner Manufacturer",
    origin: "India",
    desc: "Absorbable braided surgical sutures",
  },
  {
    name: "Silk Sutures",
    category: "Sutures",
    manufacturer: "Partner Manufacturer",
    origin: "India",
    desc: "Non-absorbable surgical sutures for wound closure",
  },
  {
    name: "Hip Replacement Implant",
    category: "Orthopedic Implants",
    manufacturer: "Partner Manufacturer",
    origin: "Germany",
    desc: "Total hip replacement prosthesis system",
  },
  {
    name: "Bone Plates & Screws",
    category: "Orthopedic Implants",
    manufacturer: "Partner Manufacturer",
    origin: "Germany",
    desc: "Titanium fixation systems for fracture repair",
  },
  {
    name: "Disposable Syringes",
    category: "Medical Devices",
    manufacturer: "Partner Manufacturer",
    origin: "China",
    desc: "Sterile disposable syringes in various sizes",
  },
  {
    name: "Diagnostic Equipment",
    category: "Medical Devices",
    manufacturer: "Partner Manufacturer",
    origin: "Germany",
    desc: "Advanced diagnostic and monitoring equipment",
  },
  {
    name: "Paracetamol 500mg",
    category: "Pharmaceuticals",
    manufacturer: "Sun Pharma",
    origin: "India",
    desc: "Analgesic and antipyretic",
  },
  {
    name: "Ceftriaxone 1g",
    category: "Pharmaceuticals",
    manufacturer: "Julphar",
    origin: "UAE",
    desc: "Third-generation cephalosporin injection",
  },
  {
    name: "Intramedullary Nails",
    category: "Orthopedic Implants",
    manufacturer: "Partner Manufacturer",
    origin: "India",
    desc: "Intramedullary fixation for long bone fractures",
  },
  {
    name: "Patient Monitors",
    category: "Medical Devices",
    manufacturer: "Partner Manufacturer",
    origin: "China",
    desc: "Multi-parameter patient monitoring systems",
  },
];

const categoryImages: Record<string, string> = {
  Pharmaceuticals: medicinesImg,
  "Orthopedic Implants": medDevicesImg,
  Sutures: productsImg,
  "Medical Devices": labImg,
};

const categories = [
  "All",
  "Pharmaceuticals",
  "Orthopedic Implants",
  "Sutures",
  "Medical Devices",
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [letter, setLetter] = useState("All");
  const [selected, setSelected] = useState<(typeof allProducts)[0] | null>(
    null,
  );
  const { addItem, hasItem } = useInquiryStore();

  const filtered = allProducts.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (letter !== "All" && !p.name.toUpperCase().startsWith(letter))
      return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const availableLetters = Array.from(
    new Set(allProducts.map((p) => p.name[0].toUpperCase())),
  );

  return (
    <PageTransition>
      <div>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20 bg-foreground">
          <ImageSlider
            images={[
              { src: heroBgOne, alt: "Products" },
              { src: heroBgTwo, alt: "Medicines" },
              { src: heroBgThree, alt: "Medical devices" },
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
                Our Catalog
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
                Products
              </h1>
              <p className="text-background/55 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
                Quality medicines, sutures, orthopedic implants, medical devices
                and diagnostic equipment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Inquiry banner */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-primary border-b border-primary-foreground/20"
        >
          <div className="container-narrow py-4 flex items-center gap-3 text-sm">
            <ShoppingBag size={18} className="text-primary-foreground" />
            <span className="text-primary-foreground font-semibold">
              Select products you're interested in and send us an inquiry —
              we'll get back within 24 hours.
            </span>
          </div>
        </motion.section>

        {/* Filters & Grid */}
        <section className="bg-[#f5f5f5] section-padding">
          <div className="container-narrow">
            <ScrollReveal>
              <p className="text-black text-xl font-light leading-relaxed max-w-3xl mb-16 md:text-lg">
                Our product range includes premium quality pharmaceuticals,
                sutures, orthopedic implants, disposable medical devices and
                diagnostic equipment.
              </p>
            </ScrollReveal>

            {/* Search & Categories */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <div className="relative flex-1 max-w-sm">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-background/20 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow placeholder:text-black/30"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-4 py-2 text-sm text-black font-medium transition-all duration-300 ${category === c ? "bg-primary text-black" : "bg-white text-background/70 hover:bg-background/20"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Alphabetical Filter */}
            <div className="mb-16">
              <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center max-w-2xl mx-auto">
                <button
                  onClick={() => setLetter("All")}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                    letter === "All"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-background/40 hover:text-background/70"
                  }`}
                >
                  All
                </button>
                {letters.map((l) => {
                  const isSelected = letter === l;
                  return (
                    <button
                      key={l}
                      onClick={() => setLetter(isSelected ? "All" : l)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                        isSelected
                          ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(255,242,0,0.3)]"
                          : "text-black hover:text-white/70 hover:bg-white/5 cursor-pointer"
                      }`}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((product) => {
                return (
                  <motion.div key={product.name} variants={staggerItem}>
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      variants={cardHover}
                      className="group cursor-pointer relative bg-white p-3 hover:shadow-lg transition-shadow duration-300 rounded-lg h-full flex flex-col hover:bg-primary"
                    >
                      <div
                        className="relative overflow-hidden aspect-[4/3] mb-4 bg-background/5"
                        onClick={() => setSelected(product)}
                      >
                        <motion.img
                          src={categoryImages[product.category] || productsImg}
                          alt={product.name}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div onClick={() => setSelected(product)}>
                          <h3 className="font-display text-lg font-semibold text-black transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="text-black/70 text-sm mt-1">
                            {product.desc}
                          </p>
                          <p className="text-black/50 text-xs mt-2">
                            {product.manufacturer} · {product.origin}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-background/50 text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-background max-w-lg w-full p-8 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1">
                  {selected.category}
                </span>
                <h2 className="font-display text-2xl font-bold text-foreground mt-4 mb-2">
                  {selected.name}
                </h2>
                <p className="text-muted-foreground mb-6">{selected.desc}</p>
                <div className="grid grid-cols-2 gap-4 text-sm border-t border-border pt-4 mb-6">
                  <div>
                    <span className="text-muted-foreground">Manufacturer:</span>
                    <br />
                    <span className="text-foreground font-medium">
                      {selected.manufacturer}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Origin:</span>
                    <br />
                    <span className="text-foreground font-medium">
                      {selected.origin}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    addItem(selected);
                    setSelected(null);
                  }}
                  disabled={hasItem(selected.name)}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                >
                  {hasItem(selected.name) ? (
                    <>
                      <Check size={16} /> Added to inquiry
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> Add to inquiry
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Products;
