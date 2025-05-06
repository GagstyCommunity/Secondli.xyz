import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { propertySearchSchema, insertPropertySchema, insertCommunitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // Properties endpoints
  app.get("/api/properties", async (req, res) => {
    try {
      const options = {
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
        isFeatured: req.query.featured === "true" ? true : undefined,
        city: req.query.city as string || undefined
      };
      
      const properties = await storage.getProperties(options);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Error fetching properties" });
    }
  });
  
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const propertyId = parseInt(req.params.id);
      const property = await storage.getProperty(propertyId);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Error fetching property" });
    }
  });
  
  app.post("/api/properties/search", async (req, res) => {
    try {
      const searchCriteria = propertySearchSchema.parse(req.body);
      const properties = await storage.searchProperties(searchCriteria);
      res.json(properties);
    } catch (error) {
      res.status(400).json({ message: error.message || "Invalid search criteria" });
    }
  });
  
  app.post("/api/properties", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to create a property" });
    }
    
    try {
      const propertyData = insertPropertySchema.parse({
        ...req.body,
        ownerId: req.user.id
      });
      
      const property = await storage.createProperty(propertyData);
      res.status(201).json(property);
    } catch (error) {
      res.status(400).json({ message: error.message || "Invalid property data" });
    }
  });
  
  app.put("/api/properties/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to update a property" });
    }
    
    try {
      const propertyId = parseInt(req.params.id);
      const property = await storage.getProperty(propertyId);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      if (property.ownerId !== req.user.id && req.user.userType !== "admin") {
        return res.status(403).json({ message: "You don't have permission to update this property" });
      }
      
      const updatedProperty = await storage.updateProperty(propertyId, req.body);
      res.json(updatedProperty);
    } catch (error) {
      res.status(400).json({ message: error.message || "Error updating property" });
    }
  });
  
  // Agents endpoints
  app.get("/api/agents", async (req, res) => {
    try {
      const options = {
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
      };
      
      const agents = await storage.getAgents(options);
      
      // Enrich agent data with user information
      const enrichedAgents = await Promise.all(
        agents.map(async (agent) => {
          const user = await storage.getUser(agent.userId);
          return {
            ...agent,
            user: user ? {
              fullName: user.fullName,
              email: user.email,
              phone: user.phone
            } : null
          };
        })
      );
      
      res.json(enrichedAgents);
    } catch (error) {
      res.status(500).json({ message: "Error fetching agents" });
    }
  });
  
  app.get("/api/agents/:id", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const agent = await storage.getAgent(agentId);
      
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Get agent's user information
      const user = await storage.getUser(agent.userId);
      
      // Get agent's properties
      const properties = await storage.getPropertiesByOwner(agent.userId);
      
      res.json({
        ...agent,
        user: user ? {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone
        } : null,
        properties
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching agent" });
    }
  });
  
  // Communities endpoints
  app.get("/api/communities", async (req, res) => {
    try {
      const options = {
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
      };
      
      const communities = await storage.getCommunities(options);
      res.json(communities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching communities" });
    }
  });
  
  app.get("/api/communities/:id", async (req, res) => {
    try {
      const communityId = parseInt(req.params.id);
      const community = await storage.getCommunity(communityId);
      
      if (!community) {
        return res.status(404).json({ message: "Community not found" });
      }
      
      // Get properties in this community
      const properties = await storage.getProperties({ city: community.city });
      
      res.json({
        ...community,
        properties
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching community" });
    }
  });
  
  app.post("/api/communities", async (req, res) => {
    if (!req.isAuthenticated() || req.user.userType !== "admin") {
      return res.status(403).json({ message: "Only admins can create communities" });
    }
    
    try {
      const communityData = insertCommunitySchema.parse(req.body);
      const community = await storage.createCommunity(communityData);
      res.status(201).json(community);
    } catch (error) {
      res.status(400).json({ message: error.message || "Invalid community data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
