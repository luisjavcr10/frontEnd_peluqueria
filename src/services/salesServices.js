import api from './api';

export const getSales = async (offset,limit) =>{
    try {
        const response = await api.get('/sales', {
            params: { offset, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        throw error.response?.data?.message || 'Error al obtener las ventas';
    }
};