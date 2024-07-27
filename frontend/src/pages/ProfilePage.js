import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import {ProfilePageMenu} from "../components/profile/ProfilePageMenu";
import {RequestFormPageTopBar} from "../components/request/RequestFormPageTopBar";
import {ProfileInfo} from "../components/profile/ProfileInfo";
import {getCurrentUserId} from "../services/CurrentUserService";

export const Profile = ({isSidebarOpen, toggleSidebar}) => {
    let {user_id} = useParams()
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


    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                    rel="stylesheet"/>
                <script src='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js'></script>
                <link href='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css' rel='stylesheet'/>
            </Helmet>
            {isSidebarOpen && <ProfilePageMenu userId={user_id}/>}
            <div style={{
                flex: '1', display: 'flex', flexDirection: 'column', width: "100%",
                maxWidth: '100%', maxHeight: '100%', overflow: 'hidden'
            }}>
                <RequestFormPageTopBar toggleSidebar={toggleSidebar}/>
                <ProfileInfo userId={user_id}/>
            </div>
        </div>
    )
}