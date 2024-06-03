import api from "../AxiosInstance";

export const donate = (id) => {
    return api.post('/donation/', {donor: id})
        .then(response => response.data)
        .catch(error => console.error('Error registering donation:', error));
}