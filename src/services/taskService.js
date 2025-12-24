import axiosInstance from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';

export const taskService = {
  getAllTasks: async (projectId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.TASKS(projectId));
    return response.data;
  },

  getTaskById: async (projectId, taskId) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.TASK_BY_ID(projectId, taskId)
    );
    return response.data;
  },

  createTask: async (projectId, title, description, dueDate) => {
    const response = await axiosInstance.post(API_ENDPOINTS.TASKS(projectId), {
      title,
      description,
      dueDate,
    });
    return response.data;
  },

  updateTask: async (projectId, taskId, title, description, dueDate) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.TASK_BY_ID(projectId, taskId),
      {
        title,
        description,
        dueDate,
      }
    );
    return response.data;
  },

  completeTask: async (projectId, taskId) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.COMPLETE_TASK(projectId, taskId),
      {} // Empty body to avoid CORS preflight issues
    );
    return response.data;
  },

  deleteTask: async (projectId, taskId) => {
    await axiosInstance.delete(API_ENDPOINTS.TASK_BY_ID(projectId, taskId));
  },
};
