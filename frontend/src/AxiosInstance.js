import axios from 'axios';
import Cookies from "js-cookie";

const fetchCsrfToken = async () => {
    try {
        const response = await api.get('/csrf-token/');
        Cookies.set('csrftoken', response.data.csrfToken);
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
};

fetchCsrfToken();

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
})

api.interceptors.request.use(config => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
}, error => Promise.reject(error));

export default api;