import colors from "../values/colors";
import React from "react";

export const ChatMessage = ({messageContent, isSent}) => {
    const messagePlacing = isSent ? {
        marginRight: '2vh',
    } : {
        marginLeft: '2vh',
    };

    const messageStyle = isSent ? {
        borderBottomRightRadius: '0px',
    } : {
        borderBottomLeftRadius: '0px'
    };
    return (<div style={{
            display: 'flex',
            position: 'relative',
            width: "100%",
            marginBottom: '4vh',
            justifyContent: isSent ? 'flex-end' : 'flex-start',
            ...messagePlacing
        }}>
            <div style={{
                border: isSent ? colors.primary : colors.secondary,
                borderStyle: 'solid',
                borderRadius: '25px',
                padding: '2%',
                backgroundColor: isSent ? colors.primary : colors.secondary,
                maxWidth: '40%',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                fontFamily: 'noto-sans-georgian-elegant',
                ...messageStyle
            }}>
                {messageContent}
            </div>
        </div>)
}