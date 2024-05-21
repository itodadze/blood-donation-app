import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import menu from "../assets/icons/menu.svg";
import {SideMenu} from "../components/SideMenu";
import {CredentialField} from "../components/sign_system/CredentialField";
import {PasswordField} from "../components/sign_system/PasswordField";

export const Login = ({isSidebarOpen, toggleSidebar}) => {

    return (<div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
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

                <div style={{
                    backgroundColor: colors.dark_pearl,
                    display: 'flex',
                    flexDirection: 'row',
                    height: '90vh',
                    maxHeight: '90vh',
                    maxWidth: '100vw',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        backgroundColor: colors.pearl,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '300px',
                        height: '300px',
                        borderStyle: 'solid',
                        borderColor: colors.secondary,
                        padding: '10px'
                    }}>
                        <CredentialField fieldName={'Email'}/>
                        <PasswordField/>

                        <button style={{
                            borderColor: colors.primary_dark,
                            borderRadius: '15px',
                            flex: 0.3,
                            alignSelf: 'center',
                            backgroundColor: colors.primary,
                            color: colors.dark_pearl
                        }}
                        >
                            Log In
                        </button>

                    </div>
                </div>
            </div>

    </div>);
}