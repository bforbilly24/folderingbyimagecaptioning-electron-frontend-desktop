// src/types/upload.ts

export interface ImageCategorization {
  filename: string;
  caption: string;
  category: string;
  cosine_similarity: number;
  bleu_score: number;
}

export interface UploadResponse {
  message: string;
  zip_path: string;
  processed_count: number;
  spreadsheet_data: ImageCategorization[];
}

export interface ProcessingStep {
  step_id: number;
  text: string;
  status: "pending" | "processing" | "completed" | "error";
  timestamp?: string | null;
}

export interface ProcessingProgress {
  task_id: string;
  current_step: number;
  total_steps: number;
  steps: ProcessingStep[];
  is_completed: boolean;
  result?: UploadResponse | null;
  error?: string | null;
}

export interface AsyncUploadResponse {
  task_id: string;
  message: string;
}

export interface UploadError {
  detail: string;
}

// Type guard to check if response is async (has task_id)
export function isAsyncResponse(response: UploadResponse | AsyncUploadResponse): response is AsyncUploadResponse {
  return 'task_id' in response;
}

// Type guard to check if response is sync (has spreadsheet_data)
export function isSyncResponse(response: UploadResponse | AsyncUploadResponse): response is UploadResponse {
  return 'spreadsheet_data' in response;
}
