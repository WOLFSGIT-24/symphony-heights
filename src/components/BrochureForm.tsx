import React, { useState, useEffect } from "react";
import { Download, CheckCircle, Calendar, Sparkles, Phone, Mail, User, ShieldCheck } from "lucide-react";
import { projectSnapshot, LeadSubmission } from "@/lib/data";

interface BrochureFormProps {
  onAddLead: (lead: Omit<LeadSubmission, "id" | "submittedAt" | "status">) => void;
  preselectedUnit?: string | null;
}

export default function BrochureForm({ onAddLead, preselectedUnit }: BrochureFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    source: "Website Landing Page",
    unitType: preselectedUnit || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedUnit) {
      setFormData((prev) => ({ ...prev, unitType: preselectedUnit }));
      const el = document.getElementById("lead-capture-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [preselectedUnit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    let sanitizedValue = value;
    if (id === "phone") {
      sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (id === "fullName") {
      sanitizedValue = value.replace(/[^A-Za-z\s]/g, '');
    }
    
    setFormData((prev) => ({ ...prev, [id]: sanitizedValue }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    setTimeout(() => {
      onAddLead({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferredDate: formData.preferredDate || undefined,
        preferredTime: formData.preferredTime || undefined,
        source: formData.source,
        notes: formData.unitType ? `Selected Unit preference: ${formData.unitType}` : undefined,
      });

      setLoading(false);
      setFormSubmitted(true);
    }, 1000);
  };

  const handleDownloadBrochure = () => {
    try {
      window.open("/Brochure.pdf", "_blank");
      const link = document.createElement("a");
      link.href = "/Brochure.pdf";
      link.setAttribute("download", "Symphony_Heights_Brochure.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Error downloading brochure", e);
    }
  };

  return (
    <section id="snapshots" className="w-full py-12 md:py-16 bg-navy-dark text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,211,194,0.06),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div id="lead-capture-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Project Snapshot & Metadata */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl text-champagne font-semibold leading-tight">
              Your Next Chapter Begins Here.
            </h2>

            <div className="bg-navy-primary/60 p-6 sm:p-8 rounded-lg space-y-4 border border-white/5 shadow-2xl">
              <h4 className="font-display text-lg font-bold text-champagne tracking-wide flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-champagne" />
                Project Snapshot
              </h4>
              <ul className="space-y-3 font-body text-xs sm:text-sm text-white/85">
                <li className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-white/60">Configuration:</span>
                  <span className="font-semibold text-white">Premium 3 BHK Homes</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-white/60">Starting Price:</span>
                  <span className="font-semibold text-white">{projectSnapshot.startingPrice}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-white/60">Scale:</span>
                  <span className="font-semibold text-white">Only 128 Boutique Residences</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-white/60">Location:</span>
                  <span className="font-semibold text-white text-right max-w-[240px]">{projectSnapshot.locationName}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-white/60">Payment Plan:</span>
                  <span className="font-semibold text-white">{projectSnapshot.paymentPlan}</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span className="text-white/60">RERA No.:</span>
                  <span className="font-semibold text-white font-mono text-[11px]">{projectSnapshot.rera}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Lead Intake Form Panel */}
          <div className="lg:col-span-7">
            <div className="bg-white text-charcoal p-8 sm:p-10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[5px] bg-navy-primary" />

              {!formSubmitted ? (
                <>
                  <div className="mb-8">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-navy-primary">
                      Schedule Your Exclusive Site Visit
                    </h3>
                    <p className="font-body text-xs text-gray-500 mt-1">
                      Experience the project, explore layout floor plans, and discover the boutique lifestyle at Symphony Heights.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="relative border-b border-gray-200 focus-within:border-navy-primary transition-colors py-1.5">
                      <label className="text-[10px] font-bold text-navy-primary uppercase tracking-wider block mb-1">
                        Full Name
                      </label>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          id="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full bg-transparent border-none text-sm font-body outline-none placeholder:text-gray-300 py-1"
                        />
                      </div>
                      {errors.fullName && <p className="text-red-500 text-[10px] mt-1 absolute -bottom-4">{errors.fullName}</p>}
                    </div>

                    {/* Email Address */}
                    <div className="relative border-b border-gray-200 focus-within:border-navy-primary transition-colors py-1.5">
                      <label className="text-[10px] font-bold text-navy-primary uppercase tracking-wider block mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          className="w-full bg-transparent border-none text-sm font-body outline-none placeholder:text-gray-300 py-1"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 absolute -bottom-4">{errors.email}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="relative border-b border-gray-200 focus-within:border-navy-primary transition-colors py-1.5">
                      <label className="text-[10px] font-bold text-navy-primary uppercase tracking-wider block mb-1">
                        Phone Number
                      </label>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="w-full bg-transparent border-none text-sm font-body outline-none placeholder:text-gray-300 py-1"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 absolute -bottom-4">{errors.phone}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2.5 bg-navy-dark text-white font-body text-xs font-bold tracking-widest uppercase px-8 py-4.5 hover:bg-navy-primary transition-colors shadow-lg rounded-sm disabled:opacity-50 mt-4 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          CONFIRMING APPOINTMENT...
                        </>
                      ) : (
                        "BOOK MY SITE VISIT"
                      )}
                    </button>

                    <div className="flex gap-2 justify-center items-center text-[10px] text-gray-400 font-body">
                      <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                      <span>SSL 256-bit Encrypted. Your details are 100% confidential.</span>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-6 animate-fade-in">
                  <div className="h-16 w-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                    <CheckCircle className="h-8 w-8" />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-navy-primary">
                      Registration Complete
                    </h3>
                    <p className="font-body text-sm text-gray-600 mt-1.5 max-w-md mx-auto">
                      Thank you, <strong>{formData.fullName}</strong>. Our relationship manager will reach out shortly with customized brochures and pricing.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                      onClick={handleDownloadBrochure}
                      className="flex items-center justify-center gap-2 bg-navy-dark text-white font-body text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-navy-primary transition-colors shadow-lg rounded-sm cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      DOWNLOAD BROCHURE
                    </button>

                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="flex items-center justify-center gap-2 bg-transparent border border-navy-primary text-navy-primary font-body text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-navy-primary hover:text-white transition-colors rounded-sm cursor-pointer"
                    >
                      REGISTER ANOTHER
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
