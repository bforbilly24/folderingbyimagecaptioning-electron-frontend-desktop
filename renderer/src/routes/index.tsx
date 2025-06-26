import { lazy } from 'react'
import { createFileRoute } from '@tanstack/react-router'

// Lazy load the ImageUploadPage component
const HomePage = lazy(() =>
  import('@/features/home').then((module) => ({
    default: module.HomePage,
  }))
)

export const Route = createFileRoute('/')({
  component: HomePage,
})
