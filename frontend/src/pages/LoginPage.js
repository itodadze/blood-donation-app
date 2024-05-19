import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import menu from "../assets/icons/menu.svg";
import {SideMenu} from "../components/SideMenu";
import {CredentialField} from "../components/sign_system/CredentialField";

export const Login = ({isSidebarOpen, toggleSidebar}) => {

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                    rel="stylesheet"/>
            </Helmet>
            {isSidebarOpen && <SideMenu/>}
            <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <div style={{backgroundColor: colors.pearl, display: 'flex', flexDirection: 'row', height: '10vh'}}>
                    <div style={{alignItems: "center", display: "flex"}}>
                        <img src={menu} alt="menu icon" width="60vh" height="52vh"
                             onClick={toggleSidebar}/>
                    </div>
                </div>

                <div style={{backgroundColor: colors.dark_pearl, display: 'flex', flexDirection:'row', height: '90vh',
                             alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{backgroundColor: colors.pearl, display: 'flex',
                                 flexDirection: 'column', justifyContent: 'center',
                                 width: '50%', height: '70%', borderStyle: 'solid',
                                 borderColor: colors.secondary, padding: '10px'}}>
                        <CredentialField fieldName={'name'}/>
                        <CredentialField fieldName={'surname'}/>
                    </div>
                </div>
            </div>

        </div>
    );
}