import { Link } from "wouter";
import { Property } from "@shared/schema";
import { Heart, Phone, MapPin, Home, LayoutDashboard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 property-card">
      <div className="relative">
        <img 
          src={property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
          alt={property.title} 
          className="h-64 w-full object-cover"
        />
        {property.isFeatured && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`${property.isForSale ? 'bg-secondary' : 'bg-purple-500'} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {property.isForSale ? 'For Sale' : 'For Rent'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold font-inter text-gray-900 mb-2">{property.title}</h3>
        <p className="text-gray-500 mb-4 flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}, {property.city}
        </p>
        
        <div className="flex justify-between mb-4 text-sm">
          <div className="flex items-center">
            <Home className="h-4 w-4 text-gray-400 mr-1" />
            <span>{property.bedrooms} BHK</span>
          </div>
          <div className="flex items-center">
            <LayoutDashboard className="h-4 w-4 text-gray-400 mr-1" />
            <span>{property.area} sq.ft.</span>
          </div>
          {property.rating && (
            <div className="flex items-center">
              <Zap className="h-4 w-4 text-gray-400 mr-1" />
              <span>{property.rating}/10</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <span className="text-xl font-bold text-primary font-inter">{formatPrice(property.price)}</span>
          </div>
          <div className="flex space-x-2">
            <Button size="icon" variant="outline" className="bg-green-50 hover:bg-green-100 text-secondary">
              <Phone className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className="bg-blue-50 hover:bg-blue-100 text-primary">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <Link href={`/properties/${property.id}`}>
        <div className="absolute inset-0 z-10 cursor-pointer">
          <span className="sr-only">View property details</span>
        </div>
      </Link>
    </div>
  );
}
