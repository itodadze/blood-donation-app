import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import {CredentialField} from "../components/sign_system/CredentialField";
import {PasswordField} from "../components/sign_system/PasswordField";
import {DateChooser} from "../components/sign_system/DateChooser";
import {RegisterButton} from "../components/sign_system/RegisterButton";

export const Register = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (<div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
        <Helmet>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                rel="stylesheet"/>
        </Helmet>
        <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
            <div style={{
                backgroundColor: colors.pearl, display: 'flex', flexDirection: 'row', height: '10%'
            }}>

            </div>

            <div style={{
                backgroundColor: colors.dark_pearl,
                display: 'flex',
                flexDirection: 'column',
                height: '90%',
                maxHeight: '90%',
                maxWidth: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    backgroundColor: colors.pearl,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '80%',
                    maxWidth: '500px',
                    height: '80%',
                    maxHeight: '500px',
                    borderStyle: 'solid',
                    borderColor: colors.secondary
                }}>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', marginTop:'2%'}}>
                        <CredentialField fieldName={'First Name'}/>
                        <CredentialField fieldName={'Last Name'}/>
                    </div>
                    <CredentialField fieldName={'Email'}/>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', marginTop: '2%'}}>
                        <PasswordField/>
                        <PasswordField fieldName={'Confirm Password'} placeholderText={'Confirm Your Password'}/>
                    </div>

                    <DateChooser/>
                        <RegisterButton buttonText={'Continue'}/>

                </div>
                {/*<a href={'register'} style={{margin: '10px', color: colors.blood}}>*/}
                {/*    Create New Account*/}
                {/*</a>*/}
            </div>

        </div>


    </div>);
}