import api from "../AxiosInstance"

export const getSearchRequests = ({selectedBlood, selectedMatch, selectedAuthorFilter}) => {
    const requestData = {
        id: selectedBlood,
        exact_match: selectedMatch === "მხოლოდ მონიშნული",
        current_author: selectedAuthorFilter === "მე"
    };

    return api.get('/search-requests/', {params: requestData}).then(response => response.data)
        .catch(error => console.error('Error fetching search requests:', error));
}