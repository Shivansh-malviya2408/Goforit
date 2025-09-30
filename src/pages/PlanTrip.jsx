 
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Send, Sparkles, Compass, Gem, PlusCircle, MapPin, Clock, Plane, Hotel, Edit, Calendar, Users, Utensils, Camera, MountainSnow, FerrisWheel, Briefcase, ShoppingCart, Drama, Ship, Palmtree, CheckCircle, Train, Mountain, Waves, Landmark,
    Link, Loader2 // <-- Import the Loader2 icon for the spinner
} from "lucide-react";

// --- Mock Data ---


 


const destinationsData = {
    "rajasthan": {
        name: "Royal Rajasthan",
        sightseeing: ["City Palace, Udaipur", "Amber Fort, Jaipur", "Hawa Mahal, Jaipur", "Mehrangarh Fort, Jodhpur", "Jaisalmer Fort", "Umaid Bhawan Palace", "Lake Pichola"],
        dining: ["Spice Court", "Chokhi Dhani", "Laxmi Misthan Bhandar", "Gypsy Dining Hall", "On The Rocks", "Sheesh Mahal"],
        activities: ["Desert Safari in Jaisalmer", "Hot Air Ballooning in Jaipur", "Ziplining at Mehrangarh", "Cultural Puppet Show", "Boating on Lake Pichola"],
        shopping: ["Johari Bazaar", "Bapu Bazaar", "Sadar Bazaar"]
    },
    "kerala": {
        name: "Kerala Backwaters & Hills",
        sightseeing: ["Fort Kochi", "Chinese Fishing Nets", "Munnar Tea Gardens", "Periyar National Park", "Mattupetty Dam"],
        dining: ["Kashi Art Cafe", "Dal Roti", "The Rice Boat", "Saravana Bhavan", "Grand Pavilion"],
        activities: ["Backwater Houseboat Cruise", "Kathakali Performance", "Spice Plantation Tour", "Ayurvedic Massage", "Elephant Junction"],
        shopping: ["Lulu Mall", "Jew Town", "Local Spice Markets"]
    },
    "goa": {
        name: "Goa Beach Paradise",
        sightseeing: ["Basilica of Bom Jesus", "Fort Aguada", "Dudhsagar Falls", "Old Goa Churches"],
        dining: ["Britto's at Baga", "Thalassa, Vagator", "Martin's Corner, Betalbatim", "Fisherman's Wharf", "Curlies Beach Shack"],
        activities: ["Water Sports at Baga Beach", "Dolphin Sighting Trip", "Scuba Diving at Grande Island", "Visit a Spice Farm", "Casino Royale"],
        shopping: ["Anjuna Flea Market", "Calangute Market Square", "Saturday Night Market"]
    },
    "himachal": {
        name: "Himachal Mountain Escape",
        sightseeing: ["Hadimba Temple, Manali", "Solang Valley", "Rohtang Pass", "Jakhoo Temple, Shimla", "The Ridge, Shimla"],
        dining: ["Johnson's Cafe", "Cafe Simla Times", "The Corner House", "Dylan's Toasted and Roasted"],
        activities: ["Paragliding in Solang", "River Rafting in Kullu", "Trekking to Triund", "Toy Train Ride in Shimla"],
        shopping: ["Mall Road, Shimla", "Old Manali Market"]
    },
    "varanasi": {
        name: "Spiritual Varanasi",
        sightseeing: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sarnath", "Manikarnika Ghat"],
        dining: ["Kashi Chaat Bhandar", "Deena Chaat Bhandar", "Blue Lassi"],
        activities: ["Ganga Aarti Ceremony", "Sunrise Boat Ride", "Walking tour of the Ghats"],
        shopping: ["Thatheri Bazar", "Godowlia Market"]
    },
    "default": {
        name: "Awesome Trip",
        sightseeing: ["Historic Landmark", "Famous Museum", "Scenic Viewpoint", "Botanical Gardens"],
        dining: ["Top Rated Local Restaurant", "Quaint Cafe", "Fine Dining Experience", "Street Food Tour"],
        activities: ["Guided City Tour", "Cooking Class", "River Cruise", "Hiking Trail"],
        shopping: ["Main Shopping Street", "Local Artisan Market"]
    }
};

const activityIcons = {
    transport: { icon: Plane, color: "text-blue-400" },
    accommodation: { icon: Hotel, color: "text-purple-400" },
    sightseeing: { icon: Camera, color: "text-pink-400" },
    dining: { icon: Utensils, color: "text-orange-400" },
    activity: { icon: FerrisWheel, color: "text-teal-400" },
    shopping: { icon: ShoppingCart, color: "text-yellow-400" },
    entertainment: { icon: Drama, color: "text-red-400" },
    default: { icon: MapPin, color: "text-gray-400" },
};

const packageData = {
    cultural: [
        { id: 'c1', name: 'Golden Triangle Odyssey', image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Explore the iconic cities of Delhi, Agra, and Jaipur.', durations: [{ days: 5, price: '₹35,000' }, { days: 7, price: '₹45,000' }] },
        { id: 'c2', name: 'Colors of Rajasthan', image: 'https://images.unsplash.com/photo-1602643163983-ed0babc39797?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFqYXN0aGFuJTIwY3VsdHVyZXxlbnwwfHwwfHx8MA%3D%3D', description: 'Experience the royal heritage of Udaipur and Jodhpur.', durations: [{ days: 4, price: '₹30,000' }, { days: 6, price: '₹42,000' }] },
        { id: 'c3', name: 'South India Temple Tour', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9xDw5hZBl16IAVWYRXT8kVgg0Srw3B8zPeg&s', description: 'Visit the magnificent temples of Madurai and Thanjavur.', durations: [{ days: 6, price: '₹48,000' }] },
    ],
    adventure: [
        { id: 'a1', name: 'Himalayan High', image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Trekking and paragliding in Manali and Solang Valley.', durations: [{ days: 6, price: '₹40,000' }, { days: 8, price: '₹55,000' }] },
        { id: 'a2', name: 'Rishikesh River Rush', image: 'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'White water rafting and bungee jumping.', durations: [{ days: 4, price: '₹28,000' }] },
        { id: 'a3', name: 'Scuba in Andaman', image: 'https://images.pexels.com/photos/1473199/pexels-photo-1473199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', description: 'Explore the underwater world of the Andaman Islands.', durations: [{ days: 5, price: '₹58,000' }] },
    ],
    hiddenGems: [
        { id: 'hg1', name: 'Meghalaya\'s Wonders', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1P0fPVPdsfoUDLS4T9g-B58TsnmeXNaFy6Q&s', description: 'Discover living root bridges and serene lakes.', durations: [{ days: 7, price: '₹60,000' }] },
        { id: 'hg2', name: 'Hampi\'s Boulders', image: 'https://farm2.staticflickr.com/1844/29676734957_bc52522c08_b.jpg', description: 'Explore the ancient ruins and unique landscape of Hampi.', durations: [{ days: 4, price: '₹32,000' }] },
        { id: 'hg3', name: 'Spiti Valley Expedition', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHn0hdKyFgQYy0vJSw0Nw5QLPiuFqgnodJTQ&s', description: 'A road trip through the cold desert mountains.', durations: [{ days: 8, price: '₹75,000' }] },
    ],
    religious: [
        { id: 'r1', name: 'Varanasi Spiritual Sojourn', image: 'https://bhramantoo.com/uploads/0000/6/2025/05/08/download-19.png', description: 'Experience the Ganga Aarti and ancient temples of Kashi.', durations: [{ days: 4, price: '₹25,000' }] },
        { id: 'r2', name: 'Golden Temple & Amritsar', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1200px-Mthe_Golden_Temple_of_Amrithsar_7.jpg', description: 'A journey of peace to the Golden Temple and Wagah Border.', durations: [{ days: 4, price: '₹22,000' }] },
        { id: 'r3', name: 'Char Dham Yatra', image: 'https://www.shrineyatra.in/wp-content/uploads/2024/05/chardham-yatra-package.webp', description: 'A pilgrimage to the four holy sites in Uttarakhand.', durations: [{ days: 8, price: '₹80,000' }] },
    ],
};


// --- Helper Functions ---
const getRandomElement = (arr, used = new Set()) => {
    if (arr.length === 0) return null;
    if (used.size >= arr.length) used.clear();
    let element;
    do {
        element = arr[Math.floor(Math.random() * arr.length)];
    } while (used.has(element));
    used.add(element);
    return element;
};

const parsePrice = (priceString = "") => {
    return Number(priceString.replace(/[^0-9]/g, ''));
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

//  



const  PlanTrip = () => {

  
  const navigate=useNavigate();
  function handlePayment()
  {
    navigate('/payment');
  }
  


  const [activeTab, setActiveTab] = useState("planner");
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [isEditingItinerary, setIsEditingItinerary] = useState(false);
  const [isViewingPackage, setIsViewingPackage] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDurations, setSelectedDurations] = useState({});
  const [editorActiveTab, setEditorActiveTab] = useState('flights');
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    duration: "",
    budget: "",
    travelers: "",
    preferences: ""
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [transportMode, setTransportMode] = useState('flight');
  const [isGenerating, setIsGenerating] = useState(false); // <-- NEW STATE FOR LOADER

  const generateItinerary = async () => { // <-- MADE ASYNC
    setIsGenerating(true); // <-- START LOADER

    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 3500)); // 1.5 second delay

    const duration = parseInt(tripDetails.duration.split(' ')[0], 10);
    if (!duration || !tripDetails.destination) {
        setIsGenerating(false); // Stop loader if validation fails
        return;
    }

    const destinationKey = Object.keys(destinationsData).find(key => 
        tripDetails.destination.toLowerCase().includes(key)
    ) || 'default';
    
    const data = destinationsData[destinationKey];
    
    const usedSightseeing = new Set();
    const usedDining = new Set();
    const usedActivities = new Set();
    const usedShopping = new Set();

    const days = Array.from({ length: duration }, (_, i) => {
        const dayActivities = [
            { time: "10:00 AM", title: `Visit ${getRandomElement(data.sightseeing, usedSightseeing)}`, type: "sightseeing", location: `${tripDetails.destination}` },
            { time: "1:00 PM", title: `Lunch at ${getRandomElement(data.dining, usedDining)}`, type: "dining", location: `Local Area` },
            { time: "3:00 PM", title: getRandomElement(data.activities, usedActivities), type: "activity", location: `Varies` },
            { time: "7:00 PM", title: `Dinner at ${getRandomElement(data.dining, usedDining)}`, type: "dining", location: `Hotel Area` },
        ];

        const alternatives = [
            { title: `Explore ${getRandomElement(data.sightseeing, usedSightseeing)}`, type: "sightseeing"},
            { title: `Try ${getRandomElement(data.activities, usedActivities)}`, type: "activity"},
            { title: `Shop at ${getRandomElement(data.shopping, usedShopping)}`, type: "shopping"},
        ];

        return { day: i + 1, city: tripDetails.destination, activities: dayActivities, alternatives };
    });

    const itinerary = {
        destination: data.name,
        duration: tripDetails.duration,
        budget: tripDetails.budget,
        days,
        flights: {
            morning: [
                { id: 'm1', airline: 'IndiGo', time: '6:00 AM', duration: '2h 15m', class: 'Economy', price: '₹7,500' },
                { id: 'm2', airline: 'Vistara', time: '7:30 AM', duration: '2h 05m', class: 'Premium Economy', price: '₹11,000' },
                { id: 'm3', airline: 'Air India', time: '8:45 AM', duration: '2h 10m', class: 'Business', price: '₹25,000' },
                { id: 'm4', airline: 'SpiceJet', time: '9:15 AM', duration: '2h 20m', class: 'Economy', price: '₹7,200' },
            ],
            afternoon: [
                { id: 'a1', airline: 'IndiGo', time: '1:00 PM', duration: '2h 15m', class: 'Economy', price: '₹6,800' },
                { id: 'a2', airline: 'Vistara', time: '2:30 PM', duration: '2h 05m', class: 'Premium Economy', price: '₹10,500' },
                { id: 'a3', airline: 'Air India', time: '3:45 PM', duration: '2h 10m', class: 'Business', price: '₹24,000' },
                { id: 'a4', airline: 'Akasa Air', time: '4:15 PM', duration: '2h 20m', class: 'Economy', price: '₹6,500' },
            ],
            evening: [
                { id: 'e1', airline: 'IndiGo', time: '7:00 PM', duration: '2h 15m', class: 'Economy', price: '₹8,200' },
                { id: 'e2', airline: 'Vistara', time: '8:30 PM', duration: '2h 05m', class: 'Premium Economy', price: '₹12,500' },
                { id: 'e3', airline: 'Air India', time: '9:45 PM', duration: '2h 10m', class: 'Business', price: '₹28,000' },
                { id: 'e4', airline: 'SpiceJet', time: '10:15 PM', duration: '2h 20m', class: 'Economy', price: '₹7,900' },
            ]
        },
        trains: [
            { id: 't1', name: 'Rajdhani Express', time: '7:00 AM', duration: '12h 30m', class: '1st AC', price: '₹4,800' },
            { id: 't2', name: 'Shatabdi Express', time: '2:15 PM', duration: '14h 00m', class: '2nd AC', price: '₹3,200' },
            { id: 't3', name: 'Duronto Express', time: '10:00 PM', duration: '11h 45m', class: 'Sleeper', price: '₹1,500' },
            { id: 't4', name: 'Garib Rath', time: '8:00 AM', duration: '15h 00m', class: '3rd AC', price: '₹2,200' },
        ],
        hotels: {
            budget: [
                { id: 'b1', name: 'Cozy Inn', price: '₹2,500/night', rating: 3.8, amenities: 'Wi-Fi, AC' },
                { id: 'b2', name: 'Travelers Hub', price: '₹2,800/night', rating: 4.0, amenities: 'Wi-Fi, Breakfast' },
                { id: 'b3', name: 'Simple Stays', price: '₹2,200/night', rating: 3.5, amenities: 'Clean Rooms, AC' },
                { id: 'b4', name: 'City Center Rooms', price: '₹3,000/night', rating: 4.1, amenities: 'Wi-Fi, TV' },
            ],
            midRange: [
                { id: 'mr1', name: 'Grand Hotel', price: '₹5,500/night', rating: 4.5, amenities: 'Pool, Wi-Fi, Restaurant' },
                { id: 'mr2', name: 'The Pearl', price: '₹6,200/night', rating: 4.6, amenities: 'Pool, Spa, Breakfast' },
                { id: 'mr3', name: 'Meridian Suites', price: '₹5,800/night', rating: 4.4, amenities: 'Gym, Wi-Fi' },
                { id: 'mr4', name: 'Park View', price: '₹6,500/night', rating: 4.7, amenities: 'Pool, City View' },
            ],
            luxury: [
                { id: 'l1', name: 'The Oberoi', price: '₹20,000/night', rating: 4.9, amenities: 'Infinity Pool, Fine Dining' },
                { id: 'l2', name: 'Taj Palace', price: '₹25,000/night', rating: 5.0, amenities: 'Spa, Butler Service' },
                { id: 'l3', name: 'Leela Palace', price: '₹22,500/night', rating: 4.9, amenities: 'Private Balconies, Lake View' },
                { id: 'l4', name: 'ITC Grand', price: '₹18,000/night', rating: 4.8, amenities: 'Golf Course, Multiple Restaurants' },
            ],
        }
    };
    setGeneratedItinerary(itinerary);
    setSelectedFlight(itinerary.flights.afternoon[0]); // Default selection
    setSelectedHotel(itinerary.hotels.midRange[0]); // Default selection
    setSelectedTrain(itinerary.trains[0]);
    setTransportMode('flight');

    setIsGenerating(false); // <-- STOP LOADER
  };

  const totalPrice = useMemo(() => {
    if (!generatedItinerary) return { subtotal: 0, gst: 0, total: 0 };

    const numTravelers = tripDetails.travelers ? parseInt(tripDetails.travelers.match(/\d+/)?.[0] || '1', 10) : 1;
    const numDays = generatedItinerary.duration ? parseInt(generatedItinerary.duration.split(' ')[0], 10) : 1;

    let transportCost = 0;
    if (transportMode === 'flight' && selectedFlight) {
        transportCost = parsePrice(selectedFlight.price) * numTravelers;
    } else if (transportMode === 'train' && selectedTrain) {
        transportCost = parsePrice(selectedTrain.price) * numTravelers;
    }

    const hotelCost = selectedHotel ? parsePrice(selectedHotel.price) * numDays : 0;

    const subtotal = transportCost + hotelCost;
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    return { subtotal, gst, total };
  }, [selectedFlight, selectedHotel, selectedTrain, transportMode, generatedItinerary, tripDetails.travelers]);


  const openEditor = (tab) => {
    setEditorActiveTab(tab);
    setIsEditingItinerary(true);
  }

  const handleViewPackage = (pkg) => {
      const duration = selectedDurations[pkg.id] || pkg.durations[0];
      const destinationKey = pkg.name.split(' ')[0].toLowerCase();
      const itineraryData = destinationsData[destinationKey] || destinationsData.default;

      const days = Array.from({ length: duration.days }, (_, i) => ({
        day: i + 1,
        city: itineraryData.name,
        activities: [
            { time: "10:00 AM", title: `Visit ${getRandomElement(itineraryData.sightseeing)}`, type: "sightseeing"},
            { time: "1:00 PM", title: `Lunch at ${getRandomElement(itineraryData.dining)}`, type: "dining"},
            { time: "3:00 PM", title: getRandomElement(itineraryData.activities), type: "activity"},
            { time: "7:00 PM", title: `Dinner`, type: "dining"},
        ]
      }));
      
      setSelectedPackage({ ...pkg, selectedDuration: duration, itinerary: {days} });
      setIsViewingPackage(true);
  }

  const ItineraryEditor = () => (
    <Dialog open={isEditingItinerary} onOpenChange={setIsEditingItinerary}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Your Trip</DialogTitle>
          <DialogDescription>Select flights, hotels, and activities that best suit your travel style.</DialogDescription>
        </DialogHeader>
        
        <Tabs value={editorActiveTab} onValueChange={setEditorActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="trains">Trains</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flights" className="space-y-4">
            {Object.entries(generatedItinerary?.flights || {}).map(([timeOfDay, flights]) => (
                <div key={timeOfDay}>
                    <h3 className="text-lg font-semibold capitalize mb-2">{timeOfDay} Flights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {flights.map((flight) => (
                            <Card key={flight.id} onClick={() => { setSelectedFlight(flight); setTransportMode('flight'); }} className={`cursor-pointer hover:shadow-lg transition-all ${selectedFlight?.id === flight.id && transportMode === 'flight' ? 'ring-2 ring-primary border-primary' : ''}`}>
                                <CardContent className="p-4 relative">
                                    {selectedFlight?.id === flight.id && transportMode === 'flight' && <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold">{flight.airline}</span>
                                        <Plane className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{flight.time} - {flight.duration}</p>
                                    <p className="text-sm text-foreground">{flight.class}</p>
                                    <p className="text-lg font-bold text-primary mt-1">{flight.price}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
          </TabsContent>

          <TabsContent value="trains" className="space-y-4">
            <h3 className="text-lg font-semibold">Train Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(generatedItinerary?.trains || []).map((train) => (
                    <Card key={train.id} onClick={() => { setSelectedTrain(train); setTransportMode('train'); }} className={`cursor-pointer hover:shadow-lg transition-all ${selectedTrain?.id === train.id && transportMode === 'train' ? 'ring-2 ring-primary border-primary' : ''}`}>
                        <CardContent className="p-4 relative">
                            {selectedTrain?.id === train.id && transportMode === 'train' && <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />}
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{train.name}</span>
                                <Train className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">{train.time} - {train.duration}</p>
                            <p className="text-sm text-foreground">{train.class}</p>
                            <p className="text-lg font-bold text-primary mt-1">{train.price}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hotels" className="space-y-4">
            {Object.entries(generatedItinerary?.hotels || {}).map(([category, hotels]) => (
                <div key={category}>
                    <h3 className="text-lg font-semibold capitalize mb-2">{category.replace(/([A-Z])/g, ' $1').trim()} Hotels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {hotels.map((hotel) => (
                            <Card key={hotel.id} onClick={() => setSelectedHotel(hotel)} className={`cursor-pointer hover:shadow-lg transition-all ${selectedHotel?.id === hotel.id ? 'ring-2 ring-primary border-primary' : ''}`}>
                                <CardContent className="p-4 relative">
                                    {selectedHotel?.id === hotel.id && <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold">{hotel.name}</span>
                                        <Hotel className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">Rating: {hotel.rating}/5</p>
                                    <p className="text-xs text-muted-foreground">{hotel.amenities}</p>
                                    <p className="text-lg font-bold text-primary mt-1">{hotel.price}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
          </TabsContent>
          
          <TabsContent value="activities" className="space-y-4">
            <h3 className="text-lg font-semibold">Customize Your Activities</h3>
            {generatedItinerary?.days.map((day, dayIndex) => (
              <Card key={dayIndex}>
                <CardHeader>
                  <CardTitle className="text-lg">Day {day.day} - {day.city}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-center justify-between p-3 bg-card/80 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{activity.time}</span>
                          <span className="text-muted-foreground">{activity.title}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsEditingItinerary(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditingItinerary(false)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const PackageItineraryViewer = () => (
    <Dialog open={isViewingPackage} onOpenChange={setIsViewingPackage}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader>
                <DialogTitle className="text-2xl">{selectedPackage?.name}</DialogTitle>
                <DialogDescription>
                    {selectedPackage?.selectedDuration.days} Day Itinerary
                </DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto pr-4 space-y-6">
                {selectedPackage?.itinerary.days.map((day) => (
                     <Card key={day.day} className="bg-card/50 border-border/50 overflow-hidden">
                     <CardHeader className="bg-secondary/30 p-4">
                       <CardTitle className="flex items-center space-x-3 text-lg">
                         <div className="p-2 bg-primary/20 text-primary rounded-lg">
                             <Calendar className="w-5 h-5" />
                         </div>
                         <span className="text-foreground">Day {day.day} in {day.city}</span>
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="p-4 md:p-6">
                       <div className="relative pl-6">
                         <div className="absolute left-0 top-0 h-full w-0.5 bg-border/50 ml-[11px] rounded"></div>
                         {day.activities.map((activity, actIndex) => {
                             const { icon: Icon, color } = activityIcons[activity.type] || activityIcons.default;
                             return (
                               <div key={actIndex} className="relative flex items-start space-x-6 mb-8 last:mb-0">
                                 <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center -translate-x-1/2 bg-background rounded-full border-2 border-secondary">
                                     <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                                 </div>
                                 <div className="pt-1.5">
                                   <p className="text-xs font-semibold text-muted-foreground w-20">{activity.time}</p>
                                 </div>
                                 <div className="flex-1 -mt-1">
                                     <div className="flex items-center gap-2">
                                         <Icon className={`w-5 h-5 ${color}`} />
                                         <p className="font-semibold text-foreground">{activity.title}</p>
                                     </div>
                                 </div>
                               </div>
                             );
                         })}
                       </div>
                     </CardContent>
                   </Card>
                ))}
            </div>
        </DialogContent>
    </Dialog>
  )

  const PackageCard = ({ pkg }) => {
    const [travelers, setTravelers] = useState(1);
    const selectedDuration = selectedDurations[pkg.id] || pkg.durations[0];
    
    const packageTotalPrice = useMemo(() => {
        const pricePerPerson = parsePrice(selectedDuration.price);
        return pricePerPerson * travelers;
    }, [selectedDuration, travelers]);

    return (
        <Card className="bg-card/50 border-border/50 overflow-hidden flex flex-col">
            <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover"/>
            <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription className="h-12">{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4 items-end">
                    <div>
                        <Label className="text-xs text-muted-foreground">Duration</Label>
                        <Select 
                            defaultValue={JSON.stringify(pkg.durations[0])}
                            onValueChange={(value) => {
                                setSelectedDurations(prev => ({ ...prev, [pkg.id]: JSON.parse(value) }))
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {pkg.durations.map(d => (
                                    <SelectItem key={d.days} value={JSON.stringify(d)}>{d.days} Days</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Per Person</p>
                        <p className="font-semibold text-foreground">{selectedDuration.price}</p>
                    </div>
                </div>
                
                <div>
                    <Label htmlFor={`travelers-${pkg.id}`} className="text-xs text-muted-foreground">Travelers</Label>
                     <Select
                        value={String(travelers)}
                        onValueChange={(value) => setTravelers(Number(value))}
                    >
                        <SelectTrigger id={`travelers-${pkg.id}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <SelectItem key={num} value={String(num)}>{num} {num > 1 ? 'people' : 'person'}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                 <div className="text-center pt-2">
                    <p className="text-muted-foreground text-sm">Total Price (excl. GST)</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(packageTotalPrice)}</p>
                </div>

                <div className="flex gap-2 pt-2">
                    <Button className="w-full" variant="outline" onClick={() => handleViewPackage(pkg)}>
                        View Itinerary
                    </Button>
                    
                   <Button  className="w-full bg-gradient-hero hover:opacity-90">
                        Book Now
                    </Button>
                  
                </div>
            </CardContent>
        </Card>
    )
  }
 


  return (
    <section id="trip-planner" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Hey, I'm your personal{" "}
            <span className="gradient-text">Trip Planner</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Tell me what you want, and I'll handle the rest. Flights, Hotels,
            Trip Planner - all in seconds.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="planner">Trip Planner</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
            <TabsTrigger value="adventure">Adventure</TabsTrigger>
            <TabsTrigger value="hiddenGems">Hidden Gems</TabsTrigger>
            <TabsTrigger value="religious">Religious</TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="space-y-8">
            {!generatedItinerary ? (
              <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle>Plan Your Perfect Trip</CardTitle>
                  <CardDescription>Fill in the details below to get a customized itinerary.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Select value={tripDetails.destination} onValueChange={(value) => setTripDetails({...tripDetails, destination: value})}>
                        <SelectTrigger id="destination">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Goa">Goa</SelectItem>
                          <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="Kerala">Kerala</SelectItem>
                          <SelectItem value="Himachal">Himachal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={tripDetails.duration} onValueChange={(value) => setTripDetails({...tripDetails, duration: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2 days">2 Days</SelectItem>
                          <SelectItem value="3 days">3 Days</SelectItem>
                          <SelectItem value="4 days">4 Days</SelectItem>
                          <SelectItem value="5 days">5 Days</SelectItem>
                          <SelectItem value="7 days">7 Days</SelectItem>
                          <SelectItem value="10 days">10 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={tripDetails.budget} onValueChange={(value) => setTripDetails({...tripDetails, budget: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="₹15,000 - ₹30,000">₹15,000 - ₹30,000</SelectItem>
                          <SelectItem value="₹30,000 - ₹60,000">₹30,000 - ₹60,000</SelectItem>
                          <SelectItem value="₹60,000 - ₹1,00,000">₹60,000 - ₹1,00,000</SelectItem>
                          <SelectItem value="₹1,00,000+">₹1,00,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="travelers">Number of Travelers</Label>
                      <Select value={tripDetails.travelers} onValueChange={(value) => setTripDetails({...tripDetails, travelers: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select travelers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Solo</SelectItem>
                          <SelectItem value="2">Couple</SelectItem>
                          <SelectItem value="3-4">Small Group (3-4)</SelectItem>
                          <SelectItem value="5+">Large Group (5+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="preferences">Special Preferences</Label>
                    <Textarea
                      id="preferences"
                      placeholder="e.g., interested in history, prefer spicy food, etc."
                      value={tripDetails.preferences}
                      onChange={(e) => setTripDetails({...tripDetails, preferences: e.target.value})}
                    />
                  </div>
                  <Button 
                    onClick={generateItinerary} 
                    className="w-full bg-gradient-hero hover:opacity-90"
                    disabled={!tripDetails.destination || !tripDetails.duration || isGenerating} // <-- DISABLED WHILE GENERATING
                  >
                    {isGenerating ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> // <-- LOADER SPINNER
                    ) : (
                        <Sparkles className="mr-2 h-5 w-5" />
                    )}
                    {isGenerating ? "Generating..." : "Generate AI Itinerary"} {/* <-- BUTTON TEXT CHANGES */}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-bold gradient-text">{generatedItinerary.destination}</h3>
                    <p className="text-muted-foreground">{generatedItinerary.duration} • {generatedItinerary.budget}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => openEditor('flights')}>
                      <Edit className="mr-2 h-4 w-4" />
                      Customize
                    </Button>
                    <Button onClick={() => setGeneratedItinerary(null)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Plan a New Trip
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2 space-y-6">
                    {generatedItinerary.days.map((day) => (
                      <Card key={day.day} className="bg-card/50 border-border/50 overflow-hidden">
                        <CardHeader className="bg-secondary/30 p-4">
                          <CardTitle className="flex items-center space-x-3 text-lg">
                            <div className="p-2 bg-primary/20 text-primary rounded-lg">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <span className="text-foreground">Day {day.day} in {day.city}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                          <div className="relative pl-6">
                            <div className="absolute left-0 top-0 h-full w-0.5 bg-border/50 ml-[11px] rounded"></div>
                            {day.activities.map((activity, actIndex) => {
                                const { icon: Icon, color } = activityIcons[activity.type] || activityIcons.default;
                                return (
                                  <div key={actIndex} className="relative flex items-start space-x-6 mb-8 last:mb-0">
                                    <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center -translate-x-1/2 bg-background rounded-full border-2 border-secondary">
                                        <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                                    </div>
                                    <div className="pt-1.5">
                                      <p className="text-xs font-semibold text-muted-foreground w-20">{activity.time}</p>
                                    </div>
                                    <div className="flex-1 -mt-1">
                                        <div className="flex items-center gap-2">
                                            <Icon className={`w-5 h-5 ${color}`} />
                                            <p className="font-semibold text-foreground">{activity.title}</p>
                                        </div>
                                      <p className="text-sm text-muted-foreground mt-1 ml-7">{activity.location}</p>
                                    </div>
                                  </div>
                                );
                            })}
                          </div>
                           <div className="mt-6 border-t border-border/50 pt-4">
                                <h4 className="font-semibold text-foreground mb-3">Alternatives & Suggestions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {day.alternatives.map((alt, altIndex) => {
                                        const { icon: Icon, color } = activityIcons[alt.type] || activityIcons.default;
                                        return (
                                            <div key={altIndex} className="flex items-center text-sm p-2 rounded-md bg-secondary/20">
                                                <Icon className={`w-4 h-4 mr-2 shrink-0 ${color}`} />
                                                <span className="text-muted-foreground">{alt.title}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-6 lg:sticky top-24">
                    <Card className="bg-card/50 border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" onClick={() => openEditor('flights')}>
                          <Plane className="mr-2 h-4 w-4" />
                          Book Flights
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => openEditor('trains')}>
                          <Train className="mr-2 h-4 w-4" />
                          Book Trains
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => openEditor('hotels')}>
                          <Hotel className="mr-2 h-4 w-4" />
                          Reserve Hotels
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => openEditor('activities')}>
                          <Briefcase className="mr-2 h-4 w-4" />
                          Add Activities
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg">Trip Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Duration:</span>
                                <span className="font-medium text-foreground">{generatedItinerary.duration}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Travelers:</span>
                                <span className="font-medium text-foreground">{tripDetails.travelers}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal:</span>
                                <span className="font-medium text-foreground">{formatCurrency(totalPrice.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">GST (18%):</span>
                                <span className="font-medium text-foreground">{formatCurrency(totalPrice.gst)}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold border-t border-border/50 pt-2 mt-2">
                                <span className="text-foreground">Total Price:</span>
                                <span className="text-primary">{formatCurrency(totalPrice.total)}</span>
                            </div>
                        </div>
                        <Button className="w-full bg-gradient-hero hover:opacity-90" onClick={()=>handlePayment()}>
                            Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Other Tabs Content */}
           <TabsContent value="cultural">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageData.cultural.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                </div>
            </TabsContent>
            <TabsContent value="adventure">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageData.adventure.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                </div>
            </TabsContent>
            <TabsContent value="hiddenGems">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageData.hiddenGems.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                </div>
            </TabsContent>
            <TabsContent value="religious">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageData.religious.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                </div>
            </TabsContent>

        </Tabs>
        <ItineraryEditor />
        <PackageItineraryViewer />
      </div>
    </section>
  );
};

export default PlanTrip;