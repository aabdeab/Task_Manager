import axiosInstance from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';

export const authService = {
  register: async (name, email, password) => {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });
    return response.data;
  },
};
