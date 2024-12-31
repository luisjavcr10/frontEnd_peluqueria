import api from './api';

export const getCurrentUser = async ()=>{
    const id = localStorage.getItem('idUser');
    const response = await api.get(`/users/${id}`);
    return response.data;
};