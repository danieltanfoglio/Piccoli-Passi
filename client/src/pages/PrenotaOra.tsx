import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertBookingRequestSchema, type InsertBookingRequest } from "@shared/schema";
import { useServices } from "@/hooks/use-services";
import { CalendarCheck, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function PrenotaOra() {
    const [submitted, setSubmitted] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    // Fetch available static services from hooks
    const { data: services = [] } = useServices();

    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const preselectedService = searchParams?.get("service");

    const form = useForm<InsertBookingRequest>({
        resolver: zodResolver(insertBookingRequestSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            country: "",
            services: preselectedService ? [preselectedService] : [],
            message: "",
        },
    });

    const onSubmit = (data: InsertBookingRequest) => {
        setIsPending(true);
        // 1. Invia email al CLIENTE
        const sendToClient = emailjs.send('service_ofsvhc6', 'template_nk3608b', {
            name: data.name,
            email: data.email,
            message: data.message
        }, 'UUjOBWmPLP47UpiUd');

        // 2. Invia email a TE (titolare)
        emailjs.send('service_ofsvhc6', 'template_0wc7xnm', {
            name: data.name,
            email: data.email,
            phone: data.phone,
            country: data.country,
            services: data.services.join(", "),
            message: data.message || "Nessun messaggio aggiuntivo"
        }, 'UUjOBWmPLP47UpiUd')
            .then(function () {
                setSubmitted(true);
                form.reset();
                setIsPending(false);
            }, function (error: any) {
                console.error("EmailJS Error:", error);
                alert("Errore nell'invio... Dettagli: " + (error.text || error.message || JSON.stringify(error)));
                setIsPending(false);
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Prenota un Servizio
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Compila il modulo sottostante selezionando i servizi a cui sei interessato. Ti ricontatteremo a breve!
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
                    >
                        {submitted ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CalendarCheck className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Richiesta Inviata!</h3>
                                <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
                                    Grazie per aver scelto Piccoli Passi. Abbiamo ricevuto la tua richiesta e ti contatteremo al più presto.
                                </p>
                                <Button
                                    onClick={() => setSubmitted(false)}
                                    variant="outline"
                                    className="rounded-full px-8 h-12 text-base"
                                >
                                    Nuova Richiesta
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form ref={formRef} id="form-prenota" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                    {/* Servizi - Multiple Checkbox */}
                                    <FormField
                                        control={form.control}
                                        name="services"
                                        render={() => (
                                            <FormItem>
                                                <div className="mb-4">
                                                    <FormLabel className="text-lg font-bold text-gray-900">Servizi Richiesti</FormLabel>
                                                    <p className="text-sm text-gray-500">Seleziona uno o più servizi (obbligatorio)</p>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {services.map((service) => (
                                                        <FormField
                                                            key={service.id}
                                                            control={form.control}
                                                            name="services"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={service.id}
                                                                        className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(service.title)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, service.title])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value: string) => value !== service.title
                                                                                            )
                                                                                        )
                                                                                }}
                                                                                className="mt-1"
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-medium cursor-pointer flex-1">
                                                                            {service.title}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 font-medium">Nome Completo</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Es: Mario Rossi" {...field} className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all text-base" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 font-medium">Paese di Residenza</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Es: Italia" {...field} className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all text-base" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Es: mario.rossi@email.com" {...field} className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all text-base" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 font-medium">Telefono</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+39 333 1234567" {...field} className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all text-base" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium">Note o richieste particolari (opzionale)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Raccontaci brevemente di cosa hai bisogno..."
                                                        className="min-h-[120px] rounded-xl bg-gray-50 border-gray-200 focus:bg-white resize-none transition-all p-4 text-base"
                                                        {...field}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full h-14 rounded-xl text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
                                    >
                                        {isPending ? "Invio in corso..." : "Invia Richiesta di Prenotazione"}
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
