import { apiService } from './apiService';

export const login = (credentials: { identifier: string; password: string }) => {
  return apiService.post('/login', credentials);
};

export const logout = () => {
  return apiService.post('/logout',{});
};

export const validateSession = () => {
  return apiService.get('/validate-session');
};
