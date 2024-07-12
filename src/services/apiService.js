import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/project_skills',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

export const login = async (email, senha) => {
  const response = await api.post('/auth/login', { email, senha });
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const registerSkills = async (data) => {
  const response = await api.post('/skills/register_skills', data);
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get('/skills/listar_skills');
  return response.data;
};

export const updateSkill = async (idSkill, itemSkill) => {
  const response = await api.put(`/skills/alterar_skills/${idSkill}`, itemSkill);
  return response.data;
};

export const deleteSkill = async (idSkill) => {
  const response = await api.delete(`/skills/deletar_skills/${idSkill}`);
  return response.data;
};
