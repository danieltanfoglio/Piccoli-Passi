import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { getApiUrl } from "@/lib/queryClient";

export function usePricing() {
  return useQuery({
    queryKey: [api.pricing.list.path],
    queryFn: async () => {
      const fullUrl = getApiUrl(api.pricing.list.path);
      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error("Failed to fetch pricing plans");
      return api.pricing.list.responses[200].parse(await res.json());
    },
  });
}
