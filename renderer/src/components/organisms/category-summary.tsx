// src/components/global/category-summary.tsx
"use client";

import { ImageCategorization } from "@/types/upload";
import { categories } from "@/types/category-colors";
import { CategoryBadge } from "../molecules/category-badge";

interface CategorySummaryProps {
  data: ImageCategorization[];
}

const CategorySummary: React.FC<CategorySummaryProps> = ({ data }) => {
  const getCategoryCount = (category: string): number => {
    return data.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    ).length;
  };

  return (
    <div className="mt-8 bg-gray-50 rounded-xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Ringkasan Kategorisasi</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {categories.map(category => {
          const count = getCategoryCount(category);
          return (
            <div key={category} className="text-center">
              <CategoryBadge category={category} className="mb-2 truncate" />
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{count}</p>
              <p className="text-xs text-gray-500">gambar</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { CategorySummary };

