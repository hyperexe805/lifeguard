"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Waves, Trophy, Users } from 'lucide-react'

const services = [
  {
    title: "Piscinas Comunitarias",
    description: "Servicios personalizados para todo tipo de piscinas y espacios acuáticos comunitarios. Garantizamos la seguridad y el disfrute de todos los usuarios con nuestro equipo altamente capacitado.",
    image: "/images/piscinacomunitaria.jpg",
    icon: Users,
  },
  {
    title: "Piscinas Deportivas y Eventos",
    description: "Seguridad para piscinas de interior y exterior, garantizando su óptimo funcionamiento en competiciones y eventos. Nuestro personal está preparado para manejar situaciones de alta exigencia.",
    image: "/images/piscinadeportiva.jpg",
    icon: Trophy,
  },
  {
    title: "Playas y Costas",
    description: "Vigilancia y protección en entornos costeros, asegurando la seguridad de los bañistas en playas y calas. Utilizamos tecnología avanzada y técnicas de salvamento especializadas para entornos marítimos.",
    image: "/images/lifeguardbeach.jpg",
    icon: Waves,
  },
  {
    title: "Formación en Salvamento",
    description: "Programas de capacitación avanzada para futuros socorristas y personal de seguridad acuática. Ofrecemos cursos teóricos y prácticos que cumplen con los estándares internacionales más exigentes.",
    image: "/images/formacion.jpg",
    icon: Shield,
  },
]

export default function ServicesSection() {
  return (
    <section id="servicios" className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Soluciones a Medida para Cada Desafío Acuático</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Nuestro equipo de expertos ofrece una gama completa de servicios de seguridad acuática, adaptados a las necesidades específicas de cada entorno.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden h-full transition-transform duration-300 hover:scale-105">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <service.icon className="absolute bottom-4 left-4 text-white w-10 h-10" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow text-lg">{service.description}</p>
                  <Button variant="outline" size="lg" className="w-full mt-auto">
                    Más información
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

