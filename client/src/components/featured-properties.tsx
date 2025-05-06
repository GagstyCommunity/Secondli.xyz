import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./property-card";
import { Property } from "@shared/schema";
import { Loader2, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function FeaturedProperties() {
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ["/api/properties", { featured: true }],
    queryFn: async () => {
      const res = await fetch("/api/properties?featured=true&limit=3");
      if (!res.ok) throw new Error("Failed to fetch featured properties");
      return await res.json();
    }
  });

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-inter text-gray-900">Featured Properties</h2>
          <Link href="/properties">
            <a className="text-primary hover:text-primary/80 font-medium font-inter flex items-center">
              View all
              <ChevronRight className="h-5 w-5 ml-1" />
            </a>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load featured properties. Please try again later.</p>
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured properties available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
