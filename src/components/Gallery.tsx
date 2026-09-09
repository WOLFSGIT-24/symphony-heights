import React from "react";

const images = [
  "/cricpitch.jpg",
  "/indoor-games.jpg",
  "/kitchen.jpg",
  "/kidsplay.jpg",
  "/pet-park.jpg",
  "/partyhall.jpg",
  "/balcony.png",
  "/building.png",
  "/roof5.jpg"
];

export default function Gallery() {
  return (
    <section id="gallery" className="w-full py-12 md:py-16 bg-marble text-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="font-body text-xs font-bold text-navy-primary uppercase tracking-[0.25em] block">
            Gallery
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-navy-primary font-semibold leading-tight">
            Curated Spaces
          </h2>
          <div className="h-[2px] w-16 bg-navy-primary mx-auto" />
          <p className="font-body text-sm md:text-base text-gray-text leading-relaxed">
            Experience the meticulously crafted interiors and outdoor lifestyle zones designed for uncompromised luxury.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:active,
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Infinite Scroll Marquee */}
      <div className="w-full overflow-hidden relative py-4">
        <div className="animate-marquee gap-4 md:gap-6">
          {[...images, ...images].map((src, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 w-[72vw] sm:w-[45vw] md:w-[360px] aspect-[4/3] rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative group bg-white border border-navy-primary/5"
            >
              <img
                src={src}
                alt={`Symphony Heights space ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
