import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/variants";
import cmsQrImage from "@/assets/cms.png";

const CMSBanner = () => {
  return (
    <section className="bg-primary py-12 md:py-16 overflow-hidden border-t border-primary-foreground/10">
      <div className="container-narrow">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
        >
          {/* Left: Toll Free */}
          <motion.div
            variants={staggerItem}
            className="text-center md:text-left"
          >
            <p className="text-lg md:text-xl font-medium text-primary-foreground/80 mb-1">
              Reach us at our
            </p>
            <p className="text-lg md:text-xl font-medium text-primary-foreground/80 mb-2">
              toll free number:
            </p>
            <p className="text-5xl md:text-6xl font-bold text-primary-foreground font-display">
              6637
            </p>
          </motion.div>

          {/* Center: CMS Logo */}
          <motion.div
            variants={staggerItem}
            className="text-center flex flex-col items-center"
          >
            <div className="relative">
              <h2 className="text-7xl md:text-8xl font-bold text-primary-foreground font-display tracking-tight leading-none">
                CMS
              </h2>
              <div className="h-1 w-full bg-primary-foreground/20 my-1"></div>
              <p className="text-[10px] md:text-xs font-bold text-primary-foreground uppercase tracking-[0.2em]">
                Complaint Management System
              </p>
            </div>
          </motion.div>

          {/* Right: QR Code */}
          <motion.div
            variants={staggerItem}
            className="bg-white p-4 md:p-6 shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white flex items-center justify-center">
              <img
                src={cmsQrImage}
                alt="CMS QR code"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CMSBanner;
