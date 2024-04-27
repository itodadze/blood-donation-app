import colors from "../values/colors";
import React, {useEffect, useRef, useState} from "react";
import {ChatMessage} from "./ChatMessage";
import {getConversation, sendMessage} from "../services/ChosenChatService"
import {ChatInputField} from "./ChatInputField";

export const ChosenChat = ({chosenRecipient}) => {
    const [conversation, fillConversation] = useState(null);
    const [lastMessageTime, setMessageTime] = useState(null);
    const chatRef = useRef(null);

    useEffect(() => {
        if(chosenRecipient !== null && chosenRecipient !== undefined) {
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
            });
        }
    }, [chosenRecipient, lastMessageTime]);


    if(chosenRecipient === null || chosenRecipient === undefined) {
        return (<div style={{display: 'flex', flexDirection: 'column', flex: '1', position: 'relative'}}/>);
    }
    return (<div key={'main'} style={{display: 'flex', flexDirection: 'column', flex: '1', position: 'relative'}}>
            <div key={'chat'} style={{
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
            }} ref={chatRef}>
                {(() => {
                    let divs = [];
                    if (conversation !== null && conversation !== undefined) {
                        for (const message of conversation) {
                            divs.push(<ChatMessage key={message.message_timestamp}
                                                   messageContent={message.message_text}
                                                   isSent={chosenRecipient !== message.sender_id}/>);
                        }
                        divs.push(<span key={'space'} style={{margin: '2vh 0'}}/>)
                    }
                    return divs;
                })()}
            </div>

            <ChatInputField
                chosenRecipient={chosenRecipient}
                setMessageTime={setMessageTime}
            />
        </div>)
}