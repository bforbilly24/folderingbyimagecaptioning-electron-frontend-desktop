// src/components/global/results-card.tsx
"use client";

import { ImageCategorization } from "@/types/upload";
import { useState, useCallback } from "react";
import { ImageCard } from "./image-card";
import { CarouselNavigation } from "./carousel-navigation";
import { CategorySummary } from "./category-summary";

interface ImageState {
  loading: boolean;
  error: boolean;
}

interface ResultsCardProps {
  data: ImageCategorization[];
}

const ResultsCard: React.FC<ResultsCardProps> = ({ data }) => {
  const [imageStates, setImageStates] = useState<Record<string, ImageState>>({});

  const handleImageLoad = useCallback((filename: string) => {
    setImageStates(prev => ({
      ...prev,
      [filename]: { loading: false, error: false }
    }));
  }, []);

  const handleImageError = useCallback((filename: string) => {
    setImageStates(prev => ({
      ...prev,
      [filename]: { loading: false, error: true }
    }));
  }, []);

  const handleImageLoadStart = useCallback((filename: string) => {
    setImageStates(prev => ({
      ...prev,
      [filename]: { loading: true, error: false }
    }));
  }, []);

  const getImageState = useCallback((filename: string): ImageState => {
    return imageStates[filename] || { loading: false, error: false };
  }, [imageStates]);

  return (
    <div className="w-full max-w-full mx-auto mt-6 px-4 sm:px-6">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Hasil Kategorisasi Gambar
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {data.length} gambar telah berhasil diproses dan dikategorikan
        </p>
      </div>

      {/* Mobile and Small Tablet View */}
      <div className="block lg:hidden">
        <CarouselNavigation 
          data={data}
          imageStates={imageStates}
          onImageLoad={handleImageLoad}
          onImageError={handleImageError}
          onImageLoadStart={handleImageLoadStart}
        />
      </div>

      {/* Desktop Grid View */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 xl:gap-4 lg:gap-4 md:gap-4 gap-0">
        {data.map((item, index) => (
          <ImageCard 
            key={index} 
            item={item} 
            index={index}
            imageState={getImageState(item.filename)}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
            onImageLoadStart={handleImageLoadStart}
          />
        ))}
      </div>

      {/* Summary Section */}
      <CategorySummary data={data} />
    </div>
  );
};

export { ResultsCard };