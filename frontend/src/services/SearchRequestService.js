import api from "../AxiosInstance"

export const getSearchRequests = ({selectedBlood, selectedMatch}) => {
    const requestData = {
        narrative: selectedBlood,
        exact_match: selectedMatch === "მხოლოდ მონიშნული"
    };

    return api.post('/search-requests', requestData).then(response => response.data)
        .catch(error => console.error('Error fetching search requests:', error));
}