import colors from "../values/colors";
import React, {useEffect, useState} from "react";
import {getConversationList} from "../services/ChatConversationListService";

export const ConversationList = ({chosenRecipient, chooseRecipient}) => {
    const [conversations, fillConversations] = useState(null);

    useEffect(() => {
        getConversationList('user@example.com').then(data => {
            console.log('Data:', data);
            fillConversations(data);
        }).catch(error => {
            console.error('Error fetching conversation list:', error);
        });
    }, []);

    return (
        <div
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
                        divs.push(
                            <div
                                key={conversation.email}
                                style={{
                                padding: '5%',
                                height: '70px',
                                border: colors.primary,
                                borderStyle: 'solid',
                                borderRadius: '50px',
                                margin: '2vh',
                                position: 'relative',
                                width: "100%"}}>

                                <div style={{}}> {conversation.first_name + ' ' + conversation.last_name} </div>
                            </div>
                        )
                    }
                }

                // for (let i = 0; i < 30; i++) {
                //     // Push each div element into the array
                //     divs.push(
                //         <div key={i} style={{
                //             padding: '5%',
                //             height: '70px',
                //             border: colors.primary,
                //             borderStyle: 'solid',
                //             borderRadius: '50px',
                //             margin: '2vh',
                //             position: 'relative',
                //             width: "100%"
                //         }}>
                //             <text style={{}}>{i + 1} person</text>
                //         </div>
                //     );
                // }

                return divs;
            })()}

        </div>
    )
}