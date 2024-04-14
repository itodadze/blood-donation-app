import colors from "../values/colors";
import React from "react";
import {ChatMessage} from "./ChatMessage";

export const ChosenChat = ({chosenRecipient}) => {
    return (<div style={{
            padding: '2%',
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: "100%",
            overflowY: 'scroll',
            overflowX: 'clip',
            maxHeight: '100%'
        }}>
            {(() => {
                let divs = [];

                for (let i = 0; i < 50; i++) {
                    divs.push(<ChatMessage
                        messageContent={'ძალიან ძალიან დიდი უზარმაზარი მესიჯი მესიჯი მესიჯი მესიჯი მესიჯი მესიჯიი ' + i}
                        isSent={false}/>);

                    divs.push(<ChatMessage
                        messageContent={'კიდევ უფრო დიდი, ძალიან ძალიან ძალიან ძალიან დიდი უზარმაზარი ' + 'პასუხიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიი ' + i}
                        isSent={true}/>);
                }
                return divs;
            })()}
        </div>)
}