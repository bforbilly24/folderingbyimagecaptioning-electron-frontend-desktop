// src/types/category-colors.ts
const categoryColors: Record<string, string> = {
  kegiatan: 'bg-red-100 text-red-800 border-red-200',
  manusia: 'bg-blue-100 text-blue-800 border-blue-200',
  hewan: 'bg-green-100 text-green-800 border-green-200',
  pemandangan: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  suasana: 'bg-purple-100 text-purple-800 border-purple-200',
};

const categories = Object.keys(categoryColors) as string[];

export { categoryColors, categories };