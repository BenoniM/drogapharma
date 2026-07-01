import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ImageSlider from "@/components/ImageSlider";
import heroBgOne from "@/assets/Gallery/photo_2026-06-25_10-04-27.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";

import g1 from "@/assets/Gallery/487169433_1106026924896430_3663953883861550644_n.jpg";
import g2 from "@/assets/Gallery/498619240_1145316644300791_4232051411002959692_n.jpg";
import g3 from "@/assets/Gallery/499041524_1145316767634112_7207453203925552654_n.jpg";
import g4 from "@/assets/Gallery/photo_2026-06-25_09-57-51.jpg";
import g5 from "@/assets/Gallery/photo_2026-06-25_09-58-44.jpg";
import g6 from "@/assets/Gallery/photo_2026-06-25_09-59-27.jpg";
import g7 from "@/assets/Gallery/photo_2026-06-25_09-59-40.jpg";
import g8 from "@/assets/Gallery/photo_2026-06-25_09-59-51.jpg";
import g9 from "@/assets/Gallery/photo_2026-06-25_10-00-26.jpg";
import g10 from "@/assets/Gallery/photo_2026-06-25_10-01-42.jpg";
import g11 from "@/assets/Gallery/photo_2026-06-25_10-01-54.jpg";
import g12 from "@/assets/Gallery/photo_2026-06-25_10-02-38.jpg";
import g13 from "@/assets/Gallery/photo_2026-06-25_10-02-58.jpg";
import g14 from "@/assets/Gallery/photo_2026-06-25_10-03-09.jpg";
import g15 from "@/assets/Gallery/photo_2026-06-25_10-03-24.jpg";
import g16 from "@/assets/Gallery/photo_2026-06-25_10-04-27.jpg";
import g17 from "@/assets/Gallery/photo_2026-06-25_15-09-06.jpg";


const row1Images = [
  g1,
  g2,
  g3,
  g4,
  g5,
  g6,
  g7,
  g8,
  g9,
];

const row2Images = [
  g10,
  g11,
  g12,
  g13,
  g14,
  g15,
  g16,
  g17,
];

const Gallery = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        {/* Dark Hero Section */}
      <section className="page-hero-section">
        {/* Subtle curved lines background element (matching image) */}
          <div className="absolute top-[40px] md:top-0 left-0 w-full h-[55%] pointer-events-none overflow-hidden flex items-center justify-center">
            <style>
              {`
                .anim-bg-text {
                  fill: rgba(0, 0, 0, 0);
                  stroke: #000;
                  stroke-width: 5px;

                  /* Long visible line + long gap */
                  stroke-dasharray: 3000 1000;

                  /* Smooth infinite movement */
                  animation: strokeDashBg 20s linear infinite;

                  opacity: 0.85;

                  
                }

                @keyframes strokeDashBg {
                  from {
                    stroke-dashoffset: 0;
                  }
                  to {
                    /* -(3000 + 1000) */
                    stroke-dashoffset: -4000;
                  }
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
                style={{
                  fontSize: "90rem",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                }}
              >
                GALLERY
              </text>
            </svg>
          </div>
        
          {/* Title pinned to top of hero */}
          <div className="relative md:absolute md:top-[275px] left-0 right-0 z-10 px-4 lg:px-12 xl:px-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-black text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
            >
              Gallery
            </motion.h1>
          </div>

          {/* Description aligned with title on desktop */}
          <div className="w-full relative mt-6 md:mt-0 md:absolute md:top-[255px] z-10 px-4 lg:px-12 xl:px-16 pointer-events-none">
            <div className="flex justify-start md:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-sm pointer-events-auto md:pt-6 lg:pt-10"
              >
                <p className="text-black font-normal text-lg leading-relaxed">
                  A visual journey showing our team, modern facilities, cold-chain distribution network, and community engagement initiatives across Ethiopia.
                </p>
              </motion.div>
            </div>
          </div>
      </section>

        {/* Image overlapping the hero */}
        <section className="relative z-20 pl-4 md:pl-8 pr-0 -mt-24 mb-16 w-full md:w-[90%] lg:w-[85%] ml-auto">
          <div className="w-full h-[250px] md:h-[400px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
            <ImageSlider
              images={[
                { src: heroBgOne, alt: "Gallery Highlight 1" }
              ]}
              className="absolute inset-0 z-0"
            />
          </div>
        </section>

        {/* Marquee Section */}
        <section className="w-full overflow-hidden flex flex-col gap-4">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-right {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee-left {
              animation: marquee-left 15s linear infinite;
            }
            .animate-marquee-right {
              animation: marquee-right 15s linear infinite;
            }
            .marquee-container:hover .animate-marquee-left,
            .marquee-container:hover .animate-marquee-right {
              animation-play-state: paused;
            }
          `}} />

          {/* Row 1 - Moving Left */}
          <div className="marquee-container flex w-[200vw] sm:w-[300vw] md:w-[200vw] animate-marquee-left gap-4 px-2">
            {[...row1Images, ...row1Images, ...row1Images].map((src, idx) => (
              <div key={idx} className="flex-none w-[250px] md:w-[350px] aspect-square overflow-hidden bg-gray-100">
                <img
                  src={`${src}?auto=compress&cs=tinysrgb&w=600`}
                  alt="Gallery Item"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Row 2 - Moving Right */}
          <div className="marquee-container flex w-[200vw] sm:w-[300vw] md:w-[200vw] animate-marquee-right gap-4 px-2">
            {[...row2Images, ...row2Images, ...row2Images].map((src, idx) => (
              <div key={idx} className="flex-none w-[250px] md:w-[350px] aspect-square overflow-hidden bg-gray-100">
                <img
                  src={`${src}?auto=compress&cs=tinysrgb&w=600`}
                  alt="Gallery Item"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Gallery;
