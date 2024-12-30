"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Zap, Clock } from 'lucide-react'

const features = [
  {
    title: "Protección sin compromisos",
    description: "Respuesta sin excusas, siempre a tu servicio. Nuestro equipo está preparado para actuar en cualquier situación de emergencia.",
    icon: Shield
  },
  {
    title: "Socorristas Certificados Plus",
    description: "Personal altamente capacitado y en constante formación. Nuestros socorristas reciben entrenamiento continuo en las últimas técnicas de salvamento.",
    icon: Users
  },
  {
    title: "Equipamiento de último nivel",
    description: "Tecnología avanzada de seguridad para tu tranquilidad. Utilizamos equipos de vanguardia para garantizar una respuesta rápida y eficaz.",
    icon: Zap
  },
  {
    title: "Tu tranquilidad, garantizada",
    description: "Servicio las 24 horas, los 365 días del año. Estamos siempre listos para proteger a ti y a tus seres queridos, sin importar el momento.",
    icon: Clock
  }
]

export default function FeaturesSection() {
  return (
    <section id="caracteristicas" className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegirnos?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre cómo nuestro compromiso con la excelencia nos distingue en el campo de la seguridad acuática.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

