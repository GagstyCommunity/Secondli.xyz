import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  userType: text("user_type").notNull().default("user"), // user, agent, admin
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  phone: true,
  userType: true,
});

// Property model
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  city: text("city").notNull(),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  area: integer("area").notNull(), // square feet
  propertyType: text("property_type").notNull(), // apartment, villa, house, plot, commercial
  isForSale: boolean("is_for_sale").notNull().default(true),
  isFeatured: boolean("is_featured").default(false),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  rating: integer("rating"),
  images: text("images").array(),
  ownerId: integer("owner_id").notNull(),
  aiDescription: text("ai_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPropertySchema = createInsertSchema(properties).pick({
  title: true,
  description: true,
  location: true,
  city: true,
  price: true,
  bedrooms: true,
  bathrooms: true,
  area: true,
  propertyType: true,
  isForSale: true,
  images: true,
  ownerId: true,
});

// Agent model
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  specialization: text("specialization"),
  experience: integer("experience"),
  about: text("about"),
  profileImage: text("profile_image"),
  ratings: integer("ratings"),
  reviewCount: integer("review_count").default(0),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAgentSchema = createInsertSchema(agents).pick({
  userId: true,
  specialization: true,
  experience: true,
  about: true,
  profileImage: true,
});

// Communities/Localities model
export const communities = pgTable("communities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  propertyCount: integer("property_count").default(0),
  aiInsights: text("ai_insights"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCommunitySchema = createInsertSchema(communities).pick({
  name: true,
  city: true,
  description: true,
  image: true,
  aiInsights: true,
});

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;

export type Community = typeof communities.$inferSelect;
export type InsertCommunity = z.infer<typeof insertCommunitySchema>;

// Additional validation schemas
export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const propertySearchSchema = z.object({
  location: z.string().optional(),
  propertyType: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  bedrooms: z.number().optional(),
});
