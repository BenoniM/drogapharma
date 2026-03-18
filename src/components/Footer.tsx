import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Smartphone,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  Facebook,
  Linkedin,
  X,
  Globe,
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const branches = [
    {
      title: "Headquarter (Ethiopia)",
      contacts: [
        { icon: Phone, text: "+25111 273 4554", href: "tel:+251112734554" },
        {
          icon: Smartphone,
          text: "+251 91 366 7537",
          href: "tel:+251913667537",
        },
        {
          icon: Mail,
          text: "info@drogapharma.com",
          href: "mailto:info@drogapharma.com",
        },
        {
          icon: Mail,
          text: "pharmadroga@gmail.com",
          href: "mailto:pharmadroga@gmail.com",
        },
        {
          icon: MapPin,
          text: "Gulele Subcity, Woreda 09, House No. New/Droga Building, Addis Ababa, Ethiopia.",
          isAddress: true,
        },
      ],
    },
    {
      title: "Somaliland Branch",
      contacts: [
        { icon: Phone, text: "+252 634 958 444", href: "tel:+252634958444" },
        {
          icon: Smartphone,
          text: "+252 637 611 171",
          href: "tel:+252637611171",
        },
        {
          icon: Mail,
          text: "info@drogapharma-som.com",
          href: "mailto:info@drogapharma-som.com",
        },
        {
          icon: Mail,
          text: "pharmadroga@gmail.com",
          href: "mailto:pharmadroga@gmail.com",
        },
        {
          icon: MapPin,
          text: "Cabaaye Bus Station, Downtown, Hargeysa, Somaliland",
          isAddress: true,
        },
      ],
    },
    {
      title: "Rwanda Branch",
      contacts: [
        { icon: Phone, text: "+250 783 13 10 40", href: "tel:+250783131040" },
        {
          icon: Mail,
          text: "info@drogapharma.rw",
          href: "mailto:info@drogapharma.rw",
        },
        {
          icon: Mail,
          text: "abdoulg@drogapharma.rw",
          href: "mailto:abdoulg@drogapharma.rw",
        },
        {
          icon: MapPin,
          text: "Plot No. 311 AV KN2 No. 30, Kigali City, Rwanda",
          isAddress: true,
        },
      ],
      socials: [
        {
          icon: Facebook,
          href: "https://www.facebook.com/DrogaPharma",
          label: "Facebook",
        },
        { icon: X, href: "https://x.com/drogapharma", label: "X" },
        {
          icon: Linkedin,
          href: "https://www.linkedin.com/company/droga-pharma",
          label: "LinkedIn",
        },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA Strip */}
      <div className="border-b border-primary-foreground/10 bg-white">
        <div className="container-narrow py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground leading-tight">
              Ready to partner with us?
            </h3>
            <p className="text-primary-foreground/60 mt-2 text-base font-semibold">
              Let's discuss how we can support your healthcare needs.
            </p>
          </div>
          <MagneticButton>
            <Link
              to="/contact"
              className="bg-primary text-black px-10 py-4 font-semibold text-sm inline-flex items-center gap-2 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-200 flex-shrink-0"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-narrow py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-3">
            <img src={logo} alt="Droga Pharma" className="h-16 w-auto mb-6" />
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs font-semibold">
              Leading pharmaceutical import and distribution company based in
              Addis Ababa, Ethiopia. Serving the healthcare needs of the nation
              since 2015.
            </p>
          </div>

          {/* Branches */}
          {branches.map((branch, idx) => (
            <div
              key={branch.title}
              className={`lg:col-span-3 ${idx !== 0 ? " lg:pl-8" : ""}`}
            >
              <h4 className="font-display font-bold text-primary-foreground mb-8 text-lg">
                {branch.title}
              </h4>
              <div className="flex flex-col gap-4">
                {branch.contacts.map((contact, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full  flex items-center justify-center flex-shrink-0 group-hover:bg-primary-foreground/10 transition-colors">
                      <contact.icon
                        size={14}
                        className="text-primary-foreground"
                      />
                    </div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-primary-foreground/70 text-sm font-semibold hover:text-primary-foreground transition-colors py-1.5"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-primary-foreground/70 text-sm font-semibold py-1.5 leading-relaxed">
                        {contact.text}
                      </span>
                    )}
                  </div>
                ))}

                {branch.socials && (
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-primary-foreground/10">
                    {branch.socials.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10  flex items-center justify-center hover:bg-black hover:text-primary transition-colors duration-200"
                        aria-label={social.label}
                      >
                        <social.icon size={16} />
                      </motion.a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-narrow py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-xs font-semibold">
            © {new Date().getFullYear()} Droga Consulting. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-primary-foreground/50 text-xs font-semibold hover:text-foreground cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-primary-foreground/50 text-xs font-semibold hover:text-foreground cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
