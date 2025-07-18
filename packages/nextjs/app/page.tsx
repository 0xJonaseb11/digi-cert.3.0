"use client";

import { useState } from "react";
import BlockchainNetworksSection from "../components/landing/BlockchainNetworksSection";
import CTASection from "../components/landing/CTASection";
import FAQSection from "../components/landing/FAQSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import FooterSection from "../components/landing/FooterSection";
import Header from "../components/landing/Header";
import HeroSection from "../components/landing/HeroSection";
import MobileMenu from "../components/landing/MobileMenu";
import NFTCertificatesSection from "../components/landing/NFTCertificatesSection";
import SolutionsSection from "../components/landing/SolutionsSection";
import TechnologyStackSection from "../components/landing/TechnologyStackSection";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      {mobileMenuOpen && <MobileMenu />}
      <HeroSection />
      <BlockchainNetworksSection />
      <FeaturesSection />
      <NFTCertificatesSection />
      <SolutionsSection />
      <TechnologyStackSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
