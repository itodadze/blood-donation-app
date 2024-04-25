import api from "../AxiosInstance"

export const getConversationList = (user_id) => {
    return api.get('/chats/user/', {
        params: {
            user_id: user_id
        }
    }).then(response => response.data)
        .catch(error => console.error('Error fetching conversation list:', error));
};
