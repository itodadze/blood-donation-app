import React, {useEffect, useState} from "react";
import background from "../assets/background/background.png";
import {HelpPageMenu} from "../components/help/HelpPageMenu";
import {HelpTopBar} from "../components/help/HelpTopBar";
import {HelpInformation} from "../components/help/HelpInformation";
import {useNavigate} from "react-router-dom";
import {getCurrentUserId} from "../services/CurrentUserService";

export const Help = ({isSidebarOpen, toggleSidebar}) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentUserId()
            .then((data) => {
                setCurrentUser(data);
            }).catch(() => {
            setCurrentUser(null);
        })
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', maxHeight: '100vh' }}>
            {(isSidebarOpen && currentUser) && <HelpPageMenu/>}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', width: "100%", maxHeight: '100%' }}>
                {currentUser && <HelpTopBar toggleSidebar={toggleSidebar} />}
                <div style={{
                    backgroundImage: `url(${background})`, width: "100%", height: currentUser ? "90%": "100%",
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