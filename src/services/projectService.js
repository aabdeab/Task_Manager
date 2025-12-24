import axiosInstance from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';

export const projectService = {
  getAllProjects: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.PROJECTS);
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.PROJECT_BY_ID(id));
    return response.data;
  },

  createProject: async (title, description) => {
    const response = await axiosInstance.post(API_ENDPOINTS.PROJECTS, {
      title,
      description,
    });
    return response.data;
  },

  updateProject: async (id, title, description) => {
    const response = await axiosInstance.put(API_ENDPOINTS.PROJECT_BY_ID(id), {
      title,
      description,
    });
    return response.data;
  },

  deleteProject: async (id) => {
    await axiosInstance.delete(API_ENDPOINTS.PROJECT_BY_ID(id));
  },

  getProjectProgress: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.PROJECT_PROGRESS(id));
    return response.data;
  },
};
