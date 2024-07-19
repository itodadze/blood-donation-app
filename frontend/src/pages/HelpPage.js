import React from "react";
import {HelpPageMenu} from "../components/help/HelpPageMenu";
import {HelpTopBar} from "../components/help/HelpTopBar";

export const Help = ({isSidebarOpen, toggleSidebar, currentUser}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            {isSidebarOpen && <HelpPageMenu currentUser={currentUser}/>}
            <div style={{flex: '1', display: 'flex', flexDirection: 'column', width: "100%"}}>
                <HelpTopBar toggleSidebar={toggleSidebar}/>
            </div>
        </div>
    )
}