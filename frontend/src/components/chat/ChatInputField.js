import colors from "../../values/colors";
import React, {useState} from "react";
import {sendMessage} from "../../services/ChosenChatService";

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
        bottom: '4vh',
        width: '80%',
        height: '65px',
        overflowX: 'clip',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }}>
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%'
        }}>
            <input
                placeholder="Type your message..."
                value={message}
                onChange={handleChangeMessage}
                onKeyUp={handleKeyUp}
                style={{
                    backgroundColor: colors.tertiary,
                    border: 'solid',
                    borderColor: colors.primary_dark,
                    borderRadius: '20px',
                    padding: '15px',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    paddingRight: '77px'
                }}
            />
            <button
                onClick={handleSendMessage}
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: colors.primary,
                    color: colors.dark_pearl,
                    borderRadius: '15px',
                    height: '70%',
                    width: '60px',
                    cursor: 'pointer',
                }}
            >
                Send
            </button>
        </div>
    </div>);
}