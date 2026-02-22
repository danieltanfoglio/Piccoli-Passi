import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { Link } from "wouter";
import { ArrowRight, Star, Users, CheckCircle, GraduationCap } from "lucide-react";
import { useServices } from "@/hooks/use-services";
import { ServiceCard } from "@/components/ServiceCard";
// @ts-ignore
import heroImage from "/images/happy-kids.png";

export default function Home() {
  const { data: services, isLoading } = useServices();

  return (
    <div className="bg-gray-50">


      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 hero-gradient opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground font-medium text-sm mb-6">
                <Users className="w-4 h-4 fill-current" />
                Il miglior supporto per i tuoi figli
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
                La serenità per te, <span className="text-primary relative inline-block">
                  il meglio
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span> per i tuoi figli
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Trova la babysitter perfetta per le esigenze dei tuoi bambini.
                Assistenza qualificata, aiuto compiti e attività creative.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/servizi">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl transition-all">
                    Richiedi Servizio
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                      {/* Placeholder avatars */}
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 text-accent mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    <span className="font-bold text-gray-900">20+</span> famiglie soddisfatte
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-xl" />
              <img
                src={heroImage}
                alt="Bambini & Compiti Hero"
                className="relative rounded-[2rem] shadow-2xl w-full h-full object-cover"
              />

              {/* Floating Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 max-w-xs"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Risultati Garantiti</p>
                  <p className="text-xs text-gray-500">Migliora la tua media</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50" id="servizi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">
              Cosa Offro
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              I Miei Servizi
            </h3>
            <p className="text-gray-600 text-lg">
              Supporto professionale per la crescita dei più piccoli, con servizi di babysitting e giochi creativi.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services?.slice(0, 3).map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/servizi">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Visualizza Tutti i Servizi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Come Funziona?
              </h2>
              <div className="space-y-8">
                {[
                  {
                    step: "01",
                    title: "Cerca",
                    desc: "Trova il profilo ideale per le tue esigenze e quelle dei tuoi figli."
                  },
                  {
                    step: "02",
                    title: "Conosci",
                    desc: "Incontra la babysitter per un colloquio conoscitivo."
                  },
                  {
                    step: "03",
                    title: "Prenota",
                    desc: "Prenota il servizio in totale sicurezza attraverso questa piattaforma."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="text-5xl font-bold text-gray-100 group-hover:text-primary/20 transition-colors">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-accent/10 rounded-3xl transform rotate-3" />
              <div className="relative bg-gray-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
                {/* Abstract visualization instead of image */}
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
                    <GraduationCap className="w-10 h-10 text-primary" />
                    <div className="h-2 w-16 bg-gray-200 rounded" />
                  </div>
                  <div className="bg-primary rounded-2xl shadow-lg p-6 text-white flex flex-col justify-between mt-8">
                    <Users className="w-10 h-10" />
                    <div className="h-2 w-16 bg-white/30 rounded" />
                  </div>
                  <div className="bg-accent rounded-2xl shadow-lg p-6 text-accent-foreground flex flex-col justify-between -mt-8">
                    <CheckCircle className="w-10 h-10" />
                    <div className="h-2 w-16 bg-black/10 rounded" />
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
                    <Star className="w-10 h-10 text-yellow-400 fill-current" />
                    <div className="h-2 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

