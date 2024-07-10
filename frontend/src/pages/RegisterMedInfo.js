import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import {BloodDropdownMenu} from "../components/BloodDropdownMenu";
import {LocationPick} from "../components/map/LocationPick";
import background from "../assets/background/background.png";
import {ClickableButton} from "../components/sign_system/ClickableButton";
import {register} from "../services/SignSystemService"

export const RegisterMedInfo = ({selectedFirstName, selectedLastName, selectedEmail,
                                selectedPassword, selectedPasswordConfirm, selectedDate,
                                    setCurrentUser}) => {
    const [medInfo, setInputInfo] = useState(true);
    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedLat, setSelectedLat] = useState(null);
    const [selectedLon, setSelectedLon] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleMedInfo = () => {
        setInputInfo(!medInfo)
    }
    const handleSelect = (eventKey, event) => {
        setSelectedBlood(event.target.innerText);
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
            backgroundImage: `url(${background})`
        }}>
            {
                showPopup && <div className={"register-popup-envelope"}>
                    <div className={"register-popup"}>
                        <div className="weak-close-button" onClick={onPopupClose}>X</div>
                        <LocationPick setSelectedLat={setSelectedLat} setSelectedLon={setSelectedLon}
                                      className={"register-location"} latitude={selectedLat} longitude={selectedLon}/>
                    </div>
                </div>
            }

            {
                !showPopup && <div style={{
                    backgroundImage: `url(${background})`,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className={"register-med-box"}>
                        <div className={"register-box-head"}>
                            <p style={{color: colors.primary_dark, marginBottom: '0px'}}>დონორობისთვის
                            საჭირო ინფორმაცია</p>
                        </div>

                        <div style={{height: '50px', marginTop: '5px', width: '100%'}}>
                            <label
                                style={{width: '100%', padding: '2%', display: 'flex', justifyContent: 'center'}}>
                                <input type={"checkbox"} onInput={handleMedInfo}
                                           style={{
                                               width: '20px',
                                               height: '25px',
                                               marginLeft: '2%',
                                               marginRight: '2%'
                                }}/>
                                <span>არ მსურს დონორობა</span>
                            </label>
                        </div>

                        <div style={{height: '50px', marginTop: '5px', width: '100%'}}>
                            <label className={"register-box-inner"}>
                                {medInfo && <div style={{width: '100%', height: '100%', alignItems: 'center',
                                justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                                    <BloodDropdownMenu selectedBlood={selectedBlood} handleSelect={handleSelect}
                                                           className={"med-dropdown-menu"}/>
                                    <ClickableButton buttonText={"აირჩიე ლოკაცია"} onClick={onPopupOpen}/>
                                </div>}
                                {!medInfo &&
                                    <span style={{margin: '0px 10px', textAlign: 'center', color: colors.blood}}>
                                        თქვენ არ დარეგისტირდებით დონორად, მომავალში ცვლილებისთვის შეგიძლიათ შეცვალოთ პროფილის გვერდზე</span>}
                                <ClickableButton buttonText={"დარეგისტრირდი"} onClick={(e) => {
                                    register(selectedFirstName, selectedLastName, selectedEmail, selectedPassword,
                                    selectedPasswordConfirm, selectedDate, selectedLat, selectedLon, selectedBlood,
                                    medInfo);
                                }}/>
                            </label>
                        </div>
                    </div>
                </div>
            }

        </div>


    </div>);
}