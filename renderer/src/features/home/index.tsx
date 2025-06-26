import { Link } from '@tanstack/react-router'
import {
  IconPhoto,
  IconFolderOpen,
  IconChevronRight,
} from '@tabler/icons-react'
import { ChartBarStackedIcon } from 'lucide-react'

const HomePage: React.FC = () => {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center p-4 py-8 md:py-4'>
      <div className='w-full max-w-4xl'>
        <div className='text-center mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-5xl font-bold text-gray-800 mb-4'>
            Foldering App
          </h1>
          <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2'>
            Aplikasi AI untuk mengkategorikan gambar secara otomatis berdasarkan
            konten. Pilih metode upload yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto'>
          <div>
            <Link to='/image'>
              <div className='bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 group cursor-pointer'>
                <div className='flex items-center justify-between mb-4 md:mb-6'>
                  <div className='p-3 md:p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors'>
                    <IconPhoto className='size-6 md:size-8 text-blue-600' />
                  </div>
                  <IconChevronRight className='size-5 md:size-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all' />
                </div>
                <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-3'>
                  Upload Multiple Images
                </h2>
                <p className='text-gray-600 mb-4 text-sm md:text-base'>
                  Unggah beberapa gambar sekaligus untuk dikategorikan. Cocok
                  untuk koleksi foto yang tersebar di berbagai lokasi.
                </p>
                <div className='space-y-2 text-xs md:text-sm text-gray-500'>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0'></span>
                    <span>Drag & drop multiple files</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0'></span>
                    <span>Proses batch secara bersamaan</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0'></span>
                    <span>Hasil dalam format ZIP</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to='/folder'>
              <div className='bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-100 group cursor-pointer'>
                <div className='flex items-center justify-between mb-4 md:mb-6'>
                  <div className='p-3 md:p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors'>
                    <IconFolderOpen className='size-6 md:size-8 text-purple-600' />
                  </div>
                  <IconChevronRight className='size-5 md:size-6 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all' />
                </div>
                <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-3'>
                  Upload Folder
                </h2>
                <p className='text-gray-600 mb-4 text-sm md:text-base'>
                  Unggah folder lengkap berisi gambar dan subfolder.
                  Mempertahankan struktur folder asli untuk organisasi yang
                  lebih baik.
                </p>
                <div className='space-y-2 text-xs md:text-sm text-gray-500'>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-purple-500 rounded-full flex-shrink-0'></span>
                    <span>Drag & drop folder lengkap</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-purple-500 rounded-full flex-shrink-0'></span>
                    <span>Termasuk subfolder</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-purple-500 rounded-full flex-shrink-0'></span>
                    <span>Struktur folder tetap terjaga</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className='mt-8 md:mt-12 text-center mb-20 md:mb-8'>
          <div className='bg-white rounded-lg shadow-md p-4 md:p-6 max-w-2xl mx-auto border'>
            <div className='flex items-center justify-center text-base md:text-lg font-semibold text-gray-800 mb-3 gap-x-1'>
              <ChartBarStackedIcon className='size-6' />
              Kategori yang Didukung
            </div>
            <div className='flex flex-wrap justify-center gap-2'>
              {[
                { name: 'Kegiatan', color: 'bg-red-100 text-red-800' },
                { name: 'Manusia', color: 'bg-blue-100 text-blue-800' },
                { name: 'Hewan', color: 'bg-green-100 text-green-800' },
                { name: 'Pemandangan', color: 'bg-yellow-100 text-yellow-800' },
                { name: 'Suasana', color: 'bg-purple-100 text-purple-800' },
              ].map((category) => (
                <span
                  key={category.name}
                  className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${category.color}`}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { HomePage }
