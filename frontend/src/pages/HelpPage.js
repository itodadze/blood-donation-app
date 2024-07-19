import React from "react";
import chaos_background from "../assets/background/chaos_background.png";
import {HelpPageMenu} from "../components/help/HelpPageMenu";
import {HelpTopBar} from "../components/help/HelpTopBar";
import {HelpInformation} from "../components/help/HelpInformation";

export const Help = ({isSidebarOpen, toggleSidebar, currentUser}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            {isSidebarOpen && <HelpPageMenu currentUser={currentUser}/>}
            <div style={{flex: '1', display: 'flex', flexDirection: 'column', width: "100%"}}>
                <HelpTopBar toggleSidebar={toggleSidebar}/>
                <div style={{backgroundImage: `url(${chaos_background})`, width: "100%", height: "100%",
                alignItems: "center", justifyContent: "center", display: 'flex', flexDirection: 'column'}}>
                    <HelpInformation/>
                </div>
            </div>
        </div>
    )
}