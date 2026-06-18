import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ImageSlider from "@/components/ImageSlider";
import heroBgOne from "@/assets/herobg/2.jpg";
import heroBgTwo from "@/assets/herobg/4.jpg";
import heroBgThree from "@/assets/herobg/5.jpg";

const row1Images = [
  "https://images.pexels.com/photos/33410957/pexels-photo-33410957.jpeg",
  "https://images.pexels.com/photos/11876277/pexels-photo-11876277.jpeg",
  "https://images.pexels.com/photos/1407487/pexels-photo-1407487.jpeg",
  "https://images.pexels.com/photos/13025284/pexels-photo-13025284.jpeg",
  "https://images.pexels.com/photos/11299583/pexels-photo-11299583.jpeg",
  "https://images.pexels.com/photos/905956/pexels-photo-905956.jpeg",
  "https://images.pexels.com/photos/14479234/pexels-photo-14479234.jpeg",
  "https://images.pexels.com/photos/31291737/pexels-photo-31291737.jpeg",
];

const row2Images = [
  "https://images.pexels.com/photos/37722714/pexels-photo-37722714.jpeg",
  "https://images.pexels.com/photos/30395628/pexels-photo-30395628.jpeg",
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
  "https://images.pexels.com/photos/4476718/pexels-photo-4476718.jpeg",
  "https://images.pexels.com/photos/18506932/pexels-photo-18506932.jpeg",
  "https://images.pexels.com/photos/20346013/pexels-photo-20346013.jpeg",
  "https://images.pexels.com/photos/28984522/pexels-photo-28984522.jpeg",
  "https://images.pexels.com/photos/15005692/pexels-photo-15005692.jpeg",
];

const Gallery = () => {
  return (
    <PageTransition>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="page-hero-section relative">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
            <style>
              {`
                .anim-bg-text-gallery {
                  fill: rgba(0, 0, 0, 0);
                  stroke: #000;
                  stroke-width: 2px;
                  stroke-dasharray: 3000 1000;
                  animation: strokeDashBg 20s linear infinite;
                  opacity: 0.55;
                }
                @keyframes strokeDashBg {
                  from { stroke-dashoffset: 0; }
                  to { stroke-dashoffset: -4000; }
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
                className="anim-bg-text-gallery uppercase"
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
          
          <div className="w-full relative z-10 px-4 lg:px-12 xl:px-16 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              <div className="flex flex-col">
                <span className="section-label text-black block mb-4">Gallery</span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-black text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
                >
                  Our Work
                </motion.h1>
              </div>
            </div>
          </div>
        </section>

        {/* Image overlapping the hero */}
        <section className="relative z-20 pl-4 md:pl-8 pr-0 -mt-24 mb-16 w-full md:w-[90%] lg:w-[85%] ml-auto">
          <div className="w-full h-[250px] md:h-[400px] rounded-l-md overflow-hidden shadow-2xl relative bg-black">
            <ImageSlider
              images={[
                { src: heroBgOne, alt: "Gallery Highlight 1" },
                { src: heroBgTwo, alt: "Gallery Highlight 2" },
                { src: heroBgThree, alt: "Gallery Highlight 3" },
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
              animation: marquee-left 40s linear infinite;
            }
            .animate-marquee-right {
              animation: marquee-right 40s linear infinite;
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
