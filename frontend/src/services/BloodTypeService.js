import api from "../AxiosInstance"
import {useEffect} from "react";

export const getBloodTypes = async ({ setBloodTypes }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchBloodTypes = async () => {
            try {
                const response = await api.get("/blood");
                setBloodTypes(response.data);
            } catch (error) {
                console.error('Error fetching blood types:', error);
            }
        };
        fetchBloodTypes();
    }, [setBloodTypes])
}