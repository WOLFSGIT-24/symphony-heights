import React, { useState } from "react";
import { Lock } from "lucide-react";

interface FloorPlansProps {
  onSelectUnit: (unitType: string) => void;
  isUnlocked: boolean;
  onUnlockRequest: () => void;
}

export default function FloorPlans({
  onSelectUnit,
  isUnlocked,
  onUnlockRequest,
}: FloorPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const plans = [
    {
      title: "3 BHK HOMES",
      area: "1818 SQ.FT. SBUA",
      details: [
        "RERA Carpet Area (A) - 1174 Sft",
        "Balcony Area (B) - 118 Sft",
        "External Walls (C) - 90 Sft",
        "Built Up Area (D= A+B+C) - 1382 Sft",
        "Common Area (E) - 436 Sft",
        "Super Build Up Area (SBUA) (F=D+E) - 1818 Sft",
      ],
      imageUrl: "/unit-402.webp",
      type: "3 BHK - 1818 Sft",
    },
    {
      title: "3 BHK HOMES",
      area: "1857 SQ.FT. SBUA",
      details: [
        "RERA Carpet Area (A) - 1174 Sft",
        "Balcony Area (B) - 147 Sft",
        "External Walls (C) - 90 Sft",
        "Built Up Area (D= A+B+C) - 1411 Sft",
        "Common Area (E) - 446 Sft",
        "Super Build Up Area (SBUA) (F=D+E) - 1857 Sft",
      ],
      imageUrl: "/unit-1503.webp",
      type: "3 BHK - 1857 Sft",
    },
  ];

  const handleAction = (plan: any) => {
    if (!isUnlocked) {
      onUnlockRequest();
    } else {
      setSelectedPlan(plan);
    }
  };

  return (
    <section
      id="floor-plans"
      className="w-full py-12 md:py-16 bg-white scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl text-navy-primary font-semibold leading-tight">
            Floor Plans
          </h2>
          <div className="h-[2px] w-16 bg-navy-primary mx-auto" />
        </div>

        {/* 3 BHK Cards side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-5 bg-white/40 p-6 rounded-xl border border-navy-primary/5 hover:border-navy-primary/10 transition-all duration-300 justify-between"
            >
              <div className="w-full space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-navy-primary uppercase tracking-wider">
                    {plan.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-text font-bold tracking-widest uppercase">
                    {plan.area}
                  </p>
                </div>

                {/* Floor Plan Image Wrapper with Blur */}
                <div className="relative w-full aspect-[4/3] bg-white rounded-lg border border-navy-primary/10 overflow-hidden flex items-center justify-center p-4 shadow-sm group">
                  <img
                    src={plan.imageUrl}
                    alt={plan.title}
                    loading="lazy"
                    className={`max-w-full max-h-full object-contain transition-all duration-700 ${
                      isUnlocked
                        ? "filter-none group-hover:scale-105"
                        : "filter blur-md scale-95 select-none pointer-events-none"
                    }`}
                  />

                  {/* Blur Overlay Shield */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/5 flex flex-col items-center justify-center p-4">
                      <div className="w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-navy-primary mb-2 animate-pulse">
                        <Lock className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-navy-primary uppercase tracking-widest bg-white/90 px-3 py-1 rounded shadow-sm">
                        Locked
                      </span>
                    </div>
                  )}
                </div>


              </div>

              {/* Call To Action Button */}
              <div className="pt-4 w-full">
                <button
                  onClick={() => handleAction(plan)}
                  className="w-full sm:w-auto bg-black text-white font-body text-xs font-bold tracking-widest uppercase px-8 py-3.5 hover:bg-gold hover:text-navy-dark transition-all rounded-full cursor-pointer shadow-md"
                >
                  {isUnlocked ? "View Floor Plan" : "Get Floor Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blueprint Zoom Modal */}
      {selectedPlan && (
        <div
          className="fixed inset-0 bg-navy-dark/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full p-6 md:p-8 flex flex-col gap-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-navy-primary/10 pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-navy-primary">
                  {selectedPlan.title} Detail Plan
                </h3>
                <span className="text-xs text-gray-text font-semibold uppercase">
                  Disha Properties — {selectedPlan.area} Carpet Area Plan
                </span>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-gray-text hover:text-navy-primary font-body text-xs font-bold bg-navy-primary/5 hover:bg-navy-primary/10 px-3.5 py-2 rounded focus:outline-none"
              >
                Close ✕
              </button>
            </div>

            <div className="h-[55vh] p-4 bg-navy-primary/5 rounded border border-navy-primary/10 flex items-center justify-center overflow-auto">
              <img
                src={selectedPlan.imageUrl}
                alt={selectedPlan.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body border-t border-navy-primary/10 pt-4">
              <span className="text-gray-text italic">
                *Dimension standards adhere to RERA carpet guidelines. Final
                layout details subject to approval.
              </span>
              <button
                onClick={() => {
                  onSelectUnit(selectedPlan.type);
                  setSelectedPlan(null);
                }}
                className="flex items-center justify-center gap-2 bg-navy-primary text-white font-body text-xs font-bold tracking-widest uppercase px-8 py-4.5 hover:bg-navy-dark transition-colors shadow-lg rounded-sm"
              >
                Request Information
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
