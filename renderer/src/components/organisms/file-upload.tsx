// src/components/global/file-upload.tsx
import { useRef, useState } from 'react'
import { IconUpload, IconTrash } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/cn'

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
}

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

const FileUpload = ({ onChange }: { onChange?: (files: File[]) => void }) => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles]
      if (onChange) onChange(updatedFiles)
      return updatedFiles
    })
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDeleteFile = (indexToRemove: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (_, index) => index !== indexToRemove
      )
      if (onChange) onChange(updatedFiles)
      return updatedFiles
    })
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    accept: { 'image/*': [] },
    onDrop: handleFileChange,
    onDropRejected: () => {
      // Error handled
    },
  })

  return (
    <div className='w-full' {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover='animate'
        className='p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden'
      >
        <input
          ref={fileInputRef}
          id='file-upload-handle'
          type='file'
          multiple
          accept='image/*'
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className='hidden'
        />
        <div className='absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]'>
          <GridPattern />
        </div>
        <div className='flex flex-col items-center justify-center'>
          {/* <p className='relative z-20 font-sans font-bold text-neutral-700 text-base'>
            Unggah file
          </p> */}
          <p className='relative z-20 font-sans font-normal text-neutral-400 text-base mt-2'>
            Seret atau jatuhkan gambar Anda di sini atau klik untuk mengunggah
          </p>
          <div className='relative w-full max-h-[24rem] mt-10 max-w-full mx-auto'>
            {files.length > 0 && (
              <div className='overflow-x-auto overflow-y-auto max-h-[24rem]'>
                <div
                  className={cn(
                    'grid grid-cols-3 gap-4 w-max' // 3 columns, auto rows
                  )}
                >
                  {files.map((file, idx) => (
                    <motion.div
                      key={'file' + idx}
                      layoutId={
                        idx === 0 ? 'file-upload' : 'file-upload-' + idx
                      }
                      className={cn(
                        'relative overflow-hidden z-40 bg-white flex flex-col items-start justify-start p-4 rounded-md shadow-sm min-w-[16rem]' // Ensure minimum width for consistency
                      )}
                    >
                      <div className='flex justify-between w-full items-center gap-4'>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          className='text-base text-neutral-700 truncate max-w-xs'
                        >
                          {file.name}
                        </motion.p>
                        <div className='flex items-center gap-2'>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className='rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 shadow-input'
                          >
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </motion.p>
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteFile(idx)
                            }}
                            className='p-1 rounded-full !bg-gray-100 hover:bg-red-100'
                            aria-label='Delete file'
                          >
                            <IconTrash className='size-4 text-red-500 transition-colors' />
                          </motion.button>
                        </div>
                      </div>
                      <div className='flex text-sm flex-col items-start w-full mt-2 text-neutral-600'>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          className='px-1 py-0.5 rounded-md bg-gray-100'
                        >
                          {file.type}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                        >
                          dimodifikasi{' '}
                          {new Date(file.lastModified).toLocaleDateString()}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {!files.length && (
              <motion.div
                layoutId='file-upload'
                variants={mainVariant}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'relative group-hover/file:shadow-2xl z-40 bg-white flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md',
                  'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]'
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-neutral-600 flex flex-col items-center'
                  >
                    Jatuhkan file di sini
                    <IconUpload className='size-6 text-neutral-600' />
                  </motion.p>
                ) : (
                  <IconUpload className='size-6 text-neutral-600' />
                )}
              </motion.div>
            )}
            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className='absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md'
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function GridPattern() {
  const columns = 41
  const rows = 11
  return (
    <div className='flex bg-gray-100 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105'>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? 'bg-gray-50'
                  : 'bg-gray-50 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset]'
              }`}
            />
          )
        })
      )}
    </div>
  )
}

export { FileUpload }
