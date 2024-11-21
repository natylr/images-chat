import { apiService } from './apiService';

export const registerUser = (userData: any) => {
  return apiService('/users', 'POST', userData);
};

export const loginUser = (credentials: any) => {
  return apiService('/login', 'POST', credentials);
};

export const getAllUsers = () => {
  return apiService('/users', 'GET');
};
