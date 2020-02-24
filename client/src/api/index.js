import axios from 'axios'

export const baseURL = 'http://localhost:3000/';
export const tryURL = 'http://localhost:8080/';

const api = axios.create({
    baseURL: baseURL
});

export const createPlugin = (payload, headers) => api.post('/plugins', payload, headers);
export const createAnAccount = payload => api.post('users', payload);
export const connectToAccount = payload => api.post('users/login', payload);
export const getPlugin = id => api.get('/plugins/' + id);
export const addComment = (id, payload) => api.post('/plugins/' + id + "/comments", payload);
export const getPlugins = (page) => api.get('/plugins/page/' + page);
export const addLike = (id, payload) => api.post('/plugins/' + id + '/likes', payload);
export const deleteLike = (id, payload) => api.delete('/plugins/' + id + '/likes', { data: payload });
export const getMyCart = (id) => api.get('users/' + id + '/cart');
export const payMyCart = (id) => api.get('users/' + id + '/cart/pay');
export const updateCart = (id, payload) => api.put('users/' + id + '/cart', payload);
export const removeItemToCart = (id, plugin) => api.delete('users/' + id + '/cart', { data: { plugin } });
export const getUserPlugins = mail => api.get('plugins/author/' + mail);
export const getUserPurchasedPlugins = id => api.get('users/' + id + '/purchasedplugins');

const apis = {
    createPlugin,
    createAnAccount,
    connectToAccount,
    getPlugins,
    getPlugin,
    addComment,
    getMyCart,
    updateCart,
    addLike,
    deleteLike,
    removeItemToCart,
    getUserPlugins,
    getUserPurchasedPlugins,
    payMyCart
};

export default apis
