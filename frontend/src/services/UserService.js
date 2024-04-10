import api from "../AxiosInstance"

export const getUsers = () => {
    return api.get("/users");
};