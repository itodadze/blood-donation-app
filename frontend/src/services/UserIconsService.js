import api from "../AxiosInstance";

export const getIcons = () => {
    return api.get("/icons/").then(
        response => response.data
    ).catch(error => console.error("Error fetching icons", error));
}