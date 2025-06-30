'use client'

interface ScoreDisplayProps {
  cosineScore: number
  bleuScore: number
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  cosineScore,
  bleuScore,
}) => {
  return (
    <div className='flex justify-between xl:p-3 lg:p-2 md:p-2 p-2 items-center bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100 shadow-sm'>
      <div className='flex flex-col items-start'>
        <span className='font-semibold text-blue-600 text-sm sm:text-base'>
          {cosineScore.toFixed(4)}
        </span>
        <span className='text-xs lg:text-sm text-gray-600'>
          Cosine Similarity
        </span>
      </div>
      <div className='w-px h-10 sm:h-12 bg-gray-200 mx-2' />
      <div className='flex flex-col items-start'>
        <span className='font-semibold text-green-600 text-sm sm:text-base'>
          {bleuScore.toFixed(4)}
        </span>
        <span className='text-xs lg:text-[sm text-gray-600'>BLEU Score</span>
      </div>
    </div>
  )
}

export { ScoreDisplay }
