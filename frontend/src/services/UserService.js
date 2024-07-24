import api from "../AxiosInstance"

export const getUsers = ({selectedBlood, selectedMatch}) => {
    const requestData = {
        id: selectedBlood,
        exact_match: selectedMatch === "მხოლოდ მონიშნული"
    };

    return api.get('/users/', {params: requestData}).then(response => response.data)
        .catch(error => console.error('Error fetching users:', error));
}

export const getDonors = ({id}) => {
    return api.get('/users/donors/', {params: {id: id}})
        .then(response => response.data)
        .catch(error => console.error('Error fetching users:', error));
}