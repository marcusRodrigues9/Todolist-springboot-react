import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

export const taskService = {
  // Buscar todas as tarefas
  getAllTasks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Buscar tarefa por ID
  getTaskById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Criar nova tarefa
  createTask: async (task) => {
    const response = await axios.post(API_URL, task);
    return response.data;
  },

  updateStatus: async (id, completed) => {
    const response = await axios.patch(`${API_URL}/${id}`, { completed });
    return response.data;
  },
  // Deletar tarefa
  deleteTask: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  }
};