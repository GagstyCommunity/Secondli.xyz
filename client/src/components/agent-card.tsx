import { Agent } from "@shared/schema";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface AgentCardProps {
  agent: Agent & {
    user?: {
      fullName: string;
      email: string;
      phone?: string;
    } | null;
  };
}

export default function AgentCard({ agent }: AgentCardProps) {
  const openWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!agent.user?.phone) return;
    
    // Format phone number for WhatsApp
    const phoneNumber = agent.user.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="p-4 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img 
            src={agent.profileImage || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
            alt={agent.user?.fullName || "Real estate agent"} 
            className="rounded-full object-cover w-full h-full"
          />
          {agent.isVerified && (
            <div className="absolute bottom-0 right-0 bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center">
              <CheckCircle className="h-5 w-5" />
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold font-inter text-gray-900">
          {agent.user?.fullName || "Real Estate Agent"}
        </h3>
        
        <p className="text-gray-500 text-sm mb-2">{agent.specialization || "Property Specialist"}</p>
        
        <div className="flex justify-center items-center text-amber-400 mb-3">
          {Array(5).fill(0).map((_, i) => (
            <Star key={i} className="h-4 w-4" fill={i < Math.floor(agent.ratings || 0) ? "currentColor" : "none"} />
          ))}
          <span className="ml-1 text-gray-600">({agent.reviewCount || 0})</span>
        </div>
        
        <Button
          onClick={openWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          WhatsApp
        </Button>
      </div>
      
      <Link href={`/agents/${agent.id}`}>
        <div className="absolute inset-0 z-10 cursor-pointer">
          <span className="sr-only">View agent profile</span>
        </div>
      </Link>
    </div>
  );
}
