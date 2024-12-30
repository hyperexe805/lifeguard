"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import TestimonialsPresentational from './TestimonialsPresentational'

interface Review {
  id: number
  content: string
  author: string
  rating: number
  created_at: string
}

export default function TestimonialsContainer() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      if (!supabase) {
        setError('Supabase client is not initialized')
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching reviews:', error)
        setError('Failed to fetch reviews')
      } else {
        setReviews(data)
      }
      setIsLoading(false)
    }

    fetchReviews()
  }, [])

  const addReview = async (newReview: Omit<Review, 'id' | 'created_at'>) => {
    if (!supabase) {
      setError('Supabase client is not initialized')
      return
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([newReview])
      .select()

    if (error) {
      console.error('Error adding review:', error)
      setError('Failed to add review')
    } else if (data) {
      setReviews([data[0], ...reviews])
    }
  }

  return (
    <TestimonialsPresentational 
      reviews={reviews} 
      isLoading={isLoading} 
      error={error} 
      addReview={addReview}
    />
  )
}