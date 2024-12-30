import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from 'lucide-react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Review {
  id: number
  content: string
  author: string
  rating: number
  created_at: string
}

interface TestimonialsPresentationalProps {
  reviews: Review[]
  isLoading: boolean
  error: string | null
  addReview: (review: Omit<Review, 'id' | 'created_at'>) => Promise<void>
}

export default function TestimonialsPresentational({
  reviews,
  isLoading,
  error,
  addReview
}: TestimonialsPresentationalProps) {
  const [newReview, setNewReview] = useState({ content: '', author: '', rating: 5 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await addReview(newReview)
    setIsSubmitting(false)
    setNewReview({ content: '', author: '', rating: 5 })
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  if (isLoading) return <div>Cargando reseñas...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-8 flex flex-col md:grid md:grid-cols-2 gap-8">
      <Card className="col-span-full md:col-span-1">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Añadir una reseña</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium ">Nombre</label>
              <Input
                id="author"
                value={newReview.author}
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium ">Reseña</label>
              <Textarea
                id="content"
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium ">Calificación</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar reseña'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id}>
            <Card>
              <CardContent className="p-6">
                <div className="flex p-2 items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-5 w-5 ${
                        star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className=" mb-4">{review.content}</p>
                <p className="font-semibold">{review.author}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  )
}