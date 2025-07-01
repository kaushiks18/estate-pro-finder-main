import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Smartphone, Building2, Wallet, Shield, CheckCircle } from "lucide-react";

// Mock property data for payment context
const mockProperties = {
  "1": {
    id: "1",
    title: "Modern Apartment",
    location: "Downtown",
    price: 450000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=center"
  },
  "2": {
    id: "2",
    title: "Family Home",
    location: "Suburbs",
    price: 650000,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=center"
  },
  "3": {
    id: "3",
    title: "Luxury Condo",
    location: "City Center",
    price: 850000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop&crop=center"
  },
  "4": {
    id: "4",
    title: "Cozy Townhouse",
    location: "Riverside",
    price: 550000,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop&crop=center"
  },
  "5": {
    id: "5",
    title: "Penthouse Suite",
    location: "Uptown",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop&crop=center"
  },
  "6": {
    id: "6",
    title: "Garden Villa",
    location: "Suburbia",
    price: 750000,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&crop=center"
  },
  "7": {
    id: "7",
    title: "Studio Loft",
    location: "Arts District",
    price: 320000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop&crop=center"
  },
  "8": {
    id: "8",
    title: "Waterfront Cottage",
    location: "Lakeside",
    price: 890000,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center"
  }
};

const paymentPlans = [
  {
    id: "token",
    name: "Token Amount",
    percentage: 2.2, // 2.2% of property price
    description: "Secure your property with a token payment",
    popular: false
  },
  {
    id: "booking",
    name: "Booking Amount", 
    percentage: 10, // 10% of property price
    description: "10% booking amount to reserve the property",
    popular: true
  },
  {
    id: "full",
    name: "Full Payment",
    percentage: 95, // 5% discount on full payment
    description: "Complete payment with 5% discount",
    popular: false
  },
  {
    id: "emi",
    name: "EMI Plans",
    percentage: 8.3, // Starting EMI percentage
    description: "Monthly installments starting from",
    popular: false
  }
];

const emiPlans = [
  { months: 12, interestRate: 0, label: "0%" },
  { months: 24, interestRate: 0.04, label: "4%" },
  { months: 36, interestRate: 0.08, label: "8%" },
  { months: 60, interestRate: 0.133, label: "13.3%" }
];

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("property") || "1";
  const planType = searchParams.get("plan") || "token";
  
  const [selectedPlan, setSelectedPlan] = useState(planType);
  const [selectedEmi, setSelectedEmi] = useState("12");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentStep, setPaymentStep] = useState("select"); // select, details, confirm, success
  
  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  
  const [upiId, setUpiId] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const property = mockProperties[propertyId as keyof typeof mockProperties] || mockProperties["1"];
  const currentPlan = paymentPlans.find(p => p.id === selectedPlan);
  const currentEmi = emiPlans.find(e => e.months.toString() === selectedEmi);

  const getEmiMonthly = (emi: typeof emiPlans[0]) => {
    const principal = property.price;
    const monthlyRate = emi.interestRate / 12;
    if (emi.interestRate === 0) {
      return Math.round(principal / emi.months);
    }
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, emi.months)) / (Math.pow(1 + monthlyRate, emi.months) - 1);
    return Math.round(monthlyPayment);
  };

  const getEmiTotal = (emi: typeof emiPlans[0]) => {
    return getEmiMonthly(emi) * emi.months;
  };

  const getPaymentAmount = () => {
    if (selectedPlan === "emi" && currentEmi) {
      return getEmiMonthly(currentEmi);
    }
    if (selectedPlan === "full") {
      return Math.round(property.price * 0.95); // 5% discount
    }
    if (selectedPlan === "booking") {
      return Math.round(property.price * 0.10); // 10% booking amount
    }
    if (selectedPlan === "token") {
      return Math.round(property.price * 0.022); // 2.2% token amount
    }
    return currentPlan ? Math.round(property.price * (currentPlan.percentage / 100)) : 0;
  };

  const getPlanAmount = (plan: typeof paymentPlans[0]) => {
    if (plan.id === "full") {
      return Math.round(property.price * 0.95);
    }
    if (plan.id === "booking") {
      return Math.round(property.price * 0.10);
    }
    if (plan.id === "token") {
      return Math.round(property.price * 0.022);
    }
    if (plan.id === "emi") {
      return Math.round(property.price * 0.083);
    }
    return Math.round(property.price * (plan.percentage / 100));
  };

  const getDiscount = () => {
    if (selectedPlan === "full") {
      return Math.round(property.price * 0.05); // 5% discount
    }
    return 0;
  };

  const handlePayment = () => {
    // Simulate payment processing
    setPaymentStep("success");
    setTimeout(() => {
      // Redirect or show success message
    }, 2000);
  };

  if (paymentStep === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your payment of ${getPaymentAmount().toLocaleString()} has been processed successfully.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link to="/customer-dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <Link to={`/property/${propertyId}`} className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to {property.title}
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Secure Payment</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Options */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Payment Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentPlans.map(plan => (
                    <div 
                      key={plan.id}
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPlan === plan.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-4 bg-orange-500">Popular</Badge>
                      )}
                      <div className="space-y-2">
                        <h3 className="font-semibold">{plan.name}</h3>
                        <div className="text-2xl font-bold text-green-600">
                          ${getPlanAmount(plan).toLocaleString()}
                          {plan.id === "full" && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${property.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                        {plan.id === "full" && (
                          <Badge variant="secondary" className="text-green-600">
                            Save ${getDiscount().toLocaleString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* EMI Options */}
                {selectedPlan === "emi" && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4">Select EMI Plan</h4>
                    <div className="space-y-3">
                      {emiPlans.map(emi => (
                        <div 
                          key={emi.months}
                          className={`p-4 border rounded-lg cursor-pointer ${
                            selectedEmi === emi.months.toString() 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedEmi(emi.months.toString())}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{emi.months} Months</div>
                              <div className="text-sm text-gray-600">
                                Interest: {emi.label}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-green-600">
                                ${getEmiMonthly(emi).toLocaleString()}/month
                              </div>
                              <div className="text-sm text-gray-600">
                                Total: ${getEmiTotal(emi).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="upi" className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      UPI
                    </TabsTrigger>
                    <TabsTrigger value="netbanking" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Net Banking
                    </TabsTrigger>
                    <TabsTrigger value="wallet" className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Wallet
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input 
                          id="cardName"
                          placeholder="John Doe"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="upi" className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        id="upiId"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="netbanking" className="space-y-4 mt-6">
                    <div>
                      <Label>Select Bank</Label>
                      <RadioGroup defaultValue="sbi">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sbi" id="sbi" />
                          <Label htmlFor="sbi">State Bank of India</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hdfc" id="hdfc" />
                          <Label htmlFor="hdfc">HDFC Bank</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="icici" id="icici" />
                          <Label htmlFor="icici">ICICI Bank</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>

                  <TabsContent value="wallet" className="space-y-4 mt-6">
                    <div>
                      <Label>Select Wallet</Label>
                      <RadioGroup defaultValue="paytm">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paytm" id="paytm" />
                          <Label htmlFor="paytm">Paytm</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="phonepay" id="phonepay" />
                          <Label htmlFor="phonepay">PhonePe</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="googlepay" id="googlepay" />
                          <Label htmlFor="googlepay">Google Pay</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input 
                      id="customerName"
                      placeholder="John Doe"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input 
                      id="customerEmail"
                      type="email"
                      placeholder="john@example.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input 
                      id="customerPhone"
                      placeholder="+1 234 567 8900"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerAddress">Address</Label>
                    <Input 
                      id="customerAddress"
                      placeholder="123 Main St, City"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{property.title}</div>
                    <div className="text-sm text-gray-600">{property.location}</div>
                  </div>
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Property Price:</span>
                    <span>${property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Plan:</span>
                    <span>{currentPlan?.name}</span>
                  </div>
                  {selectedPlan === "emi" && currentEmi && (
                    <>
                      <div className="flex justify-between">
                        <span>EMI Duration:</span>
                        <span>{currentEmi.months} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Payment:</span>
                        <span>${getEmiMonthly(currentEmi).toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  {getDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-${getDiscount().toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Amount to Pay:</span>
                    <span className="text-green-600">${getPaymentAmount().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <Link to="/terms" className="text-blue-600">Terms & Conditions</Link>
                </Label>
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                size="lg"
                onClick={handlePayment}
                disabled={!agreeTerms}
              >
                Pay ${getPaymentAmount().toLocaleString()}
              </Button>
              
              <div className="text-center">
                <div className="text-xs text-gray-500">
                  🔒 Your payment information is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
