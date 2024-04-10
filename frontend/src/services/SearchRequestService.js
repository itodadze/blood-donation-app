import api from "../AxiosInstance"

export const getSearchRequests = () => {
    return api.get("/search-requests");
};

export const broadcastSearchRequest = () => {
    return api.post("/search-requests")
}