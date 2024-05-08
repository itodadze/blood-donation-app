import colors from "../values/colors";
import React from "react";

export const ChatMessage = ({messageContent, isSent}) => {
    const messagePlacing = isSent ? {
        marginRight: '2vh',
    } : {
        marginLeft: '2vh',
    };

    const messageStyle = isSent ? {
        borderTopRightRadius: '25px',
        borderTopLeftRadius: '25px',
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '25px',
    } : {
        borderTopRightRadius: '25px',
        borderTopLeftRadius: '25px',
        borderBottomRightRadius: '25px',
        borderBottomLeftRadius: '0px',
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
                borderColor: isSent ? colors.primary : colors.secondary,
                borderStyle: 'solid',
                padding: '2%',
                backgroundColor: isSent ? colors.primary : colors.secondary,
                maxWidth: '150px',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                fontFamily: 'noto-sans-georgian-elegant',
                ...messageStyle
            }}>
                {messageContent}
            </div>
        </div>)
}