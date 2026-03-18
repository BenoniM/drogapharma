import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X, Mail, Phone } from "lucide-react";
import abdiImg from "../assets/abdi.png";
import henokImg from "../assets/henok.png";

// Sample team members
const teamMembers = [
  {
    name: "Abayneh Tilahun",
    role: "Production Director - Trust",
    image: "https://i.pravatar.cc/300?u=1",
    email: "abayneh.tilahun@drogapharma.com",
    phone: "+251 911 223 445",
    bio: "Leading production strategies for Trust Pharma with over 15 years of industry experience.",
    startDate: "12/05/2018",
  },
  {
    name: "Member Two",
    role: "Department Head",
    image: "https://i.pravatar.cc/300?u=2",
    email: "member.two@drogapharma.com",
    phone: "+251 911 334 556",
    bio: "Strategic leader focused on operational excellence and team growth.",
    startDate: "08/11/2020",
  },
  {
    name: "Member Three",
    role: "Operations Manager",
    image: "https://i.pravatar.cc/300?u=3",
    email: "member.three@drogapharma.com",
    phone: "+251 911 445 667",
    bio: "Managing cross-functional teams to deliver high-quality pharmaceutical solutions.",
    startDate: "03/22/2019",
  },
  {
    name: "Member Four",
    role: "Quality Control",
    image: "https://i.pravatar.cc/300?u=4",
    email: "member.four@drogapharma.com",
    phone: "+251 911 556 778",
    bio: "Ensuring all products meet the highest safety and regulatory standards.",
    startDate: "11/02/2021",
  },
  {
    name: "Member Five",
    role: "Logistics Lead",
    image: "https://i.pravatar.cc/300?u=5",
    email: "member.five@drogapharma.com",
    phone: "+251 911 667 889",
    bio: "Optimizing supply chain routes and ensuring timely global delivery.",
    startDate: "06/15/2017",
  },
  {
    name: "Member Six",
    role: "Supply Chain",
    image: "https://i.pravatar.cc/300?u=6",
    email: "member.six@drogapharma.com",
    phone: "+251 911 778 990",
    bio: "Strategic sourcing and procurement expert for pharmaceutical materials.",
    startDate: "01/30/2022",
  },
  {
    name: "Member Seven",
    role: "Financing Director",
    image: "https://i.pravatar.cc/300?u=7",
    email: "member.seven@drogapharma.com",
    phone: "+251 911 889 001",
    bio: "Directing financial planning and investment strategies for group growth.",
    startDate: "09/14/2016",
  },
];

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
        className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="font-display text-2xl font-bold text-black">
            Member info
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 border-4 border-[#fff200]/20">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-display text-2xl font-bold text-black">
            {member.name}
          </h3>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mt-1">
            {member.role}
          </p>

          <div className="mt-8 pt-6 border-t border-gray-100 text-left space-y-6">
            <div className="flex items-center gap-3 text-gray-800">
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                <Mail size={16} className="text-black/60" />
              </div>
              <span className="text-sm font-medium">{member.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-800">
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
                <Phone size={16} className="text-black/60" />
              </div>
              <span className="text-sm font-medium">{member.phone}</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Team Role
                </p>
                <p className="text-gray-900 text-sm font-semibold">{member.role}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Start Date
                </p>
                <p className="text-gray-900 text-sm font-semibold">{member.startDate}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Bio
              </p>
              <p className="text-gray-600 text-[13px] leading-relaxed font-medium">
                {member.bio}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full py-4 bg-white border border-gray-200 rounded-2xl font-bold text-black hover:bg-gray-50 transition-all active:scale-[0.98]"
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
      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#fff200] to-[#fff200]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff200]/80 via-transparent to-transparent pt-32 px-6 pb-12 flex flex-col justify-end">
          <div className="pr-16">
            <h3
              className={`font-display font-bold text-black leading-tight ${
                isFeatured ? "text-4xl" : "text-3xl"
              }`}
            >
              {name}
            </h3>
            <p
              className={`text-black/80 font-medium ${
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
    );
  };

  const resetTimer = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(nextSlide, 5000);
    }
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

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
        <div className="relative">
          <div className="flex justify-center items-center gap-4 h-[400px] overflow-hidden px-4">
            {teamMembers.map((member, index) => {
              const isActive = index === activeIndex;
              // Calculate relative distance for z-index and opacity
              const dist = Math.abs(index - activeIndex);
              const isVisible = dist <= 2; // Show only 5 members at once

              if (!isVisible && teamMembers.length > 5) return null;

              return (
                <motion.div
                  layout
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    resetTimer();
                  }}
                  className={`cursor-pointer transition-all duration-700 flex-shrink-0 ${
                    isActive
                      ? "w-64 md:w-80 h-full z-20"
                      : "w-40 md:w-56 h-[320px] z-10"
                  }`}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    layout: { duration: 0.6 },
                  }}
                >
                  <TeamCard
                    name={member.name}
                    role={member.role}
                    image={member.image}
                    isActive={isActive}
                    onOpen={() => setSelectedMember(member)}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6 mt-12">
            <button
              onClick={() => {
                prevSlide();
                resetTimer();
              }}
              className="w-14 h-14 rounded-full border-2 border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm"
              aria-label="Previous team member"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => {
                nextSlide();
                resetTimer();
              }}
              className="w-14 h-14 rounded-full border-2 border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm"
              aria-label="Next team member"
            >
              <ChevronRight size={28} />
            </button>
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
