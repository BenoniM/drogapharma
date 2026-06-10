import { motion } from "framer-motion";

interface MarqueeClientsProps {
  clients: { src: string; alt: string }[];
  variant?: "horizontal" | "vertical-3";
  additionalSlides?: number;
}

const MarqueeClients = ({
  clients,
  variant = "horizontal",
  additionalSlides = 0,
}: MarqueeClientsProps) => {
  if (variant === "vertical-3") {
    const totalColumns = Math.max(3, 3 + additionalSlides);

    const columns = Array.from({ length: totalColumns }, (_, columnIndex) => {
      const columnItems = clients.filter(
        (_, index) => index % totalColumns === columnIndex,
      );
      return {
        id: columnIndex,
        reverse: columnIndex === 1 || columnIndex === 3,
        items: [...columnItems, ...columnItems],
      };
    });

    return (
      <div className="relative overflow-hidden py-2">
        {/* Fade edges */}
        <div className="absolute inset-x-0 top-0 h-16 z-10 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div
          className="grid grid-cols-1 gap-4 h-[420px]"
          style={{
            gridTemplateColumns: `repeat(${totalColumns}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((column, columnIndex) => (
            <div key={column.id} className="overflow-hidden h-full">
              <motion.div
                className="flex flex-col gap-4"
                animate={
                  column.reverse ? { y: ["-50%", "0%"] } : { y: ["0%", "-50%"] }
                }
                transition={{
                  duration: columnIndex === 1 || columnIndex === 3 ? 12 : 16,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              >
                {column.items.map((client, i) => (
                  <motion.div
                    key={`${column.id}-${client.src}-${i}`}
                    whileHover={{ scale: 1.03, y: -1 }}
                    className="bg-secondary/80 border border-border py-4 px-5 cursor-default min-h-[92px] flex items-center justify-center hover:border-primary/30 hover:shadow-sm transition-all duration-300"
                  >
                    <img
                      src={client.src}
                      alt={client.alt}
                      loading="lazy"
                      className="max-h-12 w-auto max-w-[150px] object-contain"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
              key={`${row.id}-${client.src}-${i}`}
              className="flex-shrink-0 mx-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-secondary/80 border border-border rounded-xl py-4 px-5 cursor-default min-w-[180px] h-[86px] flex items-center justify-center hover:border-primary/30 hover:shadow-sm transition-all duration-300"
              >
                <img
                  src={client.src}
                  alt={client.alt}
                  loading="lazy"
                  className="max-h-12 w-auto max-w-[150px] object-contain"
                />
              </motion.div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MarqueeClients;
