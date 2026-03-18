import { motion } from "framer-motion";

const TickerBanner = () => {
  const items = Array(20).fill("Consult. Create. Conquer.");
  
  return (
    <div className="bg-accent text-accent-foreground overflow-hidden py-2">
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: "max-content" }}>
        {items.map((text, i) => (
          <span key={i} className="text-xs font-medium mx-6 tracking-wide">{text}</span>
        ))}
      </div>
    </div>
  );
};

export default TickerBanner;
