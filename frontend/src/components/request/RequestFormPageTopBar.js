import colors from "../../values/colors";
import menu from "../../assets/icons/menu.svg";
import React from "react";

export const RequestFormPageTopBar = ({toggleSidebar}) => {
    return (
        <div style={{flex: '0 0 80px', backgroundColor: colors.dark_pearl}}>
            <div style={{display: 'flex', flexDirection: 'row', height: '80px'}}>
                <div style={{alignItems: "center", display: "flex"}}>
                    <img src={menu} alt="menu icon" width="60vh" height="52vh"
                         onClick={toggleSidebar}/>
                </div>
            </div>
        </div>
    );
}