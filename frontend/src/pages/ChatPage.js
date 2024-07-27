import React, {useEffect, useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import menu from "../assets/icons/menu.svg";
import {ChosenChat} from "../components/chat/ChosenChat";
import {ConversationList} from "../components/chat/ChatConversationList";
import {SideMenu} from "../components/SideMenu";
import strings from "../values/strings";
import {useNavigate} from "react-router-dom";
import {getCurrentUserId} from "../services/CurrentUserService";

export const Chat = ({isSidebarOpen, toggleSidebar}) => {
    const [chosenRecipient, setRecipient] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUserId()
            .then((data) => {
                if(!data) {
                    navigate('/login');
                }
            }).catch(() => {
            navigate('/login');
        })
    }, []);

    const chooseRecipient = (recipient) => {
        setRecipient(recipient);
    };


    return (<div className="chat-page-menu-container">
        <Helmet>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                rel="stylesheet"/>
        </Helmet>
        {isSidebarOpen && <SideMenu current={strings.CHATS}/>}
        <div className="chat-page-container">
            <div className="chat-navigation-bar"
                 style={{'--background-color': colors.tertiary}}>
                <div className="chat-menu-container">
                    <img src={menu} alt="menu icon" width="60vh" height="52vh"
                         onClick={toggleSidebar}/>
                </div>
            </div>

            <div className="full-chat-container"
                 style={{
                     '--border-color': colors.tertiary, '--background-color': colors.pearl
                 }}>
                <ChosenChat chosenRecipient={chosenRecipient}/>
                <ConversationList chosenRecipient={chosenRecipient} chooseRecipient={chooseRecipient}/>
            </div>

        </div>

    </div>);
}