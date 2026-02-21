import { db } from "./db";
import {
  services,
  pricingPlans,
  contactMessages,
  type Service,
  type InsertService,
  type PricingPlan,
  type InsertPricingPlan,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getPricingPlans(): Promise<PricingPlan[]>;
  createContactMessage(msg: InsertContactMessage): Promise<ContactMessage>;
  // For seeding
  createService(service: InsertService): Promise<Service>;
  createPricingPlan(plan: InsertPricingPlan): Promise<PricingPlan>;
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getPricingPlans(): Promise<PricingPlan[]> {
    return await db.select().from(pricingPlans);
  }

  async createContactMessage(msg: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(msg).returning();
    return message;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async createPricingPlan(plan: InsertPricingPlan): Promise<PricingPlan> {
    const [newPlan] = await db.insert(pricingPlans).values(plan).returning();
    return newPlan;
  }
}

export const storage = new DatabaseStorage();
