import api from "../AxiosInstance";

export const deleteConversation = (donor_id, receiver_id) => {
    return api.delete('/chats/delete/', {params: {
            receiver_id: receiver_id,
            donor_id: donor_id
        }})
        .then(response => response.data)
        .catch(error => console.error('Error deleting conversation error'));
}