import axios from 'axios'

export const baseURL = 'http://localhost:3000/';

const api = axios.create({
    baseURL: baseURL,
});

export const createPlugin = (payload, headers) => api.post('/plugins', payload, headers);
export const createAnAccount = payload => api.post('users', payload);
export const connectToAccount = payload => api.post('users/login', payload);

const apis = {
    createPlugin,
    createAnAccount,
    connectToAccount
};

export default apis
