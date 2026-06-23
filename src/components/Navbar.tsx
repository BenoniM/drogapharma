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
  { label: "Products", path: "/products" },
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
  { label: "CSR", path: "/crs" },
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
    
    const activeParent = navLinks.find(item => {
      if (!item.children) return false;
      return item.children.some(c => !c.external && location.pathname === c.path.split("?")[0]);
    });
    setMobileExp(activeParent ? activeParent.label : null);
    
    // window.scrollTo(0, 0); // Removed as it might interfere with scroll restoration
  }, [location.pathname]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

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
        className={`hidden lg:block fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${hidden ? "-translate-y-[150%]" : "translate-y-0"
          }`}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {/* Navbar Background (Separate layer to allow children to blur independently) */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-none -z-10" />

        {/* ── Nav Bar Row ── */}
        <nav ref={navRef} className="relative w-full flex h-[60px] px-4 lg:px-12 xl:px-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center h-full">
            <Link to="/" className="flex items-center pr-8 h-full group">
              <img src={logo} alt="Droga Pharma" className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
            </Link>
          </div>

          {/* Center Links + Dropdown Container */}
          <div className="flex-1 flex flex-col relative h-full">
            {/* Links */}
            <div className="flex-1 flex items-center justify-center gap-1 h-full">
              {navLinks.map((item) => {
                const active = isActive(item);
                const isHovered = hoveredItem === item.label;
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    className={`h-full flex items-center px-4 cursor-pointer transition-colors duration-200 ${isHovered ? "bg-primary" : "hover:bg-primary"
                      }`}
                  >
                    {item.path ? (
                      <Link to={item.path} className="relative flex items-center gap-1 h-full">
                        <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 transition-all duration-300 ${active ? (isHovered ? "bg-black scale-100" : "bg-primary scale-100") : "bg-transparent scale-0"
                          }`} />
                        <span className="text-[13px] font-normal tracking-wide capitalize transition-colors duration-200 text-black">
                          {item.label}
                        </span>
                        {item.children && (
                          <motion.div animate={{ rotate: isHovered ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={13} className="text-black" />
                          </motion.div>
                        )}
                      </Link>
                    ) : (
                      <button className="relative flex items-center gap-1 h-full">
                        <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 transition-all duration-300 ${active ? (isHovered ? "bg-black scale-100" : "bg-primary scale-100") : "bg-transparent scale-0"
                          }`} />
                        <span className="text-[13px] font-normal tracking-wide capitalize transition-colors duration-200 text-black">
                          {item.label}
                        </span>
                        {item.children && (
                          <motion.div animate={{ rotate: isHovered ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={13} className="text-black" />
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
                  className="absolute top-full left-[-1px] right-[-1px] bg-white/40 backdrop-blur-xl backdrop-saturate-150 border-t border-white/40 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                >
                  <div className={`grid ${activeHoverItem?.label === "Group" ? "grid-cols-4" : "grid-cols-3"}`}>
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
                            <span className="text-[13px] font-normal tracking-wide capitalize text-black transition-colors">
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
                        <a key={child.label} href={child.path} target="_blank" rel="noopener noreferrer">{inner}</a>
                      ) : (
                        <Link key={child.label} to={child.path} onClick={() => setHoveredItem(null)}>{inner}</Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Get In Touch */}
          <div className="shrink-0 flex items-center h-full">
            <Link
              to="/contact"
              className="flex items-center px-6 h-full bg-primary text-black font-medium transition-opacity hover:opacity-90 duration-200"
            >
              <span className="text-[13px] font-medium tracking-wide capitalize text-black">
                Get In Touch
              </span>
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Mobile Navbar (Remains sticky top but styled similarly) ── */}
      <header
        className={`lg:hidden fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${
          hidden ? "-translate-y-[150%]" : "translate-y-0"
        }`}
      >
        <div className="w-full flex flex-col transition-colors duration-300">
          <div className={`relative z-50 flex items-center justify-between h-[72px] px-6 transition-colors duration-300 ${
            isMobileOpen ? "bg-white" : "bg-white/45 backdrop-blur-xl border-b border-black/5"
          }`}>
            <Link to="/" className="flex items-center" onClick={() => setIsMobileOpen(false)}>
              <img src={logo} alt="Droga Pharma" className="h-10 w-auto" />
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="w-12 h-12 flex items-center justify-center text-black"
            >
              {isMobileOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full bg-white/95 backdrop-blur-3xl border-t border-black/5 shadow-2xl overflow-hidden z-40"
              >
                <div className="flex flex-col w-full h-[calc(100svh-72px)] overflow-y-auto">
                  <div className="w-full py-8 [@media(max-height:700px)]:py-4 px-6 flex flex-col items-center gap-5 [@media(max-height:700px)]:gap-2 shrink-0 flex-1">
                  {navLinks.map((item) => {
                    const active = isActive(item);
                    return (
                      <div key={item.label} className="w-full flex flex-col items-center">
                        {item.children ? (
                          <>
                            <button
                              onClick={() => setMobileExp(mobileExp === item.label ? null : item.label)}
                              className={`w-full py-3.5 [@media(max-height:700px)]:py-2 text-center text-2xl [@media(max-height:700px)]:text-xl font-semibold uppercase tracking-widest transition-all duration-300 ${
                                active ? "text-black bg-[#FFF200]" : "text-black"
                              }`}
                            >
                              {item.label}
                            </button>
                            <AnimatePresence>
                              {mobileExp === item.label && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden w-full"
                                >
                                  <div className="py-5 [@media(max-height:700px)]:py-3 flex flex-col items-center gap-6 [@media(max-height:700px)]:gap-4">
                                    {item.children.map((child) => {
                                      const childActive = !child.external && location.pathname === child.path.split("?")[0];
                                      return child.external ? (
                                        <a
                                          key={child.label}
                                          href={child.path}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-lg [@media(max-height:700px)]:text-base font-semibold uppercase tracking-widest text-black/55 hover:text-black transition-colors flex items-center gap-2"
                                        >
                                          {child.label} <ArrowUpRight size={16} />
                                        </a>
                                      ) : (
                                        <Link
                                          key={child.label}
                                          to={child.path}
                                          onClick={() => setIsMobileOpen(false)}
                                          className="transition-colors flex items-center justify-center"
                                        >
                                          {childActive ? (
                                            <div className="flex items-center gap-3">
                                              <span className="h-[2px] w-8 bg-black" />
                                              <span className="text-lg [@media(max-height:700px)]:text-base font-semibold uppercase tracking-widest text-black">{child.label}</span>
                                            </div>
                                          ) : (
                                            <span className="text-lg [@media(max-height:700px)]:text-base font-semibold uppercase tracking-widest text-black/55 hover:text-black">{child.label}</span>
                                          )}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <div className={`w-full text-center transition-all duration-300`}>
                            {active ? (
                              <div className="w-full bg-[#FFF200] py-3.5 [@media(max-height:700px)]:py-2 text-center">
                                <Link
                                  to={item.path!}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="text-2xl [@media(max-height:700px)]:text-xl font-semibold uppercase tracking-widest text-black block w-full"
                                >
                                  {item.label}
                                </Link>
                              </div>
                            ) : (
                              <Link
                                to={item.path!}
                                onClick={() => setIsMobileOpen(false)}
                                className="text-2xl [@media(max-height:700px)]:text-xl font-semibold uppercase tracking-widest text-black/80 hover:text-black block w-full py-3 [@media(max-height:700px)]:py-2"
                              >
                                {item.label}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Link
                  to="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full text-center py-6 [@media(max-height:700px)]:py-4 bg-black text-white hover:bg-[#FFF200] hover:text-black font-semibold uppercase tracking-widest transition-colors duration-200 block shrink-0 text-2xl [@media(max-height:700px)]:text-xl mt-auto"
                >
                  Get in Touch
                </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Backdrop Blur Overlay (placed outside both headers to bypass any transformed containing blocks) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/45 backdrop-blur-md z-40 pointer-events-auto"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
