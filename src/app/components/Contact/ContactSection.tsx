"use client"
import ContactForm from './ContactForm'

export default function ContactSection() {
  return (
    <section id="contacto" className="container  mx-auto px-4 py-12 mb-12">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          ¿Listo para dar el siguiente paso?
        </h2>
       
        <ContactForm />
      </div>
    </section>
  )
}
