/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PackagesSection } from './components/PackagesSection';
import { PaintProtectionSection } from './components/PaintProtectionSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { GallerySection } from './components/GallerySection';
import { AboutAndProcessSection } from './components/AboutAndProcessSection';
import { ServiceAreaContactSection } from './components/ServiceAreaContactSection';
import { FaqAndFooterSection } from './components/FaqAndFooterSection';
import { SERVICES_DATA } from './data/servicesData';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);

  const handleBookService = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060911] text-white">
      <Navbar onBookClick={handleBookService} />
      <main className="flex-1">
        <HeroSection onSelectServiceForBooking={handleBookService} />
        <PackagesSection onSelectServiceForBooking={handleBookService} />
        <PaintProtectionSection onBookClick={handleBookService} />
        <WhyChooseSection onBookClick={handleBookService} />
        <GallerySection onBookClick={handleBookService} />
        <AboutAndProcessSection onSelectServiceForBooking={handleBookService} />
        <ServiceAreaContactSection
          selectedServiceId={selectedServiceId}
          onChangeSelectedServiceId={setSelectedServiceId}
        />
        <FaqAndFooterSection onBookClick={handleBookService} />
      </main>
    </div>
  );
}
