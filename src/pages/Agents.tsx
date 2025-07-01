import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockStats = [
  { label: "Properties Listed", value: 12 },
  { label: "Properties Sold", value: 5 },
  { label: "Active Customers", value: 8 },
  { label: "Upcoming Visits", value: 3 }
];
const mockProperties = [
  { id: 1, title: "Modern Apartment", status: "Active", price: 450000 },
  { id: 2, title: "Family Home", status: "Sold", price: 650000 },
];
const mockCustomers = [
  { id: 1, name: "Alice Smith", phone: "+1 555 123 4567", status: "Active" },
  { id: 2, name: "Bob Johnson", phone: "+1 555 987 6543", status: "Inactive" },
];
const mockSchedule = [
  { id: 1, property: "Luxury Condo", date: "2025-07-10", time: "3:00 PM", customer: "Alice Smith" },
  { id: 2, property: "Cozy Townhouse", date: "2025-07-12", time: "11:00 AM", customer: "Bob Johnson" },
];

const Agents = () => {
  const [tab, setTab] = useState("dashboard");
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Agent Dashboard</h1>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            {mockStats.map((stat, i) => (
              <Card key={i}>
                <CardHeader><CardTitle>{stat.label}</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="properties">
          <div className="mt-6 space-y-4">
            {mockProperties.map((p) => (
              <Card key={p.id}>
                <CardHeader><CardTitle>{p.title}</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span className="font-bold text-green-600">${p.price.toLocaleString()}</span>
                  <Badge>{p.status}</Badge>
                  <Button variant="outline" size="sm">View</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="customers">
          <div className="mt-6 space-y-4">
            {mockCustomers.map((c) => (
              <Card key={c.id}>
                <CardHeader><CardTitle>{c.name}</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span>{c.phone}</span>
                  <Badge>{c.status}</Badge>
                  <Button variant="outline" size="sm">Contact</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="schedule">
          <div className="mt-6 space-y-4">
            {mockSchedule.map((s) => (
              <Card key={s.id}>
                <CardHeader><CardTitle>{s.property}</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span>{s.date} at {s.time}</span>
                  <span>with {s.customer}</span>
                  <Button variant="outline" size="sm">Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Agents;
