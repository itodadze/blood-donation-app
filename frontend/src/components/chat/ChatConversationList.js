import colors from "../../values/colors";
import React, {useEffect, useState} from "react";
import {getConversationList} from "../../services/ChatConversationListService";
import ReactLoading from "react-loading";


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
            return <LoadingIndicator />;
        }
        if (!conversations) return null;

        return conversations.map(conversation => (
            <button
                key={conversation.id}
                style={{
                    padding: '5%',
                    height: '70px',
                    margin: '2vh',
                    position: 'relative',
                    width: "100%",
                    backgroundColor: chosenRecipient === conversation.id ? colors.primary : colors.white,
                    borderColor: colors.primary_dark,
                    borderRadius: '50px',
                    overflowX: 'hidden'
                }}
                onClick={() => chooseRecipient(conversation.id)}
            >
                <div>{conversation.first_name + ' ' + conversation.last_name}</div>
            </button>
        ));
    };

    return (<div
        style={{
            flex: '0.3',
            backgroundColor: colors.pearl,
            border: colors.tertiary,
            borderLeftStyle: 'dotted',
            alignItems: "center",
            flexDirection: "column",
            display: "flex",
            overflowY: 'scroll',
            maxHeight: '100%'
        }}>
        {renderConversationList()}
    </div>)
};
const LoadingIndicator = () => {
    return <div style={{alignSelf:'center'}}>
        <ReactLoading type={'bubbles'} color={colors.primary}/>
    </div>;
};