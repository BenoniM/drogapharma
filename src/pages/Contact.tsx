import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import PageTransition from "@/components/PageTransition";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";

const contactHeroImages = [
  {
    src: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1920&q=80",
    alt: "Contact us",
  },
  {
    src: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1920&q=80",
    alt: "Communication",
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1920&q=80",
    alt: "Office location",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. We will get back to you shortly.");
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    { icon: MapPin, title: "Address", lines: ["Addis Ababa, Ethiopia"] },
    { icon: Phone, title: "Phone", lines: ["+251-112-73-45-54"] },
    { icon: Mail, title: "Email", lines: ["info@drogapharma.com"] },
    {
      icon: Clock,
      title: "Working Hours",
      lines: ["Mon - Fri: 8:00 AM - 5:30 PM", "Sat: 8:00 AM - 12:30 PM"],
    },
    { icon: Globe, title: "Website", lines: ["www.drogapharma.com"] },
  ];

  return (
    <PageTransition>
      <div>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20 bg-foreground">
          <ImageSlider
            images={contactHeroImages}
            className="absolute inset-0 z-0"
          />
          <div
            className="absolute inset-0 z-[5]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.75) 100%)",
            }}
          />
          <div className="container-narrow relative z-[6] w-full">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label text-primary block mb-4">
                Get in Touch
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-background tracking-tight">
                Contact
              </h1>
              <p className="text-background/55 text-lg md:text-xl mt-4 max-w-xl leading-relaxed">
                We'd love to hear from you. Get in touch with our team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#f5f5f5] section-padding-lg">
          <div className="container-narrow grid grid-cols-1 lg:grid-cols-5 gap-20">
            {/* Info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <span className="section-label block mb-3 text-[#aca8a8]">
                  Contact Information
                </span>
                <h2 className="font-display text-2xl font-bold text-black mt-2 mb-10">
                  Get in Touch
                </h2>
                <div className="flex flex-col gap-7">
                  {contactInfo.map((info, i) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-11 h-11 bg-background/10 flex items-center justify-center flex-shrink-0 hover:bg-primary transition-colors duration-300 group">
                        <info.icon
                          size={17}
                          className="text-black group-hover:text-primary-foreground transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-black mb-1">
                          {info.title}
                        </h4>
                        {info.lines.map((line) => (
                          <p key={line} className="text-black text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-10 overflow-hidden border border-background/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126766.39498919858!2d38.6520668!3d9.0107934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Droga Pharma Location"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <span className="section-label block mb-3 text-[#aca8a8]">
                  Send us a message
                </span>
                <h2 className="font-display text-2xl font-bold text-black mt-2 mb-10">
                  Import Inquiry Form
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      {
                        label: "Full Name *",
                        key: "name",
                        type: "text",
                        required: true,
                      },
                      {
                        label: "Email *",
                        key: "email",
                        type: "email",
                        required: true,
                      },
                      {
                        label: "Phone",
                        key: "phone",
                        type: "tel",
                        required: false,
                      },
                      {
                        label: "Company",
                        key: "company",
                        type: "text",
                        required: false,
                      },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-xs font-medium text-black block mb-2">
                          {field.label}
                        </label>
                        <input
                          required={field.required}
                          type={field.type}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) =>
                            setForm({ ...form, [field.key]: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-background/20 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300 hover:border-primary/30 placeholder:text-background/20"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-black block mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-background/20 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300 hover:border-primary/30"
                    >
                      <option value="">Select a subject</option>
                      <option>Complaint and Feedback</option>
                      <option>Service Queries</option>
                      <option>Product Information</option>
                      <option>Technical Support</option>
                      <option>Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-black block mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-background/20 bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-all duration-300 hover:border-primary/30"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary self-start"
                  >
                    <Send size={16} /> Send Inquiry
                  </motion.button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
