import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true,
});

export const apiService = {
  get: async (url: string, config = {}) => {
    const response = await api.get(url, config);
    return response.data;
  },

  post: async (url: string, data: object, config = {}) => {
    const response = await api.post(url, data, config);
    return response.data;
  },

  put: async (url: string, data: object, config = {}) => {
    const response = await api.put(url, data, config);
    return response.data;
  },

  delete: async (url: string, config = {}) => {
    const response = await api.delete(url, config);
    return response.data;
  },
};
