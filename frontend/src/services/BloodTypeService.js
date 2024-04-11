import api from "../AxiosInstance"

export const getBloodTypes = () => {
    return api.get('/blood').then(response => response.data)
        .catch(error => console.error('Error fetching blood types:', error));
};