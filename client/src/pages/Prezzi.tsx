

import { usePricing } from "@/hooks/use-pricing";
import { PricingCard } from "@/components/PricingCard";
import { Loader2 } from "lucide-react";

export default function Prezzi() {
  const { data: plans, isLoading } = usePricing();

  return (
    <div className="bg-gray-50 flex flex-col">


      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Piani e Tariffe
            </h1>
            <p className="text-xl text-gray-600">
              Scegli il piano più adatto alle tue esigenze. Nessun costo nascosto,
              prezzo poco trattabile.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : (
            <div className="flex justify-center max-w-5xl mx-auto">
              {plans?.map((plan, index) => (
                <div key={plan.id} className="w-full max-w-sm">
                  <PricingCard plan={plan} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

    </div>
  );
}

