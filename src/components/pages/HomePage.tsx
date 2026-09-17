// Premium Light Theme - Symphony Heights (Meenakshi Structure)
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import {
  PlotConfigurations,
  ProjectAmenities,
} from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, ArrowRight, Check, Lock, TrendingUp, Sparkles, Target, Shield, Zap, Award, BarChart3, Download, ZoomIn, X } from 'lucide-react';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import Amenities3DSection from '@/components/Amenities3DCard';
import ContactFormModal from '@/components/ContactFormModal';
import Header from '@/components/Header';
import { projectSnapshot, locationsData, floorPlansData, FloorPlanUnit } from '@/lib/data';

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

const defaultAmenities: ProjectAmenities[] = [
  {
    _id: 'amenity-1',
    amenityName: 'Ground Level',
    description: '',
    galleryImage: '/ground2.webp',
    category: 'Ground Level',
    displayOrder: 1,
  },
  {
    _id: 'amenity-2',
    amenityName: 'Podium Level',
    description: '',
    galleryImage: '/podium2.webp',
    category: 'Podium Level',
    displayOrder: 2,
  },
  {
    _id: 'amenity-3',
    amenityName: 'Rooftop Level',
    description: '',
    galleryImage: '/roof5.webp',
    category: 'Rooftop Level',
    displayOrder: 3,
  },
];

const defaultPlotConfigs: PlotConfigurations[] = [
  {
    _id: 'plan-1',
    plotName: '3 BHK Home',
    dimensions: '1818 SQ.FT. SBUA',
    areaSqFt: 1818,
    description: '',
    availabilityStatus: 'Available',
    plotImage: '/unit-402.webp',
  },
];

export default function HomePage() {
  const [plotConfigs, setPlotConfigs] = useState<PlotConfigurations[]>(defaultPlotConfigs);
  const [amenities, setAmenities] = useState<ProjectAmenities[]>(defaultAmenities);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFloorPlansUnlocked, setIsFloorPlansUnlocked] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem('symphony_floorplans_unlocked') === 'true') {
        setIsFloorPlansUnlocked(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUnlockSuccess = () => {
    setIsFloorPlansUnlocked(true);
    try {
      localStorage.setItem('symphony_floorplans_unlocked', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plots, amen] = await Promise.all([
          BaseCrudService.getAll<PlotConfigurations>('plotconfigurations'),
          BaseCrudService.getAll<ProjectAmenities>('projectamenities'),
        ]);

        if (plots?.items?.length) {
          setPlotConfigs(plots.items.sort((a, b) => (a.areaSqFt || 0) - (b.areaSqFt || 0)));
        }
        if (amen?.items?.length) {
          setAmenities(amen.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  // Auto-open contact form after 10 seconds (non-intrusive)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContactModalOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-old-lace text-soft-charcoal min-h-screen overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <div className="w-full">
        <Header onOpenContactForm={() => setIsContactModalOpen(true)} />

        <ContactFormModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
          onSuccess={handleUnlockSuccess}
        />

        <main className="pb-14 md:pb-0">
          <HeroSection onOpenContactForm={() => setIsContactModalOpen(true)} />
          <ProjectOverviewSection onOpenContactForm={() => setIsContactModalOpen(true)} />
          <MasterPlanSection onOpenContactForm={() => setIsContactModalOpen(true)} />
          <Amenities3DSection amenities={amenities} />
          <PlotConfigurationsSection 
            plotConfigs={plotConfigs} 
            isUnlocked={isFloorPlansUnlocked}
            onOpenContactForm={() => setIsContactModalOpen(true)} 
          />
          <GallerySection onOpenContactForm={() => setIsContactModalOpen(true)} />
          <LocationSection onOpenContactForm={() => setIsContactModalOpen(true)} />
          <FinalCTASection onOpenContactForm={() => setIsContactModalOpen(true)} />
          <Footer />
        </main>

        {/* Mobile Sticky Bottom Action Bar (Contrasting Call & Enquire buttons) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex items-stretch shadow-[0_-4px_25px_rgba(0,0,0,0.18)] border-t border-neutral-200">
          <a
            href={`tel:${projectSnapshot.phone.replace(/\s+/g, "")}`}
            className="flex-1 py-4 px-4 bg-white hover:bg-neutral-50 active:bg-neutral-100 flex items-center justify-center gap-2 text-[#4E3D35] font-extrabold text-xs uppercase tracking-widest border-r border-neutral-200 transition-colors"
            aria-label={`Call ${projectSnapshot.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#4E3D35] fill-[#4E3D35]" />
            <span>CALL NOW</span>
          </a>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="flex-1 py-4 px-4 bg-[#4E3D35] hover:bg-[#3f3029] active:bg-[#332620] flex items-center justify-center gap-2 text-white font-extrabold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            aria-label="Enquire Now"
          >
            <span>ENQUIRE NOW</span>
          </button>
        </div>
      </div>
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
      className="relative w-full overflow-hidden bg-old-lace"
    >
      <motion.div style={{ opacity }} className="relative z-10 w-full">
        {/* ================= MOBILE HERO VIEW (Matches reference design) ================= */}
        <div className="lg:hidden flex flex-col w-full pt-16 sm:pt-20">
          {/* Top Hero Image with Overlapping Flexi Plan Box */}
          <div className="relative w-full h-[52vh] min-h-[350px] max-h-[480px]">
            <picture>
              <source media="(max-width: 1023px)" srcSet="/hero-bg-mobile.webp" type="image/webp" />
              <img 
                src="/hero-bg-mobile.webp" 
                alt="Symphony Heights Tower - Boutique Community" 
                className="w-full h-full object-cover object-bottom"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={800}
                height={533}
              />
            </picture>
            {/* Soft gradient at bottom of image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Overlapping Brown Flexi Payment Box */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[86%] max-w-[320px] bg-[#4E3D35] text-white py-3.5 px-4 shadow-xl z-20 rounded-xl border border-white/10 text-center">
              <div className="font-paragraph text-[10.5px] font-bold tracking-[0.2em] text-[#d8c8bd] uppercase">
                FLEXI PAYMENT PLAN
              </div>
              <div className="text-2xl font-heading font-extrabold leading-tight mt-0.5 tracking-wider text-white">
                25 : 25 : 25 : 25
              </div>
            </div>
          </div>

          {/* Mobile Bottom Content */}
          <div className="px-5 pt-12 pb-10 flex flex-col items-center max-w-md mx-auto w-full">
            {/* White Property Card */}
            <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm sm:text-base font-extrabold text-soft-charcoal uppercase tracking-wider font-paragraph leading-tight">
                  PREMIUM 3 BHK HOMES
                </div>
                <div className="text-xl sm:text-2xl font-heading font-extrabold text-soft-charcoal tracking-tight leading-none mt-0.5">
                  STARTING ₹ 1.9 CR*
                </div>
              </div>

              <div className="h-10 w-px bg-neutral-200 mx-3 shrink-0" />

              <div className="flex items-center gap-1.5 font-paragraph shrink-0 text-soft-charcoal">
                <MapPin className="h-4 w-4 text-soft-charcoal stroke-[2.2] shrink-0" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                  HENNUR
                </span>
              </div>
            </div>

            {/* Mobile Stacked Action Buttons */}
            <div className="w-full flex flex-col gap-3 mt-8 sm:mt-9">
              <Button
                size="lg"
                className="w-full bg-[#4E3D35] hover:bg-[#3f3029] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all cursor-pointer h-auto"
                onClick={onOpenContactForm}
              >
                <span>BOOK A SITE VISIT</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full bg-white border-[1.5px] border-[#4E3D35] text-[#4E3D35] hover:bg-[#4E3D35]/5 py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all cursor-pointer h-auto"
                onClick={onOpenContactForm}
              >
                <Download className="w-4 h-4" />
                <span>BROCHURE</span>
              </Button>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP HERO VIEW ================= */}
        <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
          {/* LEFT: HERO IMAGE */}
          <div className="relative h-full">
            <img 
              src="/hero-bg.webp" 
              alt="Symphony Heights Tower - Boutique Community" 
              className="absolute inset-0 w-full h-full object-cover object-bottom"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1920}
              height={1280}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />
          </div>

          {/* RIGHT: CONTENT PANEL */}
          <div className="flex items-center justify-center px-8 lg:px-16 xl:px-20 py-12 bg-old-lace">
            <div className="max-w-xl w-full text-left">
              {/* Heading */}
              <CinematicReveal delay={0.2}>
                <h1 className="font-heading text-3xl xl:text-5xl font-extrabold leading-[1.12] text-soft-charcoal mb-5">
                  Your First Premium Home
                  <br /> Should Never Be a
                  <br /> Compromise.
                </h1>
              </CinematicReveal>

              {/* Description */}
              <CinematicReveal delay={0.35}>
                <p className="font-paragraph text-sm md:text-base text-muted-gray leading-relaxed mb-6 max-w-lg">
                  Introducing Symphony Heights by Disha Properties—a boutique community of just 128 premium 3 BHK residences in the heart of Hennur. Designed for the perfect balance of connectivity, lifestyle, and long-term value.
                </p>
              </CinematicReveal>

              {/* Price & Payment Plan Box (Desktop) */}
              <CinematicReveal delay={0.5}>
                <div className="bg-[#4E3D35] text-white rounded-xl p-5 mb-6 max-w-xs shadow-md">
                  <span className="text-[11px] font-bold text-white/70 uppercase tracking-[0.16em] block mb-1 font-paragraph">
                    STARTING FROM
                  </span>
                  <div className="font-heading text-3xl font-extrabold text-white tracking-tight mb-2.5">
                    ₹1.9 Crore*
                  </div>
                  <div className="w-full h-px bg-white/20 mb-2.5" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-[0.16em] block mb-0.5 font-paragraph">
                    FLEXI PAYMENT PLAN
                  </span>
                  <p className="font-paragraph text-xs text-white/80">
                    Pay 25% now and nothing for 1 year
                  </p>
                </div>
              </CinematicReveal>

              {/* Desktop CTA Buttons */}
              <CinematicReveal delay={0.65} className="flex items-center gap-3.5">
                <Button
                  size="lg"
                  className="bg-[#4E3D35] text-white hover:bg-[#3f3029]
                             px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider
                             transition-all duration-300 hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  onClick={onOpenContactForm}
                >
                  <span>BOOK A SITE VISIT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border border-[#4E3D35]/30 bg-warm-beige/30 text-soft-charcoal hover:bg-warm-beige/70
                             px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider
                             transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  onClick={onOpenContactForm}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>BROCHURE</span>
                </Button>
              </CinematicReveal>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden lg:flex"
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
  return (
    <section id="about" className="py-16 sm:py-24 md:py-28 bg-warm-beige relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Paragraph & Overview */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
            <CinematicReveal>
              <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.22em] text-primary block font-semibold mb-2">
                The Intimate Scale
              </span>
            </CinematicReveal>

            <CinematicReveal delay={0.1}>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-warm-espresso font-bold leading-[1.15] mb-3">
                Boutique Living. <br className="hidden sm:inline" />
                Thoughtfully Designed.
              </h2>
            </CinematicReveal>

            <CinematicReveal delay={0.15}>
              <div className="w-16 h-[2px] bg-primary mx-auto lg:mx-0 mb-4 sm:mb-5" />
            </CinematicReveal>

            <CinematicReveal delay={0.2}>
              <p className="font-paragraph text-sm sm:text-base md:text-lg text-warm-espresso/85 leading-relaxed text-center lg:text-left">
                Introducing <strong className="font-bold text-primary">Symphony Heights</strong> by Disha Properties. A thoughtfully conceived boutique community in Hennur, North Bangalore, offering low density, three levels of lifestyle amenities, and exceptional capital appreciation.
              </p>
            </CinematicReveal>

            <CinematicReveal delay={0.3}>
              <p className="font-paragraph text-sm sm:text-base text-warm-espresso/75 leading-relaxed text-center lg:text-left">
                Luxury isn't measured by overcrowded spaces. It's reflected in intelligent planning, privacy, and refined attention to detail for an exclusive community of just 128 families.
              </p>
            </CinematicReveal>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6">
            <CinematicReveal delay={0.25}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/10 aspect-[4/3] sm:aspect-[16/11] group">
                <Image
                  src="/intimate-scale.webp"
                  alt="Symphony Heights Boutique Architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </CinematicReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const masterPlanDetails: Record<string, {
  title: string;
  tag: string;
  highlightsCol1: string[];
  highlightsCol2: string[];
}> = {
  ground: {
    title: "Ground Level Plan",
    tag: "GROUND",
    highlightsCol1: [
      "Security Cabin",
      "Vendors Waiting/Parking",
      "Feature Wall",
      "Resident Car Parking",
    ],
    highlightsCol2: [
      "Waiting Plaza (School Bus/Taxi)",
      "Entrance Plaza",
      "Seating Pavilion (Covered)",
      "Visitor Car Parking",
    ],
  },
  podium: {
    title: "Podium Level Plan",
    tag: "PODIUM",
    highlightsCol1: [
      "Lift Lobby/Reception",
      "Pre-function Space",
      "Spillover Party Deck/Party Lawn",
      "Multi-purpose Deck",
    ],
    highlightsCol2: [
      "Association Room",
      "Double Height Party Hall",
      "Indoor Games",
      "Gym",
    ],
  },
  rooftop: {
    title: "Rooftop Level Plan",
    tag: "ROOFTOP",
    highlightsCol1: [
      "Covered Walkway",
      "Double Heighted Badminton Court",
      "Seating",
      "Changing Room/Spa",
    ],
    highlightsCol2: [
      "Futsal Court",
      "Kids Play Area",
      "Play Wall",
      "Main Pool",
    ],
  },
};

const MasterPlanSection = ({ onOpenContactForm }: { onOpenContactForm: () => void }) => {
  const [activeTab, setActiveTab] = useState<string>('ground');
  const [activeBlueprintModal, setActiveBlueprintModal] = useState<FloorPlanUnit | null>(null);

  const currentPlan = floorPlansData.find((plan) => plan.id === activeTab) || floorPlansData[0];
  const levelMeta = masterPlanDetails[activeTab] || masterPlanDetails.ground;

  return (
    <section id="master-plan" className="py-16 sm:py-24 md:py-32 bg-old-lace relative scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <CinematicReveal>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-soft-charcoal font-bold leading-tight mb-3 sm:mb-4">
              Master Plan
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.1}>
            <div className="w-16 h-[2px] bg-primary mx-auto mb-4 sm:mb-5" />
          </CinematicReveal>

          <CinematicReveal delay={0.15}>
            <p className="font-paragraph text-sm sm:text-base text-muted-gray leading-relaxed max-w-2xl mx-auto">
              Meticulously designed floor plans that optimize usable space, facilitate natural breeze channels, and welcome beautiful morning sunlight.
            </p>
          </CinematicReveal>
        </div>

        {/* Modern Segmented Level Filter Tabs */}
        <CinematicReveal delay={0.25}>
          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="inline-flex p-1.5 rounded-xl sm:rounded-2xl bg-warm-beige/50 border border-primary/10 shadow-inner gap-1.5 sm:gap-2">
              {[
                { id: 'ground', label: 'GROUND' },
                { id: 'podium', label: 'PODIUM' },
                { id: 'rooftop', label: 'ROOF TOP' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2 sm:px-7 sm:py-2.5 rounded-lg sm:rounded-xl font-paragraph text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-md'
                        : 'text-soft-charcoal/80 hover:text-soft-charcoal hover:bg-white/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </CinematicReveal>

        {/* Master Plan Card */}
        <CinematicReveal delay={0.3}>
          <div className="bg-white border border-primary/15 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl max-w-5xl mx-auto transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Plan Details & Curated Highlights */}
              <div className="lg:col-span-6 space-y-5 text-left">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-soft-charcoal font-bold leading-tight">
                      {levelMeta.title}
                    </h3>
                    <span className="px-3.5 py-1 bg-[#e6ddcf] text-soft-charcoal font-paragraph text-[11px] font-bold rounded-full uppercase tracking-wider shrink-0">
                      {levelMeta.tag}
                    </span>
                  </div>

                  <div className="font-paragraph text-[11px] sm:text-xs font-bold text-primary uppercase tracking-[0.16em] mb-4 sm:mb-6">
                    SUPER BUILT-UP AREA: AMENITIES
                  </div>
                </div>

                <div className="pt-1">
                  <span className="font-paragraph text-xs font-bold text-soft-charcoal/80 uppercase tracking-[0.16em] block mb-4">
                    LAYOUT HIGHLIGHTS:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                    {/* Column 1 */}
                    <div className="space-y-3.5">
                      {levelMeta.highlightsCol1.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-soft-charcoal/90 font-paragraph">
                          <span className="w-2 h-2 rounded-full bg-[#9fb5c8] shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                    {/* Column 2 */}
                    <div className="space-y-3.5">
                      {levelMeta.highlightsCol2.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-soft-charcoal/90 font-paragraph">
                          <span className="w-2 h-2 rounded-full bg-[#9fb5c8] shrink-0" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    className="bg-primary text-white hover:bg-primary/90 rounded-xl px-6 py-3 font-paragraph font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                    onClick={onOpenContactForm}
                  >
                    Enquire Floor Plan Details
                  </Button>
                </div>
              </div>

              {/* Right Column: Blueprint Preview */}
              <div className="lg:col-span-6">
                <div className="relative bg-[#dcd3c2]/30 rounded-2xl border border-primary/10 aspect-[4/3] flex items-center justify-center p-4 sm:p-6 overflow-hidden group shadow-inner">
                  <Image
                    src={currentPlan.imageUrl}
                    alt={currentPlan.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Blueprint View Button */}
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-all flex items-center justify-center p-4">
                    <button
                      onClick={() => setActiveBlueprintModal(currentPlan)}
                      className="bg-primary hover:bg-primary/90 text-white font-paragraph text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-xl flex items-center gap-2 transform transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4" />
                      <span>VIEW BLUEPRINT</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CinematicReveal>
      </div>

      {/* High-Resolution Blueprint Modal Lightbox */}
      <AnimatePresence>
        {activeBlueprintModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveBlueprintModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-4">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-soft-charcoal">
                    {activeBlueprintModal.title}
                  </h3>
                  <span className="font-paragraph text-xs text-muted-gray uppercase tracking-wider">
                    {activeBlueprintModal.type} Level • Architectural Blueprint
                  </span>
                </div>
                <button
                  onClick={() => setActiveBlueprintModal(null)}
                  className="w-9 h-9 rounded-full bg-pale-sage/20 text-soft-charcoal hover:bg-pale-sage/40 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto bg-[#dcd3c2]/20 rounded-xl p-4 flex items-center justify-center min-h-[350px]">
                <Image
                  src={activeBlueprintModal.imageUrl}
                  alt={activeBlueprintModal.title}
                  className="max-h-[65vh] w-auto object-contain rounded-lg shadow-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-primary/10">
                <span className="font-paragraph text-xs text-muted-gray">
                  Super Built-up Area: {activeBlueprintModal.area}
                </span>
                <Button
                  className="bg-primary text-white hover:bg-primary/90 rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer w-full sm:w-auto"
                  onClick={() => {
                    setActiveBlueprintModal(null);
                    onOpenContactForm();
                  }}
                >
                  Request Full Blueprint & Pricing
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PlotConfigurationsSection = ({ 
  plotConfigs,
  isUnlocked,
  onOpenContactForm 
}: { 
  plotConfigs: PlotConfigurations[];
  isUnlocked: boolean;
  onOpenContactForm: () => void;
}) => {
  const [activePlanModal, setActivePlanModal] = useState<PlotConfigurations | null>(null);

  const handleCardAction = (plot: PlotConfigurations) => {
    if (!isUnlocked) {
      onOpenContactForm();
    } else {
      setActivePlanModal(plot);
    }
  };

  return (
    <section id="plots" className="py-16 sm:py-24 md:py-32 bg-old-lace">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <CinematicReveal>
            <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.22em] text-primary block mb-2 sm:mb-3 font-semibold">
              Configurations
            </span>
          </CinematicReveal>
          <CinematicReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-soft-charcoal font-bold leading-tight mb-3 sm:mb-4">
              Curated 3 BHK Residences
            </h2>
          </CinematicReveal>
          <CinematicReveal delay={0.15}>
            <div className="w-16 h-[2px] bg-primary mx-auto mb-4 sm:mb-5" />
          </CinematicReveal>
          <CinematicReveal delay={0.2}>
            <p className="font-paragraph text-sm sm:text-base text-muted-gray leading-relaxed max-w-2xl mx-auto">
              Meticulously planned layouts with expansive living rooms, private balconies, and zero space wastage.
            </p>
          </CinematicReveal>
        </div>

        <div className={`grid gap-6 sm:gap-8 lg:gap-10 ${plotConfigs.length === 1 ? 'max-w-2xl mx-auto grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {plotConfigs.map((plot, i) => (
            <CinematicReveal key={plot._id || i} delay={i * 0.15}>
              <div className="group relative bg-white border border-primary/10 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-xl flex flex-col justify-between h-full p-6 sm:p-7 md:p-8">
                <div>
                  <div className="mb-4 sm:mb-5">
                    <span className="font-paragraph text-sm sm:text-base font-extrabold text-primary uppercase tracking-wider block mb-1.5">
                      {plot.dimensions || '3 BHK Layout'}
                    </span>
                    <h3 className="font-heading text-3xl sm:text-4xl text-soft-charcoal font-extrabold leading-tight">
                      {plot.plotName}
                    </h3>
                  </div>

                  {plot.plotImage && (
                    <div 
                      onClick={() => handleCardAction(plot)}
                      className="relative aspect-[16/11] bg-old-lace/70 rounded-xl overflow-hidden mb-5 flex items-center justify-center p-2 sm:p-3 cursor-pointer group/image"
                    >
                      <Image
                        src={plot.plotImage}
                        alt={plot.plotName || 'Floor plan'}
                        className={`w-full h-full object-contain transition-all duration-700 ${
                          !isUnlocked 
                            ? 'blur-md filter scale-105 select-none' 
                            : 'blur-none group-hover/image:scale-105'
                        }`}
                      />

                      {/* Locked Overlay */}
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-black/45 backdrop-blur-[5px] flex flex-col items-center justify-center text-white p-4 text-center transition-all group-hover/image:bg-black/55">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center mb-2.5 shadow-lg group-hover/image:scale-110 transition-transform">
                            <Lock className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-heading text-sm sm:text-base font-bold tracking-wide mb-1">
                            Floor Plan Locked
                          </span>
                          <span className="font-paragraph text-[11px] sm:text-xs text-white/85 max-w-[220px] leading-snug">
                            Click to unlock & reveal high-resolution layout
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {plot.description && (
                    <p className="font-paragraph text-sm sm:text-base text-muted-gray leading-relaxed mb-5">
                      {plot.description}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    className={`w-full rounded-xl py-3.5 font-paragraph font-semibold transition-all duration-300 cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2 ${
                      !isUnlocked
                        ? 'bg-primary text-white hover:bg-primary/90 shadow-md'
                        : 'bg-[#4E3D35] text-white hover:bg-[#3f3029]'
                    }`}
                    onClick={() => handleCardAction(plot)}
                  >
                    {!isUnlocked ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Get Floor Plans</span>
                      </>
                    ) : (
                      <>
                        <ZoomIn className="w-4 h-4" />
                        <span>View High-Res Blueprint</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>

      {/* Unlocked Floor Plan Lightbox Modal */}
      <AnimatePresence>
        {activePlanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActivePlanModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-4">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-soft-charcoal">
                    {activePlanModal.plotName} ({activePlanModal.dimensions})
                  </h3>
                  <span className="font-paragraph text-xs text-muted-gray uppercase tracking-wider">
                    Symphony Heights • Architectural Unit Blueprint
                  </span>
                </div>
                <button
                  onClick={() => setActivePlanModal(null)}
                  className="w-9 h-9 rounded-full bg-pale-sage/20 text-soft-charcoal hover:bg-pale-sage/40 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto bg-[#dcd3c2]/20 rounded-xl p-4 flex items-center justify-center min-h-[350px]">
                {activePlanModal.plotImage && (
                  <Image
                    src={activePlanModal.plotImage}
                    alt={activePlanModal.plotName || 'Floor plan'}
                    className="max-h-[65vh] w-auto object-contain rounded-lg shadow-sm"
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-primary/10">
                <span className="font-paragraph text-xs text-muted-gray">
                  Super Built-up Area: {activePlanModal.dimensions}
                </span>
                <Button
                  className="bg-primary text-white hover:bg-primary/90 rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer w-full sm:w-auto"
                  onClick={() => {
                    setActivePlanModal(null);
                    onOpenContactForm();
                  }}
                >
                  Book Private Site Visit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const galleryImages = [
  { url: "/kitchen.webp", title: "Modern Modular Kitchen" },
  { url: "/ground3.webp", title: "Grand Arrival & Landscaped Driveway" },
  { url: "/pet-park.webp", title: "Dedicated Pet Park & Green Buffer" },
  { url: "/partyhall.webp", title: "Double-Height Celebration Hall" },
  { url: "/balcony.webp", title: "Expansive Private Balconies" },
  { url: "/building.webp", title: "Boutique Architectural Elevation" },
  { url: "/indoor-games.webp", title: "Indoor Games & Leisure Zone" },
  { url: "/cricpitch.webp", title: "Cricket Practice Pitch" },
  { url: "/roof5.webp", title: "Rooftop Sky Living & Pool Deck" },
  { url: "/building3.webp", title: "Intimate Community Living" },
];

const GallerySection = ({ onOpenContactForm }: { onOpenContactForm: () => void }) => {
  const [activeImage, setActiveImage] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-32 bg-old-lace relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 mb-10 sm:mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <CinematicReveal>
            <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.22em] text-primary block mb-2 sm:mb-3 font-semibold">
              Gallery
            </span>
          </CinematicReveal>

          <CinematicReveal delay={0.1}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-soft-charcoal font-bold leading-tight mb-3 sm:mb-4">
              Curated Spaces
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.15}>
            <div className="w-16 h-[2px] bg-primary mx-auto mb-4 sm:mb-5" />
          </CinematicReveal>

          <CinematicReveal delay={0.2}>
            <p className="font-paragraph text-sm sm:text-base text-muted-gray leading-relaxed max-w-2xl mx-auto">
              Experience the meticulously crafted interiors designed for uncompromised luxury.
            </p>
          </CinematicReveal>
        </div>
      </div>

      <style>{`
        @keyframes galleryMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-gallery-marquee {
          display: flex;
          width: max-content;
          animation: galleryMarquee 40s linear infinite;
        }
        .animate-gallery-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Continuous Smooth Scroll Marquee Strip */}
      <div className="w-full overflow-hidden relative py-2">
        <div className="animate-gallery-marquee gap-5 sm:gap-6 md:gap-8 px-4">
          {[...galleryImages, ...galleryImages].map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(img)}
              className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[390px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 relative group bg-white border border-primary/10 cursor-pointer"
            >
              <Image
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                <span className="text-white text-xs sm:text-sm font-paragraph font-medium tracking-wide">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-primary/10 pb-3 mb-3">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-soft-charcoal">
                  {activeImage.title}
                </h3>
                <button
                  onClick={() => setActiveImage(null)}
                  className="w-9 h-9 rounded-full bg-pale-sage/20 text-soft-charcoal hover:bg-pale-sage/40 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden rounded-xl bg-old-lace flex items-center justify-center min-h-[350px]">
                <Image
                  src={activeImage.url}
                  alt={activeImage.title}
                  className="max-h-[65vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-2 border-t border-primary/10">
                <Button
                  className="bg-primary text-white hover:bg-primary/90 rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  onClick={() => {
                    setActiveImage(null);
                    onOpenContactForm();
                  }}
                >
                  Schedule A Site Visit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const LocationSection = ({ onOpenContactForm }: { onOpenContactForm: () => void }) => {
  return (
    <section id="location" className="py-16 sm:py-24 md:py-32 bg-warm-beige">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <CinematicReveal>
              <span className="font-paragraph text-xs sm:text-sm uppercase tracking-[0.22em] text-primary block font-semibold mb-2">
                Connectivity & Growth
              </span>
            </CinematicReveal>

            <CinematicReveal delay={0.1}>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-warm-espresso font-bold leading-tight mb-3">
                Strategic Hennur Corridor
              </h2>
            </CinematicReveal>

            <CinematicReveal delay={0.15}>
              <div className="w-16 h-[2px] bg-primary mx-auto lg:mx-0 mb-4 sm:mb-5" />
            </CinematicReveal>

            <CinematicReveal delay={0.2}>
              <p className="font-paragraph text-sm sm:text-base md:text-lg text-warm-espresso/85 leading-relaxed text-center lg:text-left">
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
            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-soft-charcoal font-bold leading-tight tracking-tight">
              <span className="block sm:inline">Begin Your </span>
              <span className="block sm:inline">Journey to </span>
              <br className="hidden sm:block" />
              <span className="text-primary italic">
                <span className="block sm:inline">Uncompromised </span>
                <span className="block sm:inline">Living</span>
              </span>
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
              {projectSnapshot.phone}
            </a>
          </CinematicReveal>
        </div>
      </div>
    </section>
  );
};
