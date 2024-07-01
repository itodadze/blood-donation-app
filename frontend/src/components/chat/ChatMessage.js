import colors from "../../values/colors";
import React from "react";

export const ChatMessage = ({messageContent, isSent}) => {
    const containerClass = isSent ? 'chat-message-sent' : 'chat-message-received';

    return (<div className={`chat-message-container ${containerClass}`}>
        <div className="chat-message"
             style={{
                 '--border-color': isSent ? colors.primary : colors.secondary,
                 '--background-color': isSent ? colors.primary : colors.secondary,
                 'message-font': 'noto-sans-georgian-elegant'
             }}>
            {messageContent}
        </div>
    </div>)
}