// src/actions/download.ts
import axios from "axios";
import { ENDPOINTS } from "@/api/endpoints";
import { DownloadError } from "@/types/download";

export const downloadZip = async (): Promise<Blob> => {
  try {
    const response = await axios.get(ENDPOINTS.DOWNLOAD, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error((error.response.data as DownloadError).error);
    }
    throw new Error("Download failed");
  }
};