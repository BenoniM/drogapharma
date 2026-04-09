import { motion } from "framer-motion";
import {
  ArrowRight,
  HeartHandshake,
  Users,
  GraduationCap,
  PackageCheck,
  Truck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const initiatives = [
  {
    category: "Community",
    title: "Covid-19: INEOS Community Fund",
    description:
      "Grassroots charity grants supporting urgent needs and community resilience during the Covid-19 crisis.",
    accent: "from-rose-50 via-white to-amber-50",
    icon: HeartHandshake,
    iconTone: "text-rose-600",
    orbTone: "bg-rose-200/70",
  },
  {
    category: "Community",
    title: "Local Giving",
    description:
      "Partnerships and local initiatives that support the communities around our sites and service networks.",
    accent: "from-sky-50 via-white to-cyan-50",
    icon: Users,
    iconTone: "text-sky-600",
    orbTone: "bg-sky-200/70",
  },
  {
    category: "Education",
    title: "Skills and Youth Development",
    description:
      "Practical support for education, mentorship, and early-career development across healthcare and operations.",
    accent: "from-violet-50 via-white to-fuchsia-50",
    icon: GraduationCap,
    iconTone: "text-violet-600",
    orbTone: "bg-violet-200/70",
  },
  {
    category: "Impact",
    title: "Responsible Supply Support",
    description:
      "Programs focused on reliable distribution, quality assurance, and wider access to essential products.",
    accent: "from-emerald-50 via-white to-lime-50",
    icon: PackageCheck,
    iconTone: "text-emerald-600",
    orbTone: "bg-emerald-200/70",
  },
  {
    category: "Health",
    title: "Warehouse and Distribution Outreach",
    description:
      "Logistics-led support initiatives that improve product availability and strengthen service delivery.",
    accent: "from-amber-50 via-white to-orange-50",
    icon: Truck,
    iconTone: "text-amber-600",
    orbTone: "bg-amber-200/70",
  },
  {
    category: "Partnership",
    title: "Healthcare Partner Network",
    description:
      "Long-term collaborations that expand access to care and create measurable social impact.",
    accent: "from-teal-50 via-white to-cyan-50",
    icon: ShieldCheck,
    iconTone: "text-teal-600",
    orbTone: "bg-teal-200/70",
  },
];

const IllustrationPanel = ({
  icon: Icon,
  accent,
  iconTone,
  orbTone,
}: {
  icon: LucideIcon;
  accent: string;
  iconTone: string;
  orbTone: string;
}) => {
  return (
    <div className={`relative min-h-[240px] overflow-hidden bg-gradient-to-br ${accent}`}>
      <div className="absolute inset-0 opacity-70" />
      <div className={`absolute -right-10 top-10 h-40 w-40 rounded-full blur-3xl ${orbTone}`} />
      <div className={`absolute -left-12 bottom-[-30px] h-44 w-44 rounded-full blur-3xl ${orbTone} opacity-60`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.6),transparent_32%)]" />

      <div className="absolute inset-x-8 top-8 h-px bg-black/5" />
      <div className="absolute bottom-8 left-8 right-8 h-px bg-black/5" />

      <div className="relative h-full min-h-[240px] p-8 flex items-end justify-between">
        <div className="max-w-[56%]">
          <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85 shadow-sm ring-1 ring-black/5 ${iconTone}`}>
            <Icon size={28} strokeWidth={2.1} />
          </div>
          <div className="mt-6 space-y-2">
            <div className="h-2 w-24 rounded-full bg-black/10" />
            <div className="h-2 w-32 rounded-full bg-black/10" />
            <div className="h-2 w-18 rounded-full bg-black/10" />
          </div>
        </div>

        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className={`absolute inset-0 rounded-full ${orbTone} blur-none opacity-35`} />
          <div className="absolute h-20 w-20 rounded-full border border-black/5 bg-white/55" />
          <div className="absolute h-14 w-14 rounded-full bg-white shadow-sm ring-1 ring-black/5" />
          <div className={`absolute h-8 w-8 rounded-full ${iconTone} bg-current/15`} />
        </div>
      </div>
    </div>
  );
};

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
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-base md:text-lg text-foreground/70 max-w-3xl"
          >
            Our corporate social responsibility work focuses on health, education,
            community support, and sustainable access across the ecosystems we serve.
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
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary">
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
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </div>
                  <IllustrationPanel
                    icon={item.icon}
                    accent={item.accent}
                    iconTone={item.iconTone}
                    orbTone={item.orbTone}
                  />
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