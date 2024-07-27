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

export const getUser = ({userId}) => {
    return api.get('/users/access/', {params: {id: userId}})
        .then(response => response.data)
        .catch(error => console.error('Error fetching user:', error));
}

export const updateUser = (id, iconId, locLat, locLon, firstName, lastName, email,
                           isDonor, description, bloodId) => {
    const requestData = {
        id: id,
        icon_id: iconId,
        is_donor: isDonor,
        first_name: firstName,
        last_name: lastName,
        email: email,
        description: description,
        loc_latitude: locLat,
        loc_longitude: locLon,
        blood_id: bloodId
    }

    return api.patch('/users/access/', requestData)
        .then(response => response.data)
        .catch(error => console.error('Error updating user information', error));
}