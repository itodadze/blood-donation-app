import colors from "../values/colors";
import React, {useEffect, useState} from "react";
import {getConversationList} from "../services/ChatConversationListService";

export const ConversationList = ({chosenRecipient, chooseRecipient}) => {
    const [conversations, fillConversations] = useState(null);

    useEffect(() => {
        getConversationList(3).then(data => {
            fillConversations(data);
        }).catch(error => {
            console.error('Error fetching conversation list:', error);
        });
    }, [chosenRecipient]);

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
        {(() => {
            let divs = [];
            if (conversations !== null && conversations !== undefined) {
                for (const conversation of conversations) {
                    divs.push(<button
                        key={conversation.email}
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
                        <div style={{}}> {conversation.first_name + ' ' + conversation.last_name} </div>
                    </button>)
                }
                console.log(chosenRecipient)
            }
            return divs;
        })()}

    </div>)
}