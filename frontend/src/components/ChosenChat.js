import colors from "../values/colors";
import React, {useEffect, useState} from "react";
import {ChatMessage} from "./ChatMessage";
import {getConversation, sendMessage} from "../services/ChosenChatService"

export const ChosenChat = ({chosenRecipient}) => {
    const [conversation, fillConversation] = useState(null);
    const [message, setMessage] = useState("");
    const [lastMessageTime, setMessageTime] = useState(null);

    useEffect(() => {
        getConversation(3, chosenRecipient).then(data => {
            console.log('Data:', data);
            fillConversation(data);
        }).catch(error => {
            console.error('Error fetching conversation list:', error);
        });
    }, [chosenRecipient, lastMessageTime]);

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
    if(chosenRecipient === null || chosenRecipient === undefined) {
        return (<div style={{display: 'flex', flexDirection: 'column', flex: '1', position: 'relative'}}/>);
    }
    return (<div style={{display: 'flex', flexDirection: 'column', flex: '1', position: 'relative'}}>
            <div style={{
                padding: '2%',
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100%',
                width: "100%",
                overflowY: 'scroll',
                overflowX: 'clip',
                maxHeight: '100%',
                position: 'relative',
            }}>
                {(() => {
                    let divs = [];
                    if (conversation !== null && conversation !== undefined) {
                        for (const message of conversation) {
                            divs.push(<ChatMessage key={message.message_timestamp}
                                                   messageContent={message.message_text}
                                                   isSent={chosenRecipient !== message.sender_id}/>);
                        }
                    }
                    return divs;
                })()}
            </div>

            <div style={{
                position: 'absolute',
                bottom: '2vh',
                width: '80%',
                height: '15%',
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
            </div>
        </div>)
}