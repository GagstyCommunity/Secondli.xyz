import Hero from "@/components/hero";
import AIFeatures from "@/components/ai-features";
import FeaturedProperties from "@/components/featured-properties";
import MicroCommunities from "@/components/micro-communities";
import TopAgents from "@/components/top-agents";
import CallToAction from "@/components/call-to-action";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Secondli.xyz - Modern Property Marketplace in India</title>
        <meta name="description" content="Discover premium properties across India enhanced with AI-powered insights, virtual tours, and personalized recommendations." />
        <meta property="og:title" content="Secondli.xyz - Modern Property Marketplace" />
        <meta property="og:description" content="Find your perfect property with AI-powered insights, virtual tours, and personalized recommendations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://secondli.xyz" />
      </Helmet>
      
      <main>
        <Hero />
        <AIFeatures />
        <FeaturedProperties />
        <MicroCommunities />
        <TopAgents />
        <CallToAction />
      </main>
    </>
  );
}
