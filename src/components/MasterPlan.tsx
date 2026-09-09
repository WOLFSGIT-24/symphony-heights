import React, { useState } from "react";
import { ZoomIn } from "lucide-react";
import { floorPlansData, FloorPlanUnit } from "@/lib/data";

interface MasterPlanProps {
  onSelectUnit: (unitType: string) => void;
}

export default function MasterPlan({ onSelectUnit }: MasterPlanProps) {
  const [activeTab, setActiveTab] = useState<string>("ground");
  const [blueprintModal, setBlueprintModal] = useState<FloorPlanUnit | null>(null);

  const filteredPlans = floorPlansData.filter((plan) => plan.id === activeTab);

  return (
    <section id="master-plan" className="w-full py-12 md:py-16 bg-[#FBF9FB] scroll-mt-20 font-body">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="font-body text-xs font-bold text-navy-primary uppercase tracking-[0.25em] block">
            Master Plan
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-navy-primary font-semibold leading-tight">
            Architectural Drafting
          </h2>
          <div className="h-[2px] w-16 bg-navy-primary mx-auto" />
          <p className="font-body text-sm md:text-base text-gray-text leading-relaxed">
            Meticulously designed floor plans that optimize usable space, facilitate natural breeze channels, and welcome beautiful morning sunlight.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {[
            { id: "ground", label: "Ground Level" },
            { id: "podium", label: "Podium Level" },
            { id: "rooftop", label: "Rooftop Level" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded font-body text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-navy-primary text-white shadow-sm"
                  : "bg-navy-primary/5 text-navy-primary hover:bg-navy-primary/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Drafting Cards */}
        <div className="max-w-5xl mx-auto">
          {filteredPlans.map((plan: FloorPlanUnit) => (
            <div
              key={plan.id}
              className="bg-white p-6 sm:p-8 rounded-xl border border-champagne hover:border-navy-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 group flex flex-col-reverse md:flex-row gap-8 justify-between"
            >
              {/* Left Side: Info & Points */}
              <div className="w-full md:w-5/12 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div>
                      <h4 className="font-display text-xl sm:text-2xl text-navy-primary font-semibold">
                        {plan.title}
                      </h4>
                      <span className="text-[10px] font-bold text-gray-text/70 uppercase tracking-widest mt-0.5 block">
                        Super Built-up Area: {plan.area}
                      </span>
                    </div>
                    <span className="px-4 py-1.5 bg-champagne text-navy-primary font-body text-[10px] font-bold rounded-full uppercase tracking-widest self-start">
                      {plan.type}
                    </span>
                  </div>

                  <div className="mt-4 md:mt-6">
                    <span className="text-[10px] font-extrabold text-navy-primary uppercase tracking-[0.2em] block mb-3">
                      Layout Highlights:
                    </span>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                      {plan.highlights.slice(0, 10).map((highlight, hIdx) => {
                        const match = highlight.match(/^(\d+)\.\s*(.*)$/);
                        const text = match ? match[2] : highlight;
                        return (
                          <div key={hIdx} className="flex gap-2 items-center text-xs sm:text-sm text-gray-text font-body py-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-navy-primary shrink-0" />
                            <span className="leading-tight">{text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setBlueprintModal(plan)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-primary hover:text-navy-dark cursor-pointer"
                  >
                    <ZoomIn className="h-4 w-4" />
                    <span>View High-Res Blueprint</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Interactive blueprint visual preview */}
              <div className="w-full md:w-7/12 aspect-[4/3] relative p-4 sm:p-6 bg-marble rounded-lg border border-navy-primary/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-navy-dark/40 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setBlueprintModal(plan)}
                    className="flex items-center justify-center gap-2 bg-navy-dark text-white font-body text-xs font-bold tracking-widest uppercase px-6 py-3.5 hover:bg-navy-primary transition-colors shadow-lg rounded-sm transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                  >
                    <ZoomIn className="h-4 w-4" />
                    Enlarge Layout
                  </button>
                </div>

                <img
                  src={plan.imageUrl}
                  alt={plan.title}
                  loading="lazy"
                  className="w-full h-full object-contain transform group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blueprint Magnifier Modal */}
      {blueprintModal && (
        <div
          className="fixed inset-0 bg-navy-dark/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setBlueprintModal(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full p-6 md:p-8 flex flex-col gap-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-navy-primary/10 pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-navy-primary">
                  {blueprintModal.title} Drafting Detail
                </h3>
                <span className="text-xs text-gray-text font-semibold uppercase">
                  {blueprintModal.type} — {blueprintModal.area} Architectural Blueprint
                </span>
              </div>
              <button
                onClick={() => setBlueprintModal(null)}
                className="text-gray-text hover:text-navy-primary font-body text-xs font-bold bg-navy-primary/5 hover:bg-navy-primary/10 px-3.5 py-2 rounded focus:outline-none cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="h-[55vh] p-4 bg-navy-primary/5 rounded border border-navy-primary/10 flex items-center justify-center overflow-auto">
              <img
                src={blueprintModal.imageUrl}
                alt={blueprintModal.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body border-t border-navy-primary/10 pt-4">
              <span className="text-gray-text italic">
                *Dimension standards adhere to RERA guidelines. Subject to approval.
              </span>
              <button
                onClick={() => {
                  onSelectUnit(blueprintModal.type);
                  setBlueprintModal(null);
                }}
                className="flex items-center justify-center gap-2 bg-navy-primary text-white font-body text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-navy-dark transition-colors shadow-lg rounded-sm cursor-pointer"
              >
                Enquire for {blueprintModal.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
