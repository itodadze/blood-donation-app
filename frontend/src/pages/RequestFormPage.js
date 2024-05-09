import {Helmet} from "react-helmet";
import {RequestFormPageMenu} from "../components/request/RequestFormPageMenu";
import {RequestFormPageTopBar} from "../components/request/RequestFormPageTopBar";
import {RequestFormInput} from "../components/request/RequestFormInput";
import React from "react";

export const RequestForm = ({isSidebarOpen, toggleSidebar}) => {
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
            {isSidebarOpen && <RequestFormPageMenu/>}
            <div style={{flex: '1', display: 'flex', flexDirection: 'column', width: "100%"}}>
                <RequestFormPageTopBar toggleSidebar={toggleSidebar}/>
                <RequestFormInput />
            </div>
        </div>
    );
}