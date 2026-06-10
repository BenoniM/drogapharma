import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    newsletter: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. We will get back to you shortly.");
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      newsletter: false,
    });
  };

  const contactInfo = [
    { icon: MapPin, title: "Address", lines: ["Gulele Subcity, Woreda 09, House No. New/Droga Building, Addis Ababa, Ethiopia."] },
    { icon: Phone, title: "Phone", lines: ["+251-112-73-45-54"] },
    { icon: Mail, title: "Email", lines: ["info@drogapharma.com"] },
    {
      icon: Clock,
      title: "Working Hours",
      lines: ["Mon - Fri: 8:00 AM - 5:30 PM", "Sat: 8:00 AM - 12:30 PM"],
    },
  ];

  const customIcon = new L.Icon({
    iconUrl: logo,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    className: "rounded-md border-2 border-primary shadow-lg bg-white p-[2px]"
  });

  return (
    <PageTransition>
      <div className="bg-background min-h-screen pb-10">
        {/* Dark Hero Section */}
        <section className="relative bg-[#111317] pt-40 pb-48 overflow-hidden">
          {/* Subtle curved lines background element (matching image) */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
            <style>
              {`
                .anim-bg-text {
                  fill: rgba(0, 0, 0, 0);
                  stroke: #FFF200;
                  stroke-width: 2px;

                  /* Long visible line + long gap */
                  stroke-dasharray: 3000 1000;

                  /* Smooth infinite movement */
                  animation: strokeDashBg 20s linear infinite;

                  opacity: 0.55;

                  filter:
                    drop-shadow(0 0 6px rgba(255,242,0,0.7))
                    drop-shadow(0 0 16px rgba(255,242,0,0.4));
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
                CONTACT US
              </text>
            </svg>
          </div>

          <div className="container-wide relative z-10 px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight"
              >
                Contact Us
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-sm"
              >
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map and Form Container (Overlapping Hero) */}
        <section className="relative z-20 px-4 md:px-8 -mt-24 mb-16 max-w-[1400px] mx-auto">
          <div className="bg-white flex flex-col lg:flex-row w-full shadow-2xl rounded-sm overflow-hidden">

            {/* Map Side */}
            <div className="w-full lg:w-[45%] h-[500px] lg:h-auto relative bg-gray-100 z-0">
              <div className="absolute inset-0">
                <MapContainer 
                  center={[9.0494, 38.7454]} 
                  zoom={15} 
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  />
                  <Marker position={[9.0494, 38.7454]} icon={customIcon} />
                </MapContainer>
              </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-[55%] p-10 lg:p-16 xl:p-24 bg-white">
              <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-lg mx-auto lg:mx-0">

                {/* Full Name */}
                <div className="relative">
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full pb-3 border-b border-gray-200 bg-transparent text-black text-[15px] transition-colors placeholder:text-gray-400 font-medium focus:border-primary !outline-none !ring-0"
                    style={{ boxShadow: "none" }}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    className="w-full pb-3 border-b border-gray-200 bg-transparent text-black text-[15px] transition-colors placeholder:text-gray-400 font-medium focus:border-primary !outline-none !ring-0"
                    style={{ boxShadow: "none" }}
                  />
                </div>

                {/* Phone */}
                <div className="relative flex items-end">
                  <div className="flex items-center gap-2 border-b border-gray-200 pb-3 pr-4">
                    <span className="text-xl leading-none">🇪🇹</span>
                    <span className="text-black text-[15px] font-medium leading-none mb-[2px]">+251</span>
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone number"
                    className="w-full pb-3 border-b border-gray-200 bg-transparent text-black text-[15px] transition-colors pl-4 placeholder:text-gray-400 font-medium focus:border-primary !outline-none !ring-0"
                    style={{ boxShadow: "none" }}
                  />
                </div>

                {/* Company Name */}
                <div className="relative">
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full pb-3 border-b border-gray-200 bg-transparent text-black text-[15px] transition-colors placeholder:text-gray-400 font-medium focus:border-primary !outline-none !ring-0"
                    style={{ boxShadow: "none" }}
                  />
                </div>

                {/* Query */}
                <div className="relative mt-2">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your query here"
                    className="w-full pb-3 border-b border-gray-200 bg-transparent text-black text-[15px] transition-colors resize-none placeholder:text-gray-400 font-medium focus:border-primary !outline-none !ring-0"
                    style={{ boxShadow: "none" }}
                  />
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
                  <button
                    type="submit"
                    className="bg-black text-white rounded-full px-8 py-3.5 font-medium text-[15px] inline-flex items-center justify-center gap-2 transition-all duration-200 flex-shrink-0 hover:bg-primary hover:text-black"
                  >
                    Send <ArrowRight size={18} />
                  </button>
                  <p className="text-[12px] text-gray-500 leading-relaxed max-w-[250px]">
                    By clicking the Send button you agree to personal data processing as stated in our <a href="#" className="font-bold hover:underline underline-offset-2">Privacy Policy</a>.
                  </p>
                </div>

              </form>
            </div>
          </div>
        </section>

        {/* Kept Content: Additional Contact Info */}
        <section className="container-wide pb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-8">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col gap-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#111317]">
                  <info.icon size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-2 text-sm">{info.title}</h4>
                  {info.lines.map((line) => (
                    <p key={line} className="text-gray-500 text-[13px] mb-1 font-medium">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
