import { useCallback, useEffect, useRef, useState } from "react";
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
    loop: true,
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-play effect: scrolls every 10 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 8000); // 10000ms = 10 seconds

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    setIsHovering(true);
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
  }, []);

  if (!timeline?.length) return null;

  // If the timeline has an odd number of items, duplicate them so that the alternating
  // background colors and layouts seamlessly loop without repeating adjacent colors.
  const displayTimeline = timeline.length % 2 !== 0 ? [...timeline, ...timeline] : timeline;

  return (
    <div className="w-full h-[95vh] md:h-screen flex flex-col">
      {/* Header — fixed at top */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "12px 0px",
          flexShrink: 0,
        }}
      >
        <div className="text-left">
          <span className="section-label block text-black/60">Our Journey</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mt-2">
            Company Evolution
          </h2>
        </div>
        <div style={{ display: "flex", gap: "10px", paddingBottom: "4px" }}>
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "1px solid #bbb",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#000",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFF200";
              e.currentTarget.style.transform = "scale(1.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronLeft size={26} color="#000" />
          </button>

          <button
            onClick={scrollNext}
            aria-label="Next"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "1px solid #bbb",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#000",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFF200";
              e.currentTarget.style.transform = "scale(1.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronRight size={26} color="#000" />
          </button>
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "125px",
          height: "125px",
          borderRadius: "50%",
          backgroundColor: "#FFF200",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: "14px",
          letterSpacing: "0.05em",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        DRAG
      </div>

      {/* Carousel — fills remaining height */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing flex-1 min-h-0"
        ref={emblaRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="flex h-full select-none">
          {displayTimeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={`${item.year}-${index}`}
                className="flex-none flex flex-col h-full w-[85vw] md:w-[clamp(200px,22vw,340px)]"
                style={{
                  padding: "28px 24px",
                  backgroundColor: isEven ? "transparent" : "#E6E6E6",
                }}
              >
                {isEven ? (
                  <>
                    {item.image && (
                      <div
                        className="w-[85%] md:w-[60%]"
                        style={{
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
                      className="text-[17px] md:text-[12px] max-w-[90%] md:max-w-[240px]"
                      style={{
                        lineHeight: "1.6",
                        color: "#555",
                        whiteSpace: "pre-wrap",
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
                        className="w-[85%] md:w-[60%]"
                        style={{
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
                      className="text-[17px] md:text-[12px] max-w-[90%] md:max-w-[240px]"
                      style={{
                        lineHeight: "1.6",
                        color: "#000000ff",
                        whiteSpace: "pre-wrap",
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