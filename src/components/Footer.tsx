import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { projectSnapshot } from '@/lib/data';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenContactForm?: () => void;
}

export default function Footer({ onOpenPrivacy, onOpenTerms, onOpenContactForm }: FooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const footerInView = useInView(footerRef, { once: false, amount: 0.3 });

  return (
    <motion.footer
      ref={footerRef}
      className="relative w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-background border-t border-primary/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: footerInView ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="max-w-[100rem] mx-auto">
        {/* Gold Divider */}
        <motion.div
          className="w-12 sm:w-16 md:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8 md:mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: footerInView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Logo */}
        <motion.div
          className="text-center mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: footerInView ? 1 : 0, y: footerInView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          <img
            src="/combo-logo.png"
            alt="Symphony Heights by Disha Properties Logo"
            className="mx-auto mb-2 sm:mb-3 drop-shadow-[0_0_15px_rgba(88,66,54,0.3)] w-auto h-12 sm:h-14 md:h-16 object-contain"
          />
        </motion.div>

        {/* Brand Statement */}
        <motion.p
          className="font-paragraph text-foreground/80 text-center max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: footerInView ? 1 : 0, y: footerInView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        >
          A boutique residential community of just 128 premium 3 BHK residences on Hennur Bagalur Road, North Bangalore. Crafted with low density, 3 tiers of lifestyle amenities, and uncompromised Disha Properties quality.
        </motion.p>

        {/* Contact Info */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-10 md:mb-12 font-paragraph text-foreground/80 text-xs sm:text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: footerInView ? 1 : 0, y: footerInView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        >
          <div className="text-center sm:text-left">
            <p className="text-primary font-bold mb-0.5 sm:mb-1">Location</p>
            <p className="text-[10px] sm:text-xs md:text-sm">{projectSnapshot.locationName}</p>
          </div>
          <div className="hidden sm:block w-px h-6 sm:h-10 md:h-12 bg-primary/30" />
          <div className="text-center sm:text-left">
            <p className="text-primary font-bold mb-0.5 sm:mb-1">Sales Line</p>
            <p className="text-[10px] sm:text-xs md:text-sm">
              <a href={`tel:${projectSnapshot.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors font-semibold">
                {projectSnapshot.phone}
              </a>
            </p>
          </div>
          <div className="hidden sm:block w-px h-6 sm:h-10 md:h-12 bg-primary/30" />
          <div className="text-center sm:text-left">
            <p className="text-primary font-bold mb-0.5 sm:mb-1">RERA Registration</p>
            <p className="text-[10px] sm:text-xs md:text-sm font-mono">{projectSnapshot.rera}</p>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="border-t border-primary/15 pt-4 sm:pt-6 md:pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: footerInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        >
          <p className="font-paragraph text-foreground/60 text-[9px] sm:text-xs text-center max-w-4xl mx-auto leading-relaxed mb-3 sm:mb-4 md:mb-6">
            Disclaimer: All information provided is for general informational purposes only. While we strive to ensure accuracy, specifications, amenities, and pricing starting from ₹1.9 Cr* are subject to change without notice. Please verify all details with our sales team. Images and renderings are artistic impressions. Karnataka RERA registration details available at rera.karnataka.gov.in.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <Link 
              to="/privacy-policy" 
              className="font-paragraph text-foreground/60 hover:text-primary text-[9px] sm:text-xs transition-colors duration-300 underline"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="font-paragraph text-foreground/40 text-[8px] sm:text-xs text-center">
            © {new Date().getFullYear()} Symphony Heights by Disha Properties. All rights reserved. Authorized Marketing Partner: {projectSnapshot.salesPartner}.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
