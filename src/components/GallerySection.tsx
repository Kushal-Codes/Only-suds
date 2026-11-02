import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, ArrowRight, Info } from 'lucide-react';
import {
  GALLERY_ITEMS,
  GalleryItem,
  filterGalleryByCategory,
  BUSINESS_INFO,
} from '../data/servicesData';

interface GallerySectionProps {
  onBookClick: (serviceId?: string) => void;
}

const GALLERY_CATEGORIES: ('All' | GalleryItem['category'])[] = [
  'All',
  'Exterior',
  'Polishing',
  'Wheels & Trim',
];

export const GallerySection: React.FC<GallerySectionProps> = ({ onBookClick }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<'All' | GalleryItem['category']>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = filterGalleryByCategory(selectedCategory);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 bg-[#090E1A] text-white border-b border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-2">
              Detailing Craft &amp; Visual Showcase
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
              style={{ textWrap: 'balance' }}
            >
              Precision Care Across Every Surface.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Explore the exterior washing, foam pre-soak, trim brush agitation, and machine
              polishing steps that go into a thorough mobile detail.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter gallery items by detailing category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#060911] border border-slate-800 rounded-lg self-start"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSelectedCategory(category);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#2563EB] text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transparent Stock Photography Notice */}
        <div className="mb-8 p-3.5 rounded-lg bg-[#060911] border border-slate-800/90 flex items-center gap-2.5 text-xs text-slate-400">
          <Info className="w-4 h-4 text-[#60A5FA] shrink-0" />
          <span>
            Gallery images below are commercial automotive detailing photographs (Pexels
            License) illustrating our detailing techniques and surface care standards.
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-[#060911] border border-slate-800/90 hover:border-[#3B82F6]/60 rounded-xl overflow-hidden flex flex-col transition-colors"
            >
              <div className="relative h-60 w-full bg-slate-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-200"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#060911] via-transparent to-transparent opacity-80"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Inspect larger image for ${item.title}`}
                  className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#060911]/90 hover:bg-[#2563EB] text-xs font-semibold text-white border border-slate-700 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#60A5FA] mb-1">
                    {item.category} · Detailing Technique
                  </p>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    {item.caption}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 pt-3 border-t border-slate-800/80">
                  {item.licenseCredit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        {activeLightboxItem && lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full bg-[#0B101E] border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-[#60A5FA]">
                    {activeLightboxItem.category} ({lightboxIndex + 1} of{' '}
                    {filteredItems.length})
                  </p>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    {activeLightboxItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close image preview"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-auto object-contain"
                />

                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex(
                          (lightboxIndex - 1 + filteredItems.length) %
                            filteredItems.length
                        )
                      }
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#060911]/90 hover:bg-[#2563EB] text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                      }
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#060911]/90 hover:bg-[#2563EB] text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-200 mb-1">
                    {activeLightboxItem.caption}
                  </p>
                  <p className="text-xs text-slate-400">
                    {activeLightboxItem.licenseCredit}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex(null);
                    onBookClick();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                >
                  <span>Book with {BUSINESS_INFO.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
