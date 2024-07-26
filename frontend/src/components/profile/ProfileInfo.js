import React, {useEffect, useState} from "react";

import {getUser} from "../../services/UserService";
import background from "../../assets/background/background.png";
import colors from "../../values/colors";
import {getIcons} from "../../services/UserIconsService";

export const ProfileInfo = ({currentUser, userId}) => {
    const [selectedIconId, setSelectedIconId] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState('icon_0');
    const [selectedFirstName, setSelectedFirstName] = useState('');
    const [selectedLastName, setSelectedLastName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [description, setDescription] = useState('')
    const [blood, setBlood] = useState('')
    const [selectedLocLatitude, setSelectedLocLatitude] = useState(0.0);
    const [selectedLocLongitude, setSelectedLocLongitude] = useState(0.0);
    const [isDonor, setIsDonor] = useState(false);
    const [popupMessage, setPopupMessage] = useState('იძებნება');
    const [showIconOptions, setShowIconOptions] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const [icons, setIcons] = useState([]);

    const handleSuccess = (data) => {
        setSelectedEmail(data.email)
        setSelectedFirstName(data.first_name)
        setSelectedLastName(data.last_name)
        setSelectedLocLatitude(data.loc_latitude)
        setSelectedLocLongitude(data.loc_longitude)
        if (data.blood_type) {
            if (data.blood_type.rhesus_factor) {
                setBlood(data.blood_type.blood_type + "+")
            } else {
                setBlood(data.blood_type.blood_type + "-")
            }
        }
        setIsDonor(data.donor_status)
        setDescription(data.description)
        if (data.icon) {
            setSelectedIconId(data.icon.id)
            setSelectedIcon(data.icon.file_address)
        }
        setShowPopup(false);
    }

    const handleIcons = (data) => {
        setIcons(data)
    }

    const handleFailure = (userId) => {
        setPopupMessage(`მომხმარებელი ${userId} ვერ იქნა ნაპოვნი, გთხოვთ ხელახლა სცადოთ.`)
        setShowPopup(true);
    }

    useEffect(() => {
        getIcons()
            .then((data) => handleIcons(data))
        getUser({userId: userId})
            .then((data) => handleSuccess(data))
            .catch(() => handleFailure(userId))
    });

    return (
        <div style={{
            flex: '1', position: 'relative', width: "100%", backgroundImage: `url(${background})`,
            backgroundSize: 'cover', display: "flex", justifyContent: "center", flexDirection: "column",
            alignItems: 'center'
        }}>
            {showPopup && <div className={"request-popup"}>
                <text className={"request-item-desc"}>{popupMessage}</text>
            </div>}
            {!showPopup && showIconOptions && <div style={{
                height: "78%", width: "84%", position: 'relative', backgroundColor:
                colors.light_gray, display: "flex", flexDirection: "row", flexWrap: 'wrap',
                maxHeight: "78%", alignItems: 'center', padding: '2vh', borderColor: colors.tertiary,
                borderWidth: '1vh', borderStyle: 'solid', overflowY: 'auto'
            }}>
                {
                    icons.map((icon) => {
                        return <div className={icon.file_address} style={{
                            width: "21vh", height: "21vh", borderRadius: "50%",
                            borderWidth: "2px", borderColor: colors.pearl, borderStyle: "solid", margin: "2vh"
                        }} onClick={
                            () => {
                                setSelectedIconId(icon.id)
                                setSelectedIcon(icon.file_address)
                                setShowIconOptions(false)
                            }
                        }>
                        </div>
                    })
                }
            </div>}
            {!showPopup && !showIconOptions && <div style={{
                height: "90%", width: "92%", position: 'relative', backgroundColor:
                colors.pearl, display: "flex", justifyContent: "center", flexDirection: "column"
            }}>
                <div className={selectedIcon} style={{
                    width: "15vh", height: "15vh", borderRadius: "50%",
                    borderWidth: "2px", borderColor: colors.black, borderStyle: "solid", margin: "5vh"
                }} onClick={
                    () => setShowIconOptions(true)
                }/>
            </div>}
        </div>
    )
}