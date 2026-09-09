import React, { useEffect } from "react";
import { X } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-navy-dark/90 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-navy-primary/10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 sm:p-8 border-b border-navy-primary/5 bg-marble shrink-0">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-navy-primary font-bold">Terms & Conditions</h2>
            <p className="font-body text-xs text-charcoal/60 mt-1 uppercase tracking-widest">Symphony Heights Collective</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-navy-primary/5 text-navy-primary/60 hover:text-navy-primary transition-colors focus:outline-none cursor-pointer"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto font-body text-sm text-charcoal/80 leading-relaxed space-y-8 custom-scrollbar">
          <div className="space-y-4">
            <p>
              By accessing and using this website, you agree to be bound by these Terms and Conditions. This website is operated by the Symphony Heights Collective, an authorised marketing partner for Disha Properties.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-navy-primary">1. Website Purpose</h3>
            <p>
              This website provides accurate information and accepts booking and site visit inquiries for Symphony Heights, a boutique community of premium 3 BHK residences in Hennur, Bangalore.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-navy-primary">2. Pricing & Plans</h3>
            <p>
              Prices starting from ₹1.9 Cr* and flexi payment plans (25:25:25:25) are subject to developer terms and inventory availability.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-navy-primary">3. RERA Registration</h3>
            <p><strong>Karnataka RERA Reg:</strong> PRM/KA/RERA/1251/446/PR/250925/008120</p>
            <p>Available for verification at <a href="https://rera.karnataka.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-semibold">rera.karnataka.gov.in</a>.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:px-8 sm:py-6 border-t border-navy-primary/5 bg-marble shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded bg-navy-primary text-white font-body text-xs font-bold tracking-wider uppercase hover:bg-navy-dark transition-colors shadow-sm cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
