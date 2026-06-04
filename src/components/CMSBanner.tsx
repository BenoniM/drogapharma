import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { staggerContainer, staggerItem } from "@/lib/variants";
import cmsQrImage from "@/assets/cms.png";

const CMSBanner = () => {
  const [hoverArea, setHoverArea] = useState<"cms" | "number" | null>(null);

  return (
    <section className="bg-primary py-16 md:py-20 overflow-hidden border-t border-black/10">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-8"
        >
          {/* Left: Partner CTA */}
          <motion.div variants={staggerItem} className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:w-1/3">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-black leading-tight">
                Ready to partner with us?
              </h3>
              <p className="text-black/80 mt-2 text-sm md:text-base font-medium">
                Let's discuss how we can support your healthcare needs.
              </p>
            </div>
            
            <MagneticButton>
              <Link
                to="/contact"
                className="bg-black text-white px-8 py-3.5 font-semibold text-sm inline-flex items-center gap-2 hover:bg-white hover:text-black hover:shadow-lg transition-all duration-200 flex-shrink-0"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Center: Interactive CMS Text */}
          <motion.div 
            variants={staggerItem} 
            className="w-full md:w-1/3 flex flex-col items-center justify-center z-10 min-h-[160px]"
            onMouseLeave={() => setHoverArea(null)}
          >
            
            {/* Top Area */}
            <div 
              className="flex items-end justify-center w-full pb-2 cursor-pointer h-[70px]"
              onMouseEnter={() => setHoverArea("cms")}
            >
              <AnimatePresence mode="wait">
                {hoverArea === "number" ? (
                  <motion.p 
                    key="text-toll-free"
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="text-sm md:text-base font-bold text-black uppercase tracking-wider text-center leading-relaxed"
                  >
                    Reach us at our toll free number
                  </motion.p>
                ) : (
                  <motion.h2 
                    key="text-cms"
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="text-5xl md:text-6xl font-bold text-black font-display tracking-tight leading-none hover:scale-105 transition-transform duration-300"
                  >
                    CMS
                  </motion.h2>
                )}
              </AnimatePresence>
            </div>
            
            {/* Divider */}
            <div className="h-[2px] w-24 bg-black pointer-events-none my-1" />
            
            {/* Bottom Area */}
            <div 
              className="flex items-start justify-center w-full pt-2 cursor-pointer h-[70px]"
              onMouseEnter={() => setHoverArea("number")}
            >
              <AnimatePresence mode="wait">
                {hoverArea === "cms" ? (
                  <motion.p 
                    key="text-cms-desc"
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="text-sm md:text-base font-bold text-black uppercase tracking-[0.1em] text-center leading-relaxed"
                  >
                    Complaint Management System
                  </motion.p>
                ) : (
                  <motion.p 
                    key="text-6637"
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="text-4xl md:text-5xl font-bold text-black font-display tracking-widest hover:scale-105 transition-transform duration-300"
                  >
                    6637
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

          </motion.div>

          {/* Right: QR Code */}
          <motion.div variants={staggerItem} className="md:w-1/3 flex justify-center md:justify-end">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-48 h-48 md:w-56 md:h-56 bg-white flex items-center justify-center p-4 shadow-xl border border-black/10"
            >
              <img
                src={cmsQrImage}
                alt="CMS QR code"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default CMSBanner;
