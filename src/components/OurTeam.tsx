import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Mail, Phone } from "lucide-react";
import abdiImg from "../assets/abdi.jpg";
import henokImg from "../assets/henoknew.jpg";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  bio: string;
  startDate: string;
};

type TeamCardProps = {
  name: string;
  role: string;
  image: string;
  isActive?: boolean;
  isFeatured?: boolean;
  onOpen: () => void;
};

const teamImages = import.meta.glob("../assets/ourTeam/*.{jpg,JPG,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const formatNameMapping: Record<string, string> = {
  abaynehtilahun: "Abayneh Tilahun",
  batitariku: "Bati Tariku",
  befikadutaye: "Befikadu Taye",
  besufekadsoressa: "Besufekad Soressa",
  danieltesfaye: "Daniel Tesfaye",
  entoniosbirhane: "Entonios Birhane",
  firesenayabayneh: "Firesenay Abayneh",
  getachewtsega: "Getachew Tsega",
  getahuntefera: "Getahun Tefera",
  getahunzenebe: "Getahun Zenebe",
  gizachewterega: "Gizachew Terega",
  henokwamlak: "Henok Wamlak",
  jaleleyadeta: "Jalele Yadeta",
  jenberumechal: "Jenberu Mechal",
  jibrilmuhajer: "Jibril Muhajer",
  manayehwubalem: "Manayeh Wubalem",
  melakumeseret: "Melaku Meseret",
  merongetachew: "Meron Getachew",
  mikiyasgizaw: "Mikiyas Gizaw",
  mulukennigatu: "Muluken Nigatu",
  nebiyoutesfaye: "Nebiyou Tesfaye",
  nuredinhassen: "Nuredin Hassen",
  samuelabera: "Samuel Abera",
  tegegnaklliu: "Tegegn Aklliu",
  yemeserachmolla: "Yemeserach Molla",
  yohannestamerat: "Yohannes Tamerat",
  yosanchari: "Yosan Chari",
};

const roleNameMapping: Record<string, string> = {
  abaynehtilahun: "Product Director-Trust",
  batitariku: "Whalesales Manager",
  befikadutaye: "Import Manager-EMA",
  besufekadsoressa: "Group chief officer",
  danieltesfaye: "Pharmacy Supply Chain Manager",
  entoniosbirhane: "Human Resources Manager",
  firesenayabayneh: "Area Sales Manager-central",
  getachewtsega: "Strategic and planning Director",
  getahuntefera: "Chain  Pharmacy Director",
  getahunzenebe: "Quality and Regulatory Affairs Director",
  gizachewterega: "Operations Director",
  henokwamlak: "Warehouse and Distribution Manager",
  jaleleyadeta: "Regulatory Affairs Manager",
  jenberumechal: "Project officer  Director-Droga Group",
  jibrilmuhajer: "Deputy General Manager-EMA",
  manayehwubalem: "Procurement Manager",
  melakumeseret: "Legal Director",
  merongetachew: "Export Manager-EMA",
  mikiyasgizaw: "General Services Manager",
  mulukennigatu: "R&D Director",
  nebiyoutesfaye: "Physiotherapist Director",
  nuredinhassen: "Tender Operation Manager",
  samuelabera: "Chief Strategy officer",
  tegegnaklliu: "Quality Director-Trust",
  yemeserachmolla: "Finance Director",
  yohannestamerat: "Marketing Director",
  yosanchari: "Human Resource Director",
};

const teamMembers = Object.entries(teamImages).map(([path, src]) => {
  const filename = path.split("/").pop() || "";
  const rawName = filename.replace(/\.[^/.]+$/, "");
  const normalizedName = rawName.toLowerCase();
  const formattedName = formatNameMapping[normalizedName] || rawName;

  return {
    name: formattedName,
    role: roleNameMapping[normalizedName] || "Team Member",
    image: src,
    email: `${normalizedName}@drogapharma.com`,
    phone: "+251 911 000 000",
    bio: `Dedicated team member contributing to the success and continuous growth of Droga Pharma.`,
    startDate: "2020",
  };
});

const MemberModal = ({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-3xl rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] relative border border-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-[#fff200]/35 via-[#fff200]/10 to-transparent">
          <h2 className="font-display text-2xl font-bold text-black tracking-tight">
            Member info
          </h2>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-black/5 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 md:p-7 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-8 items-start">
          <div className="text-center md:text-left">
            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto md:mx-0 mb-4 border-4 border-[#fff200]/30 shadow-md">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-black leading-tight">
              {member.name}
            </h3>
            <div className="mt-3 flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black text-white text-[11px] uppercase tracking-wider font-semibold">
                {member.role}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-[11px] uppercase tracking-wider font-semibold">
                Since {member.startDate}
              </span>
            </div>
          </div>

          <div className="text-left space-y-4">
            <div className="flex items-center gap-4 text-gray-800 p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-100">
                <Mail size={20} className="text-black/60" />
              </div>
              <span className="font-medium text-sm md:text-base">
                {member.email}
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-800 p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-100">
                <Phone size={20} className="text-black/60" />
              </div>
              <span className="font-medium text-sm md:text-base">
                {member.phone}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Bio
              </p>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                {member.bio}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full py-4 bg-black border border-black rounded-2xl font-bold text-white hover:bg-black/90 transition-all active:scale-[0.98]"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TeamCard = ({
  name,
  role,
  image,
  isActive = true,
  isFeatured = false,
  onOpen,
}: TeamCardProps) => {
  return (
    <motion.div
      className={`relative group h-full w-full ${
        isFeatured ? "aspect-[3/4]" : ""
      }`}
      initial={false}
      animate={{
        filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
        opacity: isActive ? 1 : 0.6,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Inner Card with Notch */}
      <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-gradient-to-br from-black/5 to-black/20 shadow-xl border border-black/10">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent hover:from-black/85 hover:via-black/20 hover:to-transparent pt-32 px-6 pb-8 flex flex-col justify-end transition-colors duration-300">
          <div className="pr-16">
            <h3
              className={`font-display font-bold text-white leading-tight ${
                isFeatured ? "text-4xl" : "text-3xl"
              }`}
            >
              {name}
            </h3>
            <p
              className={`text-white font-medium ${
                isFeatured ? "text-lg mt-2" : "text-sm mt-1"
              }`}
            >
              {role}
            </p>
          </div>
        </div>

        {/* The Notch Cutout */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-white rounded-tl-[2rem] z-10">
          {/* Top concave round */}
          <div className="absolute -top-[24px] right-0 w-[24px] h-[24px] bg-white">
            <div className="w-full h-full bg-[#fff200] rounded-br-[24px]" />
          </div>
          {/* Left concave round */}
          <div className="absolute bottom-0 -left-[24px] w-[24px] h-[24px] bg-white">
            <div className="w-full h-full bg-[#fff200]/40 rounded-br-[24px]" />
          </div>
        </div>
      </div>

      {/* Floating Plus Button in the Notch */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        className={`absolute bottom-2 right-2 flex items-center justify-center bg-[#fff200] text-black shadow-xl z-20 transition-all duration-300 hover:scale-110 hover:rotate-6 active:scale-95
          ${isFeatured ? "w-16 h-16 rounded-[1.5rem]" : "w-12 h-12 rounded-[1.2rem]"}`}
      >
        <Plus size={isFeatured ? 28 : 22} strokeWidth={2.5} />
      </button>
    </motion.div>
  );
};

const OurTeam = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const marqueeItems = [...teamMembers, ...teamMembers];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="container-wide">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-black tracking-tight">
            Our Team
          </h2>
          <p className="text-gray-500 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Meet the professionals driving innovation, quality, and healthcare
            access across our group companies.
          </p>
        </div>

        {/* Featured Leaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto mb-28">
          <TeamCard
            name="Henok Teka"
            role="Group CEO"
            image={henokImg}
            isFeatured={true}
            onOpen={() =>
              setSelectedMember({
                name: "Henok Teka",
                role: "Group CEO",
                image: henokImg,
                email: "henok.teka@drogapharma.com",
                phone: "+251 112 734 554",
                bio: "Strategic leader and Founder of Droga Pharma, driving innovation in Ethiopia's healthcare sector.",
                startDate: "01/10/2012",
              })
            }
          />
          <TeamCard
            name="Dr. Abdi Ermolo"
            role="Deputy CEO"
            image={abdiImg}
            isFeatured={true}
            onOpen={() =>
              setSelectedMember({
                name: "Dr. Abdi Ermolo",
                role: "Deputy CEO",
                image: abdiImg,
                email: "abdi.ermolo@drogapharma.com",
                phone: "+251 112 734 554",
                bio: "Expert healthcare administrator overseeing group-wide medical and operations strategies.",
                startDate: "05/15/2014",
              })
            }
          />
        </div>

        {/* Team Carousel */}
        <div className="relative overflow-hidden py-3">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div className="flex animate-marquee-fast">
            {marqueeItems.map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="flex-shrink-0 mx-4"
              >
                <div className="w-[200px] md:w-[240px] h-[320px] md:h-[360px]">
                  <TeamCard
                    name={member.name}
                    role={member.role}
                    image={member.image}
                    onOpen={() => setSelectedMember(member)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurTeam;
