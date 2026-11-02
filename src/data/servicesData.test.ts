import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BUSINESS_INFO,
  SERVICES_DATA,
  BEFORE_AFTER_STAGES,
  GALLERY_ITEMS,
  FAQ_ITEMS,
  filterServicesByCategory,
  filterGalleryByCategory,
  recommendServiceByNeed,
  validateQuoteInquiry,
  buildBookingMessageLinks,
} from './servicesData';

test('business name is strictly OnlySuds Mobile Detailing with zero LLC suffix anywhere', () => {
  assert.equal(BUSINESS_INFO.name, 'OnlySuds Mobile Detailing');
  assert.equal(BUSINESS_INFO.name.includes('LLC'), false);
  assert.equal(BUSINESS_INFO.phoneDisplay, '979-451-5519');
  assert.equal(BUSINESS_INFO.email, 'onlysudsmobiledetailing@gmail.com');
  assert.equal(BUSINESS_INFO.facebookUrl, 'https://www.facebook.com/profile.php?id=61576875933300');
  assert.equal(BUSINESS_INFO.serviceAreaPrimary, 'Austin, TX');
});

test('all services have editable price/duration set to null (no fabricated prices) and unique images', () => {
  assert.equal(SERVICES_DATA.length, 6);
  const images = new Set<string>();
  for (const service of SERVICES_DATA) {
    assert.equal(service.verifiedPrice, null);
    assert.equal(service.verifiedDuration, null);
    assert.ok(service.inclusions.length >= 5);
    assert.equal(images.has(service.image), false, `Duplicate image found: ${service.image}`);
    images.add(service.image);
  }
});

test('no image is repeated across hero, services, before/after stages, and gallery', () => {
  const allPaths = [
    BUSINESS_INFO.heroImage,
    ...SERVICES_DATA.map((s) => s.image),
    ...BEFORE_AFTER_STAGES.map((b) => b.image),
    ...GALLERY_ITEMS.map((g) => g.image),
  ];
  const uniquePaths = new Set(allPaths);
  assert.equal(uniquePaths.size, allPaths.length);
});

test('before and after stages are explicitly marked as illustrative stock', () => {
  assert.equal(BEFORE_AFTER_STAGES.length, 3);
  for (const stage of BEFORE_AFTER_STAGES) {
    assert.equal(stage.isIllustrativeStock, true);
    assert.ok(stage.licenseNote.includes('Illustrative'));
  }
});

test('service and gallery category filtering work accurately', () => {
  assert.equal(filterServicesByCategory('all').length, 6);
  assert.equal(filterServicesByCategory('interior').length, 1);
  assert.equal(filterServicesByCategory('exterior').length, 3);
  assert.equal(filterGalleryByCategory('All').length, 6);
  assert.equal(filterGalleryByCategory('Exterior').length, 3);
});

test('service recommendation maps customer needs to the right service', () => {
  assert.equal(recommendServiceByNeed('complete').id, 'full-driveway-detail');
  assert.equal(recommendServiceByNeed('interior-mess').id, 'interior-deep-revival');
  assert.equal(recommendServiceByNeed('exterior-shine').id, 'exterior-wash-shine');
  assert.equal(recommendServiceByNeed('paint-gloss').id, 'paint-enhancement-polish');
  assert.equal(recommendServiceByNeed('specialty-craft').id, 'specialty-aircraft-boat-auto');
});

test('quote inquiry validation and SMS/email link builder work properly', () => {
  const invalid = validateQuoteInquiry({
    fullName: 'A',
    phoneOrEmail: 'invalid',
    vehicleInfo: '',
    serviceId: '',
    locationArea: '',
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phoneOrEmail);
  assert.ok(invalid.errors.vehicleInfo);
  assert.ok(invalid.errors.serviceId);

  const validInput = {
    fullName: 'Jordan Taylor',
    phoneOrEmail: '512-555-0199',
    vehicleInfo: '2023 Tesla Model Y',
    serviceId: 'full-driveway-detail',
    locationArea: 'Austin, TX',
    notes: 'Pet hair in back seat',
  };
  const valid = validateQuoteInquiry(validInput);
  assert.equal(valid.valid, true);

  const links = buildBookingMessageLinks(validInput);
  assert.ok(links.smsUrl.startsWith('sms:+19794515519?body='));
  assert.ok(links.mailtoUrl.startsWith('mailto:onlysudsmobiledetailing@gmail.com?subject='));
  assert.ok(links.summaryText.includes('OnlySuds Mobile Detailing'));
  assert.equal(links.summaryText.includes('LLC'), false);
});

test('FAQ items cover key verified topics without LLC suffix', () => {
  assert.ok(FAQ_ITEMS.length >= 6);
  for (const item of FAQ_ITEMS) {
    assert.equal(item.question.includes('LLC'), false);
    assert.equal(item.answer.includes('LLC'), false);
  }
});
