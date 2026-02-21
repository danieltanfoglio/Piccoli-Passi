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

  app.post(api.booking.create.path, async (req, res) => {
    try {
      const input = api.booking.create.input.parse(req.body);
      const request = await storage.createBookingRequest(input);
      res.status(201).json(request);
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
      description: "Assistenza qualificata per i più piccoli.",
      longDescription: "Il nostro servizio di babysitting offre assistenza qualificata e amorevole per bambini di tutte le età. Ci occupiamo della loro sicurezza e del loro divertimento mentre tu sei impegnato.",
      icon: "Baby"
    });
    await storage.createService({
      title: "Aiuto Compiti",
      description: "Supporto scolastico personalizzato.",
      longDescription: "Aiutiamo i bambini a superare le difficoltà scolastiche con un metodo di studio efficace e personalizzato, rendendo i compiti un momento di crescita e non di stress.",
      icon: "BookOpen"
    });
    await storage.createService({
      title: "Attività Creative",
      description: "Laboratori e giochi stimolanti.",
      longDescription: "Organizziamo laboratori creativi, giochi educativi e attività artistiche per stimolare la fantasia e le abilità manuali dei bambini in un ambiente sicuro.",
      icon: "Palette"
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
