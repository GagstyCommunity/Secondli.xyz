import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import PropertiesPage from "@/pages/properties-page";
import PropertyDetailsPage from "@/pages/property-details-page";
import AgentsPage from "@/pages/agents-page";
import AgentDetailsPage from "@/pages/agent-details-page";
import CommunitiesPage from "@/pages/communities-page";
import CommunityDetailsPage from "@/pages/community-details-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/properties" component={PropertiesPage} />
      <Route path="/properties/:id" component={PropertyDetailsPage} />
      <Route path="/agents" component={AgentsPage} />
      <Route path="/agents/:id" component={AgentDetailsPage} />
      <Route path="/communities" component={CommunitiesPage} />
      <Route path="/communities/:id" component={CommunityDetailsPage} />
      {/* Protected routes */}
      <ProtectedRoute path="/dashboard" component={() => <div>Dashboard - Coming Soon</div>} />
      <ProtectedRoute path="/profile" component={() => <div>Profile - Coming Soon</div>} />
      <ProtectedRoute path="/submit-property" component={() => <div>Submit Property - Coming Soon</div>} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Navbar />
          <Toaster />
          <Router />
          <Footer />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
