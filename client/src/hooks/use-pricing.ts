import { useQuery } from "@tanstack/react-query";
import type { PricingPlan } from "@shared/schema";

export const staticPricing: PricingPlan[] = [
  {
    id: 2,
    name: "Premium",
    price: "10€",
    description: "Il mio piano più richiesto per supporto continuativo.",
    features: ["Assistenza completa", "Aiuto compiti", "Attività creative", "Supporto prioritario"],
    isPopular: true
  }
];

export function usePricing() {
  return useQuery({
    queryKey: ["pricing-static"],
    queryFn: async () => {
      return staticPricing;
    },
    initialData: staticPricing,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
