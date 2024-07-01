import colors from "../../values/colors";
import React, {useEffect, useState} from "react";
import {getConversationList} from "../../services/ChatConversationListService";
import ReactLoading from "react-loading";
import "../../styles/chat_page.css"


export const ConversationList = ({chosenRecipient, chooseRecipient}) => {
    const [conversations, fillConversations] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getConversationList(3).then(data => {
            fillConversations(data);
        }).catch(error => {
            console.error('Error fetching conversation list:', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [chosenRecipient]);

    const renderConversationList = () => {
        if (loading) {
            return <LoadingIndicator/>;
        }
        if (!conversations) return null;

        return conversations.map(conversation => (<button
                key={conversation.id}
                className={"chat-header"}
                style={{
                    '--background-color': chosenRecipient === conversation.id ? colors.primary : colors.white,
                    '--border-color': colors.primary_dark
                }}
                onClick={() => chooseRecipient(conversation.id)}
            >
                <div>{conversation.first_name + ' ' + conversation.last_name}</div>
            </button>));
    };

    return (<div
        className={"conversation-list-container"}
        style={{
            '--background-color': colors.pearl, '--border-color': colors.tertiary
        }}>
        {renderConversationList()}
    </div>)
};
const LoadingIndicator = () => {
    return <div style={{alignSelf: 'center'}}>
        <ReactLoading type={'bubbles'} color={colors.primary}/>
    </div>;
};