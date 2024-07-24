import React, {useEffect, useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import {BloodDropdownMenu} from "../components/BloodDropdownMenu";
import {LocationPick} from "../components/map/LocationPick";
import {ClickableButton} from "../components/sign_system/ClickableButton";
import {register} from "../services/SignSystemService"
import {useLocation, useNavigate} from "react-router-dom";
import chaos_background from "../assets/background/chaos_background.png";

export const RegisterMedInfo = ({setCurrentUser}) => {

    const location = useLocation();
    const {
        selectedFirstName, selectedLastName, selectedEmail, selectedPassword, selectedPasswordConfirm, selectedDate
    } = location.state || {};

    const [medInfo, setInputInfo] = useState(true);
    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedLat, setSelectedLat] = useState(null);
    const [selectedLon, setSelectedLon] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [errorTxt, setErrorTxt] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedFirstName || !selectedLastName || !selectedEmail ||
            !selectedPassword || !selectedPasswordConfirm || !selectedDate) {
            navigate('/register');
        }
    }, [selectedFirstName, selectedLastName, selectedEmail,
              selectedPassword, selectedPasswordConfirm, selectedDate]);


    const handleMedInfo = () => {
        if (errorTxt) {
            setErrorTxt('');
        }
        setInputInfo(!medInfo)
    }
    const handleSelect = (eventKey, event) => {
        if (errorTxt) {
            setErrorTxt('');
        }
        setSelectedBlood(eventKey.id);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (medInfo && !selectedBlood) {
            setErrorTxt('თუ დონორად რეგისტრირდებით, გთხოვთ აირჩიოთ სისხლის ტიპი');
        } else {
            try {
                const user = await register(selectedFirstName, selectedLastName, selectedEmail, selectedPassword, selectedPasswordConfirm, selectedDate, selectedLat, selectedLon, selectedBlood, medInfo)
                setCurrentUser(user);
                navigate('/');
            } catch (error) {
                if (error.response.data.email[0].includes('exists')) {
                    setErrorTxt('მომხმარებელი ასეთი იმეილით უკვე არსებობს')
                } else if (error.response.data.password) {
                    setErrorTxt('შეყვანილი პაროლი არ აკმაყოფილებს მოთხოვნებს');
                } else {
                    setErrorTxt('დაფიქსირდა შეცდომა, ვერ ხერხდება რეგისტრაცია');
                }
            }
        }

    };
    const onPopupClose = () => {
        setShowPopup(false)
    }

    const onPopupOpen = () => {
        setShowPopup(true)
    }

    return (<div style={{display: 'flex', flexDirection: 'row', height: '100vh', position: 'relative'}}>
        <Helmet>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                rel="stylesheet"/>
            <script src='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js'></script>
            <link href='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css' rel='stylesheet'/>
        </Helmet>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            justifyContent: 'center',
            position: 'relative',
            backgroundImage: `url(${chaos_background})`
        }}>
            {showPopup && <div className={"register-popup-envelope"}>
                <div className={"register-popup"}>
                    <div className="weak-close-button" onClick={onPopupClose}>X</div>
                    <LocationPick setSelectedLat={setSelectedLat} setSelectedLon={setSelectedLon}
                                  className={"register-location"} latitude={selectedLat} longitude={selectedLon}/>
                </div>
            </div>}

            {!showPopup && <div style={{
                backgroundImage: `url(${chaos_background})`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: '100%',
                maxWidth: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div id={'register-med-error-box'}
                     className="register-med-error-box"
                     style={{
                         '--background-color': errorTxt ? colors.dark_pearl : 'transparent',
                         '--border-color': errorTxt ? colors.primary : 'transparent'
                     }}>
                    <span style={{textAlign: 'center', color: colors.blood, fontWeight: 'bold'}}>
                        {errorTxt}
                    </span>
                </div>

                <div className={"register-med-box"}>
                    <div className={"register-box-head"}>
                        <p style={{color: colors.primary_dark, marginBottom: '0px'}}>
                            დონორობისთვის საჭირო ინფორმაცია
                        </p>
                    </div>

                    <div style={{height: '50px', marginTop: '5px', width: '100%'}}>
                        <label
                            style={{width: '100%', padding: '2%', display: 'flex', justifyContent: 'center'}}>
                            <input type={"checkbox"} onInput={handleMedInfo}
                                   style={{
                                       width: '20px', height: '25px', marginLeft: '2%', marginRight: '2%'
                                   }}/>
                            <span>არ მსურს დონორობა</span>
                        </label>
                    </div>

                    <div style={{height: '50px', marginTop: '5px', width: '100%'}}>
                        <label className={"register-box-inner"}>
                            {medInfo && <div style={{
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <BloodDropdownMenu handleSelect={handleSelect}
                                                   className={"med-dropdown-menu"}/>
                                <ClickableButton buttonText={"აირჩიე ლოკაცია"} onClick={onPopupOpen}/>
                            </div>}
                            {!medInfo && <span style={{margin: '0px 10px', textAlign: 'center', color: colors.blood}}>
                                        თქვენ არ დარეგისტირდებით დონორად, მომავალში ცვლილებისთვის შეგიძლიათ შეცვალოთ პროფილის გვერდზე</span>}
                            <ClickableButton buttonText={"დარეგისტრირდი"} onClick={(e) => {
                                handleRegister(e)
                            }}/>
                        </label>
                    </div>
                </div>
            </div>}

        </div>


    </div>);
}