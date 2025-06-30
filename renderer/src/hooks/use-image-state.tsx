// src/hooks/use-image-state.ts
import { useState, useCallback } from 'react';

interface ImageState {
  loading: boolean;
  error: boolean;
}

export const useImageState = () => {
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

  return {
    handleImageLoad,
    handleImageError,
    handleImageLoadStart,
    getImageState,
  };
};

