'use client'

import { ImageCategorization } from '@/types/upload'
import { Card, CardContent, CardHeader } from '@/components/atoms/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/atoms/tooltip'
import { CategoryBadge } from '@/components/molecules/category-badge'
import { ImageDisplay } from '@/components/molecules/image-display'
import { ScoreDisplay } from '@/components/molecules/score-display'

interface ImageState {
  loading: boolean
  error: boolean
}

interface ImageCardProps {
  item: ImageCategorization
  index: number
  imageState: ImageState
  onImageLoad: (filename: string) => void
  onImageError: (filename: string) => void
  onImageLoadStart: (filename: string) => void
}

const ImageCard: React.FC<ImageCardProps> = ({
  item,
  imageState,
  onImageLoad,
  onImageError,
  onImageLoadStart,
}) => {
  return (
    <Card className='grouprounded-xl py-0 gap-0 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 h-full'>
      <CardHeader className='p-0 gap-0'>
        <div className='relative lg:aspect-[5/4] md:aspect-[4/3] aspect-[3/2] overflow-hidden bg-gray-50 rounded-t-xl'>
          <ImageDisplay
            item={item}
            isLoading={imageState.loading}
            hasError={imageState.error}
            onLoad={() => onImageLoad(item.filename)}
            onError={() => onImageError(item.filename)}
            onLoadStart={() => onImageLoadStart(item.filename)}
          />
          <div className='absolute top-2 right-2 sm:top-3 sm:right-3'>
            <CategoryBadge category={item.category} />
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-3 sm:p-4 space-y-3 flex-grow'>
        <h3
          className='font-semibold text-gray-900 text-sm sm:text-base line-clamp-2'
          title={item.filename}
        >
          {item.filename}
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className='lg:h-12 md:h-12 h-10 text-xs sm:text-sm text-gray-700 line-clamp-2 leading-relaxed'>
                {item.caption}
              </p>
            </TooltipTrigger>
            <TooltipContent className='max-w-xs lg:max-w-md xl:max-w-md bg-blue-500 text-white text-sm p-2 rounded-md'>
              {item.caption}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ScoreDisplay
          cosineScore={item.cosine_similarity}
          bleuScore={item.bleu_score}
        />
      </CardContent>
    </Card>
  )
}

export { ImageCard }
