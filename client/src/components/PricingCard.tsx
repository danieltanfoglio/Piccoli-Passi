import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PricingPlan } from "@shared/schema";
import { Link } from "wouter";

export function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative rounded-3xl p-8 border-2 transition-all duration-300 flex flex-col
        ${plan.isPopular
          ? "bg-white border-primary shadow-2xl shadow-primary/10 scale-105 z-10"
          : "bg-white border-gray-100 shadow-xl hover:border-primary/30"
        }
      `}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
          Più Richiesto
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          {plan.name}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          <span className="text-gray-500 font-medium">/ora</span>
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          {plan.description}
        </p>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <Link href="/contatti" className="w-full">
        <Button
          className={`w-full py-6 rounded-xl font-bold text-base transition-all duration-300
            ${plan.isPopular
              ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl"
              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }
          `}
        >
          Scegli {plan.name}
        </Button>
      </Link>
    </motion.div>
  );
}
