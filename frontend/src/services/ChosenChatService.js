import api from "../AxiosInstance";

export const getConversation = (logged_user_id, user_id) => {
    return api.get('/chats/user/messages', {
        params: {
            logged_in_user_id: logged_user_id, chat_user_id: user_id
        }
    })
        .then(response => response.data)
        .catch(error => console.error('Error fetching conversation :', error));
}

export const sendMessage = (sender_id, receiver_id, message_text) => {
    const data = {
        sender_id: sender_id, receiver_id: receiver_id, message_text: message_text
    };

    return api.post('/chats/user/messages/new', data)
        .then(response => response.data)
        .catch(error => console.error('Error sending message:', error));
}