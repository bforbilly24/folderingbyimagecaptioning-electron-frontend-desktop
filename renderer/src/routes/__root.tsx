import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Navbar } from '@/components/layouts/navbar'

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-600">Memuat halaman...</p>
    </div>
  </div>
)

export const Route = createRootRoute({
  component: () => (
    <div className='h-screen w-screen overflow-hidden'>
      <Navbar />
      <div className='h-[calc(100vh-69px)] md:h-[calc(100vh-69px)] pb-20 md:pb-0'>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  ),
})
