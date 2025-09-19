import React, { useState } from 'react';
import {
  CreditCard,
  Banknote,
  Upload,
  User,
  Calendar,
  ShieldCheck,
  Plane,
  Hotel,
  CheckCircle,
  QrCode,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const Payment = () => {
  const [activeStep, setActiveStep] = useState('verification');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const tripSummary = {
    destination: 'Royal Rajasthan',
    duration: '7 days',
    travelers: '2 Adults',
    flight: 'IndiGo, Premium Economy',
    hotel: 'The Oberoi, Luxury',
    subtotal: '₹1,28,900',
    gst: '₹23,202',
    total: '₹1,52,102',
  };

  const renderStepIndicator = () => (
    <div className="flex items-center w-full mb-12">
      <div className="flex-1">
        <div className={`flex items-center ${activeStep === 'verification' ? 'text-primary' : 'text-foreground'}`}>
          <ShieldCheck className="w-6 h-6 mr-2" />
          <span className="font-semibold">1. Verification</span>
        </div>
      </div>
      <div className="flex-1 border-t-2 border-dashed border-border mx-4"></div>
      <div className="flex-1">
        <div className={`flex items-center ${activeStep === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
          <CreditCard className="w-6 h-6 mr-2" />
          <span className="font-semibold">2. Payment</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold gradient-text">Complete Your Booking</h1>
          <p className="text-muted-foreground mt-2">Securely provide your details to finalize your trip to {tripSummary.destination}.</p>
        </header>

        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Document Verification Section */}
            {activeStep === 'verification' && (
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle>Traveler & Document Verification</CardTitle>
                  <CardDescription>Please provide the required documents for all travelers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Traveler 1 */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-semibold flex items-center"><User className="mr-2 h-4 w-4"/>Traveler 1 (Primary)</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name1">Full Name (as on Passport)</Label>
                            <Input id="name1" placeholder="John Doe" />
                        </div>
                        <div>
                            <Label htmlFor="dob1">Date of Birth</Label>
                            <Input id="dob1" type="date" />
                        </div>
                        <div>
                            <Label htmlFor="passport1">Passport Number</Label>
                            <Input id="passport1" placeholder="A12345678" />
                        </div>
                        <div>
                            <Label htmlFor="passport-upload1">Upload Passport (PDF, JPG)</Label>
                            <Input id="passport-upload1" type="file" className="file:text-foreground"/>
                        </div>
                     </div>
                  </div>
                   {/* Traveler 2 */}
                   <div className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-semibold flex items-center"><User className="mr-2 h-4 w-4"/>Traveler 2</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name2">Full Name (as on Passport)</Label>
                            <Input id="name2" placeholder="Jane Doe" />
                        </div>
                        <div>
                            <Label htmlFor="dob2">Date of Birth</Label>
                            <Input id="dob2" type="date" />
                        </div>
                     </div>
                  </div>
                  <Alert variant="default" className="bg-secondary/30 border-primary/20">
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Secure Upload</AlertTitle>
                    <AlertDescription>
                      Your documents are encrypted and stored securely. They will be deleted after your trip is completed.
                    </AlertDescription>
                  </Alert>
                  <Button size="lg" className="w-full bg-gradient-hero hover:opacity-90" onClick={() => setActiveStep('payment')}>
                    Proceed to Payment <ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Payment Section */}
            {activeStep === 'payment' && (
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Choose your preferred payment method.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                      <TabsTrigger value="upi">UPI</TabsTrigger>
                      <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="upi" className="mt-6 space-y-4">
                        <div>
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input id="upiId" placeholder="yourname@okhdfcbank" />
                        </div>
                        <div className="flex items-center space-x-2">
                           <Separator className="flex-1"/>
                           <span className="text-xs text-muted-foreground">OR</span>
                           <Separator className="flex-1"/>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border">
                          <p className="text-sm font-medium mb-2">Scan QR to Pay</p>
                          {/*  */}
                          <div className="p-2 bg-white rounded-md">
                            <QrCode className="h-24 w-24 text-black"/>
                          </div>
                           <p className="text-xs text-muted-foreground mt-2">Use any UPI app like Google Pay, PhonePe, Paytm</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="netbanking" className="mt-6 space-y-4">
                       <div>
                          <Label htmlFor="bank">Select Bank</Label>
                           <Select>
                            <SelectTrigger id="bank">
                                <SelectValue placeholder="Choose your bank" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sbi">State Bank of India</SelectItem>
                                <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                <SelectItem value="icici">ICICI Bank</SelectItem>
                                <SelectItem value="axis">Axis Bank</SelectItem>
                                <SelectItem value="pnb">Punjab National Bank</SelectItem>
                            </SelectContent>
                           </Select>
                        </div>
                        <p className="text-xs text-muted-foreground">You will be redirected to your bank's secure portal to complete the payment.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Trip Summary */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="font-medium">{tripSummary.destination}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{tripSummary.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Travelers</span>
                  <span className="font-medium">{tripSummary.travelers}</span>
                </div>
                <Separator/>
                 <div className="flex items-start justify-between">
                  <span className="text-muted-foreground flex items-center"><Plane className="h-4 w-4 mr-2"/>Flight</span>
                  <span className="font-medium text-right">{tripSummary.flight}</span>
                </div>
                 <div className="flex items-start justify-between">
                  <span className="text-muted-foreground flex items-center"><Hotel className="h-4 w-4 mr-2"/>Hotel</span>
                  <span className="font-medium text-right">{tripSummary.hotel}</span>
                </div>
                <Separator/>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{tripSummary.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>{tripSummary.gst}</span>
                </div>
                <Separator/>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Payable</span>
                  <span className="text-primary">{tripSummary.total}</span>
                </div>
              </CardContent>
            </Card>
             <Button size="lg" className="w-full bg-gradient-hero hover:opacity-90 text-lg py-6" disabled={activeStep !== 'payment'}>
                <Lock className="mr-2 h-5 w-5"/> Confirm & Pay {tripSummary.total}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;