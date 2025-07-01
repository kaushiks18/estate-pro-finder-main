
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Phone, Bed, Bath, Square, Heart, Filter, SortAsc, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Buy = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const properties = [
    {
      id: 1,
      title: "Luxury 3BHK Apartment",
      location: "Banjara Hills, Hyderabad",
      price: "₹1.2 Cr",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      bedrooms: 3,
      bathrooms: 2,
      area: "1850 sq.ft",
      type: "Ready to Move",
      featured: true,
      description: "Premium apartment with modern amenities and city views"
    },
    {
      id: 2,
      title: "Modern 2BHK Villa",
      location: "Gachibowli, Hyderabad",
      price: "₹85 Lac",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      bedrooms: 2,
      bathrooms: 2,
      area: "1200 sq.ft",
      type: "Under Construction",
      description: "Contemporary villa with garden and parking"
    },
    {
      id: 3,
      title: "Premium 4BHK Penthouse",
      location: "Jubilee Hills, Hyderabad",
      price: "₹2.5 Cr",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop",
      bedrooms: 4,
      bathrooms: 3,
      area: "2800 sq.ft",
      type: "Ready to Move",
      featured: true,
      description: "Luxurious penthouse with panoramic views"
    },
    {
      id: 4,
      title: "Spacious 1BHK Apartment",
      location: "HITEC City, Hyderabad",
      price: "₹45 Lac",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq.ft",
      type: "Ready to Move",
      description: "Perfect for young professionals"
    },
    {
      id: 5,
      title: "Designer 3BHK Villa",
      location: "Kondapur, Hyderabad",
      price: "₹1.8 Cr",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      bedrooms: 3,
      bathrooms: 2,
      area: "2200 sq.ft",
      type: "Under Construction",
      description: "Architect-designed villa with premium finishes"
    },
    {
      id: 6,
      title: "Affordable 2BHK Flat",
      location: "Miyapur, Hyderabad",
      price: "₹65 Lac",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      bedrooms: 2,
      bathrooms: 2,
      area: "1100 sq.ft",
      type: "Ready to Move",
      description: "Great value for money in growing locality"
    },
    {
      id: 7,
      title: "Executive 3BHK Apartment",
      location: "Madhapur, Hyderabad",
      price: "₹1.1 Cr",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      bedrooms: 3,
      bathrooms: 2,
      area: "1650 sq.ft",
      type: "Ready to Move",
      description: "Premium location with excellent connectivity"
    },
    {
      id: 8,
      title: "Cozy 1BHK Studio",
      location: "Kukatpally, Hyderabad",
      price: "₹35 Lac",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      bedrooms: 1,
      bathrooms: 1,
      area: "500 sq.ft",
      type: "Ready to Move",
      description: "Compact and efficient living space"
    },
    {
      id: 9,
      title: "Luxury 4BHK Villa",
      location: "Kompally, Hyderabad",
      price: "₹2.2 Cr",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop",
      bedrooms: 4,
      bathrooms: 3,
      area: "2500 sq.ft",
      type: "Under Construction",
      featured: true,
      description: "Spacious villa with private garden"
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
          <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
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
          <span className="text-xl font-bold text-blue-600">{property.price}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{property.description}</p>
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} BHK</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact Agent
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
                <Link to="/buy" className="text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600">Buy</Link>
                <Link to="/rent" className="text-gray-700 hover:text-blue-600 font-medium">Rent</Link>
                <Link to="/commercial" className="text-gray-700 hover:text-blue-600 font-medium">Commercial</Link>
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
            <span className="text-blue-600 font-medium">Buy Properties</span>
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
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
              </SelectContent>
            </Select>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="h-12 text-gray-700">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any BHK</SelectItem>
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4">4+ BHK</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12 text-gray-700">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budget</SelectItem>
                <SelectItem value="0-50">Under ₹50 Lac</SelectItem>
                <SelectItem value="50-100">₹50 Lac - ₹1 Cr</SelectItem>
                <SelectItem value="100-200">₹1 Cr - ₹2 Cr</SelectItem>
                <SelectItem value="200+">Above ₹2 Cr</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto px-8 h-12 bg-blue-600 hover:bg-blue-700">
            <Search className="h-5 w-5 mr-2" />
            Search Properties
          </Button>
        </div>
      </section>

      {/* Results Header */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Properties for Sale in Hyderabad
              </h1>
              <p className="text-gray-600">
                {properties.length} properties found
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
            {properties.map((property) => (
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

export default Buy;
