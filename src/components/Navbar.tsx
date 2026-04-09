import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Facebook,
  Linkedin,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

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

const navLinks: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Products",
    path: "/products",
    mega: true,
    children: [
      {
        label: "Medical",
        path: "/products?category=Medical",
        description: "General medical supplies and solutions",
      },
      {
        label: "Medical Devices",
        path: "/products?category=Medical+Devices",
        description: "Advanced medical devices and monitoring",
      },
      {
        label: "Laboratory",
        path: "/products?category=Laboratory",
        description: "Diagnostic and laboratory equipment",
      },
      {
        label: "Medical Equipment",
        path: "/products?category=Medical+Equipment",
        description: "Specialized medical infrastructure",
      },
      {
        label: "Orthopedics and Surgical Instrument",
        path: "/products?category=Orthopedics+and+Surgical+Instrument",
        description: "Precision surgical tools and orthopedic care",
      },
    ],
  },
  { label: "Services", path: "/services" },
  {
    label: "Group",
    mega: true,
    children: [
      {
        label: "Trust Pharma",
        path: "https://www.trustethiopharma.com/",
        description: "Pharmaceutical manufacturing",
        external: true,
      },
      {
        label: "EMA Ethiopia",
        path: "https://www.emaethiopia.com/",
        description: "Medical equipment & accessories",
        external: true,
      },
      {
        label: "Droga Consulting",
        path: "https://drogaconsulting.com/",
        description: "Distribution & consulting services",
        external: true,
      },
      {
        label: "Breeeze Pharmaceutical",
        path: "https://drogaconsulting.com/",
        description: "Distribution & consulting services",
        external: true,
      },
      {
        label: "Orbit",
        path: "https://drogaconsulting.com/",
        description: "Distribution & consulting services",
        external: true,
      },
      {
        label: "Droga Pharmacy",
        path: "https://drogapharmacy.com/",
        description: "Distribution & consulting services",
        external: true,
      },
      {
        label: "Droga Physiotherapy",
        path: "https://drogaphysiotherapy.com/",
        description: "Distribution & consulting services",
        external: true,
      },
    ],
  },
  {
    label: "Media",
    mega: true,
    children: [
      {
        label: "Certifications",
        path: "/certifications",
        description: "Quality standards and official recognitions",
      },
      {
        label: "Blog",
        path: "/blog",
        description: "Latest updates, stories, and achievements",
      },
      {
        label: "Gallery",
        path: "/gallery",
        description: "Photos and visual highlights from Droga Pharma",
      },
    ],
  },
  { label: "Careers", path: "/careers" },
  { label: "CRS", path: "/crs" },
];

/* ─── Mega Dropdown ─── */
const MegaDropdown = ({
  item,
  showWhiteNav,
  isActive,
}: {
  item: NavItem;
  showWhiteNav: boolean;
  isActive: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 200);
  };

  const textColor = isActive
    ? "text-black"
    : showWhiteNav
      ? "text-foreground/80 hover:text-foreground"
      : "text-background/90 hover:text-background";
  const isHorizontalMega = item.label === "Products" || item.label === "Group";
  const dropdownPositionClass =
    item.label === "Group"
      ? "left-[-560px]"
      : item.label === "Products"
        ? "left-[-250px]"
        : "left-0";

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      {item.path ? (
        <Link
          to={item.path}
          className={`relative text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 py-2 inline-flex items-center gap-1 ${textColor}`}
        >
          {item.label}
          <ChevronDown
            size={11}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
          {isActive && (
            <motion.div
              layoutId="nav-active-pill"
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </Link>
      ) : (
        <button
          className={`relative text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 py-2 inline-flex items-center gap-1 ${textColor}`}
        >
          {item.label}
          <ChevronDown
            size={11}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className={`absolute top-full pt-4 z-50 ${dropdownPositionClass}`}
          >
            <div
              className={`bg-background/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-border/50 p-2 ${
                item.label === "Group"
                  ? "min-w-[1040px]"
                  : isHorizontalMega
                    ? "min-w-[860px]"
                    : "min-w-[280px]"
              }`}
            >
              <div
                className={
                  isHorizontalMega
                    ? item.label === "Group"
                      ? "grid grid-cols-4 gap-1"
                      : "grid grid-cols-3 gap-1"
                    : "flex flex-col"
                }
              >
                {item.children.map((child, i) => {
                  const inner = (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      className={`group flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-secondary/80 transition-all duration-200 cursor-pointer ${
                        isHorizontalMega ? "min-h-[84px]" : ""
                      }`}
                    >
                      {/* <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div> */}
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-foreground group-hover:text-gray-700 transition-colors">
                            {child.label}
                          </span>
                          {child.external && (
                            <ArrowUpRight
                              size={11}
                              className="text-muted-foreground"
                            />
                          )}
                        </div>
                        {child.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {child.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                  return child.external ? (
                    <a
                      key={child.label}
                      href={child.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link key={child.label} to={child.path}>
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
  );
};

/* ─── Simple Link ─── */
const NavLinkItem = ({
  item,
  showWhiteNav,
  isActive,
}: {
  item: NavItem;
  showWhiteNav: boolean;
  isActive: boolean;
}) => {
  const textColor = isActive
    ? "text-black"
    : showWhiteNav
      ? "text-foreground/80 hover:text-foreground"
      : "text-background/90 hover:text-background";

  return (
    <Link
      to={item.path!}
      className={`relative text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 py-2 ${textColor}`}
    >
      {item.label}
      {isActive && (
        <motion.div
          layoutId="nav-active-pill"
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
    </Link>
  );
};

/* ─── Main Navbar ─── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setMobileExpanded(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const showWhiteNav = true;

  const isActive = (item: NavItem) => {
    if (item.path === "/" && location.pathname === "/") return true;
    if (item.path && item.path !== "/" && location.pathname === item.path)
      return true;
    if (
      item.children?.some(
        (c) => !c.external && location.pathname === c.path.split("?")[0],
      )
    )
      return true;
    return false;
  };

  return (
    <>
      {/* Utility Bar */}
      <motion.div
        initial={false}
        className="sticky top-0 left-0 right-0 z-50 bg-primary h-9 hidden lg:flex items-center"
      >
        <div className="container-narrow flex items-center justify-between w-full">
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/DrogaPharma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/40 hover:text-primary transition-colors duration-200"
            >
              <Facebook size={13} />
            </a>
            <a
              href="https://www.linkedin.com/company/droga-pharma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/40 hover:text-primary transition-colors duration-200"
            >
              <Linkedin size={13} />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@drogapharma.com"
              className="flex items-center gap-1.5 text-black text-xs hover:text-black transition-colors"
            >
              <Mail size={11} className="text-black" />
              info@drogapharma.com
            </a>
            <div className="w-px h-3 bg-background/20" />
            <a
              href="tel:+251112734554"
              className="flex items-center gap-1.5 text-black text-xs hover:text-black transition-colors"
            >
              <Phone size={11} className="text-black" />
              +25111 273 4554
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        initial={false}
        className={`sticky left-0 right-0 z-40 lg:top-9 top-0 transition-all duration-500 ${"bg-background/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(92, 92, 92, 0.04),0_4px_12px_rgba(0,0,0,0.03)]"}`}
      >
        {/* Subtle bottom border that appears on scroll */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)",
          }}
        />

        <div className="container-narrow flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.img
              src={logo}
              alt="Droga Pharma"
              className="h-12 w-auto"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) =>
              item.children ? (
                <MegaDropdown
                  key={item.label}
                  item={item}
                  showWhiteNav={showWhiteNav}
                  isActive={isActive(item)}
                />
              ) : (
                <NavLinkItem
                  key={item.label}
                  item={item}
                  showWhiteNav={showWhiteNav}
                  isActive={isActive(item)}
                />
              ),
            )}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                showWhiteNav
                  ? "bg-primary text-black hover:bg-primary/90 hover:shadow-lg"
                  : "bg-primary text-foreground hover:bg-primary/90 hover:shadow-lg"
              }`}
            >
              Get in Touch
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                showWhiteNav
                  ? "text-foreground hover:bg-secondary"
                  : "text-background hover:bg-background/10"
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="lg:hidden bg-background/98 backdrop-blur-2xl border-t border-border/50 overflow-hidden"
            >
              <div className="container-narrow py-8 flex flex-col gap-0.5">
                {navLinks.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {item.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.label ? null : item.label,
                            )
                          }
                          className={`text-lg font-display font-semibold py-3.5 w-full text-left flex items-center justify-between ${
                            isActive(item) ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {item.label}
                          <motion.div
                            animate={{
                              rotate: mobileExpanded === item.label ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={18} />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.23, 1, 0.32, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-2 border-l-2 border-primary/20 ml-1 space-y-0.5">
                                {item.children.map((child) =>
                                  child.external ? (
                                    <a
                                      key={child.label}
                                      href={child.path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 py-2.5 text-[15px] text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      {child.label}
                                      <ArrowUpRight size={12} />
                                    </a>
                                  ) : (
                                    <Link
                                      key={child.label}
                                      to={child.path}
                                      onClick={() => setIsOpen(false)}
                                      className="block py-2.5 text-[15px] text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      {child.label}
                                    </Link>
                                  ),
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path!}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-display font-semibold py-3.5 block ${
                          isActive(item) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Mobile footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mt-8 pt-6 border-t border-border/50 space-y-4"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Get in Touch
                  </Link>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <a
                      href="tel:+251112734554"
                      className="flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      <Phone size={14} className="text-primary" />{" "}
                      +251-112-73-45-54
                    </a>
                    <div className="flex items-center gap-4">
                      <a
                        href="https://www.facebook.com/DrogaPharma"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        <Facebook size={16} />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/droga-pharma"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        <Linkedin size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
