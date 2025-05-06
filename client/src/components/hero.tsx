import SearchForm from "./search-form";
import { CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-primary to-cyan-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-inter mb-4 leading-tight">
              Find Your Perfect Property with AI-Powered Insights
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-lg font-roboto">
              Discover premium properties across India enhanced with virtual tours, AI descriptions, and personalized recommendations.
            </p>
            
            <SearchForm />
            
            <div className="flex items-center space-x-4 text-sm text-white">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span>AI-Generated Insights</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-1" />
                <span>Virtual Tours</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block mt-8 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Modern apartment interior" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
