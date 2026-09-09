import React, { useEffect } from "react";
import { X } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
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
            <h2 className="font-display text-2xl sm:text-3xl text-navy-primary font-bold">Privacy Policy</h2>
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
              This website is operated by Symphony Heights Collective, the authorised marketing channel for Symphony Heights, a boutique community of premium 3 BHK residences in North Bangalore. We are committed to protecting the privacy of every visitor to this website and handling your personal information with care, transparency, and respect.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-navy-primary">1. Information We Collect</h3>
            <p>When you submit an enquiry form on this website, we collect the following personal information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Preferred appointment date/time (if provided)</li>
              <li>Any notes or preferences regarding unit layouts</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-navy-primary">2. How We Use Your Information</h3>
            <p>Your personal information is used solely for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Responding to your enquiry about Symphony Heights</li>
              <li>Sharing digital brochures, floor plans, and project pricing details</li>
              <li>Connecting you with the authorised Symphony Heights sales relationship manager</li>
              <li>Scheduling your VIP on-site tour at Hennur</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-navy-primary">3. RERA Compliance & Contact</h3>
            <p><strong>Karnataka RERA Registration No:</strong> PRM/KA/RERA/1251/446/PR/250925/008120</p>
            <p><strong>Direct Inquiries:</strong> 080 4735 9991 | info@symphonyheights.com</p>
            <p><strong>Project Address:</strong> Hennur Bagalur Road, Doddagubbi Main Rd, Bengaluru, 560077</p>
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
