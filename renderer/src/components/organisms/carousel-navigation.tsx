'use client'

import { useState, useEffect, useCallback } from 'react'
import { ImageCategorization } from '@/types/upload'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/atoms/carousel'
import { ImageCard } from './image-card'

interface ImageState {
  loading: boolean
  error: boolean
}

interface CarouselNavigationProps {
  data: ImageCategorization[]
  imageStates: Record<string, ImageState>
  onImageLoad: (filename: string) => void
  onImageError: (filename: string) => void
  onImageLoadStart: (filename: string) => void
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  data,
  imageStates,
  onImageLoad,
  onImageError,
  onImageLoadStart,
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)

  const updateCarouselState = useCallback(() => {
    if (!api) return
    const snapList = api.scrollSnapList()
    const newCount = snapList.length || data.length // Fallback to data.length if snapList is empty
    setCount(newCount)
    const newCurrent = Math.min(api.selectedScrollSnap() + 1, newCount) || 1 // Ensure current doesn't exceed count
    setCurrent(newCurrent)
  }, [api, data])

  useEffect(() => {
    if (!api || !data) {
      setCount(data?.length || 0)
      setCurrent(data?.length ? 1 : 0)
      return
    }

    updateCarouselState() // Initial update
    api.reInit() // Reinitialize carousel to reflect data changes
    api.on('select', updateCarouselState) // Update on slide change

    return () => {
      api.off('select', updateCarouselState) // Cleanup listener
    }
  }, [api, data, updateCarouselState])

  const getImageState = (filename: string): ImageState => {
    return imageStates[filename] || { loading: false, error: false }
  }

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
        className='w-full'
      >
        <CarouselContent className='-ml-2 md:-ml-4'>
          {data.map((item, index) => (
            <CarouselItem
              key={item.filename} // Use unique filename to avoid key issues
              className='pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3'
            >
              <ImageCard
                item={item}
                index={index}
                imageState={getImageState(item.filename)}
                onImageLoad={onImageLoad}
                onImageError={onImageError}
                onImageLoadStart={onImageLoadStart}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {count > 1 && <CarouselPrevious className='left-2' />}
        {count > 1 && <CarouselNext className='right-2' />}
      </Carousel>
      {count > 0 && (
        <div className='text-muted-foreground py-2 text-center text-sm'>
          Slide {current} of {count}
        </div>
      )}
    </>
  )
}

export { CarouselNavigation }
