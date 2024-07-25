import axios from 'axios';
import Cookies from "js-cookie";

const getCsrfToken = () => {
    return Cookies.get('csrftoken');
};

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'X-CSRFToken': getCsrfToken(),
    }
})

export default api;