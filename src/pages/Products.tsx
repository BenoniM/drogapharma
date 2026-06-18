import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import { Search, Plus, Minus, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";

const FormattedProductName = ({ name }: { name: string }) => {
  const match = name.match(/(\s\(|,\s|\swith\s|\sfor\s|\s\d+(?:\.\d+)?\s?(?:mg|ml|cm|mm|x|\/|\*|%|\s)|-\d+(?:\.\d+)?)/i);
  
  let mainPart = name;
  let subPart = "";
  
  if (match && match.index !== undefined && match.index > 0) {
    mainPart = name.substring(0, match.index);
    subPart = name.substring(match.index);
  }

  const renderWithTrademarks = (text: string, isMain: boolean) => {
    const parts = text.split(/(®|™)/);
    return parts.map((part, i) => {
      if (part === '®' || part === '™') {
        return <sup key={i} className={isMain ? "text-[0.6em] relative align-baseline top-[-0.5em]" : "text-[0.6em] relative align-baseline top-[-0.5em]"}>{part}</sup>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <span className="inline-block">
      <span className="font-bold text-black text-xl md:text-2xl">
        {renderWithTrademarks(mainPart, true)}
      </span>
      {subPart && (
        <span className="font-medium text-zinc-600 text-sm md:text-base">
          {renderWithTrademarks(subPart, false)}
        </span>
      )}
    </span>
  );
};

import productsImg from "@/assets/products.jpg";
import medicinesImg from "@/assets/medicines.jpg";
import medDevicesImg from "@/assets/medical-devices.jpg";
import labImg from "@/assets/lab-research.jpg";
import heroBgOne from "@/assets/herobg/2.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";

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

  // Orthopedics
  { name: "All types of Orthopedics Instruments sets", category: "Orthopedics", manufacturer: "Nebula Surgical", origin: "India", desc: "Orthopedic Supplies" },
  { name: "Plating System(Screw and Plates)", category: "Orthopedics", manufacturer: "Nebula Surgical", origin: "India", desc: "Orthopedic Supplies" },
  { name: "Nailing System(Bolt and Nails)", category: "Orthopedics", manufacturer: "Nebula Surgical", origin: "India", desc: "Orthopedic Supplies" },
  { name: "Spine System(Pedical Screws,rods and Instruments)", category: "Orthopedics", manufacturer: "Nebula Surgical", origin: "India", desc: "Orthopedic Supplies" },
  { name: "Amputation Set Large and Small", category: "Orthopedics", manufacturer: "Nebula Surgical", origin: "India", desc: "Orthopedic Supplies" },
  { name: "Lowman and Hohman", category: "Orthopedics", manufacturer: "Nebula Surgical", origin: "India", desc: "Orthopedic Supplies" },
  { name: "7 Gigli saw wire with handle", category: "Orthopedics", manufacturer: "Nebula Surgical", origin: "India", desc: "Orthopedic Supplies" },
  { name: "Maxilofacial Instrument set and implants", category: "Orthopedics", manufacturer: "Nebula Surgical", origin: "India", desc: "Orthopedic Supplies" },
  { name: "POP Cutter,Rod Cutter,and Wire Cutter", category: "Orthopedics", manufacturer: "Nebula Surgical", origin: "India", desc: "Orthopedic Supplies" },
];

const categoryImages: Record<string, string> = {
  Medicine: medicinesImg,
  Diagnostics: labImg,
  Surgical: productsImg,
  Orthopedics: medDevicesImg,
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory === "Orthopedics") {
      // Orthopedics is now merged under Surgical
      setCategory("Surgical");
    } else if (urlCategory && categories.includes(urlCategory)) {
      setCategory(urlCategory);
    } else {
      setCategory("All");
    }
    setCurrentPage(1);
  }, [searchParams]);

  const handleCategoryChange = (c: string) => {
    setCategory(c);
    setCurrentPage(1);
    if (c === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: c });
    }
  };

  const filtered = allProducts.filter((p) => {
    // When Surgical is selected, also include Orthopedics products
    if (category === "Surgical" && (p.category !== "Surgical" && p.category !== "Orthopedics")) return false;
    if (category !== "All" && category !== "Surgical" && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sortedFiltered = [...filtered].sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(sortedFiltered.length / itemsPerPage) || 1;
  const paginatedItems = sortedFiltered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  let lastCategory = "";

  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        {/* Dark Hero Section */}
        <section className="page-hero-section">
          <div className="absolute top-0 left-0 w-full h-[55%] pointer-events-none overflow-hidden flex items-center justify-center">
            <style>
              {`
                .anim-bg-text {
                  fill: rgba(0, 0, 0, 0);
                  stroke: #000;
                  stroke-width: 2px;
                  stroke-dasharray: 3000 1000;
                  animation: strokeDashBg 20s linear infinite;
                  opacity: 0.55;
                }
                @keyframes strokeDashBg {
                  from { stroke-dashoffset: 0; }
                  to { stroke-dashoffset: -4000; }
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
                style={{ fontSize: "90rem", fontWeight: 900, letterSpacing: "-0.04em" }}
              >
                PRODUCTS
              </text>
            </svg>
          </div>

          {/* Title pinned to top of hero */}
          <div className="absolute top-[140px] md:top-[275px] left-0 right-0 z-10 px-4 lg:px-12 xl:px-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-black text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
            >
              Products
            </motion.h1>
          </div>

          {/* Description stays at bottom via flex-end */}
          <div className="w-full relative z-10 px-4 lg:px-12 xl:px-16">
            <div className="flex justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm"
              >
                <p className="text-black font-normal text-lg leading-relaxed">
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
            <div className="w-full h-[250px] md:h-[400px] overflow-hidden relative bg-black">
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
        </div>

        {/* Filters & Grid */}
        <section id="filters-section" className="bg-white py-20 min-h-screen">
          <div className="container-wide px-6 lg:px-12 mx-auto">

            {/* Filter Section */}
            <div className="mb-6">
              <div className="flex flex-col gap-4 mb-10">
                <span className="text-[11px] font-bold text-black uppercase tracking-[0.2em] w-max">Filter by Collections</span>
                <div className="flex flex-wrap gap-4 pt-2">
                  {categories.map((c) => {
                    const isActive = category === c;
                    return (
                      <button
                        key={c}
                        onClick={() => handleCategoryChange(c)}
                        className={`px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                          isActive
                            ? "bg-[#FFF200] text-black"
                            : "bg-zinc-100 text-black hover:bg-zinc-200"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div className="text-sm font-semibold text-black uppercase tracking-widest">
                  Showing {sortedFiltered.length} Results
                </div>
                <div className="relative w-full md:w-80">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
                  <input
                    type="text"
                    placeholder="SEARCH PRODUCTS..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-11 pr-4 py-3 bg-zinc-100 text-black text-xs font-bold uppercase tracking-widest focus:outline-none focus:bg-[#FFF200] transition-all placeholder:text-black/40"
                  />
                </div>
              </div>
            </div>

            {/* List */}
            <div className="flex flex-col w-full pt-4">
              {paginatedItems.map((product) => {
                const showHeader = product.category !== lastCategory;
                lastCategory = product.category;

                return (
                  <React.Fragment key={product.name}>
                    {showHeader && (
                      <div className="mt-8 mb-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-black pb-4">
                          {product.category}
                        </h2>
                        <div className="h-[1px] w-full bg-zinc-200" />
                      </div>
                    )}
                    
                    <div className="bg-white group">
                      <button 
                        onClick={() => setExpandedId(expandedId === product.name ? null : product.name)}
                        className="w-full py-8 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors px-4"
                      >
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 w-full pr-4">
                          <FormattedProductName name={product.name} />
                          <span className="text-[10px] bg-[#FFF200] px-2 py-1 font-bold text-black uppercase tracking-wider w-max ml-0 md:ml-4">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-10 h-10 rounded-full bg-[#FFF200] flex items-center justify-center text-black">
                            {expandedId === product.name ? <Minus size={20} /> : <Plus size={20} />}
                          </div>
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedId === product.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-8 pt-2 flex flex-col md:flex-row gap-8 items-start bg-zinc-50">
                              <div className="flex-1 w-full pt-4">
                                <h4 className="text-sm font-bold text-black mb-4">Details</h4>
                                <ul className="space-y-3">
                                  <li className="flex items-center gap-2 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFF200]" />
                                    <span className="font-medium text-black">Manufacturer: {product.manufacturer}</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFF200]" />
                                    <span className="font-medium text-black">Origin: {product.origin}</span>
                                  </li>
                                  <li className="flex items-center gap-2 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFF200]" />
                                    <span className="font-medium text-black">Description: {product.desc}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="w-[200px] aspect-[4/3] bg-white p-2 flex items-center justify-center shrink-0">
                                <img 
                                  src={categoryImages[product.category] || productsImg} 
                                  alt={product.name} 
                                  className="max-w-full max-h-full object-contain mix-blend-multiply" 
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="h-[1px] w-full bg-zinc-200" />
                    </div>
                  </React.Fragment>
                );
              })}

              {paginatedItems.length === 0 && (
                <div className="text-center py-32 bg-zinc-50 mt-8">
                  <p className="text-black text-lg font-bold uppercase tracking-widest">
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-16">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => {
                    setCurrentPage(prev => prev - 1);
                    document.getElementById('filters-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-3 bg-zinc-100 hover:bg-[#FFF200] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-full"
                >
                  <ChevronLeft className="text-black" />
                </button>
                <span className="text-sm font-bold uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => {
                    setCurrentPage(prev => prev + 1);
                    document.getElementById('filters-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-3 bg-zinc-100 hover:bg-[#FFF200] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-full"
                >
                  <ChevronRight className="text-black" />
                </button>
              </div>
            )}
            
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Products;