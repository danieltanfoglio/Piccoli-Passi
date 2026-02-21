import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="bg-white/10 p-2 rounded-xl">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Tutor<span className="text-primary">Master</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              La piattaforma leader per il supporto allo studio e la preparazione universitaria.
              Ti aiutiamo a raggiungere i tuoi obiettivi accademici con tutor esperti.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Link Rapidi</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Chi Siamo", href: "/#about" },
                { label: "I Nostri Servizi", href: "/servizi" },
                { label: "Piani e Prezzi", href: "/prezzi" },
                { label: "Contattaci", href: "/contatti" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Via Roma 123,<br />00100 Roma, Italia</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+39 06 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@tutormaster.it</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Iscriviti per ricevere aggiornamenti e consigli sullo studio.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="La tua email"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors text-sm"
              >
                Iscriviti
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 TutorMaster. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
