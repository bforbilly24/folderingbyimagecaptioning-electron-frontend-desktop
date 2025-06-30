// src/components/global/image-display.tsx
"use client";

import { ImageCategorization } from "@/types/upload";
import { getImageUrl } from "@/utils/image-utils";

interface ImageDisplayProps {
  item: ImageCategorization;
  isLoading: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
  onLoadStart: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  item,
  isLoading,
  hasError,
  onLoad,
  onError,
  onLoadStart,
}) => {
  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-t-xl">
        <div className="text-center text-gray-500">
          <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs sm:text-sm">Gambar tidak dapat dimuat</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-t-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      <img
        src={getImageUrl(item.image_path)}
        alt={item.caption}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
        onLoad={onLoad}
        onError={onError}
        onLoadStart={onLoadStart}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  );
};

export { ImageDisplay };

