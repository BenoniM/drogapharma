import { motion } from "framer-motion";
import isoCert from "../assets/ISO-Certificate.png";
import wholesaleCert from "../assets/Droga-Wholesale-Certificate.png";

const Certifications = () => {
  return (
    <section className="bg-[#ebebeb] py-20 overflow-hidden">
      <div className="container-narrow">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl font-bold text-black tracking-tight">
            Our Certifications
          </h2>
        </div>

        {/* Certificates Overlapping Layout */}
        <div className="relative flex justify-center items-center h-[500px] md:h-[700px]">
          {/* Certificate 2 (Wholesale) - Behind */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            whileInView={{ opacity: 1, x: 80, rotate: 8 }}
            whileHover={{ scale: 1.1, x: 80, rotate: 0, zIndex: 50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="absolute z-10 w-[280px] md:w-[550px] overflow-hidden cursor-zoom-in "
          >
            <img
              src={wholesaleCert}
              alt="Droga Wholesale Certificate"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Certificate 1 (ISO/Import) - Front */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: -80, rotate: -8 }}
            whileHover={{ scale: 1.1, x: -80, rotate: 0, zIndex: 50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute z-20 w-[280px] md:w-[550px] overflow-hidden cursor-zoom-in "
          >
            <img
              src={isoCert}
              alt="ISO Certification"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
