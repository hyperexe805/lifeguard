import { Suspense } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import ServicesSection from "./components/ServiceSection";
import FeaturesSection from "./components/FeaturesSection";
import ContactSection from "./components/Contact/ContactSection";
import TestimonialsSection from "./components/Testimonials/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <Suspense fallback={<div>Cargando testimonios...</div>}>
          <TestimonialsSection />
        </Suspense>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
