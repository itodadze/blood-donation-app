import api from "../AxiosInstance";

export const getDonationCount = (userId) => {
    return api.get('/donation/count/', {params: {donor: userId}})
        .then(response => response.data)
        .catch(error => console.error("Could not count donations for user", error))
}