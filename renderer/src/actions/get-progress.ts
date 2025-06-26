// src/actions/get-progress.ts
import axios from "axios";
import { ENDPOINTS } from "@/api/endpoints";
import { ProcessingProgress } from "@/types/upload";

export const getProgress = async (taskId: string): Promise<ProcessingProgress> => {
  const response = await axios.get<ProcessingProgress>(
    `${ENDPOINTS.PROGRESS}/${taskId}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
