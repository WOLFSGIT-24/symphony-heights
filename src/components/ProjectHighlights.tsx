import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Shield, Building2, CheckCircle } from 'lucide-react';
import { projectSnapshot } from '@/lib/data';

interface ProjectHighlightsProps {
  onRequestDownload?: () => void;
}

export default function ProjectHighlights({ onRequestDownload }: ProjectHighlightsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="highlights" className="pt-16 pb-6 md:py-24 bg-marble relative z-20 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="font-body text-xs font-bold text-navy-primary uppercase tracking-[0.25em] block">
            Exclusive Launch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-navy-primary font-semibold leading-tight">
            Project Highlights
          </h2>
          <div className="h-[2px] w-16 bg-navy-primary mx-auto" />
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white grid">
          {/* Slide 0: Pricing & Payment Plan */}
          <div 
            className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out ${currentSlide === 0 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Left Logo Side */}
              <div className="w-full md:w-5/12 bg-champagne/30 p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-navy-primary/10">
                <span className="font-body text-[10px] sm:text-xs font-bold tracking-widest text-navy-primary/60 uppercase mb-4">
                  Launching
                </span>
                <img src="/logo.webp" alt="Symphony Heights" className="h-24 sm:h-28 object-contain mb-4" loading="lazy" decoding="async" />
                <span className="font-body text-[10px] font-bold tracking-widest text-navy-primary uppercase">
                  Hennur, North Bangalore
                </span>
              </div>
              
              {/* Right Content Side */}
              <div className="w-full md:w-7/12 flex-1 bg-navy-primary p-8 sm:p-12 flex flex-col justify-center">
                <div className="font-body text-xl sm:text-2xl font-semibold text-white tracking-wide mb-2">
                  3 BED Boutique Residences
                </div>
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-champagne mb-6">
                  ₹ 1.9 Cr* Onwards
                </div>
                
                <div className="h-[1px] w-full bg-white/10 mb-6" />
                
                <div className="font-body text-xs font-bold text-champagne uppercase tracking-widest mb-1">
                  NEVER BEFORE. NEVER AGAIN.
                </div>
                <div className="font-body text-sm sm:text-base font-bold text-white uppercase tracking-widest mb-2">
                  25 : 25 : 25 : 25 FLEXI PAYMENT PLAN
                </div>
                <div className="font-body text-sm text-white/70 tracking-wide leading-relaxed">
                  Pay 25% now and nothing for the next one year.
                </div>
              </div>
            </div>
          </div>

          {/* Slide 1: Features Grid */}
          <div 
            className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out bg-white ${currentSlide === 1 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Left Logo Side */}
              <div className="w-full md:w-5/12 bg-champagne/30 p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-navy-primary/10">
                <span className="font-body text-[10px] sm:text-xs font-bold tracking-widest text-navy-primary/60 uppercase mb-4">
                  Experience
                </span>
                <img src="/logo.webp" alt="Symphony Heights" className="h-24 sm:h-28 object-contain mb-4" loading="lazy" decoding="async" />
                <span className="font-body text-[10px] font-bold tracking-widest text-navy-primary uppercase">
                  Hennur, North Bangalore
                </span>
              </div>
              
              {/* Right Features Grid */}
              <div className="w-full md:w-7/12 flex-1 p-4 sm:p-10 grid grid-cols-2 gap-3 sm:gap-6 bg-marble/20">
                <div className="border border-navy-primary/15 rounded-lg p-3 sm:p-5 bg-white hover:bg-champagne/10 transition-colors shadow-sm">
                  <div className="font-display text-[16px] sm:text-xl font-bold text-navy-primary mb-1 sm:mb-2 leading-tight">128 Residences</div>
                  <div className="font-body text-[9px] sm:text-xs font-semibold tracking-wider uppercase text-navy-primary/60">Boutique Community</div>
                </div>

                <div className="border border-navy-primary/15 rounded-lg p-3 sm:p-5 bg-white hover:bg-champagne/10 transition-colors shadow-sm">
                  <div className="font-display text-[16px] sm:text-xl font-bold text-navy-primary mb-1 sm:mb-2 leading-tight">1 Acre Canvas</div>
                  <div className="font-body text-[9px] sm:text-xs font-semibold tracking-wider uppercase text-navy-primary/60">Intimate Scale</div>
                </div>

                <div className="border border-navy-primary/15 rounded-lg p-3 sm:p-5 bg-white hover:bg-champagne/10 transition-colors shadow-sm">
                  <div className="font-display text-[16px] sm:text-xl font-bold text-navy-primary mb-1 sm:mb-2 leading-tight">Rooftop Oasis</div>
                  <div className="font-body text-[9px] sm:text-xs font-semibold tracking-wider uppercase text-navy-primary/60">With Infinity Pool</div>
                </div>

                <div className="border border-navy-primary/15 rounded-lg p-3 sm:p-5 bg-white hover:bg-champagne/10 transition-colors shadow-sm">
                  <div className="font-display text-[16px] sm:text-xl font-bold text-navy-primary mb-1 sm:mb-2 leading-tight">Global Planners</div>
                  <div className="font-body text-[9px] sm:text-xs font-semibold tracking-wider uppercase text-navy-primary/60">RERA Approved</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls & CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-6">
          {onRequestDownload && (
            <button
              onClick={onRequestDownload}
              className="flex items-center justify-center gap-2 bg-navy-dark text-white font-body text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-navy-primary transition-colors shadow-lg w-full sm:w-auto rounded-sm cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </button>
          )}

          {/* Navigation Dots */}
          <div className="flex items-center gap-3">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? 'w-8 h-2 bg-navy-primary'
                    : 'w-2 h-2 bg-navy-primary/20 hover:bg-navy-primary/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
