import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

export const staticServices: Service[] = [
  {
    id: 1,
    title: "Babysitting",
    description: "Assistenza qualificata per i più piccoli.",
    longDescription: "Il nostro servizio di babysitting offre assistenza qualificata e amorevole per bambini di tutte le età. Ci occupiamo della loro sicurezza e del loro divertimento mentre tu sei impegnato.",
    icon: "Baby"
  },
  {
    id: 2,
    title: "Aiuto Compiti",
    description: "Supporto scolastico personalizzato.",
    longDescription: "Aiutiamo i bambini a superare le difficoltà scolastiche con un metodo di studio efficace e personalizzato, rendendo i compiti un momento di crescita e non di stress.",
    icon: "BookOpen"
  },
  {
    id: 3,
    title: "Attività Creative",
    description: "Laboratori e giochi stimolanti.",
    longDescription: "Organizziamo laboratori creativi, giochi educativi e attività artistiche per stimolare la fantasia e le abilità manuali dei bambini in un ambiente sicuro.",
    icon: "Palette"
  }
];

export function useServices() {
  return useQuery({
    queryKey: ["services-static"],
    queryFn: async () => {
      return staticServices;
    },
    initialData: staticServices,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
