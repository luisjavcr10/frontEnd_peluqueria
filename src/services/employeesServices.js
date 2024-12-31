import api from './api';

export const getEmployees = async (offset, limit) => {
    try {
        const response = await api.get('/employees', {
            params: { offset, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los empleados:', error);
        throw error.response?.data?.message || 'Error al obtener los empleados';
    }
};

export const getEmployee = async (id) => {
    try {
        const response = await api.get(`/employees/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al obtener el empleado';
    }
};

export const createEmployee = async (data) => {
    try {
        const response = await api.post('/employees', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al crear el empleado';
    }
};

export const updateEmployee = async (id, updatedData) => {
    try {
        const response = await api.put(`/employees/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        throw error.response?.data?.message || 'Error al actualizar el empleado';
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await api.delete(`/employees/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el empleado:', error);
        throw error.response?.data?.message || 'Error al eliminar el empleado';
    }
};

