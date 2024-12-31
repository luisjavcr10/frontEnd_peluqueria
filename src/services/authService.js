import api from './api';

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        const {token} = response.data;
        const {user} =response.data;
        // Almacenar el token en localStorage para futuras solicitudes
        localStorage.setItem('jwt', token);
        localStorage.setItem('idUser',user.idUser);
        return response.data;

    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        throw error.response?.data?.message || 'Error al iniciar sesión';
    }
}

export const logout = () => {
    localStorage.removeItem('jwt'); // Elimina el token
}; 