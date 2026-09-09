// Premium Light Theme - Symphony Heights (Meenakshi Structure)
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import {
  GatedLivingBenefits,
  InfrastructureDetails,
  InvestmentHighlights,
  LegalApprovals,
  PlotConfigurations,
  ProjectAmenities,
} from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, ArrowRight, Check, Lock, TrendingUp, Sparkles, Target, Shield, Zap, Award, BarChart3, Download } from 'lucide-react';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import Amenities3DSection from '@/components/Amenities3DCard';
import ContactFormModal from '@/components/ContactFormModal';
import Header from '@/components/Header';
import { projectSnapshot, locationsData } from '@/lib/data';

// --- Utility Components ---

const CinematicReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionDivider = () => (
  <div className="w-full flex justify-center py-12 md:py-24">
    <motion.div 
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "circOut" }}
      className="h-[1px] w-32 md:w-64 bg-gradient-to-r from-transparent via-primary to-transparent"
    />
  </div>
);

// --- Main Component ---

export default function HomePage() {
  const [legalApprovals, setLegalApprovals] = useState<LegalApprovals[]>([]);
  const [plotConfigs, setPlotConfigs] = useState<PlotConfigurations[]>([]);
  const [infrastructure, setInfrastructure] = useState<InfrastructureDetails[]>([]);
  const [amenities, setAmenities] = useState<ProjectAmenities[]>([]);
  const [gatedBenefits, setGatedBenefits] = useState<GatedLivingBenefits[]>([]);
  const [investmentHighlights, setInvestmentHighlights] = useState<InvestmentHighlights[]>([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [legal, plots, infra, amen, gated, investment] = await Promise.all([
          BaseCrudService.getAll<LegalApprovals>('legalapprovals'),
          BaseCrudService.getAll<PlotConfigurations>('plotconfigurations'),
          BaseCrudService.getAll<InfrastructureDetails>('infrastructuredetails'),
          BaseCrudService.getAll<ProjectAmenities>('projectamenities'),
          BaseCrudService.getAll<GatedLivingBenefits>('gatedlivingbenefits'),
          BaseCrudService.getAll<InvestmentHighlights>('investmenthighlights'),
        ]);

        setLegalApprovals(legal.items.filter(item => item.isVerified));
        setPlotConfigs(plots.items.sort((a, b) => (a.areaSqFt || 0) - (b.areaSqFt || 0)));
        setInfrastructure(infra.items.filter(item => item.isAvailable).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setAmenities(amen.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setGatedBenefits(gated.items.filter(item => item.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setInvestmentHighlights(investment.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setTimeout(() => {
          setShowLoader(false);
        }, 2200);
      }
    };

    fetchData();
  }, []);

  // Auto-open contact form after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContactModalOpen(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-old-lace text-soft-charcoal min-h-screen overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {showLoader && <Loader />}
      
      <AnimatePresence>
        {!showLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Header onOpenContactForm={() => setIsContactModalOpen(true)} />

            <ContactFormModal 
              isOpen={isContactModalOpen} 
              onClose={() => setIsContactModalOpen(false)} 
            />

            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <HeroSection onOpenContactForm={() => setIsContactModalOpen(true)} />
              <ProjectOverviewSection onOpenContactForm={() => setIsContactModalOpen(true)} />
              <PlotConfigurationsSection plotConfigs={plotConfigs} onOpenContactForm={() => setIsContactModalOpen(true)} />
              <LocationSection onOpenContactForm={() => setIsContactModalOpen(true)} />
              <InvestmentSection investmentHighlights={investmentHighlights} onOpenContactForm={() => setIsContactModalOpen(true)} />
              <Amenities3DSection amenities={amenities} />
              <GatedLivingSection gatedBenefits={gatedBenefits} onOpenContactForm={() => setIsContactModalOpen(true)} />
              <InfrastructureSection infrastructure={infrastructure} onOpenContactForm={() => setIsContactModalOpen(true)} />
              <LegalSection legalApprovals={legalApprovals} onOpenContactForm={() => setIsContactModalOpen(true)} />
              <FinalCTASection onOpenContactForm={() => setIsContactModalOpen(true)} />
              <Footer />
            </motion.main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sections ---

const HeroSection = ({ onOpenContactForm }: { onOpenContactForm: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      id="overview"
      className="relative w-full min-h-screen overflow-hidden bg-old-lace"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen"
      >
        {/* LEFT: MASTERPLAN / HERO IMAGE */}
        <div className="relative h-[50vh] sm:h-[55vh] lg:h-auto order-1 lg:order-1">
          <Image 
            src="/hero-bg.png" 
            alt="Symphony Heights Tower - Boutique Community" 
            className="absolute inset-0 w-full h-full object-cover object-bottom" 
          />

          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

          {/* Subtle brand mark */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white/90 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold">
            Boutique Community • Hennur
          </div>
        </div>

        {/* RIGHT: CONTENT PANEL */}
        <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16 xl:px-20 bg-white order-2 lg:order-2">
          <div className="max-w-xl w-full text-left">
            
            {/* Badge */}
            <CinematicReveal delay={0.2}>
              <span className="inline-block mb-4 sm:mb-6 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs tracking-wider uppercase font-semibold">
                Boutique 3 BHK Residences
              </span>
            </CinematicReveal>

            {/* Heading */}
            <CinematicReveal delay={0.35}>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.18] text-soft-charcoal mb-4 sm:mb-6">
                Exclusive <span className="text-primary whitespace-nowrap">3 BHK</span> Homes
                <br />
                Starting at <span className="text-primary whitespace-nowrap">₹1.9 Cr*</span>
              </h1>
            </CinematicReveal>

            {/* Description */}
            <CinematicReveal delay={0.55}>
              <p className="font-paragraph text-sm sm:text-base md:text-lg text-muted-gray leading-relaxed mb-6 sm:mb-8 space-y-1">
                Your gateway to luxury living in Hennur, North Bangalore.
                <br />
                An intimate sanctuary of 128 boutique residences across a 1 Acre canvas.
                <br />
                <span className="text-primary font-semibold">
                  Grade-A Development by Disha Properties
                </span>
              </p>
            </CinematicReveal>

            {/* Feature checklist */}
            <CinematicReveal delay={0.75}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-4 sm:gap-x-6 mb-8 sm:mb-10">
                {[
                  'Boutique Scale (128 Units)',
                  'Flexi Payment Plan 25:25:25:25',
                  '3 Tiers of Curated Amenities',
                  'Rooftop Infinity Lap Pool',
                  'Karnataka RERA Approved',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 sm:gap-3">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0 font-bold">
                      ✓
                    </span>
                    <span className="font-paragraph text-xs sm:text-sm md:text-base text-soft-charcoal font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </CinematicReveal>

            {/* CTA */}
            <CinematicReveal delay={0.95} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90
                           px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-semibold
                           transition-all duration-300 hover:scale-[1.02] shadow-md w-full sm:w-auto cursor-pointer"
                onClick={onOpenContactForm}
              >
                Schedule Visit
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary
                           hover:bg-pale-sage/20
                           px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-semibold w-full sm:w-auto cursor-pointer"
                onClick={() =>
                  document.getElementById('plots')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View Floor Plans
              </Button>
            </CinematicReveal>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-primary/70 font-semibold">
          Scroll
        </span>
        <motion.div
          animate={{ height: [18, 36, 18] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px bg-primary/60"
        />
      </motion.div>
    </section>
  );
};

const ProjectOverviewSection = ({ onOpenContactForm }: { onOpenContactForm: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  
  return (
    <section id="about" ref={ref} className="py-16 sm:py-24 md:py-32 bg-warm-beige relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-primary/15">
          {[
            { value: "128", label: "Boutique Residences", suffix: "" },
            { value: "1.9", label: "Starting Price", suffix: " Cr*" },
            { value: "100", label: "Vastu Compliant", suffix: "%" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warm-espresso font-bold mb-2 sm:mb-3 leading-none"
              >
                {stat.value}{stat.suffix}
              </motion.div>
              <div className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.18em] text-primary font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 md:mt-24 max-w-3xl mx-auto text-center">
          <CinematicReveal>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-warm-espresso leading-relaxed font-normal">
              Introducing <strong className="font-bold text-primary">Symphony Heights</strong> by Disha Properties. A thoughtfully conceived boutique community in Hennur, North Bangalore, offering low density, three levels of lifestyle amenities, and exceptional capital appreciation.
            </p>
          </CinematicReveal>
        </div>
      </div>
    </section>
  );
};

const PlotConfigurationsSection = ({ 
  plotConfigs,
  onOpenContactForm 
}: { 
  plotConfigs: PlotConfigurations[],
  onOpenContactForm: () => void 
}) => {
  return (
    <section id="plots" className="py-16 sm:py-24 md:py-32 bg-old-lace">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 md:mb-20">
          <div>
            <CinematicReveal>
              <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.18em] text-primary block mb-2 sm:mb-3 font-semibold">
                Configurations
              </span>
            </CinematicReveal>
            <CinematicReveal delay={0.1}>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-soft-charcoal font-bold leading-tight">
                Curated 3 BHK Residences
              </h2>
            </CinematicReveal>
          </div>
          <CinematicReveal delay={0.2} className="mt-4 md:mt-0">
            <p className="font-paragraph text-sm sm:text-base text-muted-gray max-w-md leading-relaxed">
              Meticulously planned layouts with expansive living rooms, private balconies, and zero space wastage.
            </p>
          </CinematicReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {plotConfigs.map((plot, i) => (
            <CinematicReveal key={plot._id || i} delay={i * 0.15}>
              <div className="group relative bg-white border border-primary/10 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-xl flex flex-col justify-between h-full">
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-paragraph text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                        {plot.dimensions || '3 BHK Layout'}
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl text-soft-charcoal font-bold leading-tight">
                        {plot.plotName}
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-pale-sage/30 text-warm-espresso font-paragraph text-xs font-semibold rounded-full uppercase tracking-wider">
                      {plot.availabilityStatus || 'Available'}
                    </span>
                  </div>

                  {plot.plotImage && (
                    <div className="aspect-[4/3] bg-old-lace rounded-xl overflow-hidden mb-6 flex items-center justify-center p-4">
                      <Image
                        src={plot.plotImage}
                        alt={plot.plotName || 'Floor plan'}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  <p className="font-paragraph text-sm sm:text-base text-muted-gray leading-relaxed mb-6">
                    {plot.description}
                  </p>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <Button
                    className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl py-3.5 font-paragraph font-semibold transition-all duration-300 cursor-pointer text-sm sm:text-base"
                    onClick={onOpenContactForm}
                  >
                    Get Layout Blueprint & Pricing
                  </Button>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationSection = ({ onOpenContactForm }: { onOpenContactForm: () => void }) => {
  return (
    <section id="location" className="py-16 sm:py-24 md:py-32 bg-warm-beige">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 space-y-6">
            <CinematicReveal>
              <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.18em] text-primary block font-semibold">
                Connectivity & Growth
              </span>
            </CinematicReveal>

            <CinematicReveal delay={0.1}>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-warm-espresso font-bold leading-tight">
                Strategic Hennur Corridor
              </h2>
            </CinematicReveal>

            <CinematicReveal delay={0.2}>
              <p className="font-paragraph text-sm sm:text-base md:text-lg text-warm-espresso/85 leading-relaxed">
                Located in the rapid-growth corridor of Hennur, North Bangalore, Symphony Heights offers the perfect equilibrium between tech park connectivity and natural serenity.
              </p>
            </CinematicReveal>

            {/* Commute Cards */}
            <div className="space-y-3 pt-2">
              {locationsData.map((dest, idx) => (
                <CinematicReveal key={dest.id} delay={0.3 + idx * 0.1}>
                  <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur rounded-xl border border-primary/10 shadow-sm">
                    <div>
                      <span className="font-heading text-base font-bold text-soft-charcoal block">
                        {dest.name}
                      </span>
                      <span className="font-paragraph text-xs text-muted-gray uppercase tracking-wider">
                        Distance: {dest.distance}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-2xl font-bold text-primary block leading-tight">
                        {dest.times.driving}
                      </span>
                      <span className="font-paragraph text-[10px] text-muted-gray uppercase tracking-wider block">
                        Mins Drive
                      </span>
                    </div>
                  </div>
                </CinematicReveal>
              ))}
            </div>

            <CinematicReveal delay={0.6}>
              <Button
                className="bg-primary text-white hover:bg-primary/90 px-8 py-3.5 rounded-xl text-sm sm:text-base font-paragraph font-semibold mt-2 cursor-pointer shadow-md"
                onClick={onOpenContactForm}
              >
                Schedule Site Visit
              </Button>
            </CinematicReveal>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-7 h-[400px] sm:h-[480px] lg:h-[560px] rounded-2xl overflow-hidden shadow-xl border border-primary/20">
            <iframe
              src="https://maps.google.com/maps?q=Hennur%20Bagalur%20Road%2C%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Symphony Heights Location Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const InvestmentSection = ({ 
  investmentHighlights,
  onOpenContactForm 
}: { 
  investmentHighlights: InvestmentHighlights[],
  onOpenContactForm: () => void 
}) => {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-old-lace">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <CinematicReveal>
            <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.18em] text-primary block mb-3 font-semibold">
              Investment Potential
            </span>
          </CinematicReveal>
          <CinematicReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-soft-charcoal font-bold leading-tight">
              A High-Yield Grade-A Asset
            </h2>
          </CinematicReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {investmentHighlights.map((inv, idx) => (
            <CinematicReveal key={inv._id || idx} delay={idx * 0.1}>
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-primary/10 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <span className="font-mono text-primary text-xs uppercase tracking-widest block mb-3 font-semibold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-soft-charcoal mb-3 leading-snug">
                    {inv.highlightTitle}
                  </h3>
                  <p className="font-paragraph text-xs sm:text-sm text-muted-gray leading-relaxed mb-4">
                    {inv.highlightQuote}
                  </p>
                </div>
                {inv.emphasizedPhrase && (
                  <div className="pt-4 border-t border-primary/10 text-xs font-semibold text-primary font-paragraph">
                    {inv.emphasizedPhrase}
                  </div>
                )}
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const GatedLivingSection = ({ 
  gatedBenefits,
  onOpenContactForm 
}: { 
  gatedBenefits: GatedLivingBenefits[],
  onOpenContactForm: () => void 
}) => {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-warm-beige">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <CinematicReveal>
            <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.18em] text-primary block mb-3 font-semibold">
              Boutique Living
            </span>
          </CinematicReveal>
          <CinematicReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-warm-espresso font-bold leading-tight">
              Intimate Scale & Security
            </h2>
          </CinematicReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {gatedBenefits.map((benefit, idx) => (
            <CinematicReveal key={benefit._id || idx} delay={idx * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                {benefit.benefitVisual && (
                  <div className="h-44 overflow-hidden">
                    <Image
                      src={benefit.benefitVisual}
                      alt={benefit.benefitTitle || 'Gated living visual'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-heading text-lg font-bold text-soft-charcoal mb-2 leading-snug">
                    {benefit.benefitTitle}
                  </h3>
                  <p className="font-paragraph text-xs sm:text-sm text-muted-gray leading-relaxed">
                    {benefit.benefitDescription}
                  </p>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfrastructureSection = ({ 
  infrastructure,
  onOpenContactForm 
}: { 
  infrastructure: InfrastructureDetails[],
  onOpenContactForm: () => void 
}) => {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-old-lace">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <CinematicReveal>
            <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.18em] text-primary block mb-3 font-semibold">
              Engineering & Specifications
            </span>
          </CinematicReveal>
          <CinematicReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-soft-charcoal font-bold leading-tight">
              Master Infrastructure
            </h2>
          </CinematicReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {infrastructure.map((infra, idx) => (
            <CinematicReveal key={infra._id || idx} delay={idx * 0.1}>
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                {infra.featureIcon && (
                  <div className="h-40 rounded-xl overflow-hidden mb-4 bg-old-lace">
                    <Image
                      src={infra.featureIcon}
                      alt={infra.featureName || 'Infrastructure feature'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-soft-charcoal mb-2 leading-snug">
                    {infra.featureName}
                  </h3>
                  <p className="font-paragraph text-xs sm:text-sm text-muted-gray leading-relaxed">
                    {infra.featureDescription}
                  </p>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const LegalSection = ({ 
  legalApprovals,
  onOpenContactForm 
}: { 
  legalApprovals: LegalApprovals[],
  onOpenContactForm: () => void 
}) => {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-warm-beige">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <CinematicReveal>
            <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.18em] text-primary block mb-3 font-semibold">
              RERA & Sanctions
            </span>
          </CinematicReveal>
          <CinematicReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-warm-espresso font-bold leading-tight">
              100% Verified Legal Approvals
            </h2>
          </CinematicReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {legalApprovals.map((legal, idx) => (
            <CinematicReveal key={legal._id || idx} delay={idx * 0.1}>
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-pale-sage/40 text-warm-espresso rounded-full text-xs font-semibold flex items-center gap-1.5 font-paragraph">
                      <Check className="h-3.5 w-3.5 text-primary" /> Verified
                    </span>
                    <Shield className="h-5 w-5 text-primary/40" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-soft-charcoal leading-snug">
                    {legal.approvalName}
                  </h3>
                  <p className="font-paragraph text-xs sm:text-sm text-muted-gray leading-relaxed">
                    {legal.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-primary/10 text-xs font-semibold text-primary font-paragraph">
                  {legal.issuingAuthority}
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTASection = ({ onOpenContactForm }: { onOpenContactForm: () => void }) => {
  return (
    <section id="own-legacy" className="py-20 sm:py-28 md:py-36 bg-old-lace relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-warm-beige p-8 sm:p-12 md:p-16 rounded-3xl border border-primary/20 shadow-2xl text-center space-y-6">
          <CinematicReveal>
            <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.2em] text-primary block font-semibold">
              Exclusive Launch Opportunity
            </span>
          </CinematicReveal>

          <CinematicReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-soft-charcoal font-bold leading-tight">
              Begin Your Journey to <br />
              <span className="text-primary italic">Uncompromised Living</span>
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.2}>
            <p className="font-paragraph text-sm sm:text-base md:text-lg text-muted-gray max-w-2xl mx-auto leading-relaxed">
              Experience Symphony Heights in Hennur, Bangalore. Schedule an exclusive private tour with our relationship team today.
            </p>
          </CinematicReveal>

          <CinematicReveal delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3.5 rounded-xl text-base font-paragraph font-semibold transition-all duration-300 w-full sm:w-auto cursor-pointer shadow-md"
              onClick={onOpenContactForm}
            >
              Book Private Site Visit
            </Button>

            <a
              href={`tel:${projectSnapshot.phone.replace(/\s+/g, '')}`}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3.5 rounded-xl text-base font-paragraph font-semibold transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              Call {projectSnapshot.phone}
            </a>
          </CinematicReveal>
        </div>
      </div>
    </section>
  );
};
