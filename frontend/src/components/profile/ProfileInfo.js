import {useEffect, useState} from "react";

import {getUser} from "../../services/UserService";
import background from "../../assets/background/background.png";
import colors from "../../values/colors";

export const ProfileInfo = ({currentUser, userId}) => {
    const [selectedIcon, setSelectedIcon] = useState('');
    const [selectedFirstName, setSelectedFirstName] = useState('');
    const [selectedLastName, setSelectedLastName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [description, setDescription] = useState('')
    const [blood, setBlood] = useState('')
    const [selectedLocLatitude, setSelectedLocLatitude] = useState(0.0);
    const [selectedLocLongitude, setSelectedLocLongitude] = useState(0.0);
    const [isDonor, setIsDonor] = useState(false);
    const [popupMessage, setPopupMessage] = useState('იძებნება');
    const [showPopup, setShowPopup] = useState(true);

    const handleSuccess = (data) => {
        setSelectedEmail(data.email)
        setSelectedFirstName(data.first_name)
        setSelectedLastName(data.last_name)
        setSelectedLocLatitude(data.loc_latitude)
        setSelectedLocLongitude(data.loc_longitude)
        if (data.blood_type.rhesus_factor) {
            setBlood(data.blood_type.blood_type + "+");
        } else {
            setBlood(data.blood_type.blood_type + "-")
        }
        setIsDonor(data.donor_status)
        setDescription(data.description)
        setSelectedIcon(data.icon)
        setShowPopup(false);
    }

    const handleFailure = (userId) => {
        setPopupMessage(`მომხმარებელი ${userId} ვერ იქნა ნაპოვნი, გთხოვთ ხელახლა სცადოთ.`)
        setShowPopup(true);
    }

    useEffect(() => {
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
            {!showPopup && <div style={{
                height: "90%", width: "92%", position: 'relative', backgroundColor:
                colors.pearl, display: "flex", justifyContent: "center", flexDirection: "column"
            }}>
                <text>{blood}</text>
            </div>}
        </div>
    )
}