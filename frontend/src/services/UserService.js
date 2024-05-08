import api from "../AxiosInstance"

export const getUsers = ({selectedBlood, selectedMatch}) => {
    const requestData = {
        narrative: selectedBlood,
        exact_match: selectedMatch === "მხოლოდ მონიშნული"
    };

    return api.post('/users', requestData).then(response => response.data)
        .catch(error => console.error('Error fetching users:', error));
}