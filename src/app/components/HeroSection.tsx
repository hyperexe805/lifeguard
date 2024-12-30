"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Check } from 'lucide-react'
import FallbackImage from "./FallbackImage"

export default function HeroSection() {
  return (
    <section id="inicio" className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            En momentos difíciles, siempre presentes
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Nuestro equipo de élite de socorristas certificados, respaldado por tecnología de vanguardia, está listo las 24/7 para proteger lo más valioso: la vida de sus seres queridos.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <Button size="lg" className="w-full sm:w-auto">
              <ArrowRight className="w-5 h-5 mr-2" />
              Consulta gratuita
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Check className="w-5 h-5 mr-2" />
              Ver Servicios
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="hidden md:relative md:block h-[300px] md:h-[400px] lg:h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r  from-black/50 to-transparent rounded-lg" />
          <Image
            src="/images/lifeguard.jpg"
            alt="Socorrista profesional en acción"
            fill
            className="object-cover rounded-lg shadow-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallbackElement = document.getElementById('fallback-image');
              if (fallbackElement) {
                fallbackElement.style.display = 'block';
              }
            }}
          />
          <div id="fallback-image" className="hidden">
            <FallbackImage />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
