import React from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import {CredentialField} from "../components/sign_system/CredentialField";
import {PasswordField} from "../components/sign_system/PasswordField";
import {SignButton} from "../components/sign_system/SignButton";

export const Login = () => {

    return (<div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
        <Helmet>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                rel="stylesheet"/>
        </Helmet>
        <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
            <div style={{
                backgroundColor: colors.pearl, display: 'flex', flexDirection: 'row', height: '10vh'
            }}>

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
                    <SignButton buttonText={'Log In'}/>

                </div>
            </div>
        </div>

    </div>);
}