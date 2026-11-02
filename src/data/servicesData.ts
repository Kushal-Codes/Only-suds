export type ServiceCategory = 'all' | 'packages' | 'interior' | 'exterior' | 'specialty';

export interface DetailingService {
  id: string;
  code: string;
  name: string;
  category: Exclude<ServiceCategory, 'all'>;
  categoryLabel: string;
  shortDescription: string;
  /**
   * Verified price string if published by the business owner.
   * Keep null until confirmed by owner so unverified prices are never fabricated on the public site.
   */
  verifiedPrice: string | null;
  /**
   * Verified duration string if published by the business owner.
   * Keep null until confirmed by owner so unverified durations are never fabricated on the public site.
   */
  verifiedDuration: string | null;
  pricingModelLabel: string;
  inclusions: string[];
  idealFor: string;
  image: string;
  imageAlt: string;
  imageSourceLicense: string;
  ctaLabel: string;
}

export interface ComparisonFeatureRow {
  feature: string;
  exteriorWash: boolean;
  interiorRevival: boolean;
  fullDetail: boolean;
}

export interface BeforeAfterStageItem {
  id: string;
  stageNumber: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  beforeLabel: string;
  afterLabel: string;
  beforeNote: string;
  afterNote: string;
  processHighlights: string[];
  image: string;
  imageAlt: string;
  isIllustrativeStock: boolean;
  licenseNote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Polishing' | 'Wheels & Trim';
  caption: string;
  image: string;
  alt: string;
  isGenuineBusinessAsset?: boolean;
  licenseCredit: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface QuoteInquiryInput {
  fullName: string;
  phoneOrEmail: string;
  vehicleInfo: string;
  serviceId: string;
  locationArea: string;
  notes: string;
}

export interface QuoteValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof QuoteInquiryInput, string>>;
}

export const BUSINESS_INFO = {
  /** Exact required business name — never append "LLC" */
  name: 'OnlySuds Mobile Detailing',
  ownerName: 'Brice Popp',
  ownerRole: 'Owner & Operator',
  tagline: 'A Cleaner Ride. A Deeper Shine.',
  subHeadline: 'Mobile Detailing, Done Right.',
  verifiedFacebookBio:
    'OnlySuds is your go-to mobile detailing, bringing you that showroom shine straight to your driveway!',
  verifiedCategories: [
    'Auto Detailing Service',
    'Automotive, Aircraft & Boat',
    'Cleaning Service',
  ],
  phoneDisplay: '979-451-5519',
  phoneFormatted: '(979) 451-5519',
  phoneHref: 'tel:+19794515519',
  smsHref: 'sms:+19794515519',
  email: 'onlysudsmobiledetailing@gmail.com',
  emailHref: 'mailto:onlysudsmobiledetailing@gmail.com',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61576875933300',
  facebookHandle: 'OnlySuds Mobile Detailing',
  instagramUrl: 'https://www.instagram.com/onlysudsmobiledetailing',
  instagramHandle: '@onlysudsmobiledetailing',
  serviceAreaPrimary: 'Austin, TX',
  serviceAreaDescription: 'Austin, Texas & Surrounding Communities',
  serviceRegions: [
    'Austin, TX',
    'North Austin',
    'South Austin',
    'Round Rock',
    'Cedar Park',
    'Pflugerville',
    'Leander',
    'Georgetown',
  ],
  officialLogoImage: '/assets/onlysuds/fb-logo.jpg',
  officialCardImage: '/assets/onlysuds/fb-card.jpg',
  heroImage: '/assets/onlysuds/pexels-6873076.jpg',
} as const;

/**
 * Editable Service Catalog Configuration
 * Verified against https://www.facebook.com/profile.php?id=61576875933300
 * Exact dollar prices and hour durations are kept null until published by the owner,
 * ensuring zero fabricated pricing or duration claims appear on the public website.
 */
export const SERVICES_DATA: DetailingService[] = [
  {
    id: 'full-driveway-detail',
    code: '01',
    name: 'Full Interior & Exterior Detail',
    category: 'packages',
    categoryLabel: 'Complete Package',
    shortDescription:
      'Complete bumper-to-bumper mobile detailing combining safe exterior foam washing, wheel decontamination, and deep cabin restoration right in your driveway.',
    verifiedPrice: null,
    verifiedDuration: null,
    pricingModelLabel: 'Custom Quote by Vehicle Size & Condition',
    inclusions: [
      'Pre-wash snow foam bath and two-bucket hand wash',
      'Bug splatter, road film, and exterior grime removal',
      'Wheel face, barrel, and tire sidewall cleaning with satin dressing',
      'Door jambs, trunk seals, and exterior glass streak-free wipe-down',
      'Full interior vacuuming of seats, carpets, floor mats, and trunk',
      'Interior plastics, dashboard, center console, and cupholder detailing',
      'Upholstery spot treatment or leather surface cleaning and conditioning',
      'Final exterior gloss enhancement spray and microfiber hand dry',
    ],
    idealFor: 'Daily drivers and family vehicles needing complete inside-and-out care.',
    image: '/assets/onlysuds/pexels-6873123.jpg',
    imageAlt: 'Detailer performing a complete exterior and trim wash on a sports coupe in a dark bay',
    imageSourceLicense: 'Pexels Commercial License (Photo 6873123)',
    ctaLabel: 'Request Full Detail Quote',
  },
  {
    id: 'interior-deep-revival',
    code: '02',
    name: 'Interior Deep Clean & Cabin Revival',
    category: 'interior',
    categoryLabel: 'Interior Care',
    shortDescription:
      'Focused interior restoration designed to lift embedded dirt, treat fabric or leather seating, remove pet hair, and leave your cabin fresh and spotless.',
    verifiedPrice: null,
    verifiedDuration: null,
    pricingModelLabel: 'Custom Quote by Cabin Condition',
    inclusions: [
      'Thorough vacuuming of carpets, seats, crevices, and cargo areas',
      'Agitation and removal of stubborn pet hair and trapped debris',
      'Carpet, floor mat, and fabric upholstery shampooing & extraction care',
      'Leather seat cleaning and non-greasy conditioning treatment',
      'Detailed brush cleaning of air vents, steering column, and switchgear',
      'Dashboard, door panels, and center console wipe-down and dressing',
      'Interior mirrors, windshield, and side glass streak-free cleaning',
    ],
    idealFor: 'Vehicles with spilled drinks, pet hair, road trip mess, or heavily used cabins.',
    image: '/assets/onlysuds/pexels-31389821.jpg',
    imageAlt: 'Detailer wiping down quilted black leather car door trim and rear seats with microfiber cloth',
    imageSourceLicense: 'Pexels Commercial License (Photo 31389821)',
    ctaLabel: 'Request Interior Revival',
  },
  {
    id: 'exterior-wash-shine',
    code: '03',
    name: 'Exterior Foam Wash & Showroom Shine',
    category: 'exterior',
    categoryLabel: 'Exterior Care',
    shortDescription:
      'Swirl-conscious hand wash and exterior refresh that safely removes road grime, brake dust, and water spots while restoring a deep driveway shine.',
    verifiedPrice: null,
    verifiedDuration: null,
    pricingModelLabel: 'Custom Quote by Vehicle Type',
    inclusions: [
      'High-lubricity snow foam pre-soak to loosen surface dirt safely',
      'Gentle microfiber hand mitt wash across all painted panels',
      'Front bumper and mirror bug removal treatment',
      'Rim face, lug nut brush agitation, and tire dressing application',
      'Wheel wells rinsed and flushed clean of road debris',
      'Plush microfiber towel dry and door jamb wipe-down',
      'Exterior glass polished crystal clear',
    ],
    idealFor: 'Drivers wanting a safe, high-gloss hand wash without automated tunnel brushes.',
    image: '/assets/onlysuds/pexels-6873088.jpg',
    imageAlt: 'Thick wash foam being applied by hand sponge onto glossy black vehicle paint',
    imageSourceLicense: 'Pexels Commercial License (Photo 6873088)',
    ctaLabel: 'Request Exterior Detail',
  },
  {
    id: 'paint-enhancement-polish',
    code: '04',
    name: 'Paint Decontamination & Gloss Enhancement',
    category: 'exterior',
    categoryLabel: 'Paint & Protection',
    shortDescription:
      'Surface decontamination and machine polishing care to remove bonded contaminants, reduce light haze, and restore deep mirror-like clarity to your paintwork.',
    verifiedPrice: null,
    verifiedDuration: null,
    pricingModelLabel: 'Custom Quote by Paint Condition',
    inclusions: [
      'Complete exterior hand wash and surface preparation',
      'Iron fallout and bonded surface contaminant removal',
      'Clay bar treatment to restore smooth-as-glass clear coat feel',
      'Machine polish to boost paint depth, gloss, and reflection clarity',
      'Application of durable paint sealant or protective coating layer',
      'Exterior trim and chrome detail finishing',
    ],
    idealFor: 'Dark or metallic vehicles needing restored reflection depth and surface smoothness.',
    image: '/assets/onlysuds/pexels-5233258.jpg',
    imageAlt: 'Automotive technician using a rotary buffer polisher on glossy black car paint',
    imageSourceLicense: 'Pexels Commercial License (Photo 5233258)',
    ctaLabel: 'Request Paint Care Quote',
  },
  {
    id: 'wheel-tire-trim-care',
    code: '05',
    name: 'Wheel, Tire & Exterior Trim Restoration',
    category: 'exterior',
    categoryLabel: 'Wheels & Trim',
    shortDescription:
      'Targeted decontamination for brake-dust-heavy alloy wheels, calipers, wheel wells, and faded exterior trim to sharpen your vehicle’s stance.',
    verifiedPrice: null,
    verifiedDuration: null,
    pricingModelLabel: 'Available Standalone or Package Add-On',
    inclusions: [
      'Deep brake dust and iron decontamination on wheel faces and barrels',
      'Soft-bristle detail brush agitation around lug nuts and valve stems',
      'Tire sidewall scrubbing to remove old browning and road film',
      'Clean satin tire conditioning (non-sling finish)',
      'Exterior black plastic and rubber trim cleaning and dressing',
    ],
    idealFor: 'Performance vehicles, trucks, and SUVs with intricate wheel designs.',
    image: '/assets/onlysuds/pexels-4870705.jpg',
    imageAlt: 'Hand scrubbing an alloy wheel spoke and tire with rich detailing foam',
    imageSourceLicense: 'Pexels Commercial License (Photo 4870705)',
    ctaLabel: 'Inquire About Wheel Care',
  },
  {
    id: 'specialty-aircraft-boat-auto',
    code: '06',
    name: 'Specialty Auto, Boat & Multi-Craft Detailing',
    category: 'specialty',
    categoryLabel: 'Specialty & Marine',
    shortDescription:
      'Tailored mobile detailing for lifted trucks, EVs, watercraft/boats, and specialty vehicles across the Austin area—reflecting our Automotive, Aircraft & Boat capabilities.',
    verifiedPrice: null,
    verifiedDuration: null,
    pricingModelLabel: 'Custom Assessment & Quote',
    inclusions: [
      'Custom wash and surface care matched to gelcoat, specialty paint, or wraps',
      'Marine and boat interior vinyl seating cleaning and UV conditioning',
      'Oversized truck, SUV, and multi-vehicle driveway scheduling',
      'Sensitive finish and EV trim-safe hand washing techniques',
      'Personalized maintenance plan options for recurring driveway care',
    ],
    idealFor: 'Boats, watercraft, lifted trucks, EVs, and multi-vehicle households.',
    image: '/assets/onlysuds/pexels-6872579.jpg',
    imageAlt: 'Detailer rinsing a performance car with a high-pressure wand in a detailing bay',
    imageSourceLicense: 'Pexels Commercial License (Photo 6872579)',
    ctaLabel: 'Request Specialty Quote',
  },
];

export const PACKAGE_COMPARISON_ROWS: ComparisonFeatureRow[] = [
  {
    feature: 'Two-bucket hand wash & snow foam pre-soak',
    exteriorWash: true,
    interiorRevival: false,
    fullDetail: true,
  },
  {
    feature: 'Wheel face, barrel & tire sidewall detailing',
    exteriorWash: true,
    interiorRevival: false,
    fullDetail: true,
  },
  {
    feature: 'Bug splatter removal & exterior glass cleaning',
    exteriorWash: true,
    interiorRevival: false,
    fullDetail: true,
  },
  {
    feature: 'Door jambs & trunk seal wipe-down',
    exteriorWash: true,
    interiorRevival: true,
    fullDetail: true,
  },
  {
    feature: 'Deep interior vacuuming (seats, carpets, mats & trunk)',
    exteriorWash: false,
    interiorRevival: true,
    fullDetail: true,
  },
  {
    feature: 'Dashboard, console, vents & cupholder brush detailing',
    exteriorWash: false,
    interiorRevival: true,
    fullDetail: true,
  },
  {
    feature: 'Upholstery spot treatment / leather cleaning & conditioning',
    exteriorWash: false,
    interiorRevival: true,
    fullDetail: true,
  },
  {
    feature: 'Pet hair & heavy cabin debris agitation',
    exteriorWash: false,
    interiorRevival: true,
    fullDetail: true,
  },
  {
    feature: 'Exterior gloss enhancer & microfiber hand dry',
    exteriorWash: true,
    interiorRevival: false,
    fullDetail: true,
  },
];

export const BEFORE_AFTER_STAGES: BeforeAfterStageItem[] = [
  {
    id: 'stage-exterior-gloss',
    stageNumber: '01',
    title: 'Active Foam Decontamination vs. Deep Gloss Finish',
    subtitle:
      'See how safe pre-wash foam encapsulation and hand detailing lift traffic film to reveal crisp, dark clear-coat reflections.',
    categoryLabel: 'Exterior Paint Care',
    beforeLabel: 'Stage 1: Pre-Wash Traffic Film & Foam Lift',
    afterLabel: 'Stage 2: Rinsed, Dried & Gloss-Enhanced Clear Coat',
    beforeNote:
      'Surface road dust and bonded grime are encapsulated in high-lubricity snow foam prior to contact washing.',
    afterNote:
      'After microfiber hand washing and drying, dark paintwork regains deep, distortion-free reflection clarity.',
    processHighlights: [
      'pH-balanced snow foam loosens abrasive grit before mitt contact',
      'Two-bucket hand wash prevents wash-induced swirl marks on dark paint',
      'Microfiber drying and gloss finishing leave a slick, mirror-like surface',
    ],
    image: '/assets/onlysuds/pexels-6872162.jpg',
    imageAlt: 'Close-up of black luxury car headlight and grille with detailing foam and high-gloss reflection',
    isIllustrativeStock: true,
    licenseNote:
      'Illustrative process visualization using single-vehicle Pexels commercial photography (Photo 6872162). Ready for owner upload of verified customer before/after photos.',
  },
  {
    id: 'stage-interior-cabin',
    stageNumber: '02',
    title: 'Dull, Dusty Cabin Trim vs. Conditioned Satin Interior',
    subtitle:
      'Compare untreated interior console surfaces against a cleaned, brush-agitated, and satin-finished cockpit.',
    categoryLabel: 'Interior Cabin Revival',
    beforeLabel: 'Stage 1: Untreated Dust & Cabin Film',
    afterLabel: 'Stage 2: Detailed & Conditioned Cockpit',
    beforeNote:
      'Daily use leaves skin oils, dust buildup in switchgear seams, and muted leather/vinyl surfaces.',
    afterNote:
      'Soft detailing brushes and non-greasy interior conditioners restore a clean, factory-matte finish.',
    processHighlights: [
      'Crevice brushes clear dust from buttons, dials, and stitched seams',
      'Safe interior cleaners remove oils and fingerprints without harsh residue',
      'UV-protective satin conditioning keeps leather supple and non-slippery',
    ],
    image: '/assets/onlysuds/pexels-3798021.jpg',
    imageAlt: 'Detailed black leather luxury vehicle center console and dashboard controls',
    isIllustrativeStock: true,
    licenseNote:
      'Illustrative process visualization using single-vehicle Pexels commercial photography (Photo 3798021). Ready for owner upload of verified customer before/after photos.',
  },
  {
    id: 'stage-trim-precision',
    stageNumber: '03',
    title: 'Seam & Window Trim Agitation vs. Crisp Exterior Finish',
    subtitle:
      'Dedicated soft-bristle brush work clears trapped grime around window moldings, badges, and body seams.',
    categoryLabel: 'Precision Detail Work',
    beforeLabel: 'Stage 1: Foam Agitation in Trim Seams',
    afterLabel: 'Stage 2: Flushed & Dressed Exterior Trim',
    beforeNote:
      'Ordinary car washes skip tight window seals, mirror housings, and trim channels where grime collects.',
    afterNote:
      'Soft boar-hair and synthetic brushes safely agitate every seam for a uniform showroom finish.',
    processHighlights: [
      'Soft-bristle detailing brush agitation along window trim and moldings',
      'Safe removal of wax residue and trapped road film in panel gaps',
      'Crisp, streak-free finish across glass, chrome, and black trim',
    ],
    image: '/assets/onlysuds/pexels-6873020.jpg',
    imageAlt: 'Detailer using a soft detailing brush with foam along a black vehicle window molding',
    isIllustrativeStock: true,
    licenseNote:
      'Illustrative process visualization using single-vehicle Pexels commercial photography (Photo 6873020). Ready for owner upload of verified customer before/after photos.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Dark Paintwork & Studio-Grade Rinse',
    category: 'Exterior',
    caption:
      'High-pressure rinse and foam decontamination workflow for dark-finish coupes and sedans.',
    image: '/assets/onlysuds/pexels-6873082.jpg',
    alt: 'Black luxury coupe in detailing bay during high-pressure wash stage',
    licenseCredit: 'Illustrative Detailing Photography · Pexels License #6873082',
  },
  {
    id: 'gal-2',
    title: 'Windshield Cowl & Seam Brush Detailing',
    category: 'Wheels & Trim',
    caption:
      'Soft detailing brushes reach cowl vents, wiper arms, and panel seams that standard washes miss.',
    image: '/assets/onlysuds/pexels-6872150.jpg',
    alt: 'Detailer using a brush along the windshield and hood seam of a sports car',
    licenseCredit: 'Illustrative Detailing Photography · Pexels License #6872150',
  },
  {
    id: 'gal-3',
    title: 'High-Lubricity Snow Foam Pre-Wash',
    category: 'Exterior',
    caption:
      'Thick snow foam encapsulates surface grit and road film so it can be rinsed away safely.',
    image: '/assets/onlysuds/pexels-6872601.jpg',
    alt: 'Detailer spraying thick snow foam onto vehicle side panels',
    licenseCredit: 'Illustrative Detailing Photography · Pexels License #6872601',
  },
  {
    id: 'gal-4',
    title: 'Front Grille & Lower Splitter Agitation',
    category: 'Wheels & Trim',
    caption:
      'Targeted brush work removes bug splatter and road debris from intricate front grilles and intakes.',
    image: '/assets/onlysuds/pexels-6872172.jpg',
    alt: 'Detailer brushing the front bumper intake grille of a sports coupe with foam',
    licenseCredit: 'Illustrative Detailing Photography · Pexels License #6872172',
  },
  {
    id: 'gal-5',
    title: 'Machine Polishing & Clear-Coat Clarity',
    category: 'Polishing',
    caption:
      'Careful machine polishing refines clear-coat gloss and enhances reflection depth across body panels.',
    image: '/assets/onlysuds/pexels-37809559.jpg',
    alt: 'Detailer machine polishing the rear fender of a sports car',
    licenseCredit: 'Illustrative Detailing Photography · Pexels License #37809559',
  },
  {
    id: 'gal-6',
    title: 'Hand Mitt Wash & Headlight Care',
    category: 'Exterior',
    caption:
      'Gentle hand washing across headlights, hood contours, and painted fenders.',
    image: '/assets/onlysuds/pexels-4870700.jpg',
    alt: 'Hand washing a dark vehicle headlight and front fender with rich suds',
    licenseCredit: 'Illustrative Detailing Photography · Pexels License #4870700',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    id: 'mobile-convenience',
    number: '01',
    title: 'Showroom Shine Straight to Your Driveway',
    description:
      'Skip the waiting room and drop-off hassle. OnlySuds Mobile Detailing brings professional equipment and care directly to your home, apartment, or workplace in the Austin area.',
  },
  {
    id: 'interior-exterior',
    number: '02',
    title: 'Complete Interior & Exterior Capabilities',
    description:
      'From deep cabin vacuuming, pet hair removal, and upholstery care to safe hand washes and paint gloss enhancement, every surface of your vehicle is addressed with care.',
  },
  {
    id: 'multi-craft',
    number: '03',
    title: 'Auto, Truck, SUV & Boat Detailing',
    description:
      'Whether you drive a compact commuter, a family SUV, a lifted truck, or need mobile care for your boat or specialty vehicle, each service is tailored to your craft.',
  },
  {
    id: 'direct-owner-communication',
    number: '04',
    title: 'Direct Communication with the Owner',
    description:
      'Work directly with owner Brice Popp from quote to completion—no call centers, hidden surprises, or generic tunnel-wash shortcuts.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Choose Your Service',
    description:
      'Browse our exterior, interior, full-detail, or specialty options to select the level of care that fits your vehicle’s needs.',
  },
  {
    step: '02',
    title: 'Book Your Appointment',
    description:
      'Call or text 979-451-5519, email onlysudsmobiledetailing@gmail.com, or message us on Facebook with your vehicle type and Austin-area location.',
  },
  {
    step: '03',
    title: 'Enjoy a Cleaner Vehicle',
    description:
      'We arrive at your driveway and perform the service you selected so you can step back into a clean, refreshed ride.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-services',
    question: 'Which detailing services are available from OnlySuds Mobile Detailing?',
    answer:
      'OnlySuds Mobile Detailing provides Full Interior & Exterior Details, Interior Deep Cleans & Cabin Revivals (including pet hair removal, upholstery care, and leather conditioning), Exterior Foam Hand Washes, Paint Decontamination & Gloss Enhancement, Wheel & Tire Detailing, and specialty detailing for automotive, boat, and recreational vehicles.',
  },
  {
    id: 'faq-pricing',
    question: 'How is pricing determined for my vehicle?',
    answer:
      'Because every vehicle’s size (coupe/sedan, SUV, truck, or boat) and current interior/exterior condition are different, we provide a transparent custom quote before starting work. Call or text 979-451-5519 or send a message with your vehicle make/model and desired service for a fast quote.',
  },
  {
    id: 'faq-booking',
    question: 'How do I book an appointment?',
    answer:
      'You can book directly by calling or texting Brice Popp at 979-451-5519, emailing onlysudsmobiledetailing@gmail.com, or sending a direct message on our official Facebook page (OnlySuds Mobile Detailing) or Instagram (@onlysudsmobiledetailing). You can also use the quote builder on this page to pre-fill your text or email inquiry.',
  },
  {
    id: 'faq-service-area',
    question: 'Where is mobile detailing available?',
    answer:
      'OnlySuds Mobile Detailing is based in Austin, TX and serves customers at their driveways, homes, and workplaces across Austin and surrounding Central Texas communities.',
  },
  {
    id: 'faq-inclusions',
    question: 'What is the difference between an Exterior Detail, Interior Revival, and Full Detail?',
    answer:
      'Our Exterior Foam Wash & Showroom Shine focuses on hand washing painted panels, bug removal, wheels, tires, and exterior glass. The Interior Deep Clean & Cabin Revival focuses on vacuuming, pet hair removal, upholstery/leather cleaning, and dashboard/console care. The Full Interior & Exterior Detail combines both into one comprehensive driveway visit.',
  },
  {
    id: 'faq-prep',
    question: 'What should I prepare before my mobile detailing appointment?',
    answer:
      'We recommend removing personal valuables, child seats, and large items from the cabin and trunk prior to your appointment so we can access all carpets, storage compartments, and seating surfaces thoroughly.',
  },
  {
    id: 'faq-specialty',
    question: 'Do you detail trucks, SUVs, and boats?',
    answer:
      'Yes. In addition to sedans, coupes, SUVs, and trucks, OnlySuds Mobile Detailing is listed under Automotive, Aircraft & Boat cleaning services and can provide custom quotes for watercraft and specialty vehicles.',
  },
];

export function filterServicesByCategory(
  category: ServiceCategory,
  services: DetailingService[] = SERVICES_DATA
): DetailingService[] {
  if (category === 'all') {
    return services;
  }
  return services.filter((service) => service.category === category);
}

export function filterGalleryByCategory(
  category: 'All' | GalleryItem['category'],
  items: GalleryItem[] = GALLERY_ITEMS
): GalleryItem[] {
  if (category === 'All') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

export function recommendServiceByNeed(
  need: 'complete' | 'interior-mess' | 'exterior-shine' | 'paint-gloss' | 'specialty-craft'
): DetailingService {
  const map: Record<typeof need, string> = {
    complete: 'full-driveway-detail',
    'interior-mess': 'interior-deep-revival',
    'exterior-shine': 'exterior-wash-shine',
    'paint-gloss': 'paint-enhancement-polish',
    'specialty-craft': 'specialty-aircraft-boat-auto',
  };
  const targetId = map[need];
  return SERVICES_DATA.find((s) => s.id === targetId) ?? SERVICES_DATA[0];
}

export function validateQuoteInquiry(input: QuoteInquiryInput): QuoteValidationResult {
  const errors: Partial<Record<keyof QuoteInquiryInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name (at least 2 characters).';
  }

  const contact = (input.phoneOrEmail || '').trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const digits = contact.replace(/\D/g, '');
  const isPhone = digits.length >= 10 && digits.length <= 15;

  if (!contact || (!isEmail && !isPhone)) {
    errors.phoneOrEmail = 'Please enter a valid 10-digit phone number or email address.';
  }

  if (!input.vehicleInfo || input.vehicleInfo.trim().length < 2) {
    errors.vehicleInfo = 'Please enter your vehicle make, model, or type (e.g., 2022 Ford F-150).';
  }

  if (!input.serviceId || !SERVICES_DATA.some((s) => s.id === input.serviceId)) {
    errors.serviceId = 'Please select a detailing service.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildBookingMessageLinks(input: QuoteInquiryInput): {
  smsUrl: string;
  mailtoUrl: string;
  summaryText: string;
} {
  const selectedService =
    SERVICES_DATA.find((s) => s.id === input.serviceId)?.name ?? 'Mobile Detailing Service';
  const lines = [
    `Hi Brice at ${BUSINESS_INFO.name}, I'd like to request a quote / book a detail:`,
    `• Name: ${input.fullName.trim() || 'Customer'}`,
    `• Contact: ${input.phoneOrEmail.trim() || 'Not provided'}`,
    `• Vehicle: ${input.vehicleInfo.trim() || 'Not specified'}`,
    `• Service: ${selectedService}`,
    input.locationArea.trim() ? `• Area: ${input.locationArea.trim()}` : '• Area: Austin, TX',
    input.notes.trim() ? `• Notes: ${input.notes.trim()}` : '',
  ].filter(Boolean);

  const summaryText = lines.join('\n');
  const encodedBody = encodeURIComponent(summaryText);
  const encodedSubject = encodeURIComponent(
    `${BUSINESS_INFO.name} Quote Request — ${selectedService} (${input.vehicleInfo.trim() || 'Vehicle'})`
  );

  return {
    smsUrl: `sms:+19794515519?body=${encodedBody}`,
    mailtoUrl: `mailto:${BUSINESS_INFO.email}?subject=${encodedSubject}&body=${encodedBody}`,
    summaryText,
  };
}
