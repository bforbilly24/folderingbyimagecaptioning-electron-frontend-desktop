import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

// Lazy load the ImageUploadPage component
const ImageUploadPage = lazy(() => 
  import('@/features/image-upload').then(module => ({ 
    default: module.ImageUploadPage 
  }))
)

export const Route = createFileRoute('/image')({
  component: ImageUploadPage,
})
