import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PlanTrip from "./pages/PlanTrip";
import NotFound from "./pages/NotFound";
import DashLayout from "./pages/DashLayout";
// import Payment from "./pages/payment";
// import Booking from "./pages/Booking";
// import Itinerary from "./pages/Itinerary";
// import Notifications from "./pages/Notifications";
import { AuthProvider } from "./components/context/AuthContext";
import Itinerary from "./pages/Itinerary";
import Payment from "./pages/Payment";
// import Payment from 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/index" element={<Index/>} />

         <Route path="/dashboard/*" element={<DashLayout/>}>
         </Route>
         <Route path="/payment" element={<Payment/>}></Route>

         <Route path="/planatrip" element={<PlanTrip/>}></Route>
         
         
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;