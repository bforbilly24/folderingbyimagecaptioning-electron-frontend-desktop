import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

// Lazy load the FolderUploadPage component
const FolderUploadPage = lazy(() => 
  import('@/features/folder-upload').then(module => ({ 
    default: module.FolderUploadPage 
  }))
)

export const Route = createFileRoute('/folder')({
  component: FolderUploadPage,
})
