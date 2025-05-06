import { useQuery } from "@tanstack/react-query";
import { Agent } from "@shared/schema";
import AgentCard from "./agent-card";
import { Loader2 } from "lucide-react";

export default function TopAgents() {
  const { data: agents, isLoading, error } = useQuery<(Agent & {
    user?: {
      fullName: string;
      email: string;
      phone?: string;
    } | null;
  })[]>({
    queryKey: ["/api/agents"],
    queryFn: async () => {
      const res = await fetch("/api/agents?limit=4");
      if (!res.ok) throw new Error("Failed to fetch agents");
      return await res.json();
    }
  });

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter text-gray-900">Meet Our Top Agents</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto font-roboto">
            Connect with experienced real estate professionals to help you find the perfect property
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load agents. Please try again later.</p>
          </div>
        ) : agents && agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No agents available at the moment.</p>
            <p className="mt-2 text-gray-400">
              Want to become an agent? <a href="/register-agent" className="text-primary hover:underline">Register here</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
