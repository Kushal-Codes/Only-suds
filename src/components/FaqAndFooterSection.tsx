import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { BUSINESS_INFO, FAQ_ITEMS, SERVICES_DATA } from '../data/servicesData';

interface FaqAndFooterSectionProps {
  onBookClick: (serviceId?: string) => void;
}

export const FaqAndFooterSection: React.FC<FaqAndFooterSectionProps> = ({
  onBookClick,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* FAQ Accordion Section */}
      <section
        id="faq"
        className="py-16 sm:py-24 bg-[#060911] text-white border-b border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-2">
              Frequently Asked Questions
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
              style={{ textWrap: 'balance' }}
            >
              Everything You Need to Know Before Booking.
            </h2>
            <p className="text-base text-slate-300">
              Clear answers about our mobile detailing services, custom vehicle quotes, and
              Austin-area coverage.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border transition-colors ${
                    isOpen
                      ? 'bg-[#0B101E] border-[#3B82F6]/60'
                      : 'bg-[#090E1A] border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-display text-base sm:text-lg font-bold text-white cursor-pointer"
                    >
                      <span>{item.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#60A5FA] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={`faq-panel-${item.id}`}
                      className="px-5 pb-5 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/70 pt-3.5"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 sm:py-24 bg-[#090E1A] text-white border-b border-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/15 via-transparent to-[#060911]"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-3">
            {BUSINESS_INFO.name} · {BUSINESS_INFO.serviceAreaPrimary}
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Your Car Deserves That Freshly Detailed Feeling.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Choose your service and get started with {BUSINESS_INFO.name}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onBookClick()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg shadow-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Book Your Detail</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={BUSINESS_INFO.phoneHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base font-semibold text-white bg-[#060911] hover:bg-slate-900 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-[#3B82F6]" />
              <span>Contact Us ({BUSINESS_INFO.phoneDisplay})</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#05070E] text-slate-400 pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <a
                href="#home"
                className="font-display text-xl font-extrabold text-white tracking-tight inline-block mb-3"
              >
                {BUSINESS_INFO.name}
              </a>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {BUSINESS_INFO.verifiedFacebookBio}
              </p>
              <p className="text-xs text-slate-500">
                Owner &amp; Operator: {BUSINESS_INFO.ownerName} · {BUSINESS_INFO.serviceAreaPrimary}
              </p>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-semibold text-white tracking-wide mb-3.5">
                Navigation
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#packages" className="hover:text-white transition-colors">
                    Packages
                  </a>
                </li>
                <li>
                  <a href="#results" className="hover:text-white transition-colors">
                    Results
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-white transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold text-white tracking-wide mb-3.5">
                Detailing Services
              </h3>
              <ul className="space-y-2 text-sm">
                {SERVICES_DATA.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => onBookClick(service.id)}
                      className="text-left hover:text-white transition-colors cursor-pointer"
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Contact & Social Links Column */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold text-white tracking-wide mb-3.5">
                Contact &amp; Booking
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>Call / Text: {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={BUSINESS_INFO.emailHref}
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>{BUSINESS_INFO.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={BUSINESS_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                  >
                    <span>Facebook: {BUSINESS_INFO.facebookHandle}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#60A5FA]" />
                  </a>
                </li>
                <li>
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                  >
                    <span>Instagram: {BUSINESS_INFO.instagramHandle}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#60A5FA]" />
                  </a>
                </li>
              </ul>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => onBookClick()}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
            </p>
            <p>
              Serving {BUSINESS_INFO.serviceAreaDescription} · Mobile Auto, Truck &amp; Boat
              Detailing
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
