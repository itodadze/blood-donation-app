import colors from "../../values/colors";
import React, {useEffect, useState} from "react";
import {sendMessage} from "../../services/ChosenChatService";
import {getCurrentUserId} from "../../services/CurrentUserService";

export const ChatInputField = ({chosenRecipient, setMessageTime}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [message, setMessage] = useState("");

    const handleChangeMessage = (input) => {
        setMessage(input.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            sendMessage(currentUser, chosenRecipient, message)
                .then(() => {
                    setMessage("");
                    setMessageTime(Date.now())
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        getCurrentUserId()
            .then((data) => {
                setCurrentUser(data)
            }).catch(() => {
            setCurrentUser(null)
        })
    }, []);

    return (<div className="chat-input-container">
        <div className="chat-input-message-container">
            <input
                className="chat-input-message"
                placeholder="Type your message..."
                value={message}
                onChange={handleChangeMessage}
                onKeyUp={handleKeyUp}
                style={{
                    '--background-color': colors.tertiary, '--border-color': colors.primary_dark
                }}
            />
            <button
                onClick={handleSendMessage}
                className="chat-input-send-btn"
                style={{
                    'background-color': colors.primary, '--btn-color': colors.dark_pearl
                }}
            >
                Send
            </button>
        </div>
    </div>);
}