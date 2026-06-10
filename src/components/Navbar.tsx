import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Phone, Facebook, Linkedin, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpg";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type NavChild = {
  label: string;
  path: string;
  description?: string;
  external?: boolean;
};
type NavItem = {
  label: string;
  path?: string;
  children?: NavChild[];
  mega?: boolean;
};

/* ─── Nav data ───────────────────────────────────────────────────────────── */
const navLinks: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Products",
    path: "/products",
    mega: true,
    children: [
      { label: "Medicine", path: "/products?category=Medicine", description: "Pharmaceuticals and treatments" },
      { label: "Diagnostics", path: "/products?category=Diagnostics", description: "Diagnostic and monitoring equipment" },
      { label: "Surgical", path: "/products?category=Surgical", description: "Surgical sutures and supplies" },
    ],
  },
  { label: "Services", path: "/services" },
  {
    label: "Group",
    mega: true,
    children: [
      { label: "Trust Pharma", path: "https://www.trustethiopharma.com/", description: "Pharmaceutical manufacturing", external: true },
      { label: "EMA Ethiopia", path: "https://www.emaethiopia.com/", description: "Medical equipment & accessories", external: true },
      { label: "Droga Consulting", path: "https://drogaconsulting.com/", description: "Distribution & consulting", external: true },
      { label: "Breeeze Pharmaceutical", path: "https://drogaconsulting.com/", description: "Pharmaceutical distribution", external: true },
      { label: "Orbit", path: "https://drogaconsulting.com/", description: "Logistics & orbit services", external: true },
      { label: "Droga Pharmacy", path: "https://drogapharmacy.com/", description: "Retail pharmacy network", external: true },
      { label: "Droga Physiotherapy", path: "https://drogaphysiotherapy.com/", description: "Physiotherapy & rehabilitation", external: true },
    ],
  },
  {
    label: "Media",
    mega: true,
    children: [
      { label: "Certifications", path: "/certifications", description: "Quality standards & recognitions" },
      { label: "Blog", path: "/blog", description: "Latest updates & stories" },
      { label: "Gallery", path: "/gallery", description: "Photos & visual highlights" },
    ],
  },
  { label: "Careers", path: "/careers" },
  { label: "CRS", path: "/crs" },
];

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExp, setMobileExp] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const location = useLocation();

  /* Hide on scroll-down, show on scroll-up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setHoveredItem(null);
    setIsMobileOpen(false);
    setMobileExp(null);
    // window.scrollTo(0, 0); // Removed as it might interfere with scroll restoration
  }, [location.pathname]);

  const isActive = (item: NavItem) => {
    if (item.path === "/" && location.pathname === "/") return true;
    if (item.path && item.path !== "/" && location.pathname === item.path) return true;
    if (item.children?.some((c) => !c.external && location.pathname === c.path.split("?")[0])) return true;
    return false;
  };

  const activeHoverItem = navLinks.find(i => i.label === hoveredItem);
  const showDropdown = activeHoverItem?.children && activeHoverItem.children.length > 0;

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <header
        className={`hidden lg:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1400px] transition-transform duration-500 ease-in-out ${
          hidden ? "-translate-y-[150%]" : "translate-y-0"
        }`}
      >
        <nav
          ref={navRef}
          onMouseLeave={() => setHoveredItem(null)}
          className="w-full flex h-[72px] bg-white shadow-sm"
        >
          {/* ── LEFT COLUMN: Logo ── */}
          <div className="shrink-0 flex items-start border-r border-black h-full">
            <Link to="/" className="flex items-center justify-center px-8 h-full group">
              <img 
                src={logo} 
                alt="Droga Pharma" 
                className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" 
              />
            </Link>
          </div>

          {/* ── CENTER COLUMN: Links + Dropdown ── */}
          <div 
            className="flex-1 flex flex-col relative h-full"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Top Row: Links */}
            <div className="flex items-center justify-center gap-1 px-4 h-full">
              {navLinks.map((item) => {
                const active = isActive(item);
                const isHovered = hoveredItem === item.label;
                
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    className={`h-full flex items-center px-6 cursor-pointer transition-colors duration-200 ${
                      isHovered ? "bg-primary" : "hover:bg-primary"
                    }`}
                  >
                    {item.path ? (
                      <Link
                        to={item.path}
                        className="relative flex items-center h-full"
                      >
                        {/* Active Indicator Square */}
                        <div 
                          className={`absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 transition-all duration-300 ${
                            active ? (isHovered ? "bg-black scale-100" : "bg-primary scale-100") : "bg-transparent scale-0"
                          }`} 
                        />
                        <span className={`text-[13px] font-bold tracking-wider uppercase transition-colors duration-200 text-black`}>
                          {item.label}
                        </span>
                        {item.children && (
                          <motion.div
                            animate={{ rotate: isHovered ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={14} className="text-black transition-colors" />
                          </motion.div>
                        )}
                      </Link>
                    ) : (
                      <button
                        className="relative flex items-center h-full"
                      >
                        <div 
                          className={`absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 transition-all duration-300 ${
                            active ? (isHovered ? "bg-black scale-100" : "bg-primary scale-100") : "bg-transparent scale-0"
                          }`} 
                        />
                        <span className={`text-[13px] font-bold tracking-wider uppercase transition-colors duration-200 text-black`}>
                          {item.label}
                        </span>
                        {item.children && (
                          <motion.div
                            animate={{ rotate: isHovered ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={14} className="text-black transition-colors" />
                          </motion.div>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Expanded Dropdown Area */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute top-full left-[-1px] right-[-1px] border border-black bg-white overflow-hidden shadow-2xl"
                >
                  <div className="p-0">
                    <div className={`grid ${
                      activeHoverItem?.label === "Group" ? "grid-cols-4" : 
                      activeHoverItem?.label === "Products" ? "grid-cols-3" : 
                      "grid-cols-3"
                    }`}>
                      {activeHoverItem?.children?.map((child, idx) => {
                        const inner = (
                          <motion.div
                            key={child.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03, duration: 0.2 }}
                            className="group flex flex-col gap-1 p-6 md:p-8 hover:bg-primary transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-black transition-colors">
                                {child.label}
                              </span>
                              {child.external && <ArrowUpRight size={14} className="text-black/80" />}
                            </div>
                            {child.description && (
                              <p className="text-xs text-black/70 leading-relaxed font-medium">
                                {child.description}
                              </p>
                            )}
                          </motion.div>
                        );

                        return child.external ? (
                          <a key={child.label} href={child.path} target="_blank" rel="noopener noreferrer">
                            {inner}
                          </a>
                        ) : (
                          <Link key={child.label} to={child.path} onClick={() => setHoveredItem(null)}>
                            {inner}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT COLUMN: Get In Touch ── */}
          <div className="shrink-0 flex items-start border-l border-black h-full">
            <Link
              to="/contact"
              className="flex items-center justify-center px-10 h-full group hover:bg-primary transition-colors duration-300"
            >
              <span className="text-[13px] font-bold tracking-wider uppercase text-black">
                Get In Touch
              </span>
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Mobile Navbar (Remains sticky top but styled similarly) ── */}
      <header
        className={`lg:hidden fixed top-4 left-4 right-4 z-50 transition-transform duration-500 ease-in-out ${
          hidden ? "-translate-y-[150%]" : "translate-y-0"
        }`}
      >
        <motion.nav
          layout
          className={`w-full flex flex-col overflow-hidden transition-colors duration-300 shadow-sm ${
            isMobileOpen ? "bg-primary" : "bg-white"
          }`}
          style={{ borderRadius: "0" }}
        >
          <div className="flex items-center justify-between h-[64px] px-6">
            <Link to="/" className="flex items-center" onClick={() => setIsMobileOpen(false)}>
              <img src={logo} alt="Droga Pharma" className="h-8 w-auto" style={{ mixBlendMode: isMobileOpen ? "multiply" : "normal" }} />
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="w-10 h-10 flex items-center justify-center text-black"
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="border-t border-black bg-primary"
              >
                <div className="px-6 py-6 flex flex-col gap-2">
                  {navLinks.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => setMobileExp(mobileExp === item.label ? null : item.label)}
                            className="text-lg font-bold py-2 w-full text-left flex items-center justify-between text-black uppercase tracking-wide"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${isActive(item) ? "bg-blue-600" : "bg-transparent"}`} />
                              {item.label}
                            </div>
                            <span className="text-2xl leading-none">{mobileExp === item.label ? "-" : "+"}</span>
                          </button>
                          <AnimatePresence>
                            {mobileExp === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-6 pb-4 pt-2 flex flex-col gap-3 border-l-2 border-black/20 ml-2">
                                  {item.children.map((child) =>
                                    child.external ? (
                                      <a
                                        key={child.label}
                                        href={child.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-semibold text-black/70 hover:text-black transition-colors"
                                      >
                                        {child.label} <ArrowUpRight size={14} />
                                      </a>
                                    ) : (
                                      <Link
                                        key={child.label}
                                        to={child.path}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="text-sm font-semibold text-black/70 hover:text-black transition-colors"
                                      >
                                        {child.label}
                                      </Link>
                                    )
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={item.path!}
                          onClick={() => setIsMobileOpen(false)}
                          className="text-lg font-bold py-2 flex items-center gap-3 text-black uppercase tracking-wide"
                        >
                          <div className={`w-2 h-2 rounded-full ${isActive(item) ? "bg-blue-600" : "bg-transparent"}`} />
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}

                  <div className="mt-8 pt-6 border-t border-black/20 flex flex-col gap-6">
                    <Link
                      to="/contact"
                      onClick={() => setIsMobileOpen(false)}
                      className="text-center py-4 bg-black text-primary font-bold uppercase tracking-wider rounded-xl"
                    >
                      Get in Touch
                    </Link>
                    <div className="flex items-center justify-center gap-6 text-black">
                      <a href="tel:+251112734554" className="hover:text-black/60"><Phone size={20} /></a>
                      <a href="https://www.facebook.com/DrogaPharma" target="_blank" rel="noopener noreferrer" className="hover:text-black/60"><Facebook size={20} /></a>
                      <a href="https://www.linkedin.com/company/droga-pharma" target="_blank" rel="noopener noreferrer" className="hover:text-black/60"><Linkedin size={20} /></a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
    </>
  );
};

export default Navbar;
