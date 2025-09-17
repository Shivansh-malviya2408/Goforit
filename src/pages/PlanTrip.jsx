import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Users, Clock, Plane, Train, Hotel, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const PlanTrip = () => {
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState("");
  const [days, setDays] = useState("");
  const [startDate, setStartDate] = useState();
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const { toast } = useToast();

  const generateItinerary = async () => {
    if (!destination || !passengers || !days || !startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI generation with realistic travel planning
    setTimeout(() => {
      const mockItinerary = {
        destination,
        duration: `${days} days`,
        travelers: passengers,
        totalBudget: budget ? `₹${budget}` : "₹25,000 - ₹40,000",
        schedule: [
          {
            day: 1,
            title: "Arrival & Check-in",
            activities: [
              { time: "10:00 AM", activity: "Flight arrival at destination", type: "transport" },
              { time: "12:00 PM", activity: "Hotel check-in & freshen up", type: "hotel" },
              { time: "2:00 PM", activity: "Local sightseeing & lunch", type: "activity" },
              { time: "7:00 PM", activity: "Welcome dinner at local restaurant", type: "dining" }
            ]
          },
          {
            day: 2,
            title: "Main Attractions",
            activities: [
              { time: "8:00 AM", activity: "Breakfast & early start", type: "dining" },
              { time: "9:30 AM", activity: "Visit iconic landmarks", type: "activity" },
              { time: "1:00 PM", activity: "Traditional lunch experience", type: "dining" },
              { time: "3:00 PM", activity: "Cultural tour & shopping", type: "activity" },
              { time: "8:00 PM", activity: "Sunset viewing & dinner", type: "activity" }
            ]
          }
        ],
        bookings: {
          flights: "₹8,500 per person (confirmed)",
          hotels: "₹3,200 per night (4-star accommodation)",
          transport: "₹1,500 (local transportation included)",
          activities: "₹2,800 per person (all attractions covered)"
        },
        recommendations: [
          "Pack light cotton clothes for daytime",
          "Carry sunscreen and comfortable walking shoes",
          "Keep copies of important documents",
          "Download offline maps for easy navigation"
        ]
      };

      setItinerary(mockItinerary);
      setLoading(false);
      
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized travel plan is ready",
      });
    }, 3000);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "transport": return <Plane className="h-4 w-4" />;
      case "hotel": return <Hotel className="h-4 w-4" />;
      case "train": return <Train className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 pt-20">
          <h1 className="text-4xl font-bold gradient-text mb-4">Plan Your Perfect Trip</h1>
          <p className="text-muted-foreground text-lg">Let our AI create a personalized itinerary with real-time bookings</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Trip Planning Form */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Trip Details
              </CardTitle>
              <CardDescription>
                Tell us about your travel preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination *</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kerala">Kerala (Backwaters)</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan (Desert Safari)</SelectItem>
                    <SelectItem value="himachal">Himachal Pradesh (Mountains)</SelectItem>
                    <SelectItem value="goa">Goa (Beaches)</SelectItem>
                    <SelectItem value="kashmir">Kashmir (Valley)</SelectItem>
                    <SelectItem value="uttarakhand">Uttarakhand (Adventure)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passengers">Passengers *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passengers"
                      type="number"
                      placeholder="2"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="pl-10"
                      min="1"
                      max="20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="days">Duration (Days) *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="days"
                      type="number"
                      placeholder="5"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="pl-10"
                      min="1"
                      max="30"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (₹)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="25000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferences">Special Preferences</Label>
                <Textarea
                  id="preferences"
                  placeholder="Adventure activities, vegetarian food, cultural experiences..."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                />
              </div>

              <Button 
                onClick={generateItinerary} 
                className="w-full" 
                disabled={loading}
                size="lg"
              >
                {loading ? "Generating Your Perfect Trip..." : "Generate AI Itinerary"}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Itinerary */}
          {itinerary && (
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Your Personalized Itinerary
                </CardTitle>
                <CardDescription>
                  {itinerary.destination} • {itinerary.duration} • {itinerary.travelers} travelers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget Overview */}
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h3 className="font-semibold mb-2">Total Budget: {itinerary.totalBudget}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Flights: {itinerary.bookings.flights}</div>
                    <div>Hotels: {itinerary.bookings.hotels}</div>
                    <div>Transport: {itinerary.bookings.transport}</div>
                    <div>Activities: {itinerary.bookings.activities}</div>
                  </div>
                </div>

                {/* Daily Schedule */}
                <div className="space-y-4">
                  {itinerary.schedule.map((day) => (
                    <div key={day.day} className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Day {day.day}: {day.title}</h3>
                      <div className="space-y-2">
                        {day.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm">
                            {getActivityIcon(activity.type)}
                            <span className="font-medium">{activity.time}</span>
                            <span>{activity.activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Travel Tips</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    {itinerary.recommendations.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full" size="lg">
                  Confirm & Book This Trip
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;