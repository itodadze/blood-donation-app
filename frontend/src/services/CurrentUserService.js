import api from "../AxiosInstance"

export const getCurrentUserId = () => {
    return api.get("/current-user/").then(
        response => response.data.pk
    ).catch(error => console.error("Error fetching current user", error))
}