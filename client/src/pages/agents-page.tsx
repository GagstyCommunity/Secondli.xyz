import { useQuery } from "@tanstack/react-query";
import { Agent } from "@shared/schema";
import AgentCard from "@/components/agent-card";
import { Helmet } from "react-helmet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";

type AgentWithUser = Agent & {
  user?: {
    fullName: string;
    email: string;
    phone?: string;
  } | null;
};

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: agents, isLoading, error } = useQuery<AgentWithUser[]>({
    queryKey: ["/api/agents"],
    queryFn: async () => {
      const res = await fetch("/api/agents");
      if (!res.ok) throw new Error("Failed to fetch agents");
      return await res.json();
    }
  });
  
  // Filter agents based on search term
  const filteredAgents = agents?.filter(agent => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (agent.user?.fullName && agent.user.fullName.toLowerCase().includes(searchLower)) ||
      (agent.specialization && agent.specialization.toLowerCase().includes(searchLower)) ||
      (agent.about && agent.about.toLowerCase().includes(searchLower))
    );
  });

  return (
    <>
      <Helmet>
        <title>Real Estate Agents | Secondli.xyz</title>
        <meta name="description" content="Connect with experienced real estate professionals to help you find the perfect property across India." />
      </Helmet>
      
      <div className="bg-gradient-to-r from-primary to-primary/90 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white font-inter">Our Real Estate Experts</h1>
          <p className="mt-2 text-blue-100 max-w-3xl font-roboto">
            Connect with experienced professionals who can help you find your dream property
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
                placeholder="Search by name or specialization"
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
        
        {/* Agents Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-500">Failed to load agents. Please try again later.</p>
          </div>
        ) : filteredAgents && filteredAgents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            {searchTerm ? (
              <>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No agents found matching "{searchTerm}"</h3>
                <p className="text-gray-600 mb-4">Try a different search term or clear the search.</p>
                <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No agents available</h3>
                <p className="text-gray-600 mb-4">
                  Our agent directory is currently empty. Check back later for updates.
                </p>
              </>
            )}
          </div>
        )}
        
        {/* Join as Agent CTA */}
        <div className="mt-16 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Are you a real estate professional?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join our network of trusted agents and showcase your properties to thousands of potential buyers and renters.
          </p>
          <Button className="bg-primary hover:bg-primary/90">Become an Agent</Button>
        </div>
      </div>
    </>
  );
}
