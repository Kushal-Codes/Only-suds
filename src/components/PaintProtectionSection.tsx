import React, { useState } from 'react';
import { SlidersHorizontal, Columns2, Check, ArrowRight, Info } from 'lucide-react';
import { BEFORE_AFTER_STAGES, BUSINESS_INFO } from '../data/servicesData';

interface BeforeAfterSectionProps {
  onBookClick: (serviceId?: string) => void;
}

export const PaintProtectionSection: React.FC<BeforeAfterSectionProps> = ({
  onBookClick,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>(BEFORE_AFTER_STAGES[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');

  const activeStage =
    BEFORE_AFTER_STAGES.find((stage) => stage.id === selectedStageId) ??
    BEFORE_AFTER_STAGES[0];

  return (
    <section
      id="results"
      className="py-16 sm:py-24 bg-[#090E1A] text-white border-b border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-2">
              Detailing Process Visualization · Illustrative Showcase
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
              style={{ textWrap: 'balance' }}
            >
              See the Difference.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore how proper foam encapsulation, crevice brush agitation, and careful
              surface conditioning transform dull, road-weathered surfaces into a crisp finish.
            </p>
          </div>

          {/* View Mode Toggle: Interactive Slider vs Side-by-Side */}
          <div
            role="group"
            aria-label="Comparison display mode"
            className="inline-flex items-center gap-1.5 p-1.5 bg-[#060911] border border-slate-800 rounded-lg self-start"
          >
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'slider'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive Slider</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('side-by-side')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'side-by-side'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Side-by-Side View</span>
            </button>
          </div>
        </div>

        {/* Stage Selector Tabs */}
        <div
          role="tablist"
          aria-label="Select detailing stage comparison"
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8"
        >
          {BEFORE_AFTER_STAGES.map((stage) => {
            const isSelected = stage.id === activeStage.id;
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedStageId(stage.id)}
                className={`text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#0E172C] border-[#3B82F6] text-white'
                    : 'bg-[#060911]/80 border-slate-800/90 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <p className="text-xs font-semibold text-[#60A5FA] mb-1">
                  {stage.stageNumber} · {stage.categoryLabel}
                </p>
                <p className="font-display text-sm sm:text-base font-bold text-white">
                  {stage.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Comparison Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#060911] border border-slate-800 rounded-xl p-5 sm:p-7">
          {/* Left / Top 7 Columns: Interactive Visual Comparison */}
          <div className="lg:col-span-7 flex flex-col">
            {viewMode === 'slider' ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-72 sm:h-96 select-none">
                {/* Base Layer: "After" High-Gloss Finished State */}
                <img
                  src={activeStage.image}
                  alt={`${activeStage.imageAlt} — Finished state`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center contrast-110 saturate-110 brightness-105"
                />

                {/* Clipped Top Layer: "Before / Pre-Treatment" State (same vehicle photograph with realistic dull/hazy pre-wash filter so unrelated vehicles are never paired) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src={activeStage.image}
                    alt={`${activeStage.imageAlt} — Pre-detail stage`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center brightness-75 contrast-75 saturate-50 blur-[0.6px]"
                  />
                  <div
                    className="absolute inset-0 bg-slate-900/30 mix-blend-multiply"
                    aria-hidden="true"
                  />
                </div>

                {/* Vertical Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.9)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                  aria-hidden="true"
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#2563EB] border-2 border-white flex items-center justify-center shadow-lg">
                    <SlidersHorizontal className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Top Corner Stage Labels */}
                <div className="absolute top-3 left-3 bg-[#060911]/90 border border-slate-700/90 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-200 pointer-events-none">
                  {activeStage.beforeLabel}
                </div>
                <div className="absolute top-3 right-3 bg-[#2563EB]/95 px-3 py-1.5 rounded-md text-xs font-semibold text-white pointer-events-none">
                  {activeStage.afterLabel}
                </div>

                {/* Accessible Range Input Overlaying the Image */}
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label={`Comparison slider for ${activeStage.title}`}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-64 sm:h-80">
                  <img
                    src={activeStage.image}
                    alt={`${activeStage.imageAlt} — Pre-detail stage`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center brightness-75 contrast-75 saturate-50 blur-[0.6px]"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-[#060911]/90 border border-slate-800 p-2.5 rounded-lg">
                    <p className="text-xs font-bold text-slate-200">{activeStage.beforeLabel}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{activeStage.beforeNote}</p>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-[#3B82F6]/60 bg-slate-950 h-64 sm:h-80">
                  <img
                    src={activeStage.image}
                    alt={`${activeStage.imageAlt} — Finished state`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center contrast-110 saturate-110 brightness-105"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-[#060911]/90 border border-[#3B82F6]/60 p-2.5 rounded-lg">
                    <p className="text-xs font-bold text-[#60A5FA]">{activeStage.afterLabel}</p>
                    <p className="text-[11px] text-slate-300 mt-0.5">{activeStage.afterNote}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Slider Preset Controls */}
            {viewMode === 'slider' && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Drag slider or jump to position:</span>
                  {[25, 50, 75].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setSliderPosition(pct)}
                      className={`px-2.5 py-1 rounded text-xs font-mono tabular-nums transition-colors cursor-pointer ${
                        sliderPosition === pct
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-[#0B101E] text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <span className="text-xs font-mono text-slate-400 tabular-nums">
                  Split: {sliderPosition}% / {100 - sliderPosition}%
                </span>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Stage Details & Transparent Disclosure */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#60A5FA] mb-1">
                Stage {activeStage.stageNumber} · {activeStage.categoryLabel}
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2.5">
                {activeStage.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                {activeStage.subtitle}
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-3.5 rounded-lg bg-[#0B101E] border border-slate-800">
                  <p className="text-xs font-semibold text-slate-300 mb-1">
                    {activeStage.beforeLabel}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {activeStage.beforeNote}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0D162B] border border-[#3B82F6]/40">
                  <p className="text-xs font-semibold text-[#60A5FA] mb-1">
                    {activeStage.afterLabel}
                  </p>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeStage.afterNote}
                  </p>
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-300 mb-2">
                Key Process Techniques
              </p>
              <ul className="space-y-2 mb-6">
                {activeStage.processHighlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                  >
                    <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Mandatory Authenticity & Stock Disclosure */}
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5 mb-4">
                <Info className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                <span>{activeStage.licenseNote}</span>
              </div>

              <button
                type="button"
                onClick={() => onBookClick('full-driveway-detail')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
              >
                <span>Schedule Your Detail with {BUSINESS_INFO.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
