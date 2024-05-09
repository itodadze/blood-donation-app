import colors from "../../values/colors";
import React, {useEffect, useRef, useState} from "react";
import {ChatMessage} from "./ChatMessage";
import {getConversation} from "../../services/ChosenChatService"
import {ChatInputField} from "./ChatInputField";
import ReactLoading from 'react-loading';

export const ChosenChat = ({chosenRecipient}) => {
    const [conversation, fillConversation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastMessageTime, setMessageTime] = useState(null);
    const chatRef = useRef(null);

    useEffect(() => {
        if(chosenRecipient !== null && chosenRecipient !== undefined) {
            setLoading(true);
            getConversation(3, chosenRecipient).then(data => {
                console.log('Data:', data);
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
    }, [chosenRecipient, lastMessageTime]);

    const renderMessages = () => {
        if (loading) {
            return <LoadingIndicator />;
        }
        if (!conversation) return null;

        const messages = [];
        conversation.forEach((message) => {
            messages.push(
                <ChatMessage
                    key={message.message_timestamp}
                    messageContent={message.message_text}
                    isSent={chosenRecipient !== message.sender_id}
                />
            );
        });
        messages.push(<span key={'space'} style={{ margin: '30px 0' }} />);
        return messages;
    };

    if(chosenRecipient === null || chosenRecipient === undefined) {
        return (<div style={{display: 'flex', flexDirection: 'column', flex: '1', position: 'relative'}}/>);
    }
    return (<div key={'main'} style={{display: 'flex', flexDirection: 'column', flex: '1', position: 'relative'}}>
            <div key={'chat'} style={{
                padding: '2%',
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                maxWidth: '100%',
                width: '100%',
                overflowY: 'scroll',
                overflowX: 'clip',
                maxHeight: '100%',
                position: 'relative',
            }} ref={chatRef}>
                {renderMessages()}
            </div>

            <ChatInputField
                chosenRecipient={chosenRecipient}
                setMessageTime={setMessageTime}
            />
        </div>)

};

const LoadingIndicator = () => {
    return <div style={{alignSelf:'center'}}>
        <ReactLoading type={'bubbles'} color={colors.primary}/>
    </div>;
};