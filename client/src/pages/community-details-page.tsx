import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Community, Property } from "@shared/schema";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  ArrowLeft, 
  MapPin,
  BookOpen,
  Building,
  ParkingMeter,
  ShoppingBag,
  Bus,
  Loader2
} from "lucide-react";
import PropertyCard from "@/components/property-card";

type CommunityDetails = Community & {
  properties: Property[];
};

export default function CommunityDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const communityId = parseInt(id);
  
  const { data: community, isLoading, error } = useQuery<CommunityDetails>({
    queryKey: ["/api/communities", communityId],
    queryFn: async () => {
      const res = await fetch(`/api/communities/${communityId}`);
      if (!res.ok) throw new Error("Failed to fetch community details");
      return await res.json();
    }
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !community) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Community</h2>
          <p className="text-red-700 mb-4">Unable to load community details. The community might not exist or there was a network issue.</p>
          <Link href="/communities">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Communities
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{community.name} | Secondli.xyz</title>
        <meta name="description" content={`Explore properties and learn about the ${community.name} community in ${community.city}. ${community.description.substring(0, 100)}...`} />
      </Helmet>
      
      {/* Hero Banner */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={community.image || "https://images.unsplash.com/photo-1582560475093-ba66accbc424?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"} 
          alt={community.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end h-full pb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{community.name}</h1>
            <p className="text-gray-200 text-xl flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {community.city}, India
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/">
              <a className="hover:underline">Home</a>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/communities">
              <a className="hover:underline">Communities</a>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{community.name}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About {community.name}</h2>
                  <p className="text-gray-700 mb-6 whitespace-pre-line">{community.description}</p>
                  
                  <Separator className="my-6" />
                  
                  {/* Community Facts */}
                  <h2 className="text-xl font-bold mb-4">Community Facts</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">{community.propertyCount} Properties Available</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Mixed Urban Development</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">15+ Educational Institutions</span>
                    </div>
                    <div className="flex items-center">
                      <ShoppingBag className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">Major Shopping Centers</span>
                    </div>
                  </div>
                  
                  {/* AI Insights */}
                  {community.aiInsights && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                          <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">AI-Generated Insights</span>
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-gray-700">{community.aiInsights}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              
              {/* Properties in this community */}
              <h2 className="text-2xl font-bold mb-6">Properties in {community.name}</h2>
              {community.properties && community.properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {community.properties.slice(0, 4).map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No properties currently listed in this community.</p>
                  </CardContent>
                </Card>
              )}
              
              {community.properties && community.properties.length > 4 && (
                <div className="mt-6 text-center">
                  <Link href={`/properties?location=${encodeURIComponent(community.name)}`}>
                    <Button>
                      View All {community.properties.length} Properties
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div>
              <Card className="sticky top-24 mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Amenities Nearby</h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Educational Institutions</h4>
                        <p className="text-sm text-gray-600">Multiple schools and colleges within 3km radius</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <ParkingMeter className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Parks & Recreation</h4>
                        <p className="text-sm text-gray-600">Community parks, sports facilities, and green spaces</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <ShoppingBag className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Shopping & Dining</h4>
                        <p className="text-sm text-gray-600">Shopping malls, markets, and restaurant districts</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Bus className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Transportation</h4>
                        <p className="text-sm text-gray-600">Easy access to public transport and major roadways</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Market Trends</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Property prices in {community.name} have shown a steady appreciation of 8-12% annually over the last 3 years, making it a promising investment area.
                  </p>
                  
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-medium text-primary mb-2">Property Price Range</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span>1 BHK Apartment:</span>
                        <span className="font-medium">₹45L - ₹70L</span>
                      </li>
                      <li className="flex justify-between">
                        <span>2 BHK Apartment:</span>
                        <span className="font-medium">₹70L - ₹1.2Cr</span>
                      </li>
                      <li className="flex justify-between">
                        <span>3 BHK Apartment:</span>
                        <span className="font-medium">₹1.2Cr - ₹2Cr</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Villas/Independent Homes:</span>
                        <span className="font-medium">₹2.5Cr+</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Back Button */}
          <div className="text-center">
            <Link href="/communities">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Communities
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
