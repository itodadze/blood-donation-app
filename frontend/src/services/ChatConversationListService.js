import api from "../AxiosInstance"

export const getConversationList = (userEmail) => {
    return api.get('/chats?user_email='+userEmail).then(response => response.data)
        .catch(error => console.error('Error fetching conversation list:', error));
};