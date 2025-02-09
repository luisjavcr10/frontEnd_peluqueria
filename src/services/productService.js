import {api} from './api';

export const getProducts = async (offset,limit) =>{
    try {
        if(offset === 0 && limit === 0){
            const response = await api.get('/products');
            return response.data;
        }else{
            const response = await api.get('/products', {
                params: { offset, limit }
            });
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message;
    }
};

export const getProduct = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message;
    }
};

export const getProductByCategory = async (idCategory) =>{
    try {
        const response = await api.get(`/products/category/${idCategory}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message;
    }
};

export const createProducts = async (data) =>{
    try {
        const response = await api.post('/products', data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message;
    }
};

export const updateProduct = async (id, updatedData) => {
    try {
        const response = await api.put(`/products/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message;
    }
};

export const deleteProducts = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response?.data?.message;
    }
};