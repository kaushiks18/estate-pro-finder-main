import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

// Mock property data
const mockProperty = {
  id: "1",
  title: "Modern Apartment",
  location: "Downtown",
  price: 450000,
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center",
  images: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=center"
  ],
  description: "A beautiful modern apartment in the heart of downtown with stunning city views.",
  amenities: ["Gym", "Pool", "Parking", "Security", "Balcony", "WiFi"],
  floorPlan: "/placeholder.svg",
  agent: {
    name: "John Doe",
    phone: "+1 234 567 890",
    email: "john@estatepro.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  locationMap: "https://maps.google.com/?q=Downtown"
};

const paymentOptions = [
  { label: "Token Amount", value: "token", amount: 10000 },
  { label: "Booking Amount", value: "booking", amount: 45000 },
  { label: "Full Payment", value: "full", amount: 450000 },
  { label: "EMI Option", value: "emi", amount: 37500 }
];

function PropertyDetail() {
  const { id } = useParams();
  const property = mockProperty;
  const [selectedTab, setSelectedTab] = useState("overview");
  const [paymentType, setPaymentType] = useState("token");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showVisitDialog, setShowVisitDialog] = useState(false);
  const [visitDate, setVisitDate] = useState<Date | undefined>();
  const [visitTime, setVisitTime] = useState("");
  const [visitName, setVisitName] = useState("");
  const [visitPhone, setVisitPhone] = useState("");
  const [visitSuccess, setVisitSuccess] = useState(false);

  const handleScheduleVisit = () => {
    if (visitDate && visitTime && visitName && visitPhone) {
      setVisitSuccess(true);
      setTimeout(() => {
        setShowVisitDialog(false);
        setVisitSuccess(false);
        setVisitDate(undefined);
        setVisitTime("");
        setVisitName("");
        setVisitPhone("");
      }, 2000);
    }
  };

  const currentPaymentOption = paymentOptions.find(opt => opt.value === paymentType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b px-4 py-3">
        <div className="container mx-auto">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Properties
          </Link>
        </div>
      </nav>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {property.images.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  alt={`View ${i + 1}`} 
                  className="w-full h-24 object-cover rounded border hover:opacity-80 cursor-pointer" 
                />
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-lg text-gray-600 mt-1">{property.location}</p>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-3xl font-bold text-green-600">
                  ${property.price.toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <Badge variant="secondary">{property.bedrooms} Beds</Badge>
                  <Badge variant="secondary">{property.bathrooms} Baths</Badge>
                  <Badge variant="secondary">{property.area} sqft</Badge>
                </div>
              </div>
            </div>

            {/* Agent Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <img 
                    src={property.agent.avatar} 
                    alt={property.agent.name} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{property.agent.name}</div>
                    <div className="text-sm text-gray-600">{property.agent.email}</div>
                  </div>
                  <a href={`tel:${property.agent.phone}`}>
                    <Button variant="outline" size="sm">Call Now</Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {paymentOptions.map(opt => (
                    <Button 
                      key={opt.value} 
                      variant={paymentType === opt.value ? "default" : "outline"} 
                      onClick={() => setPaymentType(opt.value)}
                      className="h-auto p-3 flex flex-col items-center"
                    >
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-sm">${opt.amount.toLocaleString()}</div>
                    </Button>
                  ))}
                </div>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  onClick={() => setShowPaymentDialog(true)}
                >
                  Pay {currentPaymentOption?.label} - ${currentPaymentOption?.amount.toLocaleString()}
                </Button>
                <Link to={`/payment?property=${property.id}&plan=${paymentType}`}>
                  <Button variant="outline" className="w-full mt-2">
                    Go to Advanced Payment Page
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Visit Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  onClick={() => setShowVisitDialog(true)}
                >
                  Book a Property Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Property Details Tabs */}
        <div className="mt-12">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Property Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{property.area}</div>
                      <div className="text-sm text-gray-600">Sq Ft</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">2024</div>
                      <div className="text-sm text-gray-600">Year Built</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="amenities" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Property Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Badge variant="outline">{amenity}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="location" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Location & Map</h3>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Interactive Map View</div>
                  </div>
                  <p className="mt-4 text-gray-700">
                    Located in the heart of {property.location}, this property offers easy access to shopping, 
                    dining, and public transportation.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="floorplan" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Floor Plan</h3>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500">Floor Plan Image</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Payment - {currentPaymentOption?.label}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Amount:</span>
                  <span className="text-xl font-bold text-green-600">
                    ${currentPaymentOption?.amount.toLocaleString()}
                  </span>
                </div>
              </div>
              <Input placeholder="Cardholder Name" />
              <Input placeholder="Card Number" />
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVV" />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Pay ${currentPaymentOption?.amount.toLocaleString()}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Visit Scheduling Dialog */}
        <Dialog open={showVisitDialog} onOpenChange={setShowVisitDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Property Visit</DialogTitle>
            </DialogHeader>
            {visitSuccess ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <div className="text-xl font-semibold text-green-600">Visit Scheduled!</div>
                <div className="text-gray-600 mt-2">We'll contact you soon to confirm the details.</div>
              </div>
            ) : (
              <div className="space-y-4">
                <Input 
                  placeholder="Your Full Name" 
                  value={visitName} 
                  onChange={(e) => setVisitName(e.target.value)} 
                />
                <Input 
                  placeholder="Phone Number" 
                  value={visitPhone} 
                  onChange={(e) => setVisitPhone(e.target.value)} 
                />
                <div>
                  <div className="text-sm font-medium mb-2">Select Date:</div>
                  <Calendar 
                    mode="single" 
                    selected={visitDate} 
                    onSelect={setVisitDate} 
                    className="rounded-md border"
                  />
                </div>
                <Input 
                  placeholder="Preferred Time (e.g., 3:00 PM)" 
                  value={visitTime} 
                  onChange={(e) => setVisitTime(e.target.value)} 
                />
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  onClick={handleScheduleVisit}
                  disabled={!visitDate || !visitTime || !visitName || !visitPhone}
                >
                  Schedule Visit
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default PropertyDetail;
