// src/api/endpoints.ts
import { BASE_API_URL } from '@/api/api-url'

export const ENDPOINTS = {
  UPLOAD: {
    IMAGES: `${BASE_API_URL}/v1/upload-images`,
    FOLDER: `${BASE_API_URL}/v1/upload-folder`,
  },
  PROGRESS: `${BASE_API_URL}/v1/progress`,
  DOWNLOAD: `${BASE_API_URL}/v1/download`,
} as const
