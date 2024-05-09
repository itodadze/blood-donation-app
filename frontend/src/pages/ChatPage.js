import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import menu from "../assets/icons/menu.svg";
import {ChosenChat} from "../components/ChosenChat";
import {ConversationList} from "../components/ChatConversationList";
import {ChatPageMenu} from "../components/ChatPageMenu";

export const Chat = ({isSidebarOpen, toggleSidebar}) => {
    const [chosenRecipient, setRecipient] = useState(null);

    const chooseRecipient = (recipient) => {
        setRecipient(recipient);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                    rel="stylesheet"/>
            </Helmet>
            {isSidebarOpen && <ChatPageMenu/>}
            <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <div style={{backgroundColor: colors.tertiary, display: 'flex', flexDirection: 'row', height: '10vh'}}>
                    <div style={{alignItems: "center", display: "flex"}}>
                        <img src={menu} alt="menu icon" width="60vh" height="52vh"
                             onClick={toggleSidebar}/>
                    </div>
                </div>

                <div style={{margin: '2vh', border: colors.tertiary, borderStyle:'dotted',  display: 'flex', flexDirection: 'row', flex: '1', backgroundColor: colors.pearl, maxHeight: '86vh'}}>
                    <ChosenChat chosenRecipient={chosenRecipient} />
                    <ConversationList chosenRecipient={chosenRecipient} chooseRecipient={chooseRecipient} />
                </div>

            </div>

        </div>
    );
}