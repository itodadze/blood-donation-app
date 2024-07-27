import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {RequestFormPageTopBar} from "../components/request/RequestFormPageTopBar";
import {RequestInfo} from "../components/request/RequestInfo";
import {Helmet} from "react-helmet";
import {getCurrentUserId} from "../services/CurrentUserService";
import {SideMenu} from "../components/SideMenu";

export const Request = ({isSidebarOpen, toggleSidebar}) => {
    let { request_id } = useParams();

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
            {isSidebarOpen && <SideMenu/>}
            <div style={{flex: '1', display: 'flex', flexDirection: 'column', width: "100%"}}>
                <RequestFormPageTopBar toggleSidebar={toggleSidebar}/>
                <RequestInfo request_id={request_id}/>
            </div>
        </div>
    )
}