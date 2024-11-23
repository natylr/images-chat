import { apiService } from './apiService';

export const registerUser = (userData: any) => {
  return apiService.post('/users', userData);
};

export const loginUser = (credentials: any) => {
  return apiService.post('/login', credentials);
};

export const getAllUsers = () => {
  return apiService.get('/users');
};
