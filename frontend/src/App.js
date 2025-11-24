import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';

// Componente para manejar el callback de Google
function GoogleCallback() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Obtener el token de la URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // Guardar el token en localStorage
            localStorage.setItem('token', token);

            // Opcional: decodificar el token para obtener info del usuario
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                localStorage.setItem('usuario', JSON.stringify({
                    id: payload.id,
                    email: payload.email
                }));
            } catch (error) {
                console.error('Error al decodificar token:', error);
            }

            // Redirigir al dashboard
            navigate('/dashboard', {replace: true});
        } else {
            // Si no hay token, redirigir al login
            navigate('/login', {replace: true});
        }
    }, [navigate, location]);

    return <div>Procesando autenticación...</div>;
}

function ProtectedRoute({children}) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login"/>;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registro" element={<Registro/>}/>
                <Route path="/auth/callback" element={<GoogleCallback/>}/>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/dashboard"/>}/>
            </Routes>
        </Router>
    );
}

export default App;