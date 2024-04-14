import colors from "../values/colors";
import React from "react";

export const ConversationList = ({chosenRecipient, chooseRecipient}) => {
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

                for (let i = 0; i < 30; i++) {
                    // Push each div element into the array
                    divs.push(
                        <div key={i} style={{
                            padding: '5%',
                            height: '70px',
                            border: colors.primary,
                            borderStyle: 'solid',
                            borderRadius: '50px',
                            margin: '2vh',
                            position: 'relative',
                            width: "100%"
                        }}>
                            <text style={{}}>{i + 1} person</text>
                        </div>
                    );
                }

                return divs;
            })()}

        </div>
    )
}