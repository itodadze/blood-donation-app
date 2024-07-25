import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import {CredentialField} from "../components/sign_system/CredentialField";
import {PasswordField} from "../components/sign_system/PasswordField";
import {ClickableButton} from "../components/sign_system/ClickableButton";
import chaos_background from "../assets/background/chaos_background.png";
import {login, register} from "../services/SignSystemService";
import {useNavigate} from "react-router-dom";

export const Login = ({setCurrentUser}) => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [errorTxt, setErrorTxt] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setSelectedEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setSelectedPassword(e.target.value);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login(selectedEmail, selectedPassword)
            setCurrentUser(user);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

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
                <div id={'login-error-box'}
                     className="login-error-box"
                     style={{
                         '--background-color': errorTxt ? colors.dark_pearl : 'transparent',
                         '--border-color': errorTxt ? colors.primary : 'transparent'
                     }}>
                    <span style={{textAlign: 'center', color: colors.blood, fontWeight: 'bold'}}>
                        {errorTxt}
                    </span>
                </div>

                <div className={"login-box"}>
                    <CredentialField fieldName={'იმეილი'} handleFunc={handleEmailChange}/>
                    <PasswordField handleFunc={handlePasswordChange}/>
                    <ClickableButton buttonText={'ავტორიზაცია'} onClick={(e) => {
                        handleLogin(e);
                    }}/>
                </div>
                <a href={'register'} style={{margin: '15px', color: colors.pearl, fontWeight: 'bolder'}}>
                    დარეგისტრირდი
                </a>
                <a href={'help'} style={{margin: '15px', color: colors.pearl, fontWeight: 'bolder'}}>
                    მეტი ინფორმაცია სისხლის დონაციაზე
                </a>
            </div>
        </div>

    </div>);
}