import api from "../AxiosInstance"

export const broadcastRequest = async ({selectedUser, selectedBlood, description, emergency, selectedLat, selectedLon}) => {
    const requestData = {
        user_id: selectedUser,
        blood_id: selectedBlood,
        description: description,
        emergency_status: emergency,
        loc_longitude: selectedLon,
        loc_latitude: selectedLat
    }

    return api.post('/broadcast/', requestData);
}