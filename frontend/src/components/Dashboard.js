import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosService } from '../services/api';

export default function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const respuesta = await usuariosService.obtenerTodos();
      setUsuarios(respuesta.data);
    } catch (err) {
      setError('Error al cargar usuarios');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminacion = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await usuariosService.eliminar(id);
        setUsuarios(usuarios.filter(u => u._id !== id));
      } catch (err) {
        setError('Error al eliminar usuario');
      }
    }
  };

  const manejarCerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  if (cargando) return <p>Cargando...</p>;

  return (
    <div style={estilos.contenedor}>
      <nav style={estilos.navbar}>
        <h1>Dashboard</h1>
        <button onClick={manejarCerrarSesion} style={estilos.botonSalir}>
          Cerrar sesión
        </button>
      </nav>

      <div style={estilos.contenido}>
        {error && <p style={estilos.error}>{error}</p>}

        <h2>Usuarios registrados</h2>
        
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados</p>
        ) : (
          <table style={estilos.tabla}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario._id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <button
                      onClick={() => manejarEliminacion(usuario._id)}
                      style={estilos.botonEliminar}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const estilos = {
  contenedor: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  navbar: {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contenido: {
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  tabla: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  },
  error: {
    color: 'red',
    marginBottom: '1rem'
  },
  botonSalir: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  botonEliminar: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
