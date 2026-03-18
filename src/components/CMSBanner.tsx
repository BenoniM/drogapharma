import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/variants";

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
          <motion.div variants={staggerItem} className="text-center md:text-left">
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
          <motion.div variants={staggerItem} className="text-center flex flex-col items-center">
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
              {/* QR Code SVG - Replicating the pattern */}
              <svg 
                viewBox="0 0 29 29" 
                className="w-full h-full text-black fill-current"
                shapeRendering="crispEdges"
              >
                <path d="M0 0h7v7H0zM1 1h5v5H1z" />
                <path d="M2 2h3v3H2zM0 22h7v7H0zM1 23h5v5H1z" />
                <path d="M2 24h3v3H2zM22 0h7v7h-7zM23 1h5v5h-5z" />
                <path d="M24 2h3v3h-3zM9 0h1v1H9zM11 0h2v1h-2zM14 0h1v2h-1zM17 0h3v1h-3zM21 0h1v1h-1zM9 2h1v1H9zM12 2h2v1h-2zM15 2h1v1h-1zM18 2h1v1h-1zM20 2h1v2h-1zM8 3h1v1H8zM10 3h2v1h-2zM14 3h1v1h-1zM17 3h1v1h-1zM8 4h1v2H8zM11 4h1v1h-1zM13 4h1v1h-1zM15 4h1v2h-1zM18 4h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM14 5h1v1h-1zM17 5h2v1h-2zM20 5h1v1h-1zM8 7h1v1H8zM10 7h1v1h-1zM12 7h1v1h-1zM14 7h2v1h-2zM18 7h1v1h-1zM20 7h1v2h-1zM22 8h1v1h-1zM24 8h1v1h-1zM26 8h1v1h-1zM28 8h1v1h-1zM0 8h1v1H0zM2 8h1v1H2zM4 8h1v1H4zM6 8h1v1H6zM8 9h2v1H8zM12 9h1v1h-1zM14 9h1v1h-1zM16 9h1v1h-1zM18 9h1v2h-1zM21 9h1v1h-1zM23 9h2v1h-2zM27 9h1v1h-1zM1 10h1v1H1zM3 10h1v1H3zM5 10h1v2H5zM8 11h1v1H8zM10 11h1v1h-1zM12 11h1v1h-1zM14 11h2v1h-2zM19 11h1v1h-1zM21 11h1v1h-1zM23 11h1v1h-1zM25 11h1v2h-1zM27 11h1v1h-1zM0 12h1v1H0zM2 12h2v1H2zM9 12h1v1H9zM11 12h1v1h-1zM13 12h1v2h-1zM18 12h1v1h-1zM21 12h1v1h-1zM23 12h1v1h-1zM26 12h1v1h-1zM28 12h1v1h-1zM8 13h1v1H8zM10 13h2v1h-2zM15 13h2v1h-2zM20 13h1v1h-1zM22 13h1v1h-1zM24 13h1v1h-1zM26 13h1v1h-1zM28 13h1v1h-1zM0 14h1v1H0zM2 14h1v1H2zM4 14h1v1H4zM6 14h1v1H6zM8 14h2v1H8zM12 14h1v1h-1zM14 14h1v1h-1zM16 14h1v1h-1zM18 14h1v1h-1zM21 14h1v1h-1zM23 14h1v1h-1zM25 14h1v1h-1zM27 14h1v1H27zM1 15h1v1H1zM3 15h2v1H3zM9 15h2v1H9zM12 15h1v1h-1zM14 15h1v1h-1zM17 15h1v1h-1zM19 15h1v1h-1zM21 15h2v1h-2zM24 15h1v1h-1zM26 15h1v1h-1zM28 15h1v1h-1zM0 16h1v1H0zM2 16h1v1H2zM4 16h1v1H4zM6 16h1v1H6zM8 16h1v1H8zM11 16h1v1h-1zM13 16h1v1h-1zM15 16h1v1h-1zM18 16h1v1h-1zM20 16h1v1h-1zM23 16h1v1h-2zM26 16h1v1h-1zM28 16h1v1h-1z" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CMSBanner;
