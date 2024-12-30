import api from './api';

export const getServices = async (offset,limit) =>{
    try {
        const response = await api.get('/services',{
            params: {offset,limit}
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        throw error.response?.data?.message || 'Error al obtener los servicios';
    }
};

export const getService = async (id) =>{
    try {
        const response = await api.get(`/services/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al obtener el servicio';
    }
};

export const createService = async (data) =>{
    try {
        const response = await api.post('/services',data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al crear el servicio';
    }
}

export const updateService = async (id, updatedData) =>{
    try {
        const response = await api.put(`/services/${id}`,updatedData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el servicio:', error);
        throw error.response?.data?.message || 'Error al actualizar el servicio';
    }
}

export const deleteService = async (id) =>{
    try {
        const response = await api.delete(`/services/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        throw error.response?.data?.message || 'Error al eliminar el servicio';
    }
}