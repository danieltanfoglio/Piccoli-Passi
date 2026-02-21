import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.services.list.path, async (req, res) => {
    try {
      const allServices = await storage.getServices();
      res.json(allServices);
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.pricing.list.path, async (req, res) => {
    try {
      const plans = await storage.getPricingPlans();
      res.json(plans);
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Seed data logic
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await storage.createService({
      title: "Babysitting",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "child_friendly"
    });
    await storage.createService({
      title: "Aiuto Compiti",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "menu_book"
    });
    await storage.createService({
      title: "Attività Creative",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "palette"
    });
  }

  const existingPlans = await storage.getPricingPlans();
  if (existingPlans.length === 0) {
    await storage.createPricingPlan({
      name: "Base",
      price: "15€ / ora",
      description: "Ideale per necessità occasionali.",
      features: ["Assistenza base", "Flessibilità oraria", "Supporto telefonico"],
      isPopular: false
    });
    await storage.createPricingPlan({
      name: "Premium",
      price: "25€ / ora",
      description: "Il nostro piano più richiesto per supporto continuativo.",
      features: ["Tutor dedicati", "Piano di studio personalizzato", "Attività creative incluse", "Supporto prioritario"],
      isPopular: true
    });
  }
}
