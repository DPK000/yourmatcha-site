import { useRef, useState } from "react";
import { ZoomIn } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  zoom?: number;
}

/**
 * Interactive product image with cursor-follow magnifier (desktop)
 * and pinch/tap-to-zoom (mobile). Reveals watercolor texture and gold accents.
 */
const ProductImageZoom = ({ src, alt, zoom = 2.2 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const point = "touches" in e ? e.touches[0] : e;
    const x = ((point.clientX - rect.left) / rect.width) * 100;
    const y = ((point.clientY - rect.top) / rect.height) * 100;
    setPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={handleMove}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      onTouchMove={handleMove}
      className="relative aspect-square rounded-2xl overflow-hidden bg-secondary cursor-zoom-in group select-none"
      aria-label={`${alt} — beweeg om in te zoomen`}
    >
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className={`w-full h-full object-cover transition-transform duration-300 ease-out will-change-transform ${
          active ? "scale-[1.02]" : "scale-100"
        }`}
      />

      {/* Magnifier overlay (desktop) */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 hidden md:block transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${zoom * 100}%`,
          backgroundPosition: `${pos.x}% ${pos.y}%`,
        }}
      />

      {/* Soft gold gradient sheen on hover */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          active ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(120% 80% at 80% 10%, hsl(var(--accent) / 0.10), transparent 55%), radial-gradient(80% 60% at 10% 95%, hsl(var(--primary) / 0.08), transparent 60%)",
        }}
      />

      {/* Hover hint chip */}
      <div
        className={`pointer-events-none absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur text-foreground text-[10px] font-semibold tracking-widest uppercase shadow-soft transition-all duration-300 ${
          active ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
        }`}
      >
        <ZoomIn className="w-3 h-3" /> Hover om in te zoomen
      </div>
    </div>
  );
};

export default ProductImageZoom;
