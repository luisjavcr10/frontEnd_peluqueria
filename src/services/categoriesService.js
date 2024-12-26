import api from './api';

export const getCategories = async () => {
    try {
        const response = await api.get('/categories')
        return response.data;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error.response?.data?.message || 'Error al obtener las categorías';
    }
};