export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  
  // Projects
  PROJECTS: '/api/projects',
  PROJECT_BY_ID: (id) => `/api/projects/${id}`,
  PROJECT_PROGRESS: (id) => `/api/projects/${id}/progress`,
  
  // Tasks
  TASKS: (projectId) => `/api/projects/${projectId}/tasks`,
  TASK_BY_ID: (projectId, taskId) => `/api/projects/${projectId}/tasks/${taskId}`,
  COMPLETE_TASK: (projectId, taskId) => `/api/projects/${projectId}/tasks/${taskId}/complete`,
};

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'taskmanager_token',
  USER: 'taskmanager_user',
};
