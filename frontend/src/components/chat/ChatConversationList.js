import colors from "../../values/colors";
import React, {useEffect, useState} from "react";
import {getConversationList} from "../../services/ChatConversationListService";
import ReactLoading from "react-loading";
import "../../styles/chat_page.css"
import "../../assets/user_icons/icons.css"
import {useNavigate} from "react-router-dom";
import {getCurrentUserId} from "../../services/CurrentUserService";


export const ConversationList = ({chosenRecipient, chooseRecipient}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [conversations, fillConversations] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUserId()
            .then((data) => {
                getConversations(data)
            }).catch(() => {
        })
    }, []);

    const getConversations = (currentUser) => {
        setLoading(true);
        getConversationList(currentUser).then(data => {
            fillConversations(data);
        }).catch(error => {
            console.error('Error fetching conversation list:', error);
        }).finally(() => {
            setLoading(false);
        });
    }

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
            <div className={conversation.icon_file_address? conversation.icon_file_address : "icon_0"}
                 style={{width: "7.5vh", height: "7.5vh", borderRadius: "50%",
            borderWidth: "1px", borderColor: colors.black, borderStyle: "solid", marginRight: "1vh"}}
            onClick={
                () => {navigate("/profile/" + conversation.id)}
            }/>
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