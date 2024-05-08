import api from "../AxiosInstance"

export const broadcastRequest = async ({selectedBlood, description, emergency, selectedLat, selectedLon}) => {
    const requestData = {
        user_id: 1,
        narrative: selectedBlood,
        description: description,
        emergency_status: emergency,
        loc_longitude: selectedLat,
        loc_latitude: selectedLon
    }

    return api.post('/broadcast', requestData);
}