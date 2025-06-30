// src/utils/imageUtils.ts
import { BASE_API_URL } from "@/api/api-url";
import { categoryColors } from "@/types/category-colors";

export const getImageUrl = (imagePath: string): string => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${BASE_API_URL}/${cleanPath}`;
};

export const getCategoryColor = (category: string): string => {
  const matchedCategory = Object.keys(categoryColors).find(
    key => key.toLowerCase() === category.toLowerCase()
  );
  return matchedCategory ? categoryColors[matchedCategory] : 'bg-gray-100 text-gray-800 border-gray-200';
};

