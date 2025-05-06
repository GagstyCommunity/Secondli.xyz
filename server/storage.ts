import { users, type User, type InsertUser, properties, type Property, type InsertProperty, agents, type Agent, type InsertAgent, communities, type Community, type InsertCommunity } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property operations
  getProperty(id: number): Promise<Property | undefined>;
  getProperties(options?: { limit?: number, offset?: number, isFeatured?: boolean, city?: string }): Promise<Property[]>;
  getPropertiesByOwner(ownerId: number): Promise<Property[]>;
  searchProperties(criteria: any): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<Property>): Promise<Property | undefined>;
  
  // Agent operations
  getAgent(id: number): Promise<Agent | undefined>;
  getAgentByUserId(userId: number): Promise<Agent | undefined>;
  getAgents(options?: { limit?: number, offset?: number }): Promise<Agent[]>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  
  // Community operations
  getCommunity(id: number): Promise<Community | undefined>;
  getCommunities(options?: { limit?: number, offset?: number }): Promise<Community[]>;
  getCommunityByCity(city: string): Promise<Community[]>;
  createCommunity(community: InsertCommunity): Promise<Community>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private propertiesMap: Map<number, Property>;
  private agentsMap: Map<number, Agent>;
  private communitiesMap: Map<number, Community>;
  
  sessionStore: session.SessionStore;
  private userIdCounter: number;
  private propertyIdCounter: number;
  private agentIdCounter: number;
  private communityIdCounter: number;

  constructor() {
    this.usersMap = new Map();
    this.propertiesMap = new Map();
    this.agentsMap = new Map();
    this.communitiesMap = new Map();
    
    this.userIdCounter = 1;
    this.propertyIdCounter = 1;
    this.agentIdCounter = 1;
    this.communityIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Initialize with some communities
    this.initCommunities();
  }

  // Initialize some basic communities
  private initCommunities() {
    const cities = ["Mumbai", "Delhi NCR", "Bangalore", "Hyderabad"];
    const propertyCounts = [4235, 3890, 2970, 2105];
    
    cities.forEach((city, index) => {
      this.createCommunity({
        name: city,
        city: city,
        description: `Discover properties in ${city}, one of India's most vibrant cities.`,
        image: "",
        aiInsights: `${city} is experiencing steady growth in real estate values, with promising investment opportunities.`
      });
      
      // Update property count
      const community = this.communitiesMap.get(index + 1);
      if (community) {
        community.propertyCount = propertyCounts[index];
        this.communitiesMap.set(index + 1, community);
      }
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(user => user.username === username);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(user => user.email === email);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const timestamp = new Date();
    const newUser: User = { 
      ...user, 
      id,
      createdAt: timestamp
    };
    this.usersMap.set(id, newUser);
    return newUser;
  }
  
  // Property methods
  async getProperty(id: number): Promise<Property | undefined> {
    return this.propertiesMap.get(id);
  }
  
  async getProperties(options: { limit?: number, offset?: number, isFeatured?: boolean, city?: string } = {}): Promise<Property[]> {
    let properties = Array.from(this.propertiesMap.values());
    
    if (options.isFeatured !== undefined) {
      properties = properties.filter(property => property.isFeatured === options.isFeatured);
    }
    
    if (options.city) {
      properties = properties.filter(property => property.city === options.city);
    }
    
    // Apply pagination
    const offset = options.offset || 0;
    const limit = options.limit || properties.length;
    
    return properties.slice(offset, offset + limit);
  }
  
  async getPropertiesByOwner(ownerId: number): Promise<Property[]> {
    return Array.from(this.propertiesMap.values())
      .filter(property => property.ownerId === ownerId);
  }
  
  async searchProperties(criteria: any): Promise<Property[]> {
    let properties = Array.from(this.propertiesMap.values());
    
    if (criteria.location) {
      properties = properties.filter(property => 
        property.location.toLowerCase().includes(criteria.location.toLowerCase()) || 
        property.city.toLowerCase().includes(criteria.location.toLowerCase())
      );
    }
    
    if (criteria.propertyType) {
      properties = properties.filter(property => property.propertyType === criteria.propertyType);
    }
    
    if (criteria.minPrice) {
      properties = properties.filter(property => property.price >= criteria.minPrice);
    }
    
    if (criteria.maxPrice) {
      properties = properties.filter(property => property.price <= criteria.maxPrice);
    }
    
    if (criteria.bedrooms) {
      properties = properties.filter(property => property.bedrooms === criteria.bedrooms);
    }
    
    return properties;
  }
  
  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.propertyIdCounter++;
    const timestamp = new Date();
    const newProperty: Property = { 
      ...property, 
      id,
      isFeatured: false,
      status: "pending",
      rating: 0,
      aiDescription: "",
      createdAt: timestamp,
      updatedAt: timestamp
    };
    this.propertiesMap.set(id, newProperty);
    return newProperty;
  }
  
  async updateProperty(id: number, updates: Partial<Property>): Promise<Property | undefined> {
    const property = this.propertiesMap.get(id);
    if (!property) return undefined;
    
    const updatedProperty: Property = { 
      ...property, 
      ...updates,
      updatedAt: new Date()
    };
    this.propertiesMap.set(id, updatedProperty);
    return updatedProperty;
  }
  
  // Agent methods
  async getAgent(id: number): Promise<Agent | undefined> {
    return this.agentsMap.get(id);
  }
  
  async getAgentByUserId(userId: number): Promise<Agent | undefined> {
    return Array.from(this.agentsMap.values())
      .find(agent => agent.userId === userId);
  }
  
  async getAgents(options: { limit?: number, offset?: number } = {}): Promise<Agent[]> {
    const agents = Array.from(this.agentsMap.values());
    
    // Apply pagination
    const offset = options.offset || 0;
    const limit = options.limit || agents.length;
    
    return agents.slice(offset, offset + limit);
  }
  
  async createAgent(agent: InsertAgent): Promise<Agent> {
    const id = this.agentIdCounter++;
    const timestamp = new Date();
    const newAgent: Agent = { 
      ...agent, 
      id,
      ratings: 0,
      reviewCount: 0,
      isVerified: false,
      createdAt: timestamp
    };
    this.agentsMap.set(id, newAgent);
    return newAgent;
  }
  
  // Community methods
  async getCommunity(id: number): Promise<Community | undefined> {
    return this.communitiesMap.get(id);
  }
  
  async getCommunities(options: { limit?: number, offset?: number } = {}): Promise<Community[]> {
    const communities = Array.from(this.communitiesMap.values());
    
    // Apply pagination
    const offset = options.offset || 0;
    const limit = options.limit || communities.length;
    
    return communities.slice(offset, offset + limit);
  }
  
  async getCommunityByCity(city: string): Promise<Community[]> {
    return Array.from(this.communitiesMap.values())
      .filter(community => community.city.toLowerCase().includes(city.toLowerCase()));
  }
  
  async createCommunity(community: InsertCommunity): Promise<Community> {
    const id = this.communityIdCounter++;
    const timestamp = new Date();
    const newCommunity: Community = { 
      ...community, 
      id,
      propertyCount: 0,
      createdAt: timestamp
    };
    this.communitiesMap.set(id, newCommunity);
    return newCommunity;
  }
}

export const storage = new MemStorage();
