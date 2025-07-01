import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockPurchases = [
  { id: 1, title: "Modern Apartment", status: "Booked", price: 450000 },
  { id: 2, title: "Family Home", status: "Visited", price: 650000 },
];
const mockVisits = [
  { id: 1, property: "Luxury Condo", date: "2025-07-10", time: "3:00 PM", status: "Scheduled" },
  { id: 2, property: "Cozy Townhouse", date: "2025-07-12", time: "11:00 AM", status: "Completed" },
];

const CustomerDashboard = () => {
  const [tab, setTab] = useState("dashboard");
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
          <TabsTrigger value="visits">My Visits</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader><CardTitle>Properties Booked</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Visits Scheduled</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Payments Made</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$450,000</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="purchases">
          <div className="mt-6">
            {mockPurchases.length === 0 ? (
              <div>No purchases yet.</div>
            ) : (
              <div className="space-y-4">
                {mockPurchases.map((p) => (
                  <Card key={p.id}>
                    <CardHeader>
                      <CardTitle>{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <span className="font-bold text-green-600">${p.price.toLocaleString()}</span>
                      <Badge>{p.status}</Badge>
                      <Button variant="outline" size="sm">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="visits">
          <div className="mt-6">
            {mockVisits.length === 0 ? (
              <div>No visits scheduled.</div>
            ) : (
              <div className="space-y-4">
                {mockVisits.map((v) => (
                  <Card key={v.id}>
                    <CardHeader>
                      <CardTitle>{v.property}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <span>{v.date} at {v.time}</span>
                      <Badge>{v.status}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;
