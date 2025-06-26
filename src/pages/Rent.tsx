
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Phone, Bed, Bath, Square, Heart, Filter, SortAsc, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Rent = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const rentProperties = [
    {
      id: 1,
      title: "Modern 2BHK Apartment",
      location: "Banjara Hills, Hyderabad",
      price: "₹35,000/month",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      bedrooms: 2,
      bathrooms: 2,
      area: "1200 sq.ft",
      type: "Furnished",
      featured: true,
      deposit: "₹70,000",
      description: "Fully furnished apartment with modern amenities"
    },
    {
      id: 2,
      title: "Cozy 1BHK Studio",
      location: "HITEC City, Hyderabad",
      price: "₹18,000/month",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      bedrooms: 1,
      bathrooms: 1,
      area: "600 sq.ft",
      type: "Semi-Furnished",
      deposit: "₹36,000",
      description: "Perfect for young professionals, close to IT parks"
    },
    {
      id: 3,
      title: "Spacious 3BHK Villa",
      location: "Gachibowli, Hyderabad",
      price: "₹55,000/month",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      bedrooms: 3,
      bathrooms: 2,
      area: "1800 sq.ft",
      type: "Unfurnished",
      featured: true,
      deposit: "₹1,10,000",
      description: "Independent villa with garden and parking"
    },
    {
      id: 4,
      title: "Luxury 4BHK Penthouse",
      location: "Jubilee Hills, Hyderabad",
      price: "₹85,000/month",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      bedrooms: 4,
      bathrooms: 3,
      area: "2500 sq.ft",
      type: "Fully Furnished",
      featured: true,
      deposit: "₹1,70,000",
      description: "Premium penthouse with city views and amenities"
    },
    {
      id: 5,
      title: "Budget 2BHK Flat",
      location: "Miyapur, Hyderabad",
      price: "₹22,000/month",
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=400&h=300&fit=crop",
      bedrooms: 2,
      bathrooms: 1,
      area: "950 sq.ft",
      type: "Semi-Furnished",
      deposit: "₹44,000",
      description: "Affordable option in well-connected area"
    },
    {
      id: 6,
      title: "Executive 2BHK Apartment",
      location: "Madhapur, Hyderabad",
      price: "₹40,000/month",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      bedrooms: 2,
      bathrooms: 2,
      area: "1400 sq.ft",
      type: "Furnished",
      deposit: "₹80,000",
      description: "Premium location with gym and swimming pool"
    },
    {
      id: 7,
      title: "Student-Friendly 1BHK",
      location: "Kukatpally, Hyderabad",
      price: "₹12,000/month",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      bedrooms: 1,
      bathrooms: 1,
      area: "450 sq.ft",
      type: "Semi-Furnished",
      deposit: "₹24,000",
      description: "Ideal for students and young professionals"
    },
    {
      id: 8,
      title: "Family 3BHK House",
      location: "Kondapur, Hyderabad",
      price: "₹48,000/month",
      image: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=400&h=300&fit=crop",
      bedrooms: 3,
      bathrooms: 2,
      area: "1600 sq.ft",
      type: "Unfurnished",
      deposit: "₹96,000",
      description: "Perfect for families with children"
    },
    {
      id: 9,
      title: "Corporate 2BHK Flat",
      location: "Financial District, Hyderabad",
      price: "₹45,000/month",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      bedrooms: 2,
      bathrooms: 2,
      area: "1300 sq.ft",
      type: "Fully Furnished",
      deposit: "₹90,000",
      description: "Ready to move-in for corporate executives"
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
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
          <Heart className="h-4 w-4" />
        </Button>
        {property.featured && (
          <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
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
            <span className="text-xl font-bold text-green-600">{property.price}</span>
            <p className="text-sm text-gray-500">Deposit: {property.deposit}</p>
          </div>
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
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
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
                <Link to="/rent" className="text-blue-600 hover:text-blue-700 font-medium border-b-2 border-blue-600">Rent</Link>
                <Link to="/commercial" className="text-gray-700 hover:text-blue-600 font-medium">Commercial</Link>
                <Link to="/projects" className="text-gray-700 hover:text-blue-600 font-medium">Projects</Link>
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
            <span className="text-blue-600 font-medium">Rent Properties</span>
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
                <SelectItem value="house">House</SelectItem>
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
                <SelectValue placeholder="Monthly Rent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budget</SelectItem>
                <SelectItem value="0-20">Under ₹20K</SelectItem>
                <SelectItem value="20-40">₹20K - ₹40K</SelectItem>
                <SelectItem value="40-60">₹40K - ₹60K</SelectItem>
                <SelectItem value="60+">Above ₹60K</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto px-8 h-12 bg-green-600 hover:bg-green-700">
            <Search className="h-5 w-5 mr-2" />
            Search Rentals
          </Button>
        </div>
      </section>

      {/* Results Header */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Properties for Rent in Hyderabad
              </h1>
              <p className="text-gray-600">
                {rentProperties.length} properties available for rent
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
                  <SelectItem value="price-low">Rent: Low to High</SelectItem>
                  <SelectItem value="price-high">Rent: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentProperties.map((property) => (
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
                <li><Link to="/projects" className="hover:text-white">New Projects</Link></li>
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

export default Rent;
