import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { projectSnapshot } from '@/lib/data';

interface HeaderProps {
  onOpenContactForm?: () => void;
}

export default function Header({ onOpenContactForm }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Plots', href: '#plots' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#own-legacy' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-lg transition-all duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex h-16 sm:h-20 md:h-24 items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={handleLogoClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="cursor-pointer focus:outline-none flex items-center"
            aria-label="Symphony Heights Home"
          >
            <img
              src="/combo-logo.png"
              alt="Symphony Heights Logo"
              className="h-9 sm:h-11 md:h-13 w-auto object-contain"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center gap-10">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleNavClick(item.href)}
                className="font-paragraph text-sm uppercase tracking-widest transition-colors duration-300 text-warm-espresso hover:text-primary cursor-pointer font-medium"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <Button
              className="font-paragraph font-medium tracking-wide transition-all duration-300
                h-11 px-5 text-sm
                sm:h-12 sm:px-6 sm:text-base
                md:h-14 md:px-10 md:text-base
                rounded-xl bg-primary text-white shadow-lg cursor-pointer hover:bg-primary/90"
              onClick={onOpenContactForm}
            >
              Enquire Now
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 transition-colors text-warm-espresso cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pb-4 space-y-3 bg-background/95"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left font-paragraph text-sm uppercase tracking-widest py-2 transition-colors text-warm-espresso hover:text-primary cursor-pointer font-medium"
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  );
}
