// src/components/global/category-badge.tsx
"use client";

import { getCategoryColor } from "@/utils/image-utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = "" }) => {
  return (
    <span className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)} ${className}`}>
      {category}
    </span>
  );
};

export { CategoryBadge };

