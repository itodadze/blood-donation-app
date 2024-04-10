import api from "../AxiosInstance"

export const getBloodTypes = () => {
    return api.get("/blood")
}