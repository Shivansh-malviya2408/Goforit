// src/pages/Index.jsx

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TravelOptions from "@/components/TravelOptions";
import LocationsPreview from "@/components/LocationsPreview";
import PlansSection from "@/components/PlansSection";
import AdvertisementSection from "@/components/AdvertisementSection";
import TestimonialsSection from "@/components/TestimonialsSection"; // Import the new component
import ContactSection from "@/components/ContactSection";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TravelOptions />
      <LocationsPreview />
      <PlansSection />
      <AdvertisementSection />
      <TestimonialsSection /> {/* Add the new component here */}
      <ContactSection />
      <Chatbot />
    </div>
  );
};

export default Index;