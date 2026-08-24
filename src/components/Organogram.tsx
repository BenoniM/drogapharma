import { useState, useMemo, memo, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Building2,
  ShieldCheck,
  TrendingUp,
  FlaskConical,
  Briefcase,
  Layers,
  Phone,
  Mail,
  X,
  Plus,
  GitFork,
  LayoutGrid,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   NOTE: Images are NOT eagerly imported here.
   Tree-view rows use initials avatars (zero network cost).
   Images only load in: leader cards (2 images) and the modal (1 at a time).
   Grid view lazy-loads images only when user switches to it.
───────────────────────────────────────────────────────────────────────────── */
import abdiImg from "../assets/abdi.jpg";
import henokImg from "../assets/henoknew.jpg";

/* Deferred image map — loaded only when first accessed (grid/modal) */
const lazyTeamImages = import.meta.glob("../assets/ourTeam/*.{jpg,JPG,jpeg,png}", {
  eager: false,
  import: "default",
}) as Record<string, () => Promise<string>>;

const resolvedCache: Record<string, string> = {};

async function resolveImg(nameKey: string): Promise<string | null> {
  const cached = resolvedCache[nameKey];
  if (cached) return cached;
  const entry = Object.entries(lazyTeamImages).find(([p]) =>
    p.toLowerCase().includes(nameKey.toLowerCase())
  );
  if (!entry) return null;
  const url = (await entry[1]()) as unknown as string;
  resolvedCache[nameKey] = url;
  return url;
}

/* ── Types ─────────────────────────────────────────────────────────────── */
type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  level: "ceo" | "deputy" | "c-level" | "director" | "manager";
  imageKey: string;          // key used to lazy-resolve the image
  eagerImage?: string;       // only set for the 2 top leaders
  email: string;
  phone: string;
  bio: string;
  startDate: string;
};

/* ── Static data (no images embedded here) ──────────────────────────── */
const MEMBERS: TeamMember[] = [
  { id: "henok-teka", name: "Henok Teka", role: "Group CEO", department: "Executive Board", level: "ceo", imageKey: "", eagerImage: henokImg, email: "md@drogapharma.com", phone: "6637 / +251 913 667 537", bio: "Visionary founder of Droga Pharma, driving healthcare transformation and pharmaceutical self-reliance.", startDate: "2015" },
  { id: "abdi-ermolo", name: "Dr. Abdi Ermolo", role: "Deputy CEO & Co-Founder", department: "Executive Board", level: "deputy", imageKey: "", eagerImage: abdiImg, email: "abdi@drogapharma.com", phone: "6637 / +251 929 908 566", bio: "Senior medical administrator overseeing clinical excellence and operations across Droga Group.", startDate: "2015" },
  { id: "besufekad-soressa", name: "Besufekad Soressa", role: "Group Chief Officer", department: "Executive Leadership", level: "c-level", imageKey: "besufekadsoressa", email: "besufekadsoressa@drogapharma.com", phone: "+251 911 000 000", bio: "Leading group-wide organizational alignment, operations, and multi-entity governance.", startDate: "2018" },
  { id: "samuel-abera", name: "Samuel Abera", role: "Chief Strategy Officer", department: "Executive Leadership", level: "c-level", imageKey: "samuelabera", email: "samuelabera@drogapharma.com", phone: "+251 911 000 000", bio: "Driving corporate strategic planning and market competitiveness frameworks.", startDate: "2019" },
  { id: "berhan-assefa", name: "Berhan Assefa", role: "CTO - Droga Consulting", department: "Technology & Innovation", level: "c-level", imageKey: "berhanassefa", email: "berhanassefa@drogapharma.com", phone: "+251 911 000 000", bio: "Spearheading digital health architectures and enterprise technology modernization.", startDate: "2020" },
  // Operations
  { id: "gizachew-terega", name: "Gizachew Terega", role: "Operations Director", department: "Operations & Supply Chain", level: "director", imageKey: "gizachewterega", email: "gizachewterega@drogapharma.com", phone: "+251 911 000 000", bio: "Managing nationwide pharmaceutical logistics pipelines, warehouse hubs, and delivery timelines.", startDate: "2018" },
  { id: "henok-wamlak", name: "Henok Wamlak", role: "Warehouse & Distribution Manager", department: "Operations & Supply Chain", level: "manager", imageKey: "henokwamlak", email: "henokwamlak@drogapharma.com", phone: "+251 911 000 000", bio: "Overseeing GDP-compliant cold chain storage, distribution hubs, and inventory tracking.", startDate: "2019" },
  { id: "daniel-tesfaye", name: "Daniel Tesfaye", role: "Pharmacy Supply Chain Manager", department: "Operations & Supply Chain", level: "manager", imageKey: "danieltesfaye", email: "danieltesfaye@drogapharma.com", phone: "+251 911 000 000", bio: "Coordinating procurement cycles and inventory availability for pharmacy networks.", startDate: "2020" },
  // Quality
  { id: "getahun-zenebe", name: "Getahun Zenebe", role: "Quality & Regulatory Affairs Director", department: "Quality & Regulatory Affairs", level: "director", imageKey: "getahunzenebe", email: "getahunzenebe@drogapharma.com", phone: "+251 911 000 000", bio: "Ensuring adherence to EFDA, ISO, and WHO standards across import, storage, and distribution.", startDate: "2017" },
  { id: "tegegn-aklliu", name: "Tegegn Aklliu", role: "Quality Director - Trust Pharma", department: "Quality & Regulatory Affairs", level: "director", imageKey: "tegegnaklliu", email: "tegegnaklliu@drogapharma.com", phone: "+251 911 000 000", bio: "Directing quality control testing and GMP compliance at Trust Manufacturing.", startDate: "2020" },
  { id: "jalele-yadeta", name: "Jalele Yadeta", role: "Regulatory Affairs Manager", department: "Quality & Regulatory Affairs", level: "manager", imageKey: "jaleleyadeta", email: "jaleleyadeta@drogapharma.com", phone: "+251 911 000 000", bio: "Managing medicine dossiers, product registrations, and regulatory correspondence.", startDate: "2019" },
  // Commercial
  { id: "yohannes-tamerat", name: "Yohannes Tamerat", role: "Marketing Director", department: "Commercial & Marketing", level: "director", imageKey: "yohannestamerat", email: "yohannestamerat@drogapharma.com", phone: "+251 911 000 000", bio: "Directing market positioning, key account partnerships, and brand growth.", startDate: "2018" },
  { id: "getachew-tsega", name: "Getachew Tsega", role: "Strategic & Planning Director", department: "Commercial & Marketing", level: "director", imageKey: "getachewtsega", email: "getachewtsega@drogapharma.com", phone: "+251 911 000 000", bio: "Overseeing business forecasting, tender pipelines, and long-range roadmap planning.", startDate: "2019" },
  { id: "bati-tariku", name: "Bati Tariku", role: "Wholesales Manager", department: "Commercial & Marketing", level: "manager", imageKey: "batitariku", email: "batitariku@drogapharma.com", phone: "+251 911 000 000", bio: "Managing wholesale partnerships with pharmacies and regional distributors.", startDate: "2018" },
  { id: "nuredin-hassen", name: "Nuredin Hassen", role: "Tender Operation Manager", department: "Commercial & Marketing", level: "manager", imageKey: "nuredinhassen", email: "nuredinhassen@drogapharma.com", phone: "+251 911 000 000", bio: "Leading public and private sector tender submissions and bid management.", startDate: "2019" },
  { id: "firesenay-abayneh", name: "Firesenay Abayneh", role: "Area Sales Manager - Central", department: "Commercial & Marketing", level: "manager", imageKey: "firesenayabayneh", email: "firesenayabayneh@drogapharma.com", phone: "+251 911 000 000", bio: "Leading field sales teams and customer relationships across Central region.", startDate: "2020" },
  // Manufacturing
  { id: "abayneh-tilahun", name: "Abayneh Tilahun", role: "Product Director - Trust", department: "Manufacturing & R&D", level: "director", imageKey: "abaynehtilahun", email: "abaynehtilahun@drogapharma.com", phone: "+251 911 000 000", bio: "Directing pharmaceutical formulations, manufacturing operations, and production optimization.", startDate: "2020" },
  { id: "muluken-nigatu", name: "Muluken Nigatu", role: "R&D Director", department: "Manufacturing & R&D", level: "director", imageKey: "mulukennigatu", email: "mulukennigatu@drogapharma.com", phone: "+251 911 000 000", bio: "Guiding pharmaceutical research, clinical validation, and healthcare innovation.", startDate: "2021" },
  { id: "jenberu-mechal", name: "Jenberu Mechal", role: "Project Officer Director - Group", department: "Manufacturing & R&D", level: "director", imageKey: "jenberumechal", email: "jenberumechal@drogapharma.com", phone: "+251 911 000 000", bio: "Managing major group capital projects, plant expansions, and infrastructure initiatives.", startDate: "2019" },
  // Corporate
  { id: "yemeserach-molla", name: "Yemeserach Molla", role: "Finance Director", department: "Corporate Services & Governance", level: "director", imageKey: "yemeserachmolla", email: "yemeserachmolla@drogapharma.com", phone: "+251 911 000 000", bio: "Directing financial strategy, capital allocation, audit compliance, and fiscal governance.", startDate: "2016" },
  { id: "yosan-chari", name: "Yosan Chari", role: "Human Resource Director", department: "Corporate Services & Governance", level: "director", imageKey: "yosanchari", email: "yosanchari@drogapharma.com", phone: "+251 911 000 000", bio: "Fostering organizational culture, talent development, and workforce empowerment.", startDate: "2017" },
  { id: "melaku-meseret", name: "Melaku Meseret", role: "Legal Director", department: "Corporate Services & Governance", level: "director", imageKey: "melakumeseret", email: "melakumeseret@drogapharma.com", phone: "+251 911 000 000", bio: "Overseeing corporate legal affairs, commercial agreements, and statutory compliance.", startDate: "2018" },
  { id: "manayeh-wubalem", name: "Manayeh Wubalem", role: "Procurement Manager", department: "Corporate Services & Governance", level: "manager", imageKey: "manayehwubalem", email: "manayehwubalem@drogapharma.com", phone: "+251 911 000 000", bio: "Managing global vendor relationships and international procurement standards.", startDate: "2019" },
  { id: "mikiyas-gizaw", name: "Mikiyas Gizaw", role: "General Services Manager", department: "Corporate Services & Governance", level: "manager", imageKey: "mikiyasgizaw", email: "mikiyasgizaw@drogapharma.com", phone: "+251 911 000 000", bio: "Leading facility management, transport fleet, and office operational continuity.", startDate: "2020" },
  { id: "entonios-birhane", name: "Entonios Birhane", role: "Human Resources Manager", department: "Corporate Services & Governance", level: "manager", imageKey: "entoniosbirhane", email: "entoniosbirhane@drogapharma.com", phone: "+251 911 000 000", bio: "Managing talent onboarding, employee engagement, and operational HR workflows.", startDate: "2021" },
  // Subsidiaries
  { id: "getahun-tefera", name: "Getahun Tefera", role: "Chain Pharmacy Director", department: "Subsidiaries & Clinical Units", level: "director", imageKey: "getahuntefera", email: "getahuntefera@drogapharma.com", phone: "+251 911 000 000", bio: "Overseeing Droga retail pharmacy outlets and patient dispensing standards.", startDate: "2018" },
  { id: "nebiyou-tesfaye", name: "Nebiyou Tesfaye", role: "Physiotherapist Director", department: "Subsidiaries & Clinical Units", level: "director", imageKey: "nebiyoutesfaye", email: "nebiyoutesfaye@drogapharma.com", phone: "+251 911 000 000", bio: "Leading Droga Physiotherapy clinics and rehabilitation protocols.", startDate: "2016" },
  { id: "jibril-muhajer", name: "Jibril Muhajer", role: "Deputy General Manager - EMA", department: "Subsidiaries & Clinical Units", level: "director", imageKey: "jibrilmuhajer", email: "jibrilmuhajer@drogapharma.com", phone: "+251 911 000 000", bio: "Directing medical device imports and hospital equipment technical services.", startDate: "2019" },
  { id: "befikadu-taye", name: "Befikadu Taye", role: "Import Manager - EMA", department: "Subsidiaries & Clinical Units", level: "manager", imageKey: "befikadutaye", email: "befikadutaye@drogapharma.com", phone: "+251 911 000 000", bio: "Coordinating port clearance and logistics for medical equipment imports.", startDate: "2020" },
  { id: "meron-getachew", name: "Meron Getachew", role: "Export Manager - EMA", department: "Subsidiaries & Clinical Units", level: "manager", imageKey: "merongetachew", email: "merongetachew@drogapharma.com", phone: "+251 911 000 000", bio: "Leading regional export operations across the Horn of Africa.", startDate: "2021" },
];

const DEPARTMENTS = [
  { name: "All Departments", icon: Layers },
  { name: "Operations & Supply Chain", icon: Building2, lead: "Gizachew Terega" },
  { name: "Quality & Regulatory Affairs", icon: ShieldCheck, lead: "Getahun Zenebe" },
  { name: "Commercial & Marketing", icon: TrendingUp, lead: "Yohannes Tamerat" },
  { name: "Manufacturing & R&D", icon: FlaskConical, lead: "Abayneh Tilahun" },
  { name: "Corporate Services & Governance", icon: Briefcase, lead: "Yemeserach Molla" },
  { name: "Subsidiaries & Clinical Units", icon: GitFork, lead: "Getahun Tefera" },
];

/* ── Initials Avatar — zero network, zero layout shift ─────────────────── */
const PALETTE = ["#FFF200","#E8F4F8","#F0F0F0","#FFF8E1","#E8F5E9","#FCE4EC","#EDE7F6"];
const Initials = memo(({ name, size = 40 }: { name: string; size?: number }) => {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const bg = PALETTE[name.charCodeAt(0) % PALETTE.length];
  return (
    <div
      style={{ width: size, height: size, background: bg, fontSize: size * 0.36 }}
      className="rounded-xl flex items-center justify-center font-black text-black shrink-0 border border-black/10"
    >
      {initials}
    </div>
  );
});
Initials.displayName = "Initials";

/* ── Lazy image that fades in when loaded ──────────────────────────────── */
const LazyImg = memo(({ imageKey, eagerImage, alt, className }: {
  imageKey: string;
  eagerImage?: string;
  alt: string;
  className?: string;
}) => {
  const [src, setSrc] = useState<string | null>(eagerImage ?? null);

  useEffect(() => {
    if (eagerImage || !imageKey) return;
    let cancelled = false;
    resolveImg(imageKey).then((url) => {
      if (!cancelled && url) setSrc(url);
    });
    return () => { cancelled = true; };
  }, [imageKey, eagerImage]);

  if (!src) return <Initials name={alt} size={80} />;
  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      className={className}
      style={{ transition: "opacity 0.3s ease" }}
    />
  );
});
LazyImg.displayName = "LazyImg";

/* ── Modal ─────────────────────────────────────────────────────────────── */
const MemberModal = memo(({ member, onClose }: { member: TeamMember; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, y: 12 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.95, y: 12 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="bg-white w-full max-w-xl rounded-[1.75rem] overflow-hidden shadow-2xl border border-black/10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-[#FFF200] px-5 py-4 flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-wider">
          {member.department}
        </span>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/10 hover:bg-black hover:text-white flex items-center justify-center transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-100 shrink-0">
            <LazyImg
              imageKey={member.imageKey}
              eagerImage={member.eagerImage}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-black">{member.name}</h3>
            <p className="text-sm font-semibold text-slate-600 mt-0.5">{member.role}</p>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full mt-1.5 inline-block">
              Since {member.startDate}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <a href={`tel:${member.phone.split("/")[0].trim()}`}
            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 hover:bg-slate-100 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-black text-[#FFF200] flex items-center justify-center shrink-0"><Phone size={13} /></div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Phone</p>
              <p className="text-xs font-bold text-black truncate">{member.phone}</p>
            </div>
          </a>
          <a href={`mailto:${member.email}`}
            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 hover:bg-slate-100 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#FFF200] text-black flex items-center justify-center shrink-0"><Mail size={13} /></div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
              <p className="text-xs font-bold text-black truncate">{member.email}</p>
            </div>
          </a>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
          {member.bio}
        </p>
        <button onClick={onClose} className="w-full py-2.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-zinc-800 transition-colors">
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
));
MemberModal.displayName = "MemberModal";

/* ── Tree-view row — initials only, no image network requests ──────────── */
const MemberRow = memo(({ member, onOpen }: { member: TeamMember; onOpen: () => void }) => (
  <div
    onClick={onOpen}
    className="group cursor-pointer p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors flex items-center gap-3"
  >
    <Initials name={member.name} size={36} />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-xs text-black truncate">{member.name}</span>
        {member.level === "director" && (
          <span className="bg-black text-[#FFF200] text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase shrink-0">Dir</span>
        )}
      </div>
      <p className="text-[10px] text-slate-500 font-medium truncate">{member.role}</p>
    </div>
    <Plus size={12} className="text-slate-300 group-hover:text-black shrink-0 transition-colors" />
  </div>
));
MemberRow.displayName = "MemberRow";

/* ── Grid card — images only loaded when user switches to grid view ─────── */
const GridCard = memo(({ member, onOpen }: { member: TeamMember; onOpen: () => void }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(member.eagerImage ?? null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgSrc || !member.imageKey) return;
    const el = imgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          resolveImg(member.imageKey).then((url) => { if (url) setImgSrc(url); });
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [member.imageKey, imgSrc]);

  return (
    <div
      onClick={onOpen}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 hover:border-black transition-all duration-200 flex flex-col"
    >
      <div ref={imgRef} className="aspect-[4/3] bg-slate-100 flex items-center justify-center overflow-hidden relative">
        {imgSrc ? (
          <img src={imgSrc} alt={member.name} decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <Initials name={member.name} size={64} />
        )}
        <div className="absolute top-2 right-2 bg-black text-[#FFF200] text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase">
          {member.level}
        </div>
      </div>
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">{member.department}</span>
          <h4 className="font-bold text-sm text-black leading-snug">{member.name}</h4>
          <p className="text-[11px] font-medium text-slate-500 mt-0.5 truncate">{member.role}</p>
        </div>
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-black flex items-center gap-1"><Phone size={9} />6637</span>
          <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#FFF200] flex items-center justify-center text-black transition-colors"><Plus size={11} /></span>
        </div>
      </div>
    </div>
  );
});
GridCard.displayName = "GridCard";

/* ── Leader card (only 2, uses eager images) ─────────────────────────── */
const LeaderCard = memo(({ leader, onOpen }: { leader: TeamMember; onOpen: () => void }) => (
  <div onClick={onOpen}
    className="group cursor-pointer bg-white p-4 rounded-2xl shadow-md border-2 border-black hover:border-[#bfa000] transition-colors relative overflow-hidden">
    <div className="absolute top-0 right-0 bg-[#FFF200] text-black font-extrabold text-[9px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
      {leader.role}
    </div>
    <div className="flex items-center gap-3.5">
      <div className="w-14 h-14 rounded-xl overflow-hidden border border-black/10 shrink-0">
        <img src={leader.eagerImage} alt={leader.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div>
        <h4 className="font-display font-bold text-base text-black">{leader.name}</h4>
        <p className="text-[10px] font-semibold text-slate-500">{leader.department}</p>
        <div className="flex items-center gap-1 text-[10px] font-bold text-black mt-1 bg-slate-100 w-fit px-2 py-0.5 rounded-md">
          <Phone size={8} />{leader.phone}
        </div>
      </div>
    </div>
  </div>
));
LeaderCard.displayName = "LeaderCard";

/* ── C-level card ────────────────────────────────────────────────────── */
const CLevelCard = memo(({ member, onOpen }: { member: TeamMember; onOpen: () => void }) => (
  <div onClick={onOpen}
    className="group cursor-pointer bg-white p-3.5 rounded-xl border border-slate-200 hover:border-black transition-colors flex items-center gap-3">
    <Initials name={member.name} size={40} />
    <div className="min-w-0 flex-1">
      <h5 className="font-bold text-sm text-black truncate">{member.name}</h5>
      <p className="text-[10px] font-bold text-slate-600 truncate">{member.role}</p>
    </div>
    <ChevronRight size={13} className="text-slate-300 group-hover:text-black shrink-0 transition-colors" />
  </div>
));
CLevelCard.displayName = "CLevelCard";

/* ── Department block ────────────────────────────────────────────────── */
const DeptBlock = memo(({ dept, members, onOpen }: {
  dept: typeof DEPARTMENTS[number];
  members: TeamMember[];
  onOpen: (m: TeamMember) => void;
}) => {
  const Icon = dept.icon;
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-black transition-colors duration-200 flex flex-col">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-2">
        <div className="w-8 h-8 rounded-xl bg-[#FFF200] flex items-center justify-center text-black shrink-0">
          <Icon size={16} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-black leading-tight">{dept.name}</h4>
          {"lead" in dept && <p className="text-[10px] text-slate-500">Lead: <strong className="text-black">{dept.lead as string}</strong></p>}
        </div>
      </div>
      <div className="space-y-0 flex-1">
        {members.map((m) => <MemberRow key={m.id} member={m} onOpen={() => onOpen(m)} />)}
      </div>
      <div className="mt-2 pt-2 border-t border-slate-100 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {members.length} members
      </div>
    </div>
  );
});
DeptBlock.displayName = "DeptBlock";

/* ── Pre-grouped at module level — never recomputed ─────────────────── */
const MEMBERS_BY_DEPT = MEMBERS.reduce<Record<string, TeamMember[]>>((acc, m) => {
  (acc[m.department] ??= []).push(m);
  return acc;
}, {});

const BOARD = MEMBERS.filter((m) => m.level === "ceo" || m.level === "deputy");
const CLEVEL = MEMBERS.filter((m) => m.level === "c-level");

/* ── Main export ─────────────────────────────────────────────────────── */
const Organogram = () => {
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"tree" | "grid">("tree");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const openMember = useCallback((m: TeamMember) => setSelectedMember(m), []);
  const closeMember = useCallback(() => setSelectedMember(null), []);

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return MEMBERS.filter((m) => {
      const dept = selectedDept === "All Departments" || m.department === selectedDept;
      const query = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.department.toLowerCase().includes(q);
      return dept && query;
    });
  }, [selectedDept, searchQuery]);

  const visibleDepts = useMemo(
    () => DEPARTMENTS.filter((d) => d.name !== "All Departments" &&
      (selectedDept === "All Departments" || selectedDept === d.name)),
    [selectedDept]
  );

  return (
    <section id="organogram-section" className="py-20 bg-[#fafafa] border-t border-black/5">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF200] text-black font-bold text-xs uppercase tracking-widest mb-4">
            <GitFork size={13} /> Corporate Governance
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-black tracking-tight">
            Organizational Structure & Organogram
          </h2>
          <p className="text-slate-500 mt-3 text-base leading-relaxed">
            Our governance framework empowers dynamic leadership and maximizes reachability across all Droga Pharma divisions.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-2xl border border-black/5 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full md:w-auto">
            {(["tree", "grid"] as const).map((mode) => (
              <button key={mode} onClick={() => setViewMode(mode)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs tracking-wide transition-colors ${
                  viewMode === mode ? "bg-black text-[#FFF200] shadow" : "text-slate-600 hover:text-black"
                }`}
              >
                {mode === "tree" ? <><GitFork size={12} />Hierarchy Tree</> : <><LayoutGrid size={12} />Department Grid</>}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, role, department..."
              className="w-full pl-8 pr-7 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-black placeholder:text-slate-400 focus:outline-none focus:border-black focus:bg-white transition-colors font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            const active = selectedDept === dept.name;
            return (
              <button key={dept.name} onClick={() => setSelectedDept(dept.name)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors duration-150 ${
                  active ? "bg-[#FFF200] text-black" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon size={12} className={active ? "text-black" : "text-slate-400"} />
                {dept.name}
              </button>
            );
          })}
        </div>

        {/* Tree view */}
        {viewMode === "tree" && (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl mx-auto mb-5">
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Executive Board</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BOARD.map((l) => <LeaderCard key={l.id} leader={l} onOpen={() => openMember(l)} />)}
              </div>
            </div>

            <div className="w-px h-6 bg-slate-300" />

            <div className="w-full max-w-4xl mx-auto my-4">
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Executive Committee</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {CLEVEL.map((m) => <CLevelCard key={m.id} member={m} onOpen={() => openMember(m)} />)}
              </div>
            </div>

            <div className="w-px h-6 bg-slate-300" />

            <div className="w-full mt-4">
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Functional Directorates & Divisions</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleDepts.map((dept) => (
                  <DeptBlock key={dept.name} dept={dept} members={MEMBERS_BY_DEPT[dept.name] ?? []} onOpen={openMember} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid view */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMembers.map((m) => (
              <GridCard key={m.id} member={m} onOpen={() => openMember(m)} />
            ))}
          </div>
        )}

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No results for "{searchQuery}"</p>
            <button onClick={() => { setSearchQuery(""); setSelectedDept("All Departments"); }}
              className="mt-2 text-xs font-bold text-black bg-[#FFF200] px-4 py-2 rounded-full">
              Reset
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedMember && <MemberModal member={selectedMember} onClose={closeMember} />}
      </AnimatePresence>
    </section>
  );
};

export default Organogram;
