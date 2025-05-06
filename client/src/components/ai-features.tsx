import { Eye, MessageSquare, BarChart3, FileEdit, MessageCircle, MapPin } from "lucide-react";

export default function AIFeatures() {
  const features = [
    {
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: "Virtual Property Tours",
      description: "Experience immersive 3D virtual tours of properties without leaving your home, saving time and travel."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-secondary" />,
      title: "AI Chatbot Matchmaking",
      description: "Get personalized property recommendations by chatting with our AI, which learns your preferences over time."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-accent" />,
      title: "ROI Investment Insights",
      description: "Make data-driven investment decisions with predictive analytics on property appreciation and rental yields."
    },
    {
      icon: <FileEdit className="h-6 w-6 text-primary" />,
      title: "AI Property Descriptions",
      description: "Unique, detailed, and engaging property descriptions automatically generated for every listing."
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-secondary" />,
      title: "Negotiation Assistant",
      description: "AI-powered assistant that helps you negotiate the best deal based on market data and property history."
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Micro-Community Insights",
      description: "Deep analytics on neighborhoods, amenities, and community development plans for informed decisions."
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-inter text-gray-900">AI-Powered Real Estate Experience</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto font-roboto">
            Discover how artificial intelligence enhances your property search and investment decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-inter text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 font-roboto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
