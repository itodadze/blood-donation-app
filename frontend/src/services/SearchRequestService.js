import api from "../AxiosInstance"
import {useEffect} from "react";

export const getSearchRequests = ({selectedBlood, selectedMatch}) => {
    const requestData = {
        narrative: selectedBlood,
        exact_match: selectedMatch === "მხოლოდ მონიშნული"
    };

    return api.post('/search-requests', requestData).then(response => response.data)
        .catch(error => console.error('Error fetching search requests:', error));
}

export const broadcastSearchRequest = async ({requestData}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const broadcastSearch = async () => {
            try {
                await api.put("/search-requests", requestData);
            } catch (error) {
                console.error('Error fetching search requests:', error);
            }
        };
        broadcastSearch();
    })
}