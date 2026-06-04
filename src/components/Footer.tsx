import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Smartphone,
  MapPin,
  Facebook,
  Linkedin,
  X,
} from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);

  const isHovered = hoveredBranch !== null;

  const images: Record<string, string> = {
    "Headquarter (Ethiopia)":
      "https://images.pexels.com/photos/35368884/pexels-photo-35368884.jpeg",
    "Somaliland Branch":
      "https://images.pexels.com/photos/33836939/pexels-photo-33836939.jpeg",
    "Rwanda Branch":
      "https://images.pexels.com/photos/31466706/pexels-photo-31466706.jpeg",
  };

  const branches = [
    {
      title: "Headquarter (Ethiopia)",
      contacts: [
        { icon: Phone, text: "+251112306771", href: "tel:+251112306771" },
        { icon: Smartphone, text: "+251 91 366 7537", href: "tel:+251913667537" },
        { icon: Mail, text: "info@drogapharma.com", href: "mailto:info@drogapharma.com" },
        { icon: Mail, text: "pharmadroga@gmail.com", href: "mailto:pharmadroga@gmail.com" },
        {
          icon: MapPin,
          text: "Gulele Subcity, Woreda 09, House No. New/Droga Building, Addis Ababa, Ethiopia.",
          isAddress: true,
        },
      ],
    },
    {
      title: "Somaliland Branch",
      contacts: [
        { icon: Phone, text: "+252 634 958 444", href: "tel:+252634958444" },
        { icon: Smartphone, text: "+252 637 611 171", href: "tel:+252637611171" },
        { icon: Mail, text: "info@drogapharma-som.com", href: "mailto:info@drogapharma-som.com" },
        { icon: Mail, text: "pharmadroga@gmail.com", href: "mailto:pharmadroga@gmail.com" },
        {
          icon: MapPin,
          text: "Cabaaye Bus Station, Downtown, Hargeysa, Somaliland",
          isAddress: true,
        },
      ],
    },
    {
      title: "Rwanda Branch",
      contacts: [
        { icon: Phone, text: "+250 783 13 10 40", href: "tel:+250783131040" },
        { icon: Mail, text: "info@drogapharma.rw", href: "mailto:info@drogapharma.rw" },
        { icon: Mail, text: "abdoulg@drogapharma.rw", href: "mailto:abdoulg@drogapharma.rw" },
        {
          icon: MapPin,
          text: "Plot No. 311 AV KN2 No. 30, Kigali City, Rwanda",
          isAddress: true,
        },
      ],
      socials: [
        { icon: Facebook, href: "https://www.facebook.com/DrogaPharma", label: "Facebook" },
        { icon: X, href: "https://x.com/drogapharma", label: "X" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/droga-pharma", label: "LinkedIn" },
      ],
    },
  ];

  // Colour helpers — white text when bg image is showing, dark text otherwise
  const tc  = isHovered ? "text-white"       : "text-black";
  const tc2 = isHovered ? "text-white/70"    : "text-black/65";
  const tc3 = isHovered ? "text-white/45"    : "text-black/40";
  const bdr = isHovered ? "border-white/15"  : "border-black/10";

  return (
    <footer className="bg-white border-t border-black/10 relative overflow-hidden transition-colors duration-500">

      {/* ── Country image background ─────────────────────────────────────── */}
      <AnimatePresence>
        {hoveredBranch && images[hoveredBranch] && (
          <motion.div
            key={hoveredBranch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img
              src={images[hoveredBranch]}
              alt={hoveredBranch}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOP: brand + branch columns ──────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-4">

          {/* Brand blurb */}
          <div className="lg:col-span-3 flex flex-col">
            <img 
              src={logo} 
              alt="Droga Pharma logo" 
              className="h-12 w-auto object-contain object-left mb-6 relative z-10"
            />
            <p className={`text-sm leading-relaxed max-w-xs font-semibold transition-colors duration-500 ${tc2}`}>
              Leading pharmaceutical import and distribution company based in
              Addis Ababa, Ethiopia. Serving the healthcare needs of the nation
              since 2015.
            </p>
          </div>

          {/* Branches */}
          {branches.map((branch, idx) => (
            <div
              key={branch.title}
              className={`lg:col-span-3 ${idx !== 0 ? "lg:pl-8" : ""}`}
            >
              <div
                className="w-fit"
                onMouseEnter={() => setHoveredBranch(branch.title)}
                onMouseLeave={() => setHoveredBranch(null)}
              >
                <h4 className={`font-display font-bold mb-4 text-base transition-colors duration-500 ${tc}`}>
                  {branch.title}
                </h4>

                <div className="flex flex-col gap-2.5">
                  {branch.contacts.map((contact, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-3 group">
                        <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${isHovered ? "group-hover:bg-white/10" : "group-hover:bg-black/8"}`}>
                        <contact.icon size={12} className={`transition-colors duration-500 ${tc}`} />
                      </div>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className={`text-xs font-medium transition-colors duration-500 py-1 ${tc2} ${isHovered ? "hover:text-white" : "hover:text-black"}`}
                        >
                          {contact.text}
                        </a>
                      ) : (
                        <span className={`text-xs font-medium py-1 leading-relaxed transition-colors duration-500 ${tc2}`}>
                          {contact.text}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {branch.socials && (
                <div className={`flex items-center gap-3 mt-4 pt-4 border-t transition-colors duration-500 ${bdr}`}>
                  {branch.socials.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-8 h-8 flex items-center justify-center transition-colors duration-200 border hover:bg-primary hover:text-black hover:border-primary ${isHovered ? "text-white border-white/30" : "text-black border-black/15"}`}
                      aria-label={social.label}
                    >
                      <social.icon size={14} />
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── MIDDLE: logo + giant DROGA wordmark ──────────────────────────── */}
      <div className="relative z-10 border-t border-black">
        <div className="max-w-[1400px] mx-auto pb-5 px-6 sm:px-10 lg:px-16 overflow-hidden">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* Giant wordmark */}
            <span
              className={`font-display font-black tracking-tighter select-none transition-colors duration-500 ${isHovered ? "text-primary" : "text-black"} text-center`}
              style={{ fontSize: "clamp(3.5rem, 10vw, 12rem)", lineHeight: 0.83 }}
            >
              DROGA PHARMA
            </span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM: legal bar ─────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-black">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-xs font-semibold transition-colors duration-500 ${tc3}`}>
            © {new Date().getFullYear()} Droga Consulting. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className={`text-xs font-semibold cursor-pointer transition-colors duration-500 ${tc3} ${isHovered ? "hover:text-white" : "hover:text-black"}`}>
              Privacy Policy
            </span>
            <span className={`text-xs font-semibold cursor-pointer transition-colors duration-500 ${tc3} ${isHovered ? "hover:text-white" : "hover:text-black"}`}>
              Terms of Service
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
