import { useState, useEffect, useRef } from 'react'
import { IconDownload, IconUpload } from '@tabler/icons-react'
import { downloadZip } from '@/actions/get-download'
import { getProgress } from '@/actions/get-progress'
import { postUploadImages } from '@/actions/post-upload'
import { UploadResponse, isAsyncResponse, isSyncResponse } from '@/types/upload'
import { Button } from '@/components/ui/shadcn/button'
import { FileUpload } from '@/components/global/file-upload'
import { ResultsTable } from '@/components/global/results-table'
import { MultiStepLoader } from '@/features/home/components/multi-step-loader'

const ImageUploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [response, setResponse] = useState<UploadResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [hasAttemptedUpload, setHasAttemptedUpload] = useState(false)
  const [loadingStates, setLoadingStates] = useState<{ text: string }[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Default loading states for image processing
  const defaultLoadingStates = [
    { text: 'Initializing image processing...' },
    { text: 'Loading AI models...' },
    { text: 'Extracting image features...' },
    { text: 'Generating captions...' },
    { text: 'Categorizing images...' },
    { text: 'Organizing into folders...' },
    { text: 'Creating Excel report...' },
    { text: 'Generating ZIP file...' },
    { text: 'Processing completed!' },
  ]

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const pollProgress = async (taskId: string) => {
    try {
      const progressData = await getProgress(taskId)

      // Update loading states based on server response
      const updatedStates = progressData.steps.map((step) => ({
        text: step.text,
      }))
      setLoadingStates(updatedStates)

      if (progressData.is_completed) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setIsLoading(false)

        if (progressData.result) {
          setResponse(progressData.result)
        } else if (progressData.error) {
          setError(progressData.error)
        }
      }
    } catch {
      // Error polling progress handled
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setIsLoading(false)
      setError('Failed to track progress')
    }
  }

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles)
    setResponse(null)
    setError(null)
    setHasAttemptedUpload(false)
  }

  const handleUpload = async () => {
    setError(null)
    setResponse(null)
    setIsLoading(true)
    setHasAttemptedUpload(true)
    setLoadingStates(defaultLoadingStates)

    try {
      const result = await postUploadImages(files)

      // Check if the response has task_id (async) or direct result (sync)
      if (isAsyncResponse(result)) {
        // Asynchronous mode - start polling for progress
        intervalRef.current = setInterval(() => {
          pollProgress(result.task_id)
        }, 1000)
      } else if (isSyncResponse(result)) {
        // Synchronous mode - direct result
        setResponse(result)
        setIsLoading(false)
      }
    } catch {
      setError('Gagal mengunggah file gambar')
      setIsLoading(false)
      // Upload error handled
    }
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    setError(null)
    try {
      const zipBlob = await downloadZip()
      const url = window.URL.createObjectURL(zipBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'hasil_folderisasi.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch {
      setError('Gagal mengunduh file ZIP')
      // Download error handled
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className='h-full bg-white flex items-center justify-center p-4'>
      <MultiStepLoader
        loadingStates={
          loadingStates.length > 0 ? loadingStates : defaultLoadingStates
        }
        loading={isLoading}
        duration={1000}
        loop={false}
      />

      <div className='w-full h-full bg-white rounded-lg shadow-lg flex flex-col'>
        <header className='border-b border-gray-200 p-6'>
          <h1 className='text-3xl font-bold text-gray-800 text-center'>
            Upload Multiple Images
          </h1>
          <p className='text-gray-600 text-center mt-2'>
            Unggah beberapa gambar sekaligus untuk dikategorikan secara otomatis
          </p>
        </header>

        <main className='flex-1 flex flex-col items-center justify-start p-6 overflow-y-auto'>
          <div className='w-full max-w-4xl'>
            <FileUpload onChange={handleFileChange} />
            {files.length > 0 && (
              <div className='mt-4 text-center'>
                <p className='text-gray-700'>{files.length} gambar dipilih</p>
                <div className='mt-2 flex flex-wrap justify-center gap-2'>
                  {files.slice(0, 5).map((file, idx) => (
                    <span
                      key={idx}
                      className='px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs'
                    >
                      {file.name}
                    </span>
                  ))}
                  {files.length > 5 && (
                    <span className='px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs'>
                      +{files.length - 5} lainnya
                    </span>
                  )}
                </div>

                {/* Upload Button - prominent placement */}
                {!response && (
                  <div className='mt-6 w-full'>
                    <Button
                      onClick={handleUpload}
                      disabled={isLoading || isDownloading}
                      size={'lg'}
                      className='w-full !bg-blue-500 !hover:bg-blue-600 text-white flex items-center justify-center gap-x-2 py-3'
                    >
                      <IconUpload className='size-5' />
                      {isLoading ? 'Memproses Gambar...' : 'Unggah Gambar'}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                Sedang memproses gambar, mohon tunggu...
              </p>
            </div>
          )}

          {/* Results Table */}
          {response && response.spreadsheet_data && (
            <div className='mt-6 w-full'>
              <ResultsTable data={response.spreadsheet_data} />
            </div>
          )}

          {/* Success State with Download */}
          {response && (
            <div className='mt-6 w-full max-w-md p-6 bg-green-50 border border-green-200 rounded-lg text-center'>
              <p className='text-green-700 font-semibold mb-2'>
                ✅ {response.processed_count} gambar berhasil dikategorikan
              </p>
              <p className='text-sm text-green-600 mb-4'>{response.message}</p>
              <Button
                onClick={handleDownload}
                className='w-full !bg-green-600 !hover:bg-green-700 text-white flex items-center justify-center gap-x-2 py-3'
                disabled={isDownloading}
              >
                <IconDownload className='size-5' />
                {isDownloading ? 'Mengunduh...' : 'Unduh Hasil ZIP'}
              </Button>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className='mt-6 w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-md text-center'>
              <p className='text-red-700 font-semibold'>{error}</p>
            </div>
          )}
        </main>

        <footer className='border-t border-gray-200 p-4'>
          <div className='text-center'>
            {hasAttemptedUpload && !isLoading && !response && !error && (
              <p className='text-gray-600 text-sm'>
                Menunggu proses selesai...
              </p>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}

export { ImageUploadPage }
