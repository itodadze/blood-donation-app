import {useNavigate} from "react-router-dom";
import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import {CredentialField} from "../components/sign_system/CredentialField";
import {PasswordField} from "../components/sign_system/PasswordField";
import {DateChooser} from "../components/sign_system/DateChooser";
import {ClickableButton} from "../components/sign_system/ClickableButton";
import chaos_background from "../assets/background/chaos_background.png";
import colors from "../values/colors";

export const Register = ({setCurrentUser}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedFirstName, setSelectedFirstName] = useState(null);
    const [selectedLastName, setSelectedLastName] = useState(null);
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [selectedPasswordConfirm, setSelectedPasswordConfirm] = useState(null);
    const [selectedEmail, setSelectedEmail] = useState(null);

    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        if (e.target.value === null || e.target.value === "")
        {
            setSelectedFirstName(null)
        }

    }

    const handleLastNameChange = (e) => {
        setSelectedLastName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setSelectedEmail(e.target.value)
    }

    return (<div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
        <Helmet>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                rel="stylesheet"/>
        </Helmet>
        <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>

            <div style={{
                backgroundImage: `url(${chaos_background})`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: '100%',
                maxWidth: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/*<div style={{display: 'flex', flex: 0.2, height: '5%', width: '80%', maxWidth: '500px', marginBottom: '2%', flexDirection: 'row', backgroundColor: colors.blood}}>*/}

                {/*</div>*/}
                <div className='register-box'>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', marginTop:'2%'}}>
                        <CredentialField fieldName={'სახელი'} handleFunc={handleFirstNameChange}/>
                        <CredentialField fieldName={'გვარი'} handleFunc={handleLastNameChange}/>
                    </div>
                    <CredentialField fieldName={'იმეილი'} handleFunc={handleEmailChange}/>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', marginTop: '2%'}}>
                        <PasswordField fieldName={'პაროლი'} placeholderText={'შეიყვანე პაროლი'}
                        setValue={setSelectedPassword}/>
                        <PasswordField fieldName={'გაიმეორე პაროლი'} placeholderText={'გაიმეორე პაროლი'}
                        setValue={setSelectedPasswordConfirm}/>
                    </div>
                    <DateChooser setValue={setSelectedDate}/>
                        <ClickableButton buttonText={'განაგრძე'} onClick={(e) => {
                            console.log(selectedDate)

                            navigate("/registerMed", { state: {
                                selectedFirstName: selectedFirstName,
                                selectedLastName: selectedLastName,
                                selectedEmail: selectedEmail,
                                selectedPassword: selectedPassword,
                                selectedPasswordConfirm: selectedPasswordConfirm,
                                selectedDate: selectedDate
                            }})
                        }}/>
                </div>
            </div>

        </div>
    </div>);
}