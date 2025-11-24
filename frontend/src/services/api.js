import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  registro: (nombre, email, contraseña) =>
    apiService.post('/auth/registro', { nombre, email, contraseña }),
  
  login: (email, contraseña) =>
    apiService.post('/auth/login', { email, contraseña }),
  
  googleLogin: () =>
    window.location.href = `${API_URL}/auth/google`
};

export const usuariosService = {
  obtenerTodos: () =>
    apiService.get('/api/usuarios'),
  
  obtenerPorId: (id) =>
    apiService.get(`/api/usuarios/${id}`),
  
  actualizar: (id, datos) =>
    apiService.put(`/api/usuarios/${id}`, datos),
  
  eliminar: (id) =>
    apiService.delete(`/api/usuarios/${id}`)
};

export default apiService;
