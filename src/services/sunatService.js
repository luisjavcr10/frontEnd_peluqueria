import { sunatApi } from './api';

export const getAllRucData = async (ruc) => {
    try {
        const response = await sunatApi.get(`/ruc/${ruc}/all`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al obtener ruc';
    }
};

export const getBasicRucData = async (ruc) => {
    try {
        const response = await sunatApi.get(`/ruc/${ruc}/basic`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al obtener ruc';
    }
};

export const getDniData = async (dni) => {
    try {
        const response = await sunatApi.get(`/dni/${dni}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error al obtener dni';
    }
};