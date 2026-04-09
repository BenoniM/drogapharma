import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const crsImageModules = import.meta.glob(
  "@/assets/crs/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const initiatives = Object.entries(crsImageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image]) => {
    const filename = path.split("/").pop() ?? "";
    const title = filename.replace(/\.[^.]+$/, "");

    return {
      category: "Community",
      title,
      description: `${title} activity under our CRS program.`,
      image,
    };
  });

const CRS = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-padding pb-10">
        <div className="container-narrow">
          <div className="border-t border-border/70 pt-8 mb-10" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight"
          >
            Charities and Foundations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-base md:text-lg text-foreground/70 max-w-3xl"
          >
            Our corporate social responsibility work focuses on health,
            education, community support, and sustainable access across the
            ecosystems we serve.
          </motion.p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {initiatives.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="overflow-hidden rounded-2xl bg-white border border-border/40 shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] min-h-[220px]">
                  <div className="p-7 md:p-8 flex flex-col justify-between">
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/70">
                      {item.category}
                    </span>
                    <div className="mt-4">
                      <h2 className="font-display text-2xl md:text-3xl font-semibold leading-tight text-black max-w-md">
                        {item.title}
                      </h2>
                      <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground/70 max-w-md">
                        {item.description}
                      </p>
                    </div>
                    <a
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black group"
                    >
                      Learn more
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                  <div className="relative min-h-[240px] overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CRS;
