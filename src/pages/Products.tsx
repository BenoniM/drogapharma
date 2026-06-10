import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  // Medicine
  { name: "Cefdia 400mg Film Coated Tablet", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Cefixime - Anti-Infection" },
  { name: "20mg FCT", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Tadalafil - Urology & Sexual" },
  { name: "Prilam Dr. 10mg/10mg", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Doxylamine Succinate/ Pyridoxine Hydrochloride - OBGYN" },
  { name: "Aspicam-15mg Tab", category: "Medicine", manufacturer: "BIOFARM", origin: "Poland", desc: "Meloxicamum - Rheumatology, Orthopedics & Pain Management" },
  { name: "Alrinast 5mg 2*10 Tab", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Desloratidine - Anti Allergy" },
  { name: "Panocer 40mg ECT of 14", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Pantoprazole - Gastroenterology" },
  { name: "Panocer 40mg ECT of 28", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Pantoprazole - Gastroenterology" },
  { name: "Hyorth Injection", category: "Medicine", manufacturer: "Virchow", origin: "India", desc: "Sodium Hyaluronate Sterile Solution 10mg/ml - Rheumatology & Orthopedics" },
  { name: "Hyorth XL Injection", category: "Medicine", manufacturer: "Virchow", origin: "India", desc: "Sodium Hyaluronate Sterile Solution 8mg/ml - Rheumatology & Orthopedics" },
  { name: "Atrox 10mg 2*15 Tab", category: "Medicine", manufacturer: "BIOFARM", origin: "Poland", desc: "Atorvastatin - Cardiovascular" },
  { name: "Atrox 20mg 2*15 Tab", category: "Medicine", manufacturer: "BIOFARM", origin: "Poland", desc: "Atorvastatin - Cardiovascular" },
  { name: "Atrox 40mg 2*15 Tab", category: "Medicine", manufacturer: "BIOFARM", origin: "Poland", desc: "Atorvastatin - Cardiovascular" },
  { name: "Betablok SDK 25 mg CR FCT of 20", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Metoprolol Succinate - Cardiovascular" },
  { name: "Betablok SDK 25 mg CR FCT of 30", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Metoprolol Succinate - Cardiovascular" },
  { name: "Betablok SDK 50 mg CR FCT of 20", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Metoprolol Succinate - Cardiovascular" },
  { name: "Betablok SDK 50 mg CR FCT of 30", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Metoprolol Succinate - Cardiovascular" },
  { name: "Livercol 10mg FCT", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Rosuvastatin - Cardiovascular" },
  { name: "Livercol 20mg FCT", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Rosuvastatin - Cardiovascular" },
  { name: "Valcodin 5mg/160mg FCT", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Amlodipine+Valsartan - Cardiovascular" },
  { name: "Valcodin 10mg/160mg FCT", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Amlodipine+Valsartan - Cardiovascular" },
  { name: "Valcor Plus 80mg/12.5mg FCT", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Valsartan+Hydrochlorothiazide - Cardiovascular" },
  { name: "Valcor Plus 160mg/12.5mg FCT", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Valsartan+Hydrochlorothiazide - Cardiovascular" },
  { name: "Vildabet Met 50/850mg", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Vildagliptin - Endocrinology & Metabolism" },
  { name: "Vildabet Met 50/1000mg", category: "Medicine", manufacturer: "ILKO", origin: "Turkey", desc: "Vildagliptin - Endocrinology & Metabolism" },
  { name: "Dorzy-T", category: "Medicine", manufacturer: "Indiana Ophthalmics", origin: "India", desc: "Dorzolamide 2% + Timolol 0.5% - Ophthalmic (Anti-Glaucoma)" },
  { name: "Optifresh-Plus", category: "Medicine", manufacturer: "Indiana Ophthalmics", origin: "India", desc: "Sodium Carboxymethylcellulose 0.5% + Glycerin 0.5% - Ophthalmic (Dry Eye)" },
  { name: "Visomer Eye Drop", category: "Medicine", manufacturer: "Indiana Ophthalmics", origin: "India", desc: "Dexamethasone Sodium Phosphate (0.2%W/V) + Chloramphenicol (1%W/V) - Ophthalmic (Anti-Eye Infection)" },
  { name: "Visomer-P Eye Ointment", category: "Medicine", manufacturer: "Indiana Ophthalmics", origin: "India", desc: "Polymyxin B. Sulfate (5000LU) + Chloramphenicol (10mg) + Dexamethasone Sodium Phosphate (1mg) - Ophthalmic (Anti-Eye Infection)" },

  // Diagnostics
  { name: "Precisa Blood Glucose Test Kit", category: "Diagnostics", manufacturer: "Fia BioMed", origin: "Germany", desc: "Diagnostic Equipment" },
  { name: "Getein 1160 Immunofluorescence Quantitative Analyzer", category: "Diagnostics", manufacturer: "Getein Biotech Inc.", origin: "China", desc: "Diagnostic Equipment" },
  { name: "Boso Medicus X with AC Adapter & Battery Operated", category: "Diagnostics", manufacturer: "BOSCH+SOHN", origin: "Germany", desc: "Diagnostic Equipment" },
  { name: "Boso Clinicus I, Blue 60mm with Adult Cuff", category: "Diagnostics", manufacturer: "BOSCH+SOHN", origin: "Germany", desc: "Diagnostic Equipment" },
  { name: "Boso Clinicus I, Blue 60mm with Pediatric & Adult Cuff", category: "Diagnostics", manufacturer: "BOSCH+SOHN", origin: "Germany", desc: "Diagnostic Equipment" },
  { name: "Boso Clinicus I, Blue 60mm with Neonatal, Pediatric & Adult (Medium, Large & Extra Large) Cuff", category: "Diagnostics", manufacturer: "BOSCH+SOHN", origin: "Germany", desc: "Diagnostic Equipment" },
  { name: "Sthethoscope for Adult & Children (Luxascope Sonus SX)", category: "Diagnostics", manufacturer: "Luxamed", origin: "Germany", desc: "Diagnostic Equipment" },
  { name: "Sthetoscope Cardio (Luxascope Sonus CX)", category: "Diagnostics", manufacturer: "Luxamed", origin: "Germany", desc: "Diagnostic Equipment" },

  // Surgical
  { name: "Surgicell (Absorbable Haemostat Oxidised Regenerated Cellulose)", category: "Surgical", manufacturer: "AEGIS", origin: "India", desc: "Surgical Supplies" },
  { name: "Bone Wax", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Daclon Nylon 9/0 & 10/0", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Polypropylene Surgical Mesh 7.5x15cm of 5", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Polypropylen Surgical Mesh 10x15cm of 5", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Polypropylen Surgical Mesh 15x15cm of 5", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Polypropylene Blue 0,2/0,3/0,4/0,5/0,6/0,7/0,8/0 2 Needles Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Silk 2 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Silk 1 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Silk 0 Cutting", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Silk 2/0 Cutting", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Silk 3/0 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Silk 4/0 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Silk 5/0 Cutting", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Silk 6/0 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Surgicryl PGA 2 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Surgicryl PGA 1 Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Surgicryl PGA 0 Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Surgicryl PGA 2/0 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Surgicryl PGA 3/0 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Surgicryl PGA 4/0 Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Surgicryl PGA 5/0 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
  { name: "Surgicryl PGA 6/0 Cutting & Round", category: "Surgical", manufacturer: "SMI", origin: "Belgium", desc: "Surgical Supplies" },
];

const categoryImages: Record<string, string> = {
  Medicine: medicinesImg,
  Diagnostics: labImg,
  Surgical: productsImg,
};

const categories = [
  "All",
  "Medicine",
  "Diagnostics",
  "Surgical",
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [letter, setLetter] = useState("All");
  const [selected, setSelected] = useState<(typeof allProducts)[0] | null>(
    null,
  );
  const { addItem, hasItem } = useInquiryStore();

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory && categories.includes(urlCategory)) {
      setCategory(urlCategory);
    } else {
      setCategory("All");
    }
  }, [searchParams]);

  const handleCategoryChange = (c: string) => {
    setCategory(c);
    if (c === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: c });
    }
  };

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
                PRODUCTS
              </text>
            </svg>
          </div>
          
          <div className="container-wide relative z-10 px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              <div className="flex flex-col">
                <span className="section-label text-primary block mb-4">Our Catalog</span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
                >
                  Products
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm"
              >
                <p className="text-white font-medium text-lg leading-relaxed">
                  Quality medicines, sutures, orthopedic implants, medical devices
                  and diagnostic equipment.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="relative z-20 w-full md:w-[90%] lg:w-[85%] ml-auto">

          {/* Image section */}
          <section className="-mt-24 w-full">
            <div className="w-full h-[250px] md:h-[400px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
              <ImageSlider
                images={[
                  { src: heroBgOne, alt: "Products" },
                  { src: heroBgTwo, alt: "Medicines" },
                  { src: heroBgThree, alt: "Medical devices" },
                ]}
                className="absolute inset-0 z-0"
              />
            </div>
          </section>

          {/* Inquiry banner */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-primary w-full relative"
          >
            <div className="pl-4 md:pl-8 pr-0 py-4 flex items-center gap-3 text-sm">
              <ShoppingBag size={18} className="text-primary-foreground" />
              <span className="text-primary-foreground font-semibold">
                Select products you're interested in and send us an inquiry — we'll get back within 24 hours.
              </span>
            </div>
          </motion.section>

        </div>

        {/* Filters & Grid */}
        <section className="bg-[#f5f5f5] section-padding">
          <div className="container-narrow">
            <ScrollReveal>
              <p className="text-black text-xl font-light leading-relaxed max-w-3xl mx-auto text-center mb-16 md:text-lg">
                Our product range includes premium quality pharmaceuticals,
                sutures, orthopedic implants, disposable medical devices and
                diagnostic equipment.
              </p>
            </ScrollReveal>

            {/* Search & Categories */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
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
                    onClick={() => handleCategoryChange(c)}
                    className={`px-4 py-2 text-sm text-black font-medium transition-all duration-300 ${category === c ? "bg-primary text-black" : "bg-white text-background/70 hover:bg-background/20"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Alphabetical Filter */}
            {/* <div className="mb-16">
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
            </div> */}

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
