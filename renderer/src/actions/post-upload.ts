// src/actions/post-upload.ts
import axios from "axios";
import { ENDPOINTS } from "@/api/endpoints";
import { UploadResponse, AsyncUploadResponse } from "@/types/upload";

export const postUploadImages = async (files: File[]): Promise<UploadResponse | AsyncUploadResponse> => {
  if (files.length === 0) {
    throw new Error("No files selected");
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axios.post<UploadResponse | AsyncUploadResponse>(
    ENDPOINTS.UPLOAD.IMAGES,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export const postUploadFolder = async (files: File[]): Promise<UploadResponse | AsyncUploadResponse> => {
  if (files.length === 0) {
    throw new Error("No files selected");
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axios.post<UploadResponse | AsyncUploadResponse>(
    ENDPOINTS.UPLOAD.FOLDER,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

// Legacy function for backwards compatibility
export const postUpload = postUploadImages;
