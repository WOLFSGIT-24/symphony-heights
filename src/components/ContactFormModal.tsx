import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { BaseCrudService } from '@/integrations';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ContactFormModal({ isOpen, onClose, onSuccess }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (name === 'phoneNumber') {
      sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'name') {
      sanitizedValue = value.replace(/[^A-Za-z\s]/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name should only contain letters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const isoTimestamp = new Date().toISOString();
    const localTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    try {
      // 1. Post to Make.com Webhook
      fetch('https://hook.us1.make.com/2bmmq21zo8ocu9itedtq5oyhu5sg5zad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          source: 'popup_enquiry_form',
          submittedAt: isoTimestamp,
          localTimestamp: localTimestamp,
          status: 'Pending',
        }),
      }).catch((err) => console.error('Webhook error:', err));

      // 2. Persist to BaseCrudService
      await BaseCrudService.create('contactformsubmissions', {
        _id: crypto.randomUUID(),
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        submissionDate: new Date(),
      });

      // 3. Persist to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('symphony_heights_leads') || '[]');
        stored.push({
          id: 'SH-' + Math.floor(1000 + Math.random() * 9000),
          fullName: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          submittedAt: isoTimestamp,
          source: 'popup_enquiry_form',
          status: 'Pending',
        });
        localStorage.setItem('symphony_heights_leads', JSON.stringify(stored));
      } catch (err) {
        console.error(err);
      }

      setSubmitSuccess(true);
      setFormData({ name: '', phoneNumber: '', email: '' });
      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
      }, 2500);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          >
            <div className="bg-white border border-primary/20 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-primary/10 px-6 py-5 flex justify-between items-center z-10">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl text-soft-charcoal">Schedule Site Visit</h2>
                  <p className="font-paragraph text-xs text-muted-gray mt-0.5">Symphony Heights • Hennur</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-soft-charcoal/60 hover:text-soft-charcoal transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 shadow-sm">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading text-2xl text-soft-charcoal mb-2">Request Confirmed!</h3>
                    <p className="font-paragraph text-sm text-muted-gray leading-relaxed max-w-xs mx-auto">
                      Thank you. Our dedicated relationship team will reach out to confirm your private walkthrough.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block font-paragraph text-xs font-semibold text-soft-charcoal mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-old-lace/40 border border-primary/20 rounded-xl px-4 py-3 font-paragraph text-sm text-soft-charcoal placeholder-muted-gray/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                        placeholder="Full Name"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-paragraph text-xs font-semibold text-soft-charcoal mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full bg-old-lace/40 border border-primary/20 rounded-xl px-4 py-3 font-paragraph text-sm text-soft-charcoal placeholder-muted-gray/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                        placeholder="Phone Number"
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-[10px] mt-1">{errors.phoneNumber}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-paragraph text-xs font-semibold text-soft-charcoal mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-old-lace/40 border border-primary/20 rounded-xl px-4 py-3 font-paragraph text-sm text-soft-charcoal placeholder-muted-gray/60 focus:outline-none focus:border-primary focus:bg-white transition-all"
                        placeholder="Email Address"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl py-4 font-paragraph font-medium transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50 text-sm"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Booking Tour...
                          </span>
                        ) : (
                          'Confirm Site Appointment'
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-gray pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                      <span>SSL 256-bit Secured. Your data is strictly confidential.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
