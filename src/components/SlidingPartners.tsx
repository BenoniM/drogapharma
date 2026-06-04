import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Client = { alt: string; src: string };

type Tile = {
  id: string; // Unique, persistent ID for layout animation
  client: Client;
};

type Cell = Tile | null;

interface SlidingPartnersProps {
  clients: Client[];
}

const TOTAL_CELLS = 15;
const EMPTY_COUNT = 6; // 9 filled cells
const SLIDE_INTERVAL = 2500; // Slide every 2.5 seconds

const getCols = () => {
  if (typeof window === "undefined") return 5;
  if (window.innerWidth < 768) return 2;
  if (window.innerWidth < 1024) return 3;
  return 5;
};

export default function SlidingPartners({ clients }: SlidingPartnersProps) {
  const [boardState, setBoardState] = useState<{
    cells: Cell[];
    unshownPool: Client[];
  }>({ cells: [], unshownPool: [] });
  
  const [cols, setCols] = useState(getCols());

  // Handle responsiveness for correct adjacency math
  useEffect(() => {
    const handleResize = () => setCols(getCols());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize board
  useEffect(() => {
    if (!clients || clients.length === 0) return;

    // Re-initialize if the expected cell count changes (e.g., during development/HMR)
    if (boardState.cells.length === TOTAL_CELLS) return;

    const shuffledClients = [...clients].sort(() => Math.random() - 0.5);
    // Ensure we don't try to take more than we have
    const fillCount = Math.min(TOTAL_CELLS - EMPTY_COUNT, shuffledClients.length);
    const actualEmptyCount = TOTAL_CELLS - fillCount;
    
    const initialClients = shuffledClients.slice(0, fillCount);
    const pool = shuffledClients.slice(fillCount);

    const initialCells: Cell[] = [];
    let clientIdx = 0;

    const indices = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    const emptyIndices = new Set(
      indices.sort(() => Math.random() - 0.5).slice(0, actualEmptyCount)
    );

    for (let i = 0; i < TOTAL_CELLS; i++) {
      if (emptyIndices.has(i)) {
        initialCells.push(null);
      } else {
        const client = initialClients[clientIdx++];
        initialCells.push({
          id: `tile-${i}-${Math.random()}`, // Needs to be persistent over slides
          client: client,
        });
      }
    }

    setBoardState({ cells: initialCells, unshownPool: pool });
  }, [clients, boardState.cells.length]);

  // Sliding logic
  useEffect(() => {
    if (boardState.cells.length === 0) return;

    const interval = setInterval(() => {
      setBoardState((prev) => {
        const newCells = [...prev.cells];
        const newPool = [...prev.unshownPool];
        
        // Find all valid adjacent empty-filled pairs
        const validMoves: { filledIdx: number; emptyIdx: number }[] = [];

        for (let i = 0; i < TOTAL_CELLS; i++) {
          if (newCells[i] === null) {
            // Check neighbors based on dynamic columns
            const neighbors = [
              i - cols, // up
              i + cols, // down
              i % cols !== 0 ? i - 1 : -1, // left
              (i + 1) % cols !== 0 ? i + 1 : -1, // right
            ].filter(idx => idx >= 0 && idx < TOTAL_CELLS);

            neighbors.forEach(nIdx => {
              if (newCells[nIdx] !== null) {
                validMoves.push({ filledIdx: nIdx, emptyIdx: i });
              }
            });
          }
        }

        if (validMoves.length === 0) return prev;

        // Pick a random move
        const move = validMoves[Math.floor(Math.random() * validMoves.length)];
        
        const tile = newCells[move.filledIdx]!;
        newCells[move.filledIdx] = null;
        
        // Swap client with one from the pool occasionally, or always if pool has items
        let nextTile = { ...tile };
        if (newPool.length > 0 && Math.random() > 0.3) {
           const newClient = newPool.pop()!;
           newPool.unshift(tile.client);
           nextTile.client = newClient;
        }

        newCells[move.emptyIdx] = nextTile;

        return { cells: newCells, unshownPool: newPool };
      });
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [cols, boardState.cells.length]);

  return (
    <div className="w-full bg-[#fbfbfb]">
      <div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto max-w-7xl px-4"
      >
        {boardState.cells.map((cell, idx) => (
          <div 
            key={idx} 
            className="aspect-[3/2] flex items-center justify-center relative"
          >
            {cell && (
              <motion.div
                layout
                layoutId={cell.id}
                className="group absolute inset-0 flex items-center justify-center p-6 sm:p-10 bg-transparent hover:bg-primary border border-black rounded-xl shadow-sm transition-colors duration-300"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cell.client.alt}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img 
                      src={cell.client.src} 
                      alt={cell.client.alt}
                      className="max-w-full max-h-full object-contain cursor-pointer grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-400"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
