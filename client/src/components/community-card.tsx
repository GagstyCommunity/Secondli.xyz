import { Community } from "@shared/schema";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <div className="rounded-xl overflow-hidden relative group">
      <img 
        src={community.image || "https://images.unsplash.com/photo-1582560475093-ba66accbc424?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
        alt={community.name} 
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="absolute bottom-0 p-5 w-full">
          <h3 className="text-white text-xl font-bold font-inter mb-1">{community.name}</h3>
          <p className="text-gray-200 text-sm mb-3 font-roboto">{community.propertyCount} properties</p>
          <Link href={`/communities/${community.id}`}>
            <a className="inline-flex items-center text-sm text-white font-medium bg-primary/80 hover:bg-primary px-3 py-1 rounded-full">
              Explore
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
