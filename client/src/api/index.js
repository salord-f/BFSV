import axios from 'axios'

export const baseURL = 'http://localhost:3000/';

const api = axios.create({
    baseURL: baseURL,
});

export const createPlugin = (payload, headers) => api.post('/plugins', payload, headers);
export const createAnAccount = payload => api.post('users', payload);
export const connectToAccount = payload => api.post('users/login', payload);
export const getPlugin = id => api.get('/plugins/' + id);
export const addComment = (id, payload) => api.post('/plugins/' + id + "/comments", payload);
export const getPlugins = () => api.get('/plugins');
export const updateCart = payload => api.put(payload.id + '/cart', payload.cartIdItem);

const apis = {
    createPlugin,
    createAnAccount,
    connectToAccount,
    getPlugins,
    getPlugin,
    addComment,
    updateCart
};

export default apis
