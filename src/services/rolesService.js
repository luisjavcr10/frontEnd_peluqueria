import api from './api';

export const getRoles = async (offset, limit) => {
    try {
        const response = await api.get('/roles', {
            params: { offset, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        throw error.response?.data?.message || 'Error al obtener los roles';
    }
};

export const getRole = async (id) => {
    try {
        const response = await api.get(`/roles/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al obtener el rol';
    }
};

export const createRole = async (data) => {
    try {
        const response = await api.post('/roles', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al crear el rol';
    }
};

export const updateRole = async (id, updatedData) => {
    try {
        const response = await api.post(`/roles/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        throw error.response?.data?.message || 'Error al actualizar el rol';
    }
};

export const deleteRole = async (id) => {
    try {
        const response = await api.delete(`/roles/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el rol:', error);
        throw error.response?.data?.message || 'Error al eliminar el rol';
    }
};
