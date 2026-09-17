import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { projectSnapshot } from "@/lib/data";

interface HeaderProps {
  onOpenContactForm?: () => void;
}

export default function Header({ onOpenContactForm }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Master Plan", href: "#master-plan" },
    { label: "Amenities", href: "#amenities" },
    { label: "Floor Plans", href: "#plots" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#own-legacy" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-md py-2 sm:py-3"
          : "bg-background/90 backdrop-blur-sm border-b border-primary/10 py-2.5 sm:py-3.5"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-6 md:px-8">
        <div className="flex h-12 sm:h-14 md:h-16 items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <motion.button
            onClick={handleLogoClick}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer focus:outline-none flex items-center shrink-0 max-w-[52%] sm:max-w-[60%] md:max-w-none"
            aria-label="Symphony Heights Home"
          >
            <img
              src="/combo-logo.webp"
              alt="Symphony Heights by Disha Properties Logo"
              className="h-7 sm:h-9 md:h-11 lg:h-12 w-auto max-w-full object-contain"
              width={220}
              height={48}
              loading="eager"
              decoding="async"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center gap-6 lg:gap-10">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => handleNavClick(item.href)}
                className="font-paragraph text-xs lg:text-sm uppercase tracking-widest transition-colors duration-200 text-warm-espresso hover:text-primary cursor-pointer font-medium"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            {/* Desktop Only Enquire Button */}
            <Button
              className="hidden md:flex font-paragraph font-semibold tracking-wide transition-all duration-300
                h-10 px-5 text-xs lg:text-sm rounded-xl
                bg-primary text-white shadow-sm hover:bg-primary/90 cursor-pointer whitespace-nowrap"
              onClick={onOpenContactForm}
            >
              Enquire Now
            </Button>

            {/* Mobile Only: Circular Phone Call Button */}
            <a
              href={`tel:${projectSnapshot.phone.replace(/\s+/g, "")}`}
              className="md:hidden w-10 h-10 rounded-full border border-[#4E3D35]/25 bg-white/60 backdrop-blur-xs flex items-center justify-center text-[#4E3D35] hover:bg-[#4E3D35]/5 active:scale-95 transition-all shadow-xs"
              aria-label={`Call ${projectSnapshot.phone}`}
            >
              <Phone className="w-4 h-4 text-[#4E3D35]" />
            </a>

            {/* Mobile Only: Circular Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-[#4E3D35]/25 bg-white/60 backdrop-blur-xs flex items-center justify-center text-[#4E3D35] hover:bg-[#4E3D35]/5 active:scale-95 transition-all shadow-xs cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-4 h-4 text-[#4E3D35]" /> : <Menu className="w-4 h-4 text-[#4E3D35]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden pt-3 pb-4 border-t border-primary/10 mt-2 space-y-1 bg-background"
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left font-paragraph text-xs uppercase tracking-widest py-2.5 px-2 rounded-lg transition-colors text-warm-espresso hover:text-primary hover:bg-primary/5 cursor-pointer font-semibold"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 mt-2 border-t border-primary/10 flex flex-col gap-2">
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90 py-2.5 text-xs font-semibold rounded-lg cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenContactForm?.();
                  }}
                >
                  Schedule Site Visit
                </Button>
                <a
                  href={`tel:${projectSnapshot.phone.replace(/\s+/g, "")}`}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Phone size={13} />
                  Call {projectSnapshot.phone}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
