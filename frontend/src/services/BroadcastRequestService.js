import api from "../AxiosInstance"

export const broadcastRequest = async ({selectedBlood, description, emergency, selectedLat, selectedLon}) => {
    const requestData = {
        user_id: 1,
        narrative: selectedBlood,
        description: description,
        emergency_status: emergency,
        loc_longitude: selectedLon,
        loc_latitude: selectedLat
    }

    return api.post('/broadcast/', requestData);
}