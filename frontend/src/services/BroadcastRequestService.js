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

    return api.put('/search-requests', requestData).then(response => response.data)
        .catch(error => {
            console.error("Error broadcasting request", error);
            return null
        })
}