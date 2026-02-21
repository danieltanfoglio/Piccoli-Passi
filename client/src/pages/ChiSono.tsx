import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ChiSono() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
                  alt="La mia foto"
                  className="rounded-3xl shadow-lg w-full aspect-square object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Chi Sono</h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Ciao! Sono Ambra, studentessa universitaria frequentante la facoltà di scienze della formazione in Cattolica, babysitter in cerca di lavoro con 4 anni di esperienza nel lavoro aiuto-compiti e baby sitting.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Sono stata due volte animatrice del grest per bambini di 4-5 anni. Mi sono diplomata a giugno 2024 con 90/100 al liceo scienze umane economico sociale al Don Milani Montichiari. Ho svolto il tirocinio presso la scuola materna di Ghedi. Sono automunita. Mi prendo cura dei piccoli con attenzione e amore, offrendo un ambiente sicuro e divertente. Organizzo attività creative ed educative, come giochi, letture e disegni, per stimolare la loro crescita e curiosità 🕒. Sono disponibile a lavorare con flessibilità, in orari serali o nel weekend, e durante la settimana su richiesta, anche in modo regolare e durante i mesi estivi. Con me, puoi stare tranquillo sapendo che i tuoi bambini sono in buone mani. Mi piacerebbe conoscere la tua famiglia e discutere di come posso essere d'aiuto!☺️
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>ambratanfoglio@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+39 370 340 9814</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Ghedi, Brescia</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
