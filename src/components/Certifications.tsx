import { motion } from "framer-motion";
import isoCert from "../assets/ISO-Certificate.jpg";
import wholesaleCert from "../assets/DrogaWholesaleCertificate.jpg";

const Certifications = () => {
  return (
    <section className="relative bg-[#ebebeb] py-20 overflow-hidden">
      <div className="container-narrow">
        {/* Decorative ISO watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span
            className="font-display font-black leading-none tracking-tighter text-black/[0.04] whitespace-nowrap w-full text-center"
            style={{ fontSize: "72vw" }}
          >
            ISO
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl font-bold text-black tracking-tight">
            ISO Certificates
          </h2>
        </div>

        {/* Certificates Left/Right Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
          {/* Left Certificate (ISO/Import) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[560px] mx-auto overflow-hidden cursor-zoom-in self-stretch"
          >
            <img
              src={isoCert}
              alt="ISO Certification"
              className="block w-full h-auto object-contain transform-none"
            />
          </motion.div>

          {/* Right Certificate (Wholesale) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="w-full max-w-[560px] mx-auto overflow-hidden cursor-zoom-in self-stretch"
          >
            <img
              src={wholesaleCert}
              alt="Droga Wholesale Certificate"
              className="block w-full h-auto object-contain transform-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
