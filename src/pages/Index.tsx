import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  image: string;
}

// Mock API function
const getAllProperties = async (): Promise<Property[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: "1",
      title: "Modern Apartment",
      location: "Downtown",
      price: 450000,
      bedrooms: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "2", 
      title: "Family Home",
      location: "Suburbs",
      price: 650000,
      bedrooms: 4,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "3",
      title: "Luxury Condo",
      location: "City Center", 
      price: 850000,
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "4",
      title: "Cozy Townhouse",
      location: "Riverside",
      price: 550000,
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "5",
      title: "Penthouse Suite",
      location: "Uptown",
      price: 1200000,
      bedrooms: 4,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "6",
      title: "Garden Villa",
      location: "Suburbia",
      price: 750000,
      bedrooms: 5,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "7",
      title: "Studio Loft",
      location: "Arts District",
      price: 320000,
      bedrooms: 1,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: "8",
      title: "Waterfront Cottage",
      location: "Lakeside",
      price: 890000,
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center"
    }
  ];
};

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getAllProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                EstatePro
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link
                  to="/buy"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Buy
                </Link>
                <Link
                  to="/rent"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Rent
                </Link>
                <Link
                  to="/commercial"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Commercial
                </Link>
                <Link
                  to="/projects"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Projects
                </Link>
                <Link
                  to="/agents"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Agents
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/post-property">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Post Property FREE
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/agent-login">
                <Button variant="outline">Agent Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&crop=center')"
          }}
        ></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the perfect property with EstatePro - your trusted partner in real estate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/buy">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse Properties
              </Button>
            </Link>
            <Link to="/post-property">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="container mx-auto -mt-8 px-4 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
            <Input
              type="search"
              placeholder="Search for properties by title or location..."
              className="pl-11 h-12 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-600">
              Showing {filteredProperties.length} result{filteredProperties.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Featured Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            // Skeleton loaders
            [...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-5 w-4/5" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-3/5" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-48 w-full rounded-md mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-10 w-full mt-4 rounded" />
                </CardContent>
              </Card>
            ))
          ) : filteredProperties.length > 0 ? (
            // Property cards
            filteredProperties.map((property) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription className="text-gray-600">{property.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-hidden rounded-md mb-4">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-green-600">
                      ${property.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="mr-1">🛏️</span>
                      {property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Link to={`/property/${property.id}`} className="block mt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            // No properties message
            <div className="col-span-full text-center">
              <p className="text-gray-600">No properties found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EstatePro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
