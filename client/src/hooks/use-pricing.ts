import { useQuery } from "@tanstack/react-query";
import type { PricingPlan } from "@shared/schema";

export const staticPricing: PricingPlan[] = [
  {
    id: 1,
    name: "Base",
    price: "15€ / ora",
    description: "Ideale per necessità occasionali.",
    features: ["Assistenza base", "Flessibilità oraria", "Supporto telefonico"],
    isPopular: false
  },
  {
    id: 2,
    name: "Premium",
    price: "25€ / ora",
    description: "Il nostro piano più richiesto per supporto continuativo.",
    features: ["Tutor dedicati", "Piano di studio personalizzato", "Attività creative incluse", "Supporto prioritario"],
    isPopular: true
  }
];

export function usePricing() {
  return useQuery({
    queryKey: ["pricing-static"],
    queryFn: async () => {
      return staticPricing;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
