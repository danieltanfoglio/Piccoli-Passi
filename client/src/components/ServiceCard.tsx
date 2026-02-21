import { motion } from "framer-motion";
import { type Service } from "@shared/schema";
import * as LucideIcons from "lucide-react";

// Helper to render dynamic icon strings from DB
const IconRenderer = ({ iconName, className }: { iconName: string; className?: string }) => {
  // @ts-ignore
  const Icon = LucideIcons[iconName] || LucideIcons.BookOpen;
  return <Icon className={className} />;
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <IconRenderer 
          iconName={service.icon} 
          className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" 
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed mb-6">
        {service.description}
      </p>
      
      <div className="flex items-center text-primary font-semibold text-sm cursor-pointer group/link">
        Scopri di più
        <LucideIcons.ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}
