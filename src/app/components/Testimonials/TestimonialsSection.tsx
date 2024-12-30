import TestimonialsContainer from "./TestimonialsContainer";


export default function TestimonialsSection() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
        <TestimonialsContainer />
      </div>
    </section>
  )
}

