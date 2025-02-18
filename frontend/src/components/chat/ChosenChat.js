import colors from "../../values/colors";
import React, {useEffect, useRef, useState} from "react";
import {ChatMessage} from "./ChatMessage";
import {getConversation} from "../../services/ChosenChatService"
import {ChatInputField} from "./ChatInputField";
import ReactLoading from 'react-loading';
import {getCurrentUserId} from "../../services/CurrentUserService";

export const ChosenChat = ({chosenRecipient}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [conversation, fillConversation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastMessageTime, setMessageTime] = useState(null);
    const chatRef = useRef(null);
    const POLLING_INTERVAL = 8000;

    useEffect(() => {
        getCurrentUserId()
            .then((data) => {
                setCurrentUser(data)
            }).catch(() => {
            setCurrentUser(null)
        })
    }, []);

    useEffect(() => {
        if (chosenRecipient !== null && chosenRecipient !== undefined) {
            setLoading(true);
            getConversation(currentUser, chosenRecipient).then(data => {
                fillConversation(data);
                setTimeout(() => {
                    if (chatRef.current) {
                        chatRef.current.scrollTop = chatRef.current.scrollHeight;
                    }
                }, 0);
            }).catch(error => {
                console.error('Error fetching conversation list:', error);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [chosenRecipient, lastMessageTime, currentUser]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            getConversation(currentUser, chosenRecipient).then(data => {
                fillConversation(data);
                setTimeout(() => {
                    if (chatRef.current) {
                        chatRef.current.scrollTop = chatRef.current.scrollHeight;
                    }
                }, 0);
            });
        }, POLLING_INTERVAL);

        return () => clearInterval(intervalId);
    }, [chosenRecipient, lastMessageTime, currentUser]);

    const renderMessages = () => {
        if (loading) {
            return <LoadingIndicator/>;
        }
        if (!conversation) return null;

        const messages = [];
        conversation.forEach((message) => {
            messages.push(<ChatMessage
                key={message.message_timestamp}
                messageContent={message.message_text}
                isSent={chosenRecipient !== message.sender_id}
            />);
        });
        messages.push(<span key={'space'} style={{margin: '30px 0'}}/>);
        return messages;
    };

    if (chosenRecipient === null || chosenRecipient === undefined) {
        return (<div key={'main_empty'} className="chat-container"/>);
    }
    return (<div key={'main'} className="chat-container">
        <div key={'chat'} className="spec-chat-container" ref={chatRef}>
            {renderMessages()}
        </div>

        <ChatInputField
            chosenRecipient={chosenRecipient}
            setMessageTime={setMessageTime}
            currentUser={currentUser}
        />
    </div>)

};

const LoadingIndicator = () => {
    return <div style={{alignSelf: 'center'}}>
        <ReactLoading type={'bubbles'} color={colors.primary}/>
    </div>;
};