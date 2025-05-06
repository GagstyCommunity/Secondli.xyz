import { useQuery } from "@tanstack/react-query";
import { Community } from "@shared/schema";
import CommunityCard from "@/components/community-card";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";

export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: communities, isLoading, error } = useQuery<Community[]>({
    queryKey: ["/api/communities"],
    queryFn: async () => {
      const res = await fetch("/api/communities");
      if (!res.ok) throw new Error("Failed to fetch communities");
      return await res.json();
    }
  });
  
  // Filter communities based on search term
  const filteredCommunities = communities?.filter(community => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      community.name.toLowerCase().includes(searchLower) ||
      community.city.toLowerCase().includes(searchLower) ||
      community.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Helmet>
        <title>Explore Communities and Localities | Secondli.xyz</title>
        <meta name="description" content="Explore detailed insights about specific neighborhoods and localities across India. Find the perfect community for your next home." />
      </Helmet>
      
      <div className="bg-gradient-to-r from-primary to-primary/90 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white font-inter">Discover Communities</h1>
          <p className="mt-2 text-blue-100 max-w-3xl font-roboto">
            Explore detailed insights about neighborhoods and localities across India
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by community name or city"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline"
              onClick={() => setSearchTerm("")}
              disabled={!searchTerm}
            >
              Clear
            </Button>
          </div>
        </div>
        
        {/* Communities Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-500">Failed to load communities. Please try again later.</p>
          </div>
        ) : filteredCommunities && filteredCommunities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            {searchTerm ? (
              <>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No communities found matching "{searchTerm}"</h3>
                <p className="text-gray-600 mb-4">Try a different search term or clear the search.</p>
                <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No communities available</h3>
                <p className="text-gray-600 mb-4">
                  Our community directory is currently empty. Check back later for updates.
                </p>
              </>
            )}
          </div>
        )}
        
        {/* Community Benefits Section */}
        <div className="mt-16">
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Why Explore Communities on Secondli.xyz</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Neighborhood Safety</h3>
                <p className="text-gray-600">
                  Access detailed safety information and crime statistics for each community to make informed decisions for your family's well-being.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Educational Facilities</h3>
                <p className="text-gray-600">
                  Find the best schools, colleges, and educational institutions in each locality to ensure quality education for your children.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Investment Potential</h3>
                <p className="text-gray-600">
                  Explore AI-powered insights on property appreciation and future development plans to make smart investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
