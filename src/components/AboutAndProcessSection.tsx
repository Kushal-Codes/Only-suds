import React, { useState } from 'react';
import { ArrowRight, Check, ExternalLink, Phone } from 'lucide-react';
import { BUSINESS_INFO, recommendServiceByNeed } from '../data/servicesData';

interface AboutAndProcessSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

const NEED_OPTIONS: {
  id: 'complete' | 'interior-mess' | 'exterior-shine' | 'paint-gloss' | 'specialty-craft';
  label: string;
}[] = [
  { id: 'complete', label: 'Complete Inside & Out Detail' },
  { id: 'interior-mess', label: 'Deep Interior & Pet Hair Care' },
  { id: 'exterior-shine', label: 'Safe Hand Wash & Shine' },
  { id: 'paint-gloss', label: 'Paint Polish & Decontamination' },
  { id: 'specialty-craft', label: 'Boat, Truck or Specialty Vehicle' },
];

export const AboutAndProcessSection: React.FC<AboutAndProcessSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [selectedNeed, setSelectedNeed] = useState<
    'complete' | 'interior-mess' | 'exterior-shine' | 'paint-gloss' | 'specialty-craft'
  >('complete');

  const recommended = recommendServiceByNeed(selectedNeed);

  return (
    <section
      id="about"
      className="py-16 sm:py-24 bg-[#060911] text-white border-b border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left 6 Columns: Authentic About Story & Verified Brand Identity */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-2">
                About {BUSINESS_INFO.name}
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Showroom Shine Brought Straight to Your Driveway.
              </h2>

              <p className="text-base text-slate-300 leading-relaxed mb-4">
                <strong className="text-white font-semibold">{BUSINESS_INFO.name}</strong> is
                an Austin, Texas mobile auto detailing business owned and operated by{' '}
                <strong className="text-white font-semibold">{BUSINESS_INFO.ownerName}</strong>.
                We bring professional interior cleaning, safe exterior hand washing, and
                specialty detailing directly to your home or workplace.
              </p>

              <blockquote className="p-5 rounded-xl bg-[#0B101E] border border-slate-800 text-slate-200 text-sm sm:text-base italic mb-6">
                “{BUSINESS_INFO.verifiedFacebookBio}”
                <footer className="not-italic text-xs text-[#60A5FA] font-semibold mt-2">
                  — {BUSINESS_INFO.name} · Official Facebook Profile ({BUSINESS_INFO.serviceAreaPrimary})
                </footer>
              </blockquote>

              <div className="space-y-2.5 mb-8">
                <div className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Owner-Operated Care:</strong> Direct
                    scheduling and quality oversight with {BUSINESS_INFO.ownerName}.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Verified Service Scope:</strong>{' '}
                    {BUSINESS_INFO.verifiedCategories.join(' · ')}.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Driveway Convenience:</strong> Serving
                    customers across {BUSINESS_INFO.serviceAreaDescription}.
                  </span>
                </div>
              </div>
            </div>

            {/* Official Logo & Business Card Verification Box */}
            <div className="p-5 rounded-xl bg-[#0B101E] border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
              <img
                src={BUSINESS_INFO.officialLogoImage}
                alt={`${BUSINESS_INFO.name} official logo`}
                referrerPolicy="no-referrer"
                className="w-28 h-20 object-contain rounded-lg bg-white p-2 shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-semibold text-[#60A5FA] mb-0.5">
                  Verified Business Profile
                </p>
                <p className="font-display text-base font-bold text-white">
                  {BUSINESS_INFO.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Owner: {BUSINESS_INFO.ownerName} · Call/Text {BUSINESS_INFO.phoneDisplay}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <a
                    href={BUSINESS_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#60A5FA] hover:text-white transition-colors"
                  >
                    <span>Official Facebook Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-slate-600" aria-hidden="true">
                    ·
                  </span>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors tabular-nums"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Visual + Interactive Service Recommender */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 h-64 sm:h-72 bg-slate-950">
              <img
                src="/assets/onlysuds/pexels-6873007.jpg"
                alt="Detailer working alongside a glossy black vehicle in a dark detailing bay"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/30 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#60A5FA]">
                    Austin, TX Mobile Detailing
                  </p>
                  <p className="font-display text-lg font-bold text-white">
                    Professional Care for Daily Drivers, Trucks &amp; Boats
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Service Recommender */}
            <div className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#60A5FA] mb-1">
                  Not Sure Which Service to Choose?
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3">
                  Select Your Primary Goal:
                </h3>

                <div className="flex flex-wrap gap-2 mb-5">
                  {NEED_OPTIONS.map((option) => {
                    const active = selectedNeed === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedNeed(option.id)}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#2563EB] border-[#3B82F6] text-white'
                            : 'bg-[#060911] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#060911] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#60A5FA] font-semibold">
                    Recommended Service · {recommended.categoryLabel}
                  </p>
                  <p className="font-display text-base font-bold text-white mt-0.5">
                    {recommended.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{recommended.idealFor}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectServiceForBooking(recommended.id)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                >
                  <span>Select &amp; Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
