import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function Contatti() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    setIsPending(true);

    // 1. Invia email al CLIENTE (usando il suo indirizzo nel campo email)
    const sendToClient = emailjs.send('service_ofsvhc6', 'template_nk3608b', {
      name: data.name,
      email: data.email,
      message: data.message
    }, 'UUjOBWmPLP47UpiUd');

    // 2. Invia email a TE STESSO (forzando l'email admin) usando il nuovo template (template_0wc7xnm)
    const sendToAdmin = emailjs.send('service_ofsvhc6', 'template_0wc7xnm', {
      name: data.name + " (Contatto)",
      email: data.email, // Manda la mail al gestore
      country: "N/A",
      services: "N/A (Form Contatti base)",
      message: `Hai ricevuto un nuovo messaggio da: ${data.name}\n\nTesto:\n${data.message}`
    }, 'UUjOBWmPLP47UpiUd');

    Promise.all([sendToClient, sendToAdmin])
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
    <div className="bg-gray-50 flex flex-col">


      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Parliamo del tuo futuro
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Hai domande sui miei percorsi? Vuoi prenotare un'appuntamento gratuito?
                Compila il form o contattaci direttamente.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Vienimi a trovare</h3>
                    <p className="text-gray-600">Via Giovanni Paolo II, 25016 Brescia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Chiamami</h3>
                    <p className="text-gray-600">+39 370 340 9814</p>
                    <p className="text-sm text-gray-400">Lun - Ven, 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Scrivimi</h3>
                    <p className="text-gray-600">ambratanfoglio@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Inviata!</h3>
                  <p className="text-gray-600 mb-8">
                    Grazie per averci contattato. Le risponderò il prima possibile.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                  >
                    Invia un'altra email
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Inviami una email</h2>
                  <Form {...form}>
                    <form ref={formRef} id="form-contatti" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Mario Rossi" {...field} className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="mario@email.com" {...field} className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-all" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Messaggio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Scrivi qui il tuo messaggio..."
                                className="min-h-[150px] rounded-xl bg-gray-50 border-gray-200 focus:bg-white resize-none transition-all p-4"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-12 rounded-xl text-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
                      >
                        {isPending ? "Invio in corso..." : "Invia Email"}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </motion.div>

          </div>
        </div>
      </main>

    </div>
  );
}

