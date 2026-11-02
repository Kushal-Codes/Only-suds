import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ExternalLink,
  Check,
  AlertCircle,
  Copy,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICES_DATA,
  QuoteInquiryInput,
  validateQuoteInquiry,
  buildBookingMessageLinks,
} from '../data/servicesData';

interface ServiceAreaContactSectionProps {
  selectedServiceId: string;
  onChangeSelectedServiceId: (serviceId: string) => void;
}

export const ServiceAreaContactSection: React.FC<ServiceAreaContactSectionProps> = ({
  selectedServiceId,
  onChangeSelectedServiceId,
}) => {
  const [formState, setFormState] = useState<QuoteInquiryInput>({
    fullName: '',
    phoneOrEmail: '',
    vehicleInfo: '',
    serviceId: selectedServiceId || SERVICES_DATA[0].id,
    locationArea: 'Austin, TX',
    notes: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof QuoteInquiryInput, string>>
  >({});
  const [preparedInquiry, setPreparedInquiry] = useState<{
    smsUrl: string;
    mailtoUrl: string;
    summaryText: string;
  } | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (selectedServiceId) {
      setFormState((prev) => ({ ...prev, serviceId: selectedServiceId }));
    }
  }, [selectedServiceId]);

  const handleFieldChange = (field: keyof QuoteInquiryInput, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (field === 'serviceId') {
      onChangeSelectedServiceId(value);
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateQuoteInquiry(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedInquiry(null);
      return;
    }
    setErrors({});
    const links = buildBookingMessageLinks(formState);
    setPreparedInquiry(links);
  };

  const handleCopySummary = async () => {
    if (!preparedInquiry) return;
    try {
      await navigator.clipboard.writeText(preparedInquiry.summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-[#090E1A] text-white border-b border-slate-800/80 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Columns: Verified Contact Channels & Service Area */}
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-semibold text-[#60A5FA] tracking-wide mb-2">
              Service Area &amp; Direct Booking
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Book Your Driveway Detail in Austin, TX.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed mb-6">
              Reach out directly to <strong className="text-white">{BUSINESS_INFO.ownerName}</strong>{' '}
              at <strong className="text-white">{BUSINESS_INFO.name}</strong> by call, text,
              email, or Facebook message to request your custom quote and lock in a convenient
              appointment time.
            </p>

            {/* Verified Direct Contact Cards */}
            <div className="space-y-3.5 mb-8">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-[#060911] border border-slate-800 hover:border-[#3B82F6] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#60A5FA]">
                    Call or Text Directly ({BUSINESS_INFO.ownerName})
                  </p>
                  <p className="font-display text-lg font-bold text-white tabular-nums">
                    {BUSINESS_INFO.phoneDisplay}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fastest way to get a custom quote for your vehicle
                  </p>
                </div>
              </a>

              <a
                href={BUSINESS_INFO.smsHref}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-[#060911] border border-slate-800 hover:border-[#3B82F6] transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#60A5FA]">Send a Text Message</p>
                  <p className="font-display text-base font-bold text-white tabular-nums">
                    Text {BUSINESS_INFO.phoneDisplay}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Send your vehicle make/model and photos for an accurate estimate
                  </p>
                </div>
              </a>

              <a
                href={BUSINESS_INFO.emailHref}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-[#060911] border border-slate-800 hover:border-[#3B82F6] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#60A5FA]">Official Email</p>
                  <p className="font-display text-sm sm:text-base font-bold text-white break-all">
                    {BUSINESS_INFO.email}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ideal for multi-vehicle, boat, or fleet detailing inquiries
                  </p>
                </div>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={BUSINESS_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#060911] border border-slate-800 hover:border-[#3B82F6] transition-colors"
                >
                  <div>
                    <p className="text-xs text-[#60A5FA] font-semibold">Facebook</p>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      {BUSINESS_INFO.facebookHandle}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                </a>

                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#060911] border border-slate-800 hover:border-[#3B82F6] transition-colors"
                >
                  <div>
                    <p className="text-xs text-[#60A5FA] font-semibold">Instagram</p>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      {BUSINESS_INFO.instagramHandle}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                </a>
              </div>
            </div>

            {/* Verified Austin Service Area Box */}
            <div className="p-5 rounded-xl bg-[#060911] border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#60A5FA] mb-2">
                <MapPin className="w-4 h-4 text-[#3B82F6]" />
                <span>Mobile Service Coverage</span>
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">
                {BUSINESS_INFO.serviceAreaDescription}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                We travel directly to your home driveway, apartment, or workplace across
                Austin and surrounding Central Texas communities:
              </p>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-300">
                {BUSINESS_INFO.serviceRegions.map((region, idx) => (
                  <React.Fragment key={region}>
                    <span>{region}</span>
                    {idx < BUSINESS_INFO.serviceRegions.length - 1 && (
                      <span className="text-slate-600" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Validated Custom Quote & Booking Request Builder */}
          <div className="lg:col-span-7">
            <div className="bg-[#060911] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl">
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#60A5FA] mb-1">
                  Direct Quote &amp; Booking Request Builder
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Prepare Your Detailing Request
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Enter your vehicle details and desired service below to generate a ready-to-send
                  text message or email directly to {BUSINESS_INFO.name}.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-fullName"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="quote-fullName"
                      type="text"
                      value={formState.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      placeholder="e.g., Alex Martinez"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B101E] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phoneOrEmail"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Phone Number or Email *
                    </label>
                    <input
                      id="quote-phoneOrEmail"
                      type="text"
                      value={formState.phoneOrEmail}
                      onChange={(e) => handleFieldChange('phoneOrEmail', e.target.value)}
                      placeholder="e.g., 512-555-0142 or email"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B101E] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
                    />
                    {errors.phoneOrEmail && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phoneOrEmail}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-vehicleInfo"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Vehicle Year, Make &amp; Model *
                    </label>
                    <input
                      id="quote-vehicleInfo"
                      type="text"
                      value={formState.vehicleInfo}
                      onChange={(e) => handleFieldChange('vehicleInfo', e.target.value)}
                      placeholder="e.g., 2023 Ford F-150 / Tesla Model 3"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B101E] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
                    />
                    {errors.vehicleInfo && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.vehicleInfo}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-serviceId"
                      className="block text-xs font-semibold text-slate-200 mb-1.5"
                    >
                      Selected Detailing Service *
                    </label>
                    <select
                      id="quote-serviceId"
                      value={formState.serviceId}
                      onChange={(e) => handleFieldChange('serviceId', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B101E] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#3B82F6]"
                    >
                      {SERVICES_DATA.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.code}. {service.name}
                        </option>
                      ))}
                    </select>
                    {errors.serviceId && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.serviceId}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-locationArea"
                    className="block text-xs font-semibold text-slate-200 mb-1.5"
                  >
                    Austin-Area Neighborhood or City
                  </label>
                  <input
                    id="quote-locationArea"
                    type="text"
                    value={formState.locationArea}
                    onChange={(e) => handleFieldChange('locationArea', e.target.value)}
                    placeholder="e.g., Austin, Round Rock, Cedar Park, South Austin"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B101E] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-notes"
                    className="block text-xs font-semibold text-slate-200 mb-1.5"
                  >
                    Vehicle Condition or Special Requests (Optional)
                  </label>
                  <textarea
                    id="quote-notes"
                    rows={3}
                    value={formState.notes}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                    placeholder="Mention pet hair, seat stains, preferred days, or specific areas of concern..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B101E] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Prepare Quote Request</span>
                  </button>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 bg-[#0B101E] hover:bg-slate-800 border border-slate-700 rounded-lg whitespace-nowrap shrink-0 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#3B82F6]" />
                    <span className="tabular-nums">Or Call {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </form>

              {/* Prepared Inquiry Direct Dispatch Panel (Never fakes a calendar confirmation) */}
              {preparedInquiry && (
                <div
                  role="region"
                  aria-label="Ready to send quote inquiry"
                  className="mt-6 p-5 rounded-xl bg-[#0D162B] border border-[#3B82F6] space-y-4"
                >
                  <div className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display text-base font-bold text-white">
                        Your Quote Request Is Ready to Send
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Choose your preferred contact method below to send these exact details
                        directly to {BUSINESS_INFO.ownerName} at {BUSINESS_INFO.name}:
                      </p>
                    </div>
                  </div>

                  <pre className="p-3.5 rounded-lg bg-[#060911] border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                    {preparedInquiry.summaryText}
                  </pre>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <a
                      href={preparedInquiry.smsUrl}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors text-center"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send via Text ({BUSINESS_INFO.phoneDisplay})</span>
                    </a>

                    <a
                      href={preparedInquiry.mailtoUrl}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors text-center"
                    >
                      <Mail className="w-4 h-4 text-[#60A5FA]" />
                      <span>Send via Email</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-[#060911] hover:bg-slate-900 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-[#60A5FA]" />
                      <span>{copiedSummary ? 'Copied Summary!' : 'Copy for Facebook DM'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
