import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Mail, Phone } from "lucide-react";
import abdiImg from "../assets/abdi.jpg";
import henokImg from "../assets/henoknew.jpg";

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

const teamMembers = Object.entries(teamImages).map(([path, src]) => {
  const filename = path.split("/").pop() || "";
  const rawName = filename.replace(/\.[^/.]+$/, "");
  const formattedName = formatNameMapping[rawName.toLowerCase()] || rawName;

  return {
    name: formattedName,
    role: "Team Member",
    image: src,
    email: `${rawName.toLowerCase()}@drogapharma.com`,
    phone: "+251 911 000 000",
    bio: `Dedicated team member contributing to the success and continuous growth of Droga Pharma.`,
    startDate: "2020",
  };
});

const MemberModal = ({
  member,
  onClose,
}: {
  member: any;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 flex items-center justify-between border-b border-gray-100">
          <h2 className="font-display text-3xl font-bold text-black">
            Member info
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-10 text-center">
          <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#fff200]/20">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-display text-3xl font-bold text-black">
            {member.name}
          </h3>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold mt-1">
            {member.role}
          </p>

          <div className="mt-10 pt-10 border-t border-gray-100 text-left space-y-8">
            <div className="flex items-center gap-4 text-gray-800">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                <Mail size={20} className="text-black/60" />
              </div>
              <span className="font-medium">{member.email}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-800">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                <Phone size={20} className="text-black/60" />
              </div>
              <span className="font-medium">{member.phone}</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Team Role
                </p>
                <p className="text-gray-900 font-semibold">{member.role}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Start Date
                </p>
                <p className="text-gray-900 font-semibold">
                  {member.startDate}
                </p>
              </div>
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

        <div className="p-8 pt-0">
          <button
            onClick={onClose}
            className="w-full py-5 bg-white border border-gray-200 rounded-2xl font-bold text-black hover:bg-gray-50 transition-all active:scale-[0.98]"
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
}: any) => {
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
      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br ">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t hover:from-black/80 hover:via-transparent hover:to-transparent pt-32 px-6 pb-12 flex flex-col justify-end">
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
        className={`absolute bottom-2 right-2 flex items-center justify-center bg-[#fff200] text-black shadow-xl z-20 transition-transform duration-300 hover:scale-110 active:scale-95
          ${isFeatured ? "w-16 h-16 rounded-[1.5rem]" : "w-12 h-12 rounded-[1.2rem]"}`}
      >
        <Plus size={isFeatured ? 28 : 22} strokeWidth={2.5} />
      </button>
    </motion.div>
  );
};

const OurTeam = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const marqueeItems = [...teamMembers, ...teamMembers];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="container-narrow">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-black tracking-tight">
            Our Team
          </h2>
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

          <div className="flex animate-marquee">
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
