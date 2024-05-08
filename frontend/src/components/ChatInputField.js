import colors from "../values/colors";
import React, {useState} from "react";
import {sendMessage} from "../services/ChosenChatService";

export const ChatInputField = ({chosenRecipient, setMessageTime}) => {
    const [message, setMessage] = useState("");

    const handleChangeMessage = (input) => {
        setMessage(input.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            sendMessage(3, chosenRecipient, message)
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

    return (<div style={{
        position: 'absolute',
        bottom: '2vh',
        width: '80%',
        height: '65px',
        backgroundColor: colors.tertiary,
        border: 'solid',
        borderColor: colors.primary_dark,
        borderRadius: '20px',
        overflowX: 'clip',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }}>
        <input
            placeholder="Type your message..."
            value={message}
            onChange={handleChangeMessage}
            onKeyUp={handleKeyUp}
            style={{
                borderColor: colors.primary_dark,
                borderRadius: '15px',
                margin: '2%',
                width: '100%',
                backgroundColor: colors.tertiary
            }}
        />
        <button style={{
            borderColor: colors.primary_dark,
            borderRadius: '15px',
            alignSelf: 'center',
            marginRight: '2vw',
            backgroundColor: colors.primary,
            color: colors.dark_pearl
        }} onClick={handleSendMessage}>
            Send
        </button>
    </div>);
}