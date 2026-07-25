import axios from 'axios';
import { ScanResponse } from '../types/scanner';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
const API_BASE_URL = baseUrl.endsWith('/api/v1') ? baseUrl : `${baseUrl}/api/v1`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

export const uploadRepositoryZip = async (
  file: File,
  onProgress?: (percent: number) => void
): Promise<ScanResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<ScanResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onProgress) onProgress(percent);
      }
    },
  });

  return response.data;
};

export const getScanStatistics = async (id: string) => {
  const response = await apiClient.get(`/statistics/${id}`);
  return response.data;
};

export const getScanFrameworks = async (id: string) => {
  const response = await apiClient.get(`/frameworks/${id}`);
  return response.data;
};

export const getScanLanguages = async (id: string) => {
  const response = await apiClient.get(`/languages/${id}`);
  return response.data;
};

export const getScanSummary = async (id: string) => {
  const response = await apiClient.get(`/summary/${id}`);
  return response.data;
};
