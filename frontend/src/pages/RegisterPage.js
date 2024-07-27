import {useNavigate} from "react-router-dom";
import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import {CredentialField} from "../components/sign_system/CredentialField";
import {PasswordField} from "../components/sign_system/PasswordField";
import {DateChooser} from "../components/sign_system/DateChooser";
import {ClickableButton} from "../components/sign_system/ClickableButton";
import background from "../assets/background/background.png";
import colors from "../values/colors";

export const Register = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedFirstName, setSelectedFirstName] = useState(null);
    const [selectedLastName, setSelectedLastName] = useState(null);
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [selectedPasswordConfirm, setSelectedPasswordConfirm] = useState(null);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [errorTxt, setErrorTxt] = useState('');

    const navigate = useNavigate();
    const validator = require('validator');

    const stateVariables = [
        selectedDate,
        selectedFirstName,
        selectedLastName,
        selectedPassword,
        selectedPasswordConfirm,
        selectedEmail
    ];

    const handleContinue = () => {
        if (stateVariables.some(variable => !variable)) {
            setErrorTxt('გთხოვთ შეავსოთ ყველა ველი სწორად');
        } else {
            setErrorTxt('');

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
        }
    }

    const handleFirstNameChange = (e, setError) => {
        let error;
        if (!(e.target.value.trim())) {
            setSelectedFirstName(null);
            error = 'სახელის ველი არ უნდა იყოს ცარიელი';
        } else if (!/^[a-zA-Z\-'’]+$/.test(e.target.value)) {
            setSelectedFirstName(null);
            error = 'სახელის ველი შეიძლება შეიცავდეს მხოლოდ ლათინურ ასოებსა და \'-\'-ის სიმბოლოს'
        } else if (e.target.value.length > 50) {
            setSelectedLastName(null);
            error = 'სახელის ველი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს';
        } else {
            setSelectedFirstName(e.target.value);
            error = '';
        }
        setError(error);
        setErrorTxt(error);
    }

    const handleLastNameChange = (e, setError) => {
        let error;
        if (!(e.target.value.trim())) {
            setSelectedFirstName(null);
            error = 'გვარის ველი არ უნდა იყოს ცარიელი';
        } else if (!/^[a-zA-Z'’]+$/.test(e.target.value)) {
            setSelectedLastName(null);
            error = 'გვარის ველი შეიძლება შეიცავდეს მხოლოდ ლათინურ ასოებს';
        } else if (e.target.value.length > 50) {
            setSelectedLastName(null);
            error = 'გვარის ველი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს';
        } else {
            setSelectedLastName(e.target.value);
            error = '';
        }
        setError(error);
        setErrorTxt(error);

    }

    const handleEmailChange = (e, setError) => {
        let error;
        if (!(e.target.value.trim())) {
            setSelectedEmail(null);
            error = 'იმეილის ველი არ უნდა იყოს ცარიელი';
        } else if (!validator.isEmail(e.target.value)) {
            setSelectedEmail(null);
            error = 'იმეილის ფორმატი არასწორია';
        } else {
            setSelectedEmail(e.target.value);
            error = '';
        }
        setError(error);
        setErrorTxt(error);
    }

    const handleDateChange = (value, setError) => {
        let error;
        if (!validator.isDate(value, {format: 'DD/MM/YYYY'})) {
            setSelectedDate(null);
            error = 'თარიღი არ არის სწორად შეყვანილი';
        } else {
            setSelectedDate(value);
            error = '';
        }
        setError(error);
        setErrorTxt(error);
    }

    const handlePasswordChange = (e, setError) => {
        let error;
        if (!(e.target.value.trim())) {
            setSelectedPassword(null);
            error = 'პაროლის ველი არ უნდა იყოს ცარიელი';
        } else if (e.target.value.length > 50 || e.target.value.length < 8) {
            setSelectedPassword(null);
            error = 'პაროლი უნდა შეიცავდეს მინიმუმ 8 და მაქსიმუმ 50 სიმბოლოს';
        } else if (selectedPasswordConfirm && selectedPasswordConfirm !== e.target.value) {
            setSelectedPassword(null);
            error = 'პაროლები არ ემთხვევა ერთმანეთს';
        } else {
            setSelectedPassword(e.target.value);
            error = '';
        }
        setError(error);
        setErrorTxt(error);
    }

    const handlePasswordConfirmChange = (e, setError) => {
        let error;
        if (!(e.target.value.trim())) {
            setSelectedPasswordConfirm(null);
            error = 'პაროლის დადასტურების ველი არ უნდა იყოს ცარიელი';
        } else if (e.target.value !== selectedPassword) {
            setSelectedPasswordConfirm(null);
            error = 'პაროლები არ ემთხვევა ერთმანეთს';
        } else {
            setSelectedPasswordConfirm(e.target.value);
            error = '';
        }
        setError(error);
        setErrorTxt(error);
    }

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
                justifyContent: 'center',
                textAlign: 'center'
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
                                       handleFunc={handlePasswordChange}/>
                        <PasswordField fieldName={'დადასტურება'} placeholderText={'გაიმეორე პაროლი'}
                                       handleFunc={handlePasswordConfirmChange} disableField={!selectedPassword}/>
                    </div>
                    <DateChooser handleFunc={handleDateChange}/>
                    <ClickableButton buttonText={'განაგრძე'} onClick={(e) => {
                        handleContinue()
                    }}/>
                </div>
                <a href={'help'} style={{margin: '15px', color: colors.pearl, fontWeight: 'bolder'}}>
                    მეტი ინფორმაცია სისხლის დონაციაზე
                </a>
            </div>

        </div>
    </div>);
}