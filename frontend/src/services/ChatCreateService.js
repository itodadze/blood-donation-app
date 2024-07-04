import api from "../AxiosInstance";

export const connectUsers = ({donor, receiver}) => {
    return api.post("/chats/new/", {receiver_id: receiver, donor_id: donor})
}