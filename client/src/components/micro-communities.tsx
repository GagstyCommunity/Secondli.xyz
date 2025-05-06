import { useQuery } from "@tanstack/react-query";
import { Community } from "@shared/schema";
import CommunityCard from "./community-card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function MicroCommunities() {
  const { data: communities, isLoading, error } = useQuery<Community[]>({
    queryKey: ["/api/communities"],
    queryFn: async () => {
      const res = await fetch("/api/communities?limit=4");
      if (!res.ok) throw new Error("Failed to fetch communities");
      return await res.json();
    }
  });

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter text-gray-900">Discover Micro-Communities</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto font-roboto">
            Explore detailed insights about specific neighborhoods and localities across India
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load communities. Please try again later.</p>
          </div>
        ) : communities && communities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No communities available at the moment.</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/communities">
            <Button size="lg" className="px-5 py-3">
              Explore All Locations
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
