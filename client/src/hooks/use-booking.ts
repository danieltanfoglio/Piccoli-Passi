import { useMutation } from "@tanstack/react-query";
import { api, type InsertBookingRequest } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useBooking() {
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (data: InsertBookingRequest) => {
            const res = await fetch(api.booking.create.path, {
                method: api.booking.create.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                if (res.status === 400) {
                    const error = api.booking.create.responses[400].parse(await res.json());
                    throw new Error(error.message);
                }
                throw new Error("Failed to send booking request");
            }

            return api.booking.create.responses[201].parse(await res.json());
        },
        onSuccess: () => {
            toast({
                title: "Richiesta inviata!",
                description: "Ti contatteremo al più presto per confermare la prenotazione.",
            });
        },
        onError: (error) => {
            toast({
                title: "Errore",
                description: error.message,
                variant: "destructive",
            });
        },
    });
}
