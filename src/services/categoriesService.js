import api from './api';

export const getCategories = async (offset, limit) => {
    try {
        const response = await api.get('/categories',{
            params:{offset, limit}
        })
        return response.data;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error.response?.data?.message || 'Error al obtener las categorías';
    }
};

export const getCategory = async (id) => {
    try {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al obtener la categoria';
    }
};

export const createCategory = async (data) =>{
    try {
        const response = await api.post('/categories',data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al crear la categoria';
    }
};

export const updateCategory = async (id,updatedData) =>{
    try {
        const response = await api.put(`/categories/${id}`,updatedData);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        throw error.response?.data?.message || 'Error al actualizar la categoría';
    }
};

export const deleteCategory = async (id) =>{
    try {
        const response = await api.delete(`/categories/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        throw error.response?.data?.message || 'Error al eliminar la categoría';
    }
};