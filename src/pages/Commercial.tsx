
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Phone, Square, Heart, Filter, SortAsc, Home, Building2, Users, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Commercial = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [area, setArea] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const commercialProperties = [
    {
      id: 1,
      title: "Premium Office Space",
      location: "HITEC City, Hyderabad",
      price: "₹80/sq.ft/month",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      area: "5000 sq.ft",
      type: "Office",
      featured: true,
      parking: "50 slots",
      furnished: "Fully Furnished",
      description: "Modern office space with conference rooms and cafeteria"
    },
    {
      id: 2,
      title: "Retail Showroom",
      location: "Banjara Hills, Hyderabad",
      price: "₹120/sq.ft/month",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      area: "2500 sq.ft",
      type: "Retail",
      parking: "20 slots",
      furnished: "Semi-Furnished",
      description: "Prime retail space in high-footfall commercial area"
    },
    {
      id: 3,
      title: "Warehouse Complex",
      location: "Shamshabad, Hyderabad",
      price: "₹25/sq.ft/month",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      area: "20000 sq.ft",
      type: "Warehouse",
      featured: true,
      parking: "100 slots",
      furnished: "Unfurnished",
      description: "Large warehouse with loading docks and 24/7 security"
    },
    {
      id: 4,
      title: "Corporate Headquarters",
      location: "Financial District, Hyderabad",
      price: "₹150/sq.ft/month",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      area: "15000 sq.ft",
      type: "Office",
      featured: true,
      parking: "200 slots",
      furnished: "Fully Furnished",
      description: "Grade A office building with panoramic city views"
    },
    {
      id: 5,
      title: "Restaurant Space",
      location: "Jubilee Hills, Hyderabad",
      price: "₹200/sq.ft/month",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      area: "3000 sq.ft",
      type: "Restaurant",
      parking: "30 slots",
      furnished: "Unfurnished",
      description: "Prime restaurant space with outdoor seating area"
    },
    {
      id: 6,
      title: "Medical Center",
      location: "Gachibowli, Hyderabad",
      price: "₹100/sq.ft/month",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
      area: "4000 sq.ft",
      type: "Medical",
      parking: "40 slots",
      furnished: "Semi-Furnished",
      description: "Modern medical facility with multiple consultation rooms"
    },
    {
      id: 7,
      title: "Co-working Space",
      location: "Madhapur, Hyderabad",
      price: "₹60/sq.ft/month",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop",
      area: "8000 sq.ft",
      type: "Co-working",
      parking: "80 slots",
      furnished: "Fully Furnished",
      description: "Flexible co-working space with modern amenities"
    },
    {
      id: 8,
      title: "Industrial Unit",
      location: "Medchal, Hyderabad",
      price: "₹30/sq.ft/month",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      area: "12000 sq.ft",
      type: "Industrial",
      parking: "60 slots",
      furnished: "Unfurnished",
      description: "Industrial unit with high ceiling and power backup"
    },
    {
      id: 9,
      title: "Shopping Mall Unit",
      location: "Kondapur, Hyderabad",
      price: "₹180/sq.ft/month",
      image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=400&h=300&fit=crop",
      area: "1800 sq.ft",
      type: "Retail",
      parking: "Mall parking",
      furnished: "Semi-Furnished",
      description: "Premium retail space in popular shopping mall"
    }
  ];

  const PropertyCard = ({ property }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-0 shadow-md">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {property.featured && (
          <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">
            Featured
          </Badge>
        )}
        <Badge variant="secondary" className="absolute bottom-2 left-2">
          {property.type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
          <div className="text-right">
            <span className="text-xl font-bold text-blue-600">{property.price}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{property.description}</p>
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area}</span>
          </div>
          <div className="flex items-center">
            <Car className="h-4 w-4 mr-1" />
            <span>{property.parking}</span>
          </div>
          <div className="flex items-center">
            <Building2 className="h-4 w-4 mr-1" />
            <span>{property.furnished}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact Owner
          </Button>
          <Link to={`/property/${property.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                EstatePro
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/buy" className="text-gray-700 hover:text-blue-600 font-medium">Buy</Link>
                <Link to="/rent" className="text-gray-700 hover:text-blue-600 font-medium">Rent</Link>
                <Link to="/commercial" className="text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600">Commercial</Link>
                <Link to="/agents" className="text-gray-700 hover:text-blue-600 font-medium">Agents</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/post-property">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Post Property FREE
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Login / Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-4 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-blue-600 font-medium">Commercial Properties</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by city, locality, project"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 h-12 text-gray-700"
                />
              </div>
            </div>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-12 text-gray-700">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="co-working">Co-working</SelectItem>
              </SelectContent>
            </Select>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger className="h-12 text-gray-700">
                <SelectValue placeholder="Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Area</SelectItem>
                <SelectItem value="0-2000">Under 2000 sq.ft</SelectItem>
                <SelectItem value="2000-5000">2000 - 5000 sq.ft</SelectItem>
                <SelectItem value="5000-10000">5000 - 10000 sq.ft</SelectItem>
                <SelectItem value="10000+">Above 10000 sq.ft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12 text-gray-700">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budget</SelectItem>
                <SelectItem value="0-50">Under ₹50/sq.ft</SelectItem>
                <SelectItem value="50-100">₹50 - ₹100/sq.ft</SelectItem>
                <SelectItem value="100-150">₹100 - ₹150/sq.ft</SelectItem>
                <SelectItem value="150+">Above ₹150/sq.ft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto px-8 h-12 bg-blue-600 hover:bg-blue-700">
            <Search className="h-5 w-5 mr-2" />
            Search Commercial Properties
          </Button>
        </div>
      </section>

      {/* Results Header */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Commercial Properties in Hyderabad
              </h1>
              <p className="text-gray-600">
                {commercialProperties.length} commercial properties available
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Load More Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">EstatePro</h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner in finding the perfect property. We make real estate simple and accessible.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/buy" className="hover:text-white">Buy Property</Link></li>
                <li><Link to="/rent" className="hover:text-white">Rent Property</Link></li>
                <li><Link to="/commercial" className="hover:text-white">Commercial</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/agents" className="hover:text-white">Find Agents</Link></li>
                <li><Link to="/post-property" className="hover:text-white">Post Property</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@estatepro.com</li>
                <li>📞 +91 9876543210</li>
                <li>📍 Hyderabad, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EstatePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Commercial;
