import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  MessageSquare,
  Minus,
} from 'lucide-react';
import {
  SERVICES_DATA,
  PACKAGE_COMPARISON_ROWS,
  ServiceCategory,
  filterServicesByCategory,
} from '../data/servicesData';

interface PackagesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

const CATEGORY_TABS: { id: ServiceCategory; label: string }[] = [
  { id: 'all', label: 'All Services (6)' },
  { id: 'packages', label: 'Complete Packages' },
  { id: 'interior', label: 'Interior Care' },
  { id: 'exterior', label: 'Exterior & Paint' },
  { id: 'specialty', label: 'Specialty & Marine' },
];

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [showComparison, setShowComparison] = useState<boolean>(true);

  const visibleServices = filterServicesByCategory(selectedCategory);

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-[#060911] text-white border-b border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-2">
              Mobile Detailing Menu · Austin, TX
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
              style={{ textWrap: 'balance' }}
            >
              Choose Your Detail.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Find the right level of care for your vehicle. Every service is brought straight
              to your driveway and tailored to your vehicle’s size and condition.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter detailing services by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0B101E] border border-slate-800 rounded-lg self-start"
          >
            {CATEGORY_TABS.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {visibleServices.map((service, idx) => {
            const isFeatured = service.id === 'full-driveway-detail' && idx === 0;
            const isExpanded = !!expandedCards[service.id];
            const visibleInclusions = isExpanded
              ? service.inclusions
              : service.inclusions.slice(0, 5);
            const hiddenCount = service.inclusions.length - 5;

            return (
              <article
                key={service.id}
                className={`flex flex-col rounded-xl overflow-hidden transition-colors ${
                  isFeatured
                    ? 'bg-[#0D1528] border border-[#3B82F6]/60'
                    : 'bg-[#0B101E] border border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Card Photograph */}
                <div className="relative h-52 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0B101E] via-black/25 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200 font-medium">
                    <span>
                      {service.code} · {service.categoryLabel}
                    </span>
                    <span className="text-[#60A5FA]">Mobile Service</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-bold text-white tracking-tight mb-2">
                    {service.name}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Pricing & Duration Row (never fabricates unverified numbers) */}
                  <div className="py-3 px-3.5 rounded-lg bg-[#060911]/90 border border-slate-800/90 mb-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs text-slate-400 shrink-0">Pricing</span>
                      <span className="text-xs sm:text-sm font-bold text-[#60A5FA] text-right">
                        {service.verifiedPrice ?? service.pricingModelLabel}
                      </span>
                    </div>
                    {service.verifiedDuration && (
                      <div className="flex items-baseline justify-between gap-2 mt-1">
                        <span className="text-xs text-slate-400">Estimated Duration</span>
                        <span className="text-xs font-medium text-slate-200 tabular-nums">
                          {service.verifiedDuration}
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-1.5">
                      Best for: <span className="text-slate-300">{service.idealFor}</span>
                    </p>
                  </div>

                  {/* Inclusions List */}
                  <div className="flex-1 mb-6">
                    <p className="text-xs font-semibold text-slate-300 mb-2.5">
                      Included Care ({service.inclusions.length} steps)
                    </p>
                    <ul className="space-y-2">
                      {visibleInclusions.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                        >
                          <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {hiddenCount > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleCard(service.id)}
                        aria-expanded={isExpanded}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#60A5FA] hover:text-white transition-colors cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <span>Show fewer steps</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Show all {service.inclusions.length} included steps</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2.5 mt-auto">
                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(service.id)}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isFeatured
                          ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                          : 'bg-[#1E293B] hover:bg-[#2563EB] text-white'
                      }`}
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={`sms:+19794515519?body=${encodeURIComponent(
                        `Hi Brice at OnlySuds Mobile Detailing, I'd like a quote for ${service.name}.`
                      )}`}
                      aria-label={`Text OnlySuds Mobile Detailing about ${service.name}`}
                      className="inline-flex items-center justify-center px-3 py-3 text-xs font-semibold text-slate-200 bg-[#060911] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Packages Comparison Matrix Anchor (#packages) */}
        <div
          id="packages"
          className="bg-[#0B101E] border border-slate-800 rounded-xl p-6 sm:p-8 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <p className="text-xs font-semibold text-[#60A5FA] mb-1">
                Core Package Breakdown
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Compare Exterior, Interior &amp; Full Detailing Packages
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                See how our three most requested driveway packages compare side by side.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowComparison((prev) => !prev)}
              aria-expanded={showComparison}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 bg-[#060911] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>{showComparison ? 'Hide Comparison Table' : 'Show Comparison Table'}</span>
              {showComparison ? (
                <ChevronUp className="w-4 h-4 text-[#60A5FA]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#60A5FA]" />
              )}
            </button>
          </div>

          {showComparison && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-800 text-xs sm:text-sm text-slate-300">
                    <th className="py-3.5 pr-4 font-semibold">Detailing Care Step</th>
                    <th className="py-3.5 px-4 font-semibold text-center">
                      Exterior Foam Wash
                    </th>
                    <th className="py-3.5 px-4 font-semibold text-center">
                      Interior Revival
                    </th>
                    <th className="py-3.5 pl-4 font-semibold text-center text-[#60A5FA]">
                      Full Interior &amp; Exterior
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-xs sm:text-sm">
                  {PACKAGE_COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 pr-4 text-slate-200 font-medium">{row.feature}</td>
                      <td className="py-3.5 px-4 text-center">
                        {row.exteriorWash ? (
                          <span className="inline-flex items-center justify-center text-[#3B82F6]">
                            <Check className="w-4 h-4" aria-label="Included" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center text-slate-600">
                            <Minus className="w-4 h-4" aria-label="Not included" />
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {row.interiorRevival ? (
                          <span className="inline-flex items-center justify-center text-[#3B82F6]">
                            <Check className="w-4 h-4" aria-label="Included" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center text-slate-600">
                            <Minus className="w-4 h-4" aria-label="Not included" />
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 pl-4 text-center bg-[#2563EB]/5">
                        {row.fullDetail ? (
                          <span className="inline-flex items-center justify-center text-[#60A5FA]">
                            <Check className="w-4 h-4" aria-label="Included" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center text-slate-600">
                            <Minus className="w-4 h-4" aria-label="Not included" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
