import api from "../AxiosInstance"
import {useEffect} from "react";

export const getUsers = async ({requestData, setUsers}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/search-requests", requestData);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching search requests:', error);
            }
        };
        fetchUsers();
    }, [requestData, setUsers])
    return api.get("/users");
};