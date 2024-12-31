import { type NextConfig } from 'next'

const config: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['tpjlviagzrfunmnfimxf.supabase.co'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  }
}

export default config