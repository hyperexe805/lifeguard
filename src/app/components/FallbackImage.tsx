import { AlertTriangle } from 'lucide-react'

export default function FallbackImage() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
      <div className="text-center">
        <AlertTriangle className="w-12 h-12 mx-auto text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">No se pudo cargar la imagen</p>
      </div>
    </div>
  )
}

