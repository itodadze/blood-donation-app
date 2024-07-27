import React from "react";
import background from "../assets/background/background.png";
import {HelpPageMenu} from "../components/help/HelpPageMenu";
import {HelpTopBar} from "../components/help/HelpTopBar";
import {HelpInformation} from "../components/help/HelpInformation";

export const Help = ({isSidebarOpen, toggleSidebar}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', maxHeight: '100vh' }}>
            {isSidebarOpen && <HelpPageMenu/>}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', width: "100%", maxHeight: '100%' }}>
                <HelpTopBar toggleSidebar={toggleSidebar} />
                <div style={{
                    backgroundImage: `url(${background})`, width: "100%", height: "90%",
                    display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxHeight: '100%'
                }}>
                    <div style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <HelpInformation />
                    </div>
                </div>
            </div>
        </div>
    );
}