import React from 'react';
import { ArrowRight, Phone, Check } from 'lucide-react';
import {
  BUSINESS_INFO,
  WHY_CHOOSE_ITEMS,
  HOW_IT_WORKS_STEPS,
} from '../data/servicesData';

interface WhyChooseSectionProps {
  onBookClick: (serviceId?: string) => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onBookClick }) => {
  return (
    <section
      id="why-onlysuds"
      className="py-16 sm:py-24 bg-[#060911] text-white border-b border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Part 1: Why Choose OnlySuds Mobile Detailing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-2">
              Why Drivers Choose {BUSINESS_INFO.name}
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Convenient Mobile Care Without Cutting Corners.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed mb-6">
              {BUSINESS_INFO.name} brings dedicated interior and exterior detailing right to
              your driveway in {BUSINESS_INFO.serviceAreaPrimary}. Every appointment is
              focused on thorough cleaning, safe wash methods, and clear communication from
              start to finish.
            </p>

            <div className="p-5 rounded-xl bg-[#0B101E] border border-slate-800 mb-6">
              <p className="text-xs font-semibold text-[#60A5FA] mb-2">
                Verified Service Categories
              </p>
              <ul className="space-y-2">
                {BUSINESS_INFO.verifiedCategories.map((cat) => (
                  <li key={cat} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <Check className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onBookClick()}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Book Your Detail</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-200 bg-[#0B101E] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#3B82F6]" />
                <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right 7 Columns: 2x2 Editorial Numbered Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-[#0B101E] border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[#60A5FA] tabular-nums block mb-3">
                    {item.number}. Verified Advantage
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: How It Works — 3-Step Customer Journey */}
        <div className="pt-14 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-2">
                Simple Driveway Scheduling
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                How It Works
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Getting your vehicle detailed at home or work in Austin takes three straightforward
              steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-xl bg-[#0B101E] border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-[#60A5FA] tabular-nums">
                      {item.step} — Step
                    </span>
                    <span className="text-xs text-slate-400">Mobile Detailing</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                    {item.step} — {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
