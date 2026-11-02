import React, { useState } from 'react';
import { ArrowRight, Check, Phone, MessageSquare, MapPin } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/servicesData';

interface HeroSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

const QUICK_SELECTOR_TABS = [
  { id: 'full-driveway-detail', shortLabel: 'Full Detail' },
  { id: 'interior-deep-revival', shortLabel: 'Interior Revival' },
  { id: 'exterior-wash-shine', shortLabel: 'Exterior Wash' },
  { id: 'paint-enhancement-polish', shortLabel: 'Paint Polish' },
  { id: 'wheel-tire-trim-care', shortLabel: 'Wheels & Trim' },
  { id: 'specialty-aircraft-boat-auto', shortLabel: 'Boat & Specialty' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectServiceForBooking }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);
  const activeService =
    SERVICES_DATA.find((s) => s.id === selectedServiceId) ?? SERVICES_DATA[0];

  return (
    <section
      id="home"
      className="relative bg-[#060911] text-white overflow-hidden border-b border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Background image with dark automotive contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={BUSINESS_INFO.heroImage}
          alt="Glossy black luxury vehicle front grille and headlight in dark detailing bay"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#060911] via-[#060911]/90 to-[#060911]/70"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#060911] via-transparent to-[#060911]/60"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-[#60A5FA] tracking-wide mb-4">
              {BUSINESS_INFO.name} · {BUSINESS_INFO.serviceAreaPrimary} &amp; Surrounding Areas
            </p>

            <h1
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.08] mb-4"
              style={{ textWrap: 'balance' }}
            >
              A Cleaner Ride.{' '}
              <span className="text-[#3B82F6]">A Deeper Shine.</span>
            </h1>

            <p className="font-display text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-4">
              Mobile Detailing, Done Right.
            </p>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-4">
              Give your vehicle the care it deserves with professional detailing services
              brought directly to you.{' '}
              <span className="text-slate-200 font-medium">
                “{BUSINESS_INFO.verifiedFacebookBio}”
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-400 mb-8">
              <span>Owner-Operated by {BUSINESS_INFO.ownerName}</span>
              <span aria-hidden="true">·</span>
              <span>Auto, Truck, SUV &amp; Boat Care</span>
              <span aria-hidden="true">·</span>
              <span>Driveway &amp; Workplace Service</span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 mb-10">
              <button
                type="button"
                onClick={() => onSelectServiceForBooking(activeService.id)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg shadow-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                <span>Book Your Detail</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explore Services</span>
              </a>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#3B82F6]" />
                <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Verified Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-slate-800/90 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>Showroom shine brought straight to your driveway</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>Interior deep cleans, pet hair &amp; stain care</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>Swirl-conscious hand washes &amp; paint gloss care</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>Direct quotes via call, text, email, or Facebook</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Service Explorer & Instant Quote Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-[#0B101E] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-[#60A5FA] tracking-wide">
                  Interactive Service Preview
                </span>
                <span className="text-xs text-slate-400 tabular-nums">
                  {SERVICES_DATA.length} service options
                </span>
              </div>

              <h2 className="font-display text-lg sm:text-xl font-bold text-white mb-1.5">
                Preview Care &amp; Request a Quote
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-4">
                Select a detailing service below to inspect what is included and start your
                driveway quote.
              </p>

              {/* 6-button 3x2 grid selector */}
              <div
                role="tablist"
                aria-label="Quick service preview selector"
                className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1.5 bg-[#060911] border border-slate-800/90 rounded-lg mb-4"
              >
                {QUICK_SELECTOR_TABS.map((tab) => {
                  const isSelected = activeService.id === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedServiceId(tab.id)}
                      className={`px-2.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
                        isSelected
                          ? 'bg-[#2563EB] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {tab.shortLabel}
                    </button>
                  );
                })}
              </div>

              {/* Active Service Preview Panel */}
              <div className="bg-[#060911]/90 border border-slate-800 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-xs text-[#60A5FA] font-medium mb-0.5">
                      {activeService.code} · {activeService.categoryLabel}
                    </p>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white">
                      {activeService.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-medium text-slate-300 mb-2.5">
                  Pricing: <span className="text-[#60A5FA]">{activeService.pricingModelLabel}</span>
                </p>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
                  {activeService.shortDescription}
                </p>

                <ul className="space-y-1.5 mb-2">
                  {activeService.inclusions.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <Check className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {activeService.inclusions.length > 4 && (
                  <p className="text-xs text-slate-400 pl-5">
                    + {activeService.inclusions.length - 4} more included care steps
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectServiceForBooking(activeService.id)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{activeService.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`sms:+19794515519?body=${encodeURIComponent(
                    `Hi Brice at OnlySuds Mobile Detailing, I'd like a quote for ${activeService.name}.`
                  )}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
                  <span>Text Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Verified Bar Below Hero Split */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-medium text-[#60A5FA] mb-1">Service Area</p>
            <p className="text-sm font-semibold text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#3B82F6] shrink-0" />
              <span>{BUSINESS_INFO.serviceAreaDescription}</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#60A5FA] mb-1">Direct Call or Text</p>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors tabular-nums"
            >
              {BUSINESS_INFO.phoneDisplay} ({BUSINESS_INFO.ownerName})
            </a>
          </div>
          <div>
            <p className="text-xs font-medium text-[#60A5FA] mb-1">Vehicle Capabilities</p>
            <p className="text-sm font-semibold text-white">
              Auto Detailing · Trucks &amp; SUVs · Boats
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#60A5FA] mb-1">Official Email</p>
            <a
              href={BUSINESS_INFO.emailHref}
              className="text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors break-all"
            >
              {BUSINESS_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
