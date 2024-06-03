import api from "../AxiosInstance";

export const getRequest = ({requestId}) => {
    return api.get('/requests/', {params: {
            request_id: requestId
        }}).then(response => response.data)
        .catch(error => console.error('Error fetching request:', error));
}

export const deleteRequest = ({requestId}) => {
    return api.delete("/requests/", {params: {
            request_id: requestId
        }}).then(response => response.data)
        .catch(error => console.error('Error deleting request:', error));
}
