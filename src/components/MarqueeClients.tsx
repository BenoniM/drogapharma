import { motion } from "framer-motion";

interface MarqueeClientsProps {
  clients: string[];
}

const MarqueeClients = ({ clients }: MarqueeClientsProps) => {
  const marqueeRows = [clients, clients, clients].map(
    (rowClients, rowIndex) => ({
      id: rowIndex,
      reverse: rowIndex === 1,
      items: [...rowClients, ...rowClients],
    }),
  );

  return (
    <div className="relative overflow-hidden py-2 space-y-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      {marqueeRows.map((row) => (
        <div
          key={row.id}
          className="flex animate-marquee"
          style={row.reverse ? { animationDirection: "reverse" } : undefined}
        >
          {row.items.map((client, i) => (
            <div
              key={`${row.id}-${client}-${i}`}
              className="flex-shrink-0 mx-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-secondary/80 border border-border rounded-xl py-5 px-8 cursor-default min-w-[160px] text-center hover:border-primary/30 hover:shadow-sm transition-all duration-300"
              >
                <span className="font-display font-semibold text-muted-foreground text-xs whitespace-nowrap tracking-wide">
                  {client}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MarqueeClients;
