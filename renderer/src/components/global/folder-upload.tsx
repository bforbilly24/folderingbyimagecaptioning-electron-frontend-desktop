import { useRef, useState, useEffect } from 'react'
import { IconFolderOpen, IconTrash } from '@tabler/icons-react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/cn'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/shadcn/alert-dialog'
import { Button } from '@/components/ui/shadcn/button'

const FolderUpload = ({ onChange }: { onChange?: (files: File[]) => void }) => {
  const [files, setFiles] = useState<File[]>([])
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.message &&
        (event.message.includes('file') ||
          event.message.includes('folder') ||
          event.message.includes('directory'))
      ) {
        event.preventDefault()
        setErrorMessage(`Terjadi kesalahan: ${event.message}`)
        setIsErrorAlertOpen(true)
        return false
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason &&
        typeof event.reason === 'string' &&
        (event.reason.includes('file') ||
          event.reason.includes('folder') ||
          event.reason.includes('directory'))
      ) {
        event.preventDefault()
        setErrorMessage(`Terjadi kesalahan: ${event.reason}`)
        setIsErrorAlertOpen(true)
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) {
      setErrorMessage(
        'Tidak ada file yang dipilih. Pastikan Anda memilih folder yang berisi gambar.'
      )
      setIsErrorAlertOpen(true)
      return
    }

    const imageFiles = newFiles.filter((file) => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
      setErrorMessage(
        'Folder yang dipilih tidak berisi file gambar yang valid. Pastikan folder berisi file dengan format gambar (JPG, PNG, dll).'
      )
      setIsErrorAlertOpen(true)
      return
    }

    if (imageFiles.length !== newFiles.length) {
      setErrorMessage(
        `Ditemukan ${newFiles.length - imageFiles.length} file non-gambar yang akan diabaikan. Hanya ${imageFiles.length} file gambar yang akan diproses.`
      )
      setIsErrorAlertOpen(true)
    }

    // Show confirmation dialog before setting files
    setPendingFiles(imageFiles)
    setIsAlertOpen(true)
  }

  const handleConfirmUpload = () => {
    setFiles(pendingFiles)
    if (onChange) onChange(pendingFiles)
    setIsAlertOpen(false)
    setPendingFiles([])
  }

  const handleCancelUpload = () => {
    setIsAlertOpen(false)
    setPendingFiles([])

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClearFiles = () => {
    setFiles([])
    if (onChange) onChange([])

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: false,
    noKeyboard: false,
    accept: { 'image/*': [] },
    onDrop: handleFileChange,
    onDropRejected: (rejectedFiles) => {
      const errorMessages = rejectedFiles
        .map((rejection) => {
          const errors = rejection.errors
            .map((error) => {
              switch (error.code) {
                case 'file-invalid-type':
                  return 'Format file tidak didukung'
                case 'file-too-large':
                  return 'Ukuran file terlalu besar'
                case 'file-too-small':
                  return 'Ukuran file terlalu kecil'
                default:
                  return error.message
              }
            })
            .join(', ')
          return `${rejection.file.name}: ${errors}`
        })
        .join('\n')

      setErrorMessage(`File berikut ditolak:\n${errorMessages}`)
      setIsErrorAlertOpen(true)
    },
    onError: (error) => {
      setErrorMessage(
        `Terjadi kesalahan saat mengunggah file: ${error.message}`
      )
      setIsErrorAlertOpen(true)
    },
  })

  const groupedFiles = files.reduce(
    (acc, file) => {
      const path = file.webkitRelativePath || file.name
      const directory = path.includes('/') ? path.split('/')[0] : 'Root'

      if (!acc[directory]) {
        acc[directory] = []
      }
      acc[directory].push(file)
      return acc
    },
    {} as Record<string, File[]>
  )

  const totalFileCount = pendingFiles.length || files.length

  return (
    <>
      {/* Confirmation AlertDialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Upload Folder</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan mengunggah {totalFileCount} file dari folder ini. Semua
              gambar dalam folder akan diproses dan dikategorikan oleh AI.
              Apakah Anda yakin ingin melanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              size={'lg'}
              variant={'outline'}
              onClick={handleCancelUpload}
            >
              Batal
            </Button>
            <Button
              size={'lg'}
              variant='default'
              onClick={handleConfirmUpload}
            >
              Ya, Lanjutkan Upload
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error AlertDialog */}
      <AlertDialog open={isErrorAlertOpen} onOpenChange={setIsErrorAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Peringatan Upload</AlertDialogTitle>
            <AlertDialogDescription className='whitespace-pre-line'>
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsErrorAlertOpen(false)}>
              Mengerti
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='w-full' {...getRootProps()}>
        <div
          className='p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden'
          onClick={(e) => {
            e.stopPropagation()
            if (fileInputRef.current) {
              fileInputRef.current.click()
            }
          }}
        >
          <input
            ref={fileInputRef}
            type='file'
            multiple
            accept='image/*'
            {...({
              webkitdirectory: '',
            } as React.InputHTMLAttributes<HTMLInputElement> & {
              webkitdirectory: string
            })}
            onChange={(e) => {
              const files = Array.from(e.target.files || [])

              if (files.length > 0) {
                handleFileChange(files)
              } else {
                // No files selected
              }
            }}
            className='hidden'
          />
          <div className='absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]'>
            <GridPattern />
          </div>
          <div className='flex flex-col items-center justify-center'>
            {/* <p className='relative z-20 font-sans font-bold text-neutral-700 text-base'>
              Unggah Folder
            </p> */}
            <p className='relative z-20 font-sans font-normal text-neutral-400 text-base mt-2'>
              Seret atau jatuhkan folder berisi gambar di sini atau klik untuk
              memilih folder
            </p>
            <div className='relative w-full max-h-[24rem] mt-10 max-w-full mx-auto'>
              {files.length > 0 && (
                <div className='overflow-x-auto overflow-y-auto max-h-[24rem]'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex justify-between items-center mb-4'>
                      <p className='text-sm text-neutral-600'>
                        {files.length} file dari{' '}
                        {Object.keys(groupedFiles).length} folder
                      </p>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClearFiles()
                        }}
                        variant='destructive'
                        size='sm'
                        className='flex items-center gap-2'
                      >
                        <IconTrash className='size-4' />
                        Hapus Semua
                      </Button>
                    </div>
                    {Object.entries(groupedFiles).map(
                      ([directory, dirFiles]) => (
                        <div
                          key={directory}
                          className='bg-white rounded-md shadow-sm border p-4'
                        >
                          <div className='flex items-center gap-2 mb-3'>
                            <IconFolderOpen className='size-5 text-blue-500' />
                            <h3 className='font-medium text-neutral-700'>
                              {directory}
                            </h3>
                            <span className='text-sm text-neutral-500'>
                              ({dirFiles.length} file)
                            </span>
                          </div>
                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-32 overflow-y-auto'>
                            {dirFiles.map((file, idx) => (
                              <div
                                key={idx}
                                className='text-sm text-neutral-600 bg-gray-50 rounded px-2 py-1 truncate'
                                title={file.webkitRelativePath || file.name}
                              >
                                {file.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              {!files.length && (
                <div
                  className={cn(
                    'relative group-hover/file:shadow-2xl z-40 bg-white flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md',
                    'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]'
                  )}
                >
                  {isDragActive ? (
                    <p className='text-neutral-600 flex flex-col items-center'>
                      Jatuhkan folder di sini
                      <IconFolderOpen className='size-6 text-neutral-600' />
                    </p>
                  ) : (
                    <IconFolderOpen className='size-6 text-neutral-600' />
                  )}
                </div>
              )}
              {!files.length && (
                <div className='absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md' />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
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

export { FolderUpload }
