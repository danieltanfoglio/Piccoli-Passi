import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ChiSono() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  Ciao! Sono una ragazza appassionata del mondo dell'infanzia, con anni di esperienza nel babysitting e nel supporto scolastico per i più piccoli.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Il mio obiettivo è offrire un ambiente sicuro, stimolante e sereno per i vostri bambini, aiutandoli a crescere e ad apprendere con il sorriso. Credo fermamente che ogni bambino abbia bisogno di attenzione personalizzata e di attività che stimolino la sua naturale curiosità.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>contatto@piccolipassi.it</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+39 345 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Roma, Italia</span>
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
