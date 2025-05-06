import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Property } from "@shared/schema";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar, 
  Tag, 
  Heart, 
  Share2, 
  ArrowLeft, 
  Phone,
  Home,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import { useState } from "react";

// Image carousel component for property gallery
function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!images || images.length === 0) {
    return (
      <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 w-full">
      <img 
        src={images[currentIndex]} 
        alt={`Property image ${currentIndex + 1}`} 
        className="w-full h-full object-cover rounded-lg"
      />
      
      {images.length > 1 && (
        <>
          <Button 
            onClick={goToPrevious} 
            variant="secondary" 
            size="icon" 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            onClick={goToNext} 
            variant="secondary" 
            size="icon" 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const propertyId = parseInt(id);
  
  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ["/api/properties", propertyId],
    queryFn: async () => {
      const res = await fetch(`/api/properties/${propertyId}`);
      if (!res.ok) throw new Error("Failed to fetch property details");
      return await res.json();
    }
  });
  
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };
  
  const handleContact = () => {
    // Open WhatsApp with a predefined message
    const message = `Hi, I'm interested in the property "${property?.title}" (ID: ${property?.id}) listed on Secondli.xyz. Can you provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Property</h2>
          <p className="text-red-700 mb-4">Unable to load property details. The property might not exist or there was a network issue.</p>
          <Link href="/properties">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{property.title} | Secondli.xyz</title>
        <meta name="description" content={property.description.substring(0, 160)} />
        <meta property="og:title" content={`${property.title} | Secondli.xyz`} />
        <meta property="og:description" content={property.description.substring(0, 160)} />
        <meta property="og:image" content={property.images?.[0]} />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/">
              <a className="hover:underline">Home</a>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/properties">
              <a className="hover:underline">Properties</a>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{property.title}</span>
          </div>
          
          {/* Property Title and Main Actions */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-gray-600 flex items-center text-lg">
                <MapPin className="h-5 w-5 mr-1 text-primary" />
                {property.location}, {property.city}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}</div>
              <div className="mt-2 flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-5 w-5 text-primary" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5 text-primary" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Property Gallery */}
          <div className="mb-8">
            <ImageCarousel images={property.images || [
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            ]} />
          </div>
          
          {/* Property Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {/* Property Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <Bed className="h-6 w-6 text-primary mb-2" />
                      <span className="text-sm text-gray-500">Bedrooms</span>
                      <span className="font-semibold">{property.bedrooms} BHK</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <Bath className="h-6 w-6 text-primary mb-2" />
                      <span className="text-sm text-gray-500">Bathrooms</span>
                      <span className="font-semibold">{property.bathrooms}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <Square className="h-6 w-6 text-primary mb-2" />
                      <span className="text-sm text-gray-500">Area</span>
                      <span className="font-semibold">{property.area} sq.ft.</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <Home className="h-6 w-6 text-primary mb-2" />
                      <span className="text-sm text-gray-500">Type</span>
                      <span className="font-semibold capitalize">{property.propertyType}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Description</h2>
                    <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
                  </div>
                  
                  {/* AI Generated Description */}
                  {property.aiDescription && (
                    <>
                      <Separator className="my-6" />
                      <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                          <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">AI-Generated Insights</span>
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-gray-700">{property.aiDescription}</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Separator className="my-6" />
                  
                  {/* Additional Details */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Property Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Tag className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700 mr-2">ID:</span>
                        <span className="font-medium">{property.id}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700 mr-2">Listed:</span>
                        <span className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Home className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700 mr-2">Status:</span>
                        <span className="font-medium text-green-600">Available</span>
                      </div>
                      {property.rating && (
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-amber-400 mr-2" />
                          <span className="text-gray-700 mr-2">Rating:</span>
                          <span className="font-medium">{property.rating}/10</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  {/* Contact Form */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Interested in this property?</h3>
                    <p className="text-gray-600 mb-4">Contact the agent for more information or to schedule a viewing.</p>
                    <Button 
                      onClick={handleContact} 
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Contact via WhatsApp
                    </Button>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Key Features */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>{property.bedrooms} Bedrooms with attached bathrooms</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>Spacious {property.area} sq.ft. living area</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>Prime location in {property.location}</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>24/7 security and maintenance</span>
                      </li>
                      <li className="flex items-center text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>Modern amenities and facilities</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Back Button */}
          <div className="text-center">
            <Link href="/properties">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
