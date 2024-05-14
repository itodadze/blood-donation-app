import {useParams} from "react-router-dom";
import {RequestFormPageMenu} from "../components/request/RequestFormPageMenu";
import React from "react";

export const Request = ({isSidebarOpen, toggleSidebar}) => {
    const { request_id } = useParams();

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            {isSidebarOpen && <RequestFormPageMenu/>}
        </div>
    )
}