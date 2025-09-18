// src/pages/PlanTrip.jsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, PlusCircle, Lightbulb, Gem, Mountain, Plane, Hotel, MapPin, CheckCircle, Clock, Users } from "lucide-react";

const PlanTrip = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const { toast } = useToast();

  const suggestionPrompts = [
    {
      icon: PlusCircle,
      text: "Create New Trip",
      prompt: "I want to go on a 5-day adventure trip to Himachal Pradesh for 2 people. My budget is around ₹20,000.",
    },
    {
      icon: Lightbulb,
      text: "Inspire me where to go",
      prompt: "Inspire me with a relaxing 4-day beach destination in India for a solo traveler.",
    },
    {
      icon: Gem,
      text: "Discover Hidden gems",
      prompt: "Show me some hidden gems in Rajasthan for a 7-day cultural trip.",
    },
    {
      icon: Mountain,
      text: "Adventure Destination",
      prompt: "Plan a thrilling 6-day adventure trip in Uttarakhand.",
    },
  ];

  const handleSuggestionClick = (suggestionPrompt) => {
    setPrompt(suggestionPrompt);
    generateItinerary(suggestionPrompt);
  };

  const generateItinerary = async (currentPrompt = prompt) => {
    if (!currentPrompt.trim()) {
      toast({
        title: "Prompt is empty",
        description: "Please tell me what kind of trip you'd like to plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setItinerary(null); // Clear previous itinerary

    // Simulate AI generation with realistic travel planning
    setTimeout(() => {
      const mockItinerary = {
        title: "Your AI-Generated Trip Plan",
        destination: "A surprise location based on your prompt!",
        duration: "5 days",
        travelers: "2",
        totalBudget: "₹25,000 - ₹40,000",
        schedule: [
          {
            day: 1,
            title: "Arrival & Exploration",
            activities: [
              { time: "10:00 AM", activity: "Flight arrival and airport transfer", type: "transport" },
              { time: "12:00 PM", activity: "Check-in at 'The Vista Hotel'", type: "hotel" },
              { time: "2:00 PM", activity: "Lunch and walk around the local market", type: "activity" },
            ],
          },
          {
            day: 2,
            title: "Adventure & Sightseeing",
            activities: [
              { time: "9:00 AM", activity: "Guided tour of the main historical sites", type: "activity" },
              { time: "1:00 PM", activity: "Lunch at a highly-rated local restaurant", type: "dining" },
              { time: "3:00 PM", activity: "Afternoon hike to a scenic viewpoint", type: "activity" },
            ],
          },
        ],
        bookings: {
          flights: "₹9,000 per person (confirmed)",
          hotels: "₹3,500 per night (4-star accommodation)",
        },
        recommendations: [
          "Pack for both warm days and cool evenings.",
          "Try the local street food for an authentic experience.",
          "Keep your travel documents handy.",
        ],
      };

      setItinerary(mockItinerary);
      setLoading(false);

      toast({
        title: "Itinerary Generated!",
        description: "Your personalized travel plan is ready below.",
      });
    }, 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    generateItinerary();
  };
  
  const getActivityIcon = (type) => {
    switch (type) {
      case "transport": return <Plane className="h-4 w-4 text-travel-ocean" />;
      case "hotel": return <Hotel className="h-4 w-4 text-travel-sunset" />;
      default: return <MapPin className="h-4 w-4 text-travel-forest" />;
    }
  };


  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-24">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hey, I'm your personal <span style={{ color: "hsl(var(--travel-sunset))" }}>Trip Planner</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Tell me what you want, and I'll handle the rest. Flights, Hotels, trip Planner - all in seconds
        </p>

        <form onSubmit={handleFormSubmit}>
          <div className="relative mb-6">
            <Textarea
              placeholder="Create a trip for Paris from New york"
              className="min-h-[150px] text-base p-6 pr-20 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute bottom-4 right-4 bg-gradient-hero hover:opacity-90 rounded-lg w-12 h-12"
              disabled={loading}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {suggestionPrompts.map((suggestion) => (
            <Button
              key={suggestion.text}
              variant="outline"
              className="border-border/50 hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleSuggestionClick(suggestion.prompt)}
            >
              <suggestion.icon className="mr-2 h-4 w-4" />
              {suggestion.text}
            </Button>
          ))}
        </div>

        {loading && (
           <div className="flex flex-col items-center justify-center gap-2">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 animate-spin border-t-primary"></div>
            <p className="text-muted-foreground">Generating your perfect trip...</p>
          </div>
        )}

        {itinerary && !loading && (
          <Card className="bg-card/50 backdrop-blur-sm text-left animate-in fade-in-0 zoom-in-95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-travel-forest" />
                {itinerary.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 pt-1">
                 <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4"/> {itinerary.destination}</span>
                 <span className="flex items-center gap-1.5"><Clock className="h-4 w-4"/> {itinerary.duration}</span>
                 <span className="flex items-center gap-1.5"><Users className="h-4 w-4"/> {itinerary.travelers} Travelers</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h3 className="font-semibold mb-2">Budget & Bookings</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Flights: {itinerary.bookings.flights}</div>
                  <div>Hotels: {itinerary.bookings.hotels}</div>
                  <div className="col-span-2">Estimated Total: <span className="font-bold">{itinerary.totalBudget}</span></div>
                </div>
              </div>

              <div className="space-y-4">
                {itinerary.schedule.map((day) => (
                  <div key={day.day} className="border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Day {day.day}: {day.title}</h3>
                    <div className="space-y-2">
                      {day.activities.map((activity, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm">
                          <span className="text-muted-foreground pt-0.5">{getActivityIcon(activity.type)}</span>
                          <span className="font-medium w-20">{activity.time}</span>
                          <span className="flex-1">{activity.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Travel Tips</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  {itinerary.recommendations.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-gradient-hero hover:opacity-90" size="lg">
                Confirm & Book This Trip
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PlanTrip;