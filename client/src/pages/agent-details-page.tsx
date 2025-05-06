import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Agent, Property } from "@shared/schema";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  ArrowLeft, 
  Phone,
  Mail,
  CheckCircle,
  Star,
  MessageCircle,
  Briefcase,
  Loader2
} from "lucide-react";
import PropertyCard from "@/components/property-card";

type AgentDetails = Agent & {
  user?: {
    fullName: string;
    email: string;
    phone?: string;
  } | null;
  properties: Property[];
};

export default function AgentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const agentId = parseInt(id);
  
  const { data: agent, isLoading, error } = useQuery<AgentDetails>({
    queryKey: ["/api/agents", agentId],
    queryFn: async () => {
      const res = await fetch(`/api/agents/${agentId}`);
      if (!res.ok) throw new Error("Failed to fetch agent details");
      return await res.json();
    }
  });
  
  const openWhatsApp = () => {
    if (!agent?.user?.phone) return;
    
    // Format phone number for WhatsApp
    const phoneNumber = agent.user.phone.replace(/\D/g, '');
    const message = `Hi ${agent.user.fullName}, I'm interested in your services as a real estate agent. Can we discuss?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const sendEmail = () => {
    if (!agent?.user?.email) return;
    
    const subject = `Inquiry about real estate services`;
    const body = `Hi ${agent.user.fullName},\n\nI found your profile on Secondli.xyz and I'm interested in your services as a real estate agent.\n\nPlease contact me to discuss further.\n\nThank you.`;
    window.location.href = `mailto:${agent.user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !agent) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Agent</h2>
          <p className="text-red-700 mb-4">Unable to load agent details. The agent might not exist or there was a network issue.</p>
          <Link href="/agents">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Agents
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{agent.user?.fullName || "Agent"} | Secondli.xyz</title>
        <meta name="description" content={`${agent.user?.fullName || "Real estate agent"} - ${agent.specialization || "Property specialist"} with experience in real estate. Connect with them for property assistance.`} />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/">
              <a className="hover:underline">Home</a>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/agents">
              <a className="hover:underline">Agents</a>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{agent.user?.fullName || "Agent Profile"}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Agent Profile */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <img 
                        src={agent.profileImage || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                        alt={agent.user?.fullName || "Agent"} 
                        className="rounded-full object-cover w-full h-full"
                      />
                      {agent.isVerified && (
                        <div className="absolute bottom-0 right-0 bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{agent.user?.fullName || "Real Estate Agent"}</h1>
                    <p className="text-gray-500 mb-3">{agent.specialization || "Property Specialist"}</p>
                    
                    <div className="flex items-center text-amber-400 mb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="h-5 w-5" fill={i < Math.floor(agent.ratings || 0) ? "currentColor" : "none"} />
                      ))}
                      <span className="ml-1 text-gray-600">({agent.reviewCount || 0} reviews)</span>
                    </div>
                    
                    <Separator className="mb-6 w-full" />
                    
                    <div className="space-y-4 w-full">
                      <Button 
                        onClick={openWhatsApp}
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        Contact via WhatsApp
                      </Button>
                      
                      <Button 
                        onClick={sendEmail}
                        variant="outline"
                        className="w-full"
                      >
                        <Mail className="mr-2 h-5 w-5" />
                        Send Email
                      </Button>
                    </div>
                    
                    <Separator className="my-6 w-full" />
                    
                    <div className="w-full space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Experience</h3>
                        <p className="font-medium text-gray-900 flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-primary" />
                          {agent.experience || 0} years
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Properties</h3>
                        <p className="font-medium text-gray-900 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          {agent.properties?.length || 0} active listings
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Response Time</h3>
                        <p className="font-medium text-gray-900 flex items-center">
                          <MessageCircle className="h-4 w-4 mr-2 text-primary" />
                          Usually responds within 2 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Agent Info and Properties */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">About {agent.user?.fullName || "Agent"}</h2>
                  <p className="text-gray-700 mb-6">
                    {agent.about || 
                    `A professional real estate agent with expertise in helping clients find their perfect property. 
                    Specializing in ${agent.specialization || "various property types"} with ${agent.experience || "several"} years of experience in the real estate market.`}
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-xl font-bold mb-4">Areas of Expertise</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {agent.specialization || "Residential Properties"}
                    </span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Property Valuation
                    </span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Investment Consulting
                    </span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      Market Analysis
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Agent's Properties */}
              <h2 className="text-2xl font-bold mb-6">Agent's Properties</h2>
              {agent.properties && agent.properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agent.properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">This agent has no active property listings at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link href="/agents">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Agents
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
