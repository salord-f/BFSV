import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/',
});

export const createAnAccount = payload => api.post('users', payload);
export const connectToAccount = payload => api.post('users/login', payload);
export const insertMovie = payload => api.post(`/movie`, payload);
export const getAllMovies = () => api.get(`/movies`);
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload);
export const deleteMovieById = id => api.delete(`/movie/${id}`);
export const getMovieById = id => api.get(`/movie/${id}`);

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    createAnAccount,
    connectToAccount
};

export default apis
