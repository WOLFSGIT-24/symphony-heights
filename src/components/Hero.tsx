import React from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { projectSnapshot } from "@/lib/data";

interface HeroProps {
  onOpenEnquiry: () => void;
  onRequestDownload?: () => void;
}

export default function Hero({ onOpenEnquiry, onRequestDownload }: HeroProps) {
  return (
    <section
      id="overview"
      className="relative w-full min-h-0 lg:min-h-screen pt-[88px] sm:pt-[96px] bg-marble flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-6 lg:py-20 relative z-10">
        {/* Left Side: Primary Image */}
        <div className="w-full lg:w-1/2 relative mb-4 lg:mb-0">
          <div className="relative shadow-2xl bg-white p-2 sm:p-3 z-10 rounded-sm">
            <img
              src="/hero-bg.png"
              alt="Symphony Heights tower"
              fetchPriority="high"
              className="w-full h-[54vh] sm:h-auto sm:aspect-[4/5] object-cover object-bottom rounded-sm"
            />
            {/* Pricing Box (Mobile overlay) */}
            <div className="lg:hidden absolute bottom-0 translate-y-[65%] left-1/2 -translate-x-1/2 w-[88%] max-w-[290px] bg-navy-primary text-white py-3 px-4 shadow-2xl z-20 rounded-sm border border-white/10 text-center">
              <div className="font-body text-[10px] font-bold tracking-wider text-white/90 uppercase">
                Flexi Payment Plan
              </div>
              <div className="text-2xl text-white/70 font-semibold font-body leading-tight mt-0.5">
                25 : 25 : 25 : 25
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-16 mx-2 p-4 bg-white rounded-lg border border-navy-primary/10 shadow-lg flex items-center justify-between text-left">
            <div className="space-y-1 pr-2">
              <div className="text-[13px] font-extrabold text-[#5c4a41] uppercase tracking-wider font-body">
                Premium 3 BHK Homes
              </div>
              <div className="text-[18px] font-extrabold text-[#5c4a41] uppercase tracking-tight font-body leading-none py-0.5">
                Starting ₹ 1.9 CR*
              </div>
            </div>

            <div className="h-8 w-[1px] bg-charcoal/20 mx-3" />

            <div className="flex items-center gap-1.5 font-body shrink-0">
              <MapPin className="h-4 w-4 text-[#5c4a41] shrink-0" />
              <span className="text-[15px] font-bold text-[#5c4a41]/90 uppercase tracking-wider">
                Hennur
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left relative z-20 px-4 sm:px-0">
          <div className="flex flex-row items-start justify-between w-full gap-4 mb-6">
            <div className="flex-1">
              <span className="inline-block px-3.5 py-1.5 bg-navy-primary/10 text-navy-primary rounded-full font-body text-[10px] font-bold tracking-widest uppercase mb-4">
                Boutique Living by Disha Properties
              </span>
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl text-navy-primary font-bold tracking-tight leading-[1.15] mb-3">
                Your First Premium Home Should Never Be a Compromise.
              </h1>
              <p className="font-body text-base sm:text-lg text-navy-primary/80 mb-2 leading-relaxed max-w-xl">
                Introducing Symphony Heights by Disha Properties — an intimate community of just 128 boutique 3 BHK residences on Hennur Bagalur Road. Designed for the perfect harmony of serenity, luxury amenities, and rapid capital appreciation.
              </p>
            </div>
          </div>

          {/* Pricing Box (Desktop) */}
          <div className="hidden lg:block bg-navy-primary text-white py-4 px-5 relative transform hover:-translate-y-1 transition-transform duration-300 w-full max-w-[280px] shadow-2xl mb-8 rounded-sm border border-white/5">
            <div className="text-[10px] text-champagne uppercase tracking-widest font-extrabold mb-0.5">
              Starting from
            </div>
            <div className="font-display text-3xl font-bold mb-1 text-champagne leading-tight">
              ₹1.9 Crore*
            </div>
            <div className="border-t border-white/10 pt-2 mt-2">
              <div className="font-body text-[11px] font-bold tracking-wider text-white/90 uppercase">
                Flexi Payment Plan
              </div>
              <div className="text-[9px] text-white/70 font-medium font-body leading-relaxed mt-0.5">
                Pay 25% now and nothing for 1 year
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-30">
            <button
              onClick={onOpenEnquiry}
              className="flex items-center justify-center gap-2 bg-navy-dark text-white font-body text-xs font-bold tracking-widest uppercase px-8 py-4.5 hover:bg-navy-primary transition-colors shadow-lg w-full sm:w-auto rounded-sm cursor-pointer"
            >
              Book a site visit
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onRequestDownload}
              className="flex items-center justify-center gap-2 bg-transparent border border-navy-primary text-navy-primary font-body text-xs font-bold tracking-widest uppercase px-8 py-4.5 hover:bg-navy-primary hover:text-white transition-colors w-full sm:w-auto rounded-sm cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Brochure
            </button>
          </div>

          {/* Secondary Tilted Image (Bottom Right) */}
          <div className="hidden xl:block absolute -right-16 -bottom-12 w-52 h-60 transform rotate-6 shadow-2xl bg-white p-2.5 z-10 hover:rotate-2 transition-transform duration-700 pointer-events-none rounded-sm">
            <img
              src="/kidsplay.jpg"
              alt="Kids playing at Symphony Heights"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
