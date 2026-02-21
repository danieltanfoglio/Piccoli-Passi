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
                <span className="text-2xl">👶</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Piccoli<span className="text-primary">Passi</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Servizi dedicati alla crescita e al benessere dei tuoi bambini.
              Babysitting e aiuto compiti con amore e professionalità.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Link Rapidi</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Chi Sono", href: "/chi-sono" },
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
                <span>Via Giovanni Paolo II<br />25016 Brescia, Italia</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+39 370 340 9814</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>ambratanfoglio@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>


      </div>
    </footer>
  );
}
