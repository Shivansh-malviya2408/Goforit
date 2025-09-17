import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TravelOptions from "@/components/TravelOptions"; // Import the new component
import LocationsPreview from "@/components/LocationsPreview";
import PlansSection from "@/components/PlansSection";
import AdvertisementSection from "@/components/AdvertisementSection";
import ContactSection from "@/components/ContactSection";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TravelOptions /> {/* Add the new component here */}
      <LocationsPreview />
      <PlansSection />
      <AdvertisementSection />
      <ContactSection />
      <Chatbot />
    </div>
  );
};

export default Index;