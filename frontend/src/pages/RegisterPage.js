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
    const [errorTxt, setErrorTxt] = useState('');

    const navigate = useNavigate();
    const validator = require('validator');

    const handleFirstNameChange = (e) => {
        if (!(e.target.value.trim())) {
            setSelectedFirstName(null);
            setErrorTxt('სახელის ველი არ უნდა იყოს ცარიელი');
        } else if (!/^[a-zA-Z\-'’]+$/.test(e.target.value)) {
            setSelectedFirstName(null);
            setErrorTxt('სახელის ველი შეიძლება შეიცავდეს მხოლოდ ლათინურ ასოებსა და \'-\'-ის სიმბოლოს');
        } else if (e.target.value.length > 50) {
            setSelectedLastName(null);
            setErrorTxt('სახელის ველი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს');
        } else {
            setSelectedFirstName(e.target.value);
            setErrorTxt('');
        }
    }

    const handleLastNameChange = (e) => {
        if (!(e.target.value.trim())) {
            setSelectedFirstName(null);
            setErrorTxt('გვარის ველი არ უნდა იყოს ცარიელი');
        } else if (!/^[a-zA-Z'’]+$/.test(e.target.value)) {
            setSelectedLastName(null);
            setErrorTxt('გვარის ველი შეიძლება შეიცავდეს მხოლოდ ლათინურ ასოებს');
        } else if (e.target.value.length > 50) {
            setSelectedLastName(null);
            setErrorTxt('გვარის ველი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს');
        } else {
            setSelectedLastName(e.target.value);
            setErrorTxt('');
        }

    }

    const handleEmailChange = (e) => {
        if (!(e.target.value.trim())) {
            setSelectedEmail(null);
            setErrorTxt('იმეილის ველი არ უნდა იყოს ცარიელი');
        } else if (!validator.isEmail(e.target.value)) {
            setSelectedEmail(null);
            setErrorTxt('იმეილის ფორმატი არასწორია');
        } else {
            setSelectedEmail(e.target.value);
            setErrorTxt('');
        }
    }

    const handleDateChange = (value) => {
        if(!validator.isDate(value, {format: 'DD/MM/YYYY'})) {
            setSelectedDate(null);
            setErrorTxt('თარიღი არ არის სწორად შეყვანილი');
        } else {
            setSelectedDate(value);
            setErrorTxt('');
        }
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
                <div id={'register-error-box'}
                     className="register-error-box"
                     style={{
                         '--background-color': errorTxt ? colors.dark_pearl : 'transparent',
                         '--border-color': errorTxt ? colors.primary : 'transparent'
                     }}>
                    <span style={{textAlign: 'center', color: colors.blood, fontWeight: 'bold'}}>
                        {errorTxt}
                    </span>
                </div>
                <div className='register-box'>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', marginTop: '2%'}}>
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
                    <DateChooser handleFunc={handleDateChange}/>
                    <ClickableButton buttonText={'განაგრძე'} onClick={(e) => {
                        console.log(selectedDate)

                        navigate("/registerMed", {
                            state: {
                                selectedFirstName: selectedFirstName,
                                selectedLastName: selectedLastName,
                                selectedEmail: selectedEmail,
                                selectedPassword: selectedPassword,
                                selectedPasswordConfirm: selectedPasswordConfirm,
                                selectedDate: selectedDate
                            }
                        })
                    }}/>
                </div>
            </div>

        </div>
    </div>);
}