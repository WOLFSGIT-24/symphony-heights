import React from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";

interface HeroProps {
  onOpenEnquiry: () => void;
  onRequestDownload?: () => void;
}

export default function Hero({ onOpenEnquiry, onRequestDownload }: HeroProps) {
  return (
    <section
      id="overview"
      className="relative w-full min-h-0 lg:min-h-screen pt-16 sm:pt-20 lg:pt-0 bg-marble flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-6 lg:py-20 relative z-10">
        {/* Left Side: Primary Image */}
        <div className="w-full lg:w-1/2 relative mb-4 lg:mb-0">
          <div className="relative shadow-2xl bg-white p-2 sm:p-3 z-10 rounded-sm">
            <picture>
              <source media="(max-width: 1023px)" srcSet="/hero-bg-mobile.webp" type="image/webp" />
              <img
                src="/hero-bg.webp"
                alt="Symphony Heights tower"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-[52vh] sm:h-auto sm:aspect-[4/5] object-cover object-bottom rounded-sm"
              />
            </picture>
            {/* Pricing Box (Mobile overlay) */}
            <div className="lg:hidden absolute -bottom-7 left-1/2 -translate-x-1/2 w-[86%] max-w-[320px] bg-[#4E3D35] text-white py-3.5 px-4 shadow-xl z-20 rounded-xl border border-white/10 text-center">
              <div className="font-paragraph text-[10.5px] font-bold tracking-[0.2em] text-[#d8c8bd] uppercase">
                FLEXI PAYMENT PLAN
              </div>
              <div className="text-2xl text-white font-bold font-heading leading-tight mt-0.5 tracking-wider">
                25 : 25 : 25 : 25
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-12 mx-auto max-w-md p-4 sm:p-5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 flex items-center justify-between text-left">
            <div className="space-y-1">
              <div className="text-sm sm:text-base font-extrabold text-[#4E3D35] uppercase tracking-wider font-paragraph leading-tight">
                PREMIUM 3 BHK HOMES
              </div>
              <div className="text-xl sm:text-2xl font-heading font-extrabold text-[#4E3D35] tracking-tight leading-none mt-0.5">
                STARTING ₹ 1.9 CR*
              </div>
            </div>

            <div className="h-10 w-px bg-neutral-200 mx-3 shrink-0" />

            <div className="flex items-center gap-1.5 font-paragraph shrink-0 text-[#4E3D35]">
              <MapPin className="h-4 w-4 text-[#4E3D35] stroke-[2.2] shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                HENNUR
              </span>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="lg:hidden w-full max-w-md mx-auto flex flex-col gap-3 mt-8">
            <button
              onClick={onOpenEnquiry}
              className="w-full bg-[#4E3D35] hover:bg-[#3f3029] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>BOOK A SITE VISIT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onRequestDownload || onOpenEnquiry}
              className="w-full bg-white border-[1.5px] border-[#4E3D35] text-[#4E3D35] hover:bg-[#4E3D35]/5 py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>BROCHURE</span>
            </button>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="hidden lg:flex w-full lg:w-1/2 flex-col items-start text-left relative z-20 px-2 sm:px-4 md:px-0">
          <div className="flex flex-row items-start justify-between w-full gap-4 mb-4">
            <div className="flex-1">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-[#543E31] font-bold tracking-[-0.02em] leading-[1.12] mb-4">
                Your First Premium Home Should Never Be a Compromise.
              </h1>
              <p className="font-paragraph text-xs sm:text-sm md:text-base text-[#6B5649] mb-5 leading-relaxed max-w-xl font-normal">
                Introducing Symphony Heights by Disha Properties—a boutique community of just 128 premium 3 BHK residences in the heart of Hennur. Designed for the perfect balance of connectivity, lifestyle, and long-term value.
              </p>
            </div>
          </div>

          {/* Pricing Box (Desktop) */}
          <div className="hidden lg:block bg-[#4E3D35] text-white py-4 px-5 relative transform hover:-translate-y-1 transition-transform duration-300 w-full max-w-[270px] shadow-2xl mb-6 rounded-xl border border-white/10">
            <div className="text-[10px] text-[#D8C6B6] uppercase tracking-[0.18em] font-bold mb-1">
              STARTING FROM
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold mb-2 text-[#FDFBF7] leading-tight tracking-tight">
              ₹1.9 Crore*
            </div>
            <div className="border-t border-white/15 pt-2 mt-1">
              <div className="font-paragraph text-[10px] sm:text-[11px] font-bold tracking-wider text-[#FDFBF7] uppercase">
                FLEXI PAYMENT PLAN
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#D8C6B6] font-medium font-paragraph leading-relaxed mt-0.5">
                Pay 25% now and nothing for 1 year
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-30">
            <button
              onClick={onOpenEnquiry}
              className="flex items-center justify-center gap-2 bg-[#4E3D35] text-white font-paragraph text-xs font-bold tracking-widest uppercase px-8 py-4.5 hover:bg-[#3f3029] transition-colors shadow-lg w-full sm:w-auto rounded-xl cursor-pointer"
            >
              <span>BOOK A SITE VISIT</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onRequestDownload || onOpenEnquiry}
              className="flex items-center justify-center gap-2 bg-transparent border-[1.5px] border-[#4E3D35] text-[#4E3D35] font-paragraph text-xs font-bold tracking-widest uppercase px-8 py-4.5 hover:bg-[#4E3D35]/5 transition-colors w-full sm:w-auto rounded-xl cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>BROCHURE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
