import api from "../AxiosInstance"

export const broadcastRequest = async ({selectedBlood, description, emergency, selectedLat, selectedLon}) => {
    const requestData = {
        blood_id: selectedBlood,
        description: description,
        emergency_status: emergency,
        loc_longitude: selectedLon,
        loc_latitude: selectedLat
    }

    return api.post('/broadcast/', requestData);
}