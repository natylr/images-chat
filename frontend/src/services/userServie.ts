import { apiService } from './apiService';

export const createUser = (userData: any) => {
  return apiService.post('/users', userData);
};

export const getAllUsers = () => {
  return apiService.get('/users');
};

export const getUserById = (id: string) => {
  return apiService.get(`/users/${id}`);
};

export const updateUserById = (id: string, userData: any) => {
  return apiService.put(`/users/${id}`, userData);
};

export const deleteUserById = (id: string) => {
  return apiService.delete(`/users/${id}`);
};

export const checkUsernameAvailability = (username: string) => {
  return apiService.get(`/check-username-availability?username=${username}`);
};
