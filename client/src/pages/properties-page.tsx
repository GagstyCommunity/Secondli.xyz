import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Property } from "@shared/schema";
import PropertyCard from "@/components/property-card";
import { Helmet } from "react-helmet-async";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function PropertiesPage() {
  const [location] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  // Filter states
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");
  const [priceMinFilter, setPriceMinFilter] = useState("");
  const [priceMaxFilter, setPriceMaxFilter] = useState("");
  const [bedroomsFilter, setBedroomsFilter] = useState(searchParams.get("bhk") || "");
  
  // Convert budget range to min/max price
  useEffect(() => {
    const budget = searchParams.get("budget");
    if (budget) {
      switch (budget) {
        case "10L-50L":
          setPriceMinFilter("1000000");
          setPriceMaxFilter("5000000");
          break;
        case "50L-1Cr":
          setPriceMinFilter("5000000");
          setPriceMaxFilter("10000000");
          break;
        case "1Cr-3Cr":
          setPriceMinFilter("10000000");
          setPriceMaxFilter("30000000");
          break;
        case "3Cr+":
          setPriceMinFilter("30000000");
          setPriceMaxFilter("");
          break;
      }
    }
  }, [searchParams]);
  
  // Fetch properties
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to fetch properties");
      return await res.json();
    }
  });
  
  // Filter properties based on the criteria
  const filteredProperties = properties?.filter(property => {
    let matches = true;
    
    if (locationFilter && !property.city.toLowerCase().includes(locationFilter.toLowerCase()) && 
        !property.location.toLowerCase().includes(locationFilter.toLowerCase())) {
      matches = false;
    }
    
    if (typeFilter && property.propertyType !== typeFilter) {
      matches = false;
    }
    
    if (priceMinFilter && property.price < parseInt(priceMinFilter)) {
      matches = false;
    }
    
    if (priceMaxFilter && property.price > parseInt(priceMaxFilter)) {
      matches = false;
    }
    
    if (bedroomsFilter) {
      if (bedroomsFilter === "4+") {
        if (property.bedrooms < 4) matches = false;
      } else if (property.bedrooms !== parseInt(bedroomsFilter)) {
        matches = false;
      }
    }
    
    return matches;
  });
  
  // Reset filters
  const resetFilters = () => {
    setLocationFilter("");
    setTypeFilter("");
    setPriceMinFilter("");
    setPriceMaxFilter("");
    setBedroomsFilter("");
  };

  return (
    <>
      <Helmet>
        <title>Properties | Secondli.xyz</title>
        <meta name="description" content="Browse premium properties across India with detailed information, pricing, and virtual tours." />
      </Helmet>
      
      <div className="bg-gradient-to-r from-primary to-primary/90 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white font-inter">Properties</h1>
          <p className="mt-2 text-blue-100 max-w-3xl font-roboto">
            Discover your perfect property from our extensive collection across India
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold font-inter mb-6 flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Filter Properties
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <Input
                    type="text"
                    placeholder="City or locality"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range (₹)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceMinFilter}
                      onChange={(e) => setPriceMinFilter(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceMaxFilter}
                      onChange={(e) => setPriceMaxFilter(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <Select value={bedroomsFilter} onValueChange={setBedroomsFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All BHK" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1 BHK</SelectItem>
                      <SelectItem value="2">2 BHK</SelectItem>
                      <SelectItem value="3">3 BHK</SelectItem>
                      <SelectItem value="4+">4+ BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex flex-col space-y-2">
                  <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Properties grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-500">Failed to load properties. Please try again later.</p>
              </div>
            ) : filteredProperties && filteredProperties.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">{filteredProperties.length} properties found</p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <Button onClick={resetFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
