import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: any) => void;
}

export default function OfferModal({ isOpen, onClose, onAddLead }: OfferModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agree: true,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    let sanitizedValue = value;
    if (name === "phone") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "fullName") {
      sanitizedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : sanitizedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Name should only contain letters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    onAddLead({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      source: "popup_visit_form",
      status: "Pending",
      notes: "Interested in visiting Symphony Heights",
    });
    
    setLoading(false);
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
      setTimeout(() => setSubmitted(false), 300);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[420px] bg-[#EBE3CD] rounded-lg shadow-2xl overflow-hidden animate-fade-in border border-[#D5CBAA]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors z-10 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="p-6 sm:p-8 pb-5 border-b border-[#D5CBAA]">
              <h3 className="font-display text-[15px] sm:text-[16px] font-bold text-navy-primary uppercase tracking-wide">
                Schedule Your Exclusive Site Visit
              </h3>
              <p className="font-body text-xs text-gray-600 mt-1.5 leading-relaxed">
                Experience the project, understand the floor plans and explore the lifestyle that Symphony Heights has to offer.
              </p>
            </div>

            <div className="p-6 sm:p-8 pt-5 space-y-4">
              <div className="relative">
                <label htmlFor="fullName" className="block text-xs font-bold font-body text-navy-primary mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-white border border-black rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary font-body text-black"
                />
                {errors.fullName && <p className="text-red-500 text-[10px] mt-1">{errors.fullName}</p>}
              </div>

              <div className="relative">
                <label htmlFor="email" className="block text-xs font-bold font-body text-navy-primary mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-white border border-black rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary font-body text-black"
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-xs font-bold font-body text-navy-primary mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-white border border-black rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-navy-primary/20 focus:border-navy-primary font-body text-black placeholder:text-gray-400"
                />
                {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
              </div>

              <div className="flex items-start gap-3 mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 border border-black rounded bg-white checked:bg-navy-primary checked:border-navy-primary focus:ring-0 cursor-pointer appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:left-[2px] checked:after:top-[-1px]"
                  />
                </div>
                <label htmlFor="agree" className="text-[10px] text-black font-body leading-tight">
                  I agree to the Terms of Service and Privacy Policy. I agree to receive updates & offers via WhatsApp, SMS, Email & RCS.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-body text-xs font-bold tracking-[0.2em] uppercase py-4 mt-2 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "SCHEDULE VISIT"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center h-[380px] flex flex-col justify-center">
            <div className="h-16 w-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6 shadow-sm">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-navy-primary mb-2">Request Received</h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed max-w-xs mx-auto">
              Thank you! Our relationship team has received your walkthrough request and will contact you shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
