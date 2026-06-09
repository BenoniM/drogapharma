import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface TimelineItem {
  year: string;
  event: string;
  title?: string;
  image?: string;
}

interface JourneyStepperProps {
  timeline: TimelineItem[];
}

const JourneyStepper = ({ timeline }: JourneyStepperProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!timeline?.length) return null;

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header — fixed at top */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 0px",
          borderBottom: "1px solid #c5c5c5",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase"}}>
          Our history
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            style={{
              width: "45px", height: "45px", borderRadius: "50%",
              border: "1px solid #bbb", background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#333",
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next"
            style={{
              width: "45px", height: "45px", borderRadius: "50%",
              border: "1px solid #bbb", background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#333",
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Carousel — fills remaining height */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing flex-1 min-h-0"
        ref={emblaRef}
        style={{borderBottom: "1px solid #c5c5c5"}}
      >
        <div className="flex h-full select-none">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.year}
                className="flex-none flex flex-col h-full"
                style={{
                  width: "clamp(200px, 22vw, 340px)",
                  borderRight: "1px solid #c5c5c5",
                  padding: "28px 24px",
                }}
              >
                {isEven ? (
                  <>
                    {item.image && (
                      <div
                        style={{
                          width: "60%",
                          aspectRatio: "4/3",
                          marginBottom: "16px",
                          overflow: "hidden",
                          background: "#d4d4d4",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title || item.year}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          draggable={false}
                        />
                      </div>
                    )}
                    <p
                      style={{
                        fontSize: "12px",
                        lineHeight: "1.6",
                        color: "#555",
                        whiteSpace: "pre-wrap",
                        maxWidth: "240px",
                        marginBottom: "auto",
                        flexShrink: 0,
                      }}
                    >
                      {item.event}
                    </p>
                    <p
                      style={{
                        fontFamily: "inherit",
                        fontSize: "clamp(52px, 7vw, 100px)",
                        fontWeight: 800,
                        color: "#111",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        marginTop: "16px",
                        flexShrink: 0,
                      }}
                    >
                      {item.year}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        fontFamily: "inherit",
                        fontSize: "clamp(52px, 7vw, 100px)",
                        fontWeight: 800,
                        color: "#111",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        marginBottom: "auto",
                        flexShrink: 0,
                      }}
                    >
                      {item.year}
                    </p>
                    {item.image && (
                      <div
                        style={{
                          width: "60%",
                          aspectRatio: "4/3",
                          marginBottom: "16px",
                          overflow: "hidden",
                          background: "#d4d4d4",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title || item.year}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          draggable={false}
                        />
                      </div>
                    )}
                    <p
                      style={{
                        fontSize: "12px",
                        lineHeight: "1.6",
                        color: "#000000ff",
                        whiteSpace: "pre-wrap",
                        maxWidth: "240px",
                        flexShrink: 0,
                      }}
                    >
                      {item.event}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyStepper;