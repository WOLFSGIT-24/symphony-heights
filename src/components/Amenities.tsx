import React, { useState, useEffect } from "react";
import { amenitiesData } from "@/lib/data";

export default function Amenities() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeLevel = amenitiesData[activeTab];
  const slideImages = activeLevel.images || [activeLevel.imageUrl];

  useEffect(() => {
    setCurrentSlideIdx(0);
  }, [activeTab]);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % slideImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeTab, isHovered, slideImages.length]);

  return (
    <section id="amenities" className="w-full py-12 md:py-16 bg-marble text-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-body text-xs font-bold text-navy-primary uppercase tracking-[0.25em] block">
            Amenities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-navy-primary font-semibold leading-tight">
            Designed Around The Rhythm Of Life
          </h2>
          <div className="h-[2px] w-16 bg-navy-primary mx-auto" />
          <p className="font-body text-sm md:text-base text-gray-text leading-relaxed">
            At Symphony Heights, amenities are not simply added — they are thoughtfully planned across three distinct lifestyle levels, each designed for recreation, fitness, and celebrations.
          </p>
        </div>

        {/* Layout Container */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Tabs Selector */}
          <div className="order-1 lg:order-2 lg:col-span-4 flex flex-wrap lg:flex-col justify-center gap-3 pb-3 lg:pb-0">
            {amenitiesData.map((tier, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={tier.id}
                  onClick={() => setActiveTab(idx)}
                  className={`text-center py-3.5 px-6 sm:py-4 sm:px-8 rounded-sm border text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer lg:w-full ${
                    isActive
                      ? "bg-navy-primary text-white border-navy-primary shadow-md"
                      : "bg-transparent text-navy-primary border-navy-primary/20 hover:border-navy-primary/60 hover:bg-navy-primary/5"
                  }`}
                >
                  {tier.level} Level
                </button>
              );
            })}
          </div>

          {/* Visual Card with Text Overlay */}
          <div 
            className="order-2 lg:order-1 lg:col-span-8 relative rounded-2xl overflow-hidden shadow-xl min-h-[420px] sm:min-h-[480px] flex flex-col justify-end p-6 sm:p-10 text-white group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background Image Slider */}
            <div className="absolute inset-0 z-0">
              {slideImages.map((src, sIdx) => (
                <img
                  key={src}
                  src={src}
                  alt={`${activeLevel.title} slide ${sIdx + 1}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    sIdx === currentSlideIdx ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-navy-dark/95 via-navy-dark/70 to-navy-dark/20 opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
              <div className="hidden lg:block absolute inset-0 z-20 bg-black/20 group-hover:opacity-0 transition-opacity duration-500" />
            </div>

            {/* Content overlay */}
            <div className="relative z-30 space-y-4 opacity-100 lg:opacity-0 lg:translate-y-6 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out">
              <span className="px-3 py-1 bg-champagne text-navy-dark rounded-full font-body text-[10px] font-bold tracking-widest uppercase inline-block">
                Level {activeLevel.levelNumber}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {activeLevel.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
                {activeLevel.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-4 border-t border-white/10 mt-6">
                {activeLevel.bullets.slice(0, 4).map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
                    <div className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
