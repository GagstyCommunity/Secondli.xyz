import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useNavigate } from "wouter";

export default function SearchForm() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [, navigate] = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string for the search
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType) params.append("type", propertyType);
    if (budget) params.append("budget", budget);
    if (bedrooms) params.append("bhk", bedrooms);
    
    // Navigate to properties page with search parameters
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700 mb-1">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-900 font-roboto">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700 mb-1">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-900 font-roboto">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="plot">Plot</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700 mb-1">Budget</Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-900 font-roboto">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10L-50L">₹10L - ₹50L</SelectItem>
                <SelectItem value="50L-1Cr">₹50L - ₹1Cr</SelectItem>
                <SelectItem value="1Cr-3Cr">₹1Cr - ₹3Cr</SelectItem>
                <SelectItem value="3Cr+">₹3Cr+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label className="block text-sm font-medium text-gray-700 mb-1">BHK</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-900 font-roboto">
                <SelectValue placeholder="Select BHK" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4+">4+ BHK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-md py-2 px-4 font-roboto">
          Search Properties
        </Button>
      </form>
    </div>
  );
}
