// src/features/home/index.tsx
'use client'

import { Link } from '@tanstack/react-router'
import {
  IconPhoto,
  IconFolderOpen,
  IconChevronRight,
} from '@tabler/icons-react'
import { categoryColors, categories } from '@/types/category-colors'
import { ChartBarStackedIcon } from 'lucide-react'

const HomePage: React.FC = () => {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center p-6 py-8 md:py-12'>
      <div className='w-full max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center space-y-4'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4'>
            <svg
              className='w-8 h-8 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </div>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
            Foldering App
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Aplikasi AI untuk mengkategorikan gambar secara otomatis berdasarkan
            konten. Pilih metode upload yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Link to='/image'>
            <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100 group cursor-pointer'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors'>
                  <IconPhoto className='size-6 text-blue-600' />
                </div>
                <IconChevronRight className='size-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all' />
              </div>
              <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                Upload Multiple Images
              </h2>
              <p className='text-sm text-gray-600 mb-4'>
                Unggah beberapa gambar sekaligus untuk dikategorikan. Cocok
                untuk koleksi foto yang tersebar di berbagai lokasi.
              </p>
              <div className='space-y-2 text-sm text-gray-500'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0'></span>
                  Drag & drop multiple files
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0'></span>
                  Proses batch secara bersamaan
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0'></span>
                  Hasil dalam format ZIP
                </div>
              </div>
            </div>
          </Link>

          <Link to='/folder'>
            <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100 group cursor-pointer'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors'>
                  <IconFolderOpen className='size-6 text-purple-600' />
                </div>
                <IconChevronRight className='size-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all' />
              </div>
              <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                Upload Folder
              </h2>
              <p className='text-sm text-gray-600 mb-4'>
                Unggah folder lengkap berisi gambar dan subfolder.
                Mempertahankan struktur folder asli untuk organisasi yang lebih
                baik.
              </p>
              <div className='space-y-2 text-sm text-gray-500'>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full flex-shrink-0'></span>
                  Drag & drop folder lengkap
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full flex-shrink-0'></span>
                  Termasuk subfolder
                </div>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full flex-shrink-0'></span>
                  Struktur folder tetap terjaga
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Categories */}
        <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <ChartBarStackedIcon className='size-5 text-gray-700' />
            <h3 className='text-lg font-semibold text-gray-900'>
              Kategori yang Didukung
            </h3>
          </div>
          <div className='flex flex-wrap justify-center gap-2'>
            {categories.map((category) => (
              <span
                key={category}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryColors[category]}`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { HomePage }
