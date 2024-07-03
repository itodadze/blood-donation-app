import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import {CredentialField} from "../components/sign_system/CredentialField";
import {PasswordField} from "../components/sign_system/PasswordField";
import {DateChooser} from "../components/sign_system/DateChooser";
import {ClickableButton} from "../components/sign_system/ClickableButton";
import background from "../assets/background/background.png";

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
                backgroundImage: `url(${background})`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: '100%',
                maxWidth: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className={"register-box"}>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', marginTop:'2%'}}>
                        <CredentialField fieldName={'სახელი'}/>
                        <CredentialField fieldName={'გვარი'}/>
                    </div>
                    <CredentialField fieldName={'იმეილი'}/>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', marginTop: '2%'}}>
                        <PasswordField fieldName={'პაროლი'} placeholderText={'შეიყვანე პაროლი'}/>
                        <PasswordField fieldName={'გაიმეორე პაროლი'} placeholderText={'გაიმეორე პაროლი'}/>
                    </div>

                    <DateChooser/>
                        <ClickableButton buttonText={'განაგრძე'} onClick={(e) => {}}/>

                </div>
            </div>

        </div>


    </div>);
}