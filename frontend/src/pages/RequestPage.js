import {useParams} from "react-router-dom";
import {RequestFormPageMenu} from "../components/request/RequestFormPageMenu";
import React from "react";
import {RequestFormPageTopBar} from "../components/request/RequestFormPageTopBar";
import {RequestInfo} from "../components/request/RequestInfo";

export const Request = ({isSidebarOpen, toggleSidebar}) => {
    let { request_id } = useParams();

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            {isSidebarOpen && <RequestFormPageMenu/>}
            <div style={{flex: '1', display: 'flex', flexDirection: 'column', width: "100%"}}>
                <RequestFormPageTopBar toggleSidebar={toggleSidebar}/>
                <RequestInfo request_id={request_id}/>
            </div>
        </div>
    )
}