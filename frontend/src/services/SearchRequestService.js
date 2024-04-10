import api from "../AxiosInstance"
import {useEffect} from "react";

export const getSearchRequests = async ({requestData, setSearchRequests}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchSearchRequests = async () => {
            try {
                const response = await api.get("/search-requests", requestData);
                setSearchRequests(response.data);
            } catch (error) {
                console.error('Error fetching search requests:', error);
            }
        };
        fetchSearchRequests();
    }, [requestData, setSearchRequests])
}

export const broadcastSearchRequest = async ({requestData}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const broadcastSearch = async () => {
            try {
                await api.post("/search-requests", requestData);
            } catch (error) {
                console.error('Error fetching search requests:', error);
            }
        };
        broadcastSearch();
    })
}