import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', contraseña: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const respuesta = await authService.login(formData.email, formData.contraseña);
      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error en el login');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={estilos.contenedor}>
      <form onSubmit={manejarSubmit} style={estilos.formulario}>
        <h1>Iniciar Sesión</h1>
        {error && <p style={estilos.error}>{error}</p>}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={manejarCambio}
          style={estilos.input}
          required
        />
        
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={manejarCambio}
          style={estilos.input}
          required
        />
        
        <button type="submit" disabled={cargando} style={estilos.boton}>
          {cargando ? 'Cargando...' : 'Login'}
        </button>

        <button
          type="button"
          onClick={authService.googleLogin}
          style={estilos.botonGoogle}
        >
          Login con Google
        </button>

        <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
      </form>
    </div>
  );
}

const estilos = {
  contenedor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  formulario: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  boton: {
    width: '100%',
    padding: '0.75rem',
    margin: '1rem 0 0.5rem 0',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  botonGoogle: {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    backgroundColor: '#db4437',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  error: {
    color: 'red',
    marginBottom: '1rem'
  }
};
