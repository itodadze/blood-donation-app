import React, {useEffect, useState} from "react";

import {getUser, updateUser} from "../../services/UserService";
import background from "../../assets/background/background.png";
import colors from "../../values/colors";
import {getIcons} from "../../services/UserIconsService";
import {ProfileEditableField, ProfileField} from "./ProfileField";
import {LocationPick} from "../map/LocationPick";
import {Location} from "../map/Location"
import {
    deleteMedicalDocument,
    getMedicalDocument,
    getMedicalDocuments,
    saveFile
} from "../../services/MedicalDocumentsService";
import glass from "../../assets/donation_icons/glass.png"
import jar from "../../assets/donation_icons/jar.png"
import bucket from "../../assets/donation_icons/bucket.png"
import ship from "../../assets/donation_icons/ship.png"
import blackhole from "../../assets/donation_icons/blackhole.png"
import file_icon from "../../assets/icons/file.svg";
import {BloodDropdownMenu} from "../BloodDropdownMenu";
import {getDonationCount} from "../../services/DonationCountService";
import {getCurrentUserId} from "../../services/CurrentUserService";

export const ProfileInfo = ({userId}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [selectedIconId, setSelectedIconId] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState('icon_0');
    const [selectedFirstName, setSelectedFirstName] = useState('');
    const [selectedLastName, setSelectedLastName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [description, setDescription] = useState('')
    const [blood, setBlood] = useState('')
    const [updateBloodId, setUpdateBloodId] = useState(null)
    const [selectedLocLatitude, setSelectedLocLatitude] = useState(null);
    const [selectedLocLongitude, setSelectedLocLongitude] = useState(null);
    const [isDonor, setIsDonor] = useState(false);
    const [popupMessage, setPopupMessage] = useState('იძებნება');
    const [showIconOptions, setShowIconOptions] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const [medicalDocuments, setMedicalDocuments] = useState([]);
    const [icons, setIcons] = useState([]);
    const [file, setFile] = useState(null);
    const [donationImage, setDonationImage] = useState(null);
    const [donationCount, setDonationCount] = useState(0);
    const POLLING_INTERVAL = 8000;

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        saveFile({formData: formData, userId: userId, file: file})
    }


    const handleSuccess = (data) => {
        setSelectedEmail(data.email)
        setSelectedFirstName(data.first_name)
        setSelectedLastName(data.last_name)
        if (data.loc_latitude && data.loc_longitude) {
            setSelectedLocLatitude(data.loc_latitude)
            setSelectedLocLongitude(data.loc_longitude)
        } else {
            setSelectedLocLatitude(null)
            setSelectedLocLongitude(null)
        }
        if (data.blood_type) {
            if (data.blood_type.rhesus_factor) {
                setBlood(data.blood_type.blood_type + "+")
            } else {
                setBlood(data.blood_type.blood_type + "-")
            }
        } else {
            setBlood('არ არის განსაზღვრული')
        }
        setIsDonor(data.donor_status)
        if (data.description) {
            setDescription(data.description)
        } else {
            setDescription('')
        }
        if (data.icon) {
            setSelectedIconId(data.icon.id)
            setSelectedIcon(data.icon.file_address)
        } else {
            setSelectedIcon('icon_0')
        }
        setShowPopup(false);
    }

    const handleBloodSelect = (eventKey, event) => {
        setUpdateBloodId(eventKey.id);
    };

    const handleUpdateFailure = async () => {
        setPopupMessage(`მომხმარებლის ინფორმაცია ვერ განახლდა.`)
        setShowPopup(true);
    }

    const handleUserUpdate = () => {
        updateUser(
            userId,
            selectedIconId,
            selectedLocLatitude,
            selectedLocLongitude,
            selectedFirstName,
            selectedLastName,
            isDonor,
            description,
            updateBloodId
        )
            .catch(
            () => {
                handleUpdateFailure();
            }
        );
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleIcons = (data) => {
        setIcons(data)
    }

    const handleFailure = (userId) => {
        setPopupMessage(`მომხმარებელი ვერ იქნა ნაპოვნი, გთხოვთ ხელახლა სცადოთ.`)
        setShowPopup(true);
    }

    const handleMedicalDocuments = (data) => {
        setMedicalDocuments(data)
    }

    const deleteFile = (id) => {
        deleteMedicalDocument({id})
    }

    const downloadFile = (id) => {
        getMedicalDocument({id})
            .then((response) => {
                let filename = 'downloaded-file';
                let contentDisposition = response.headers['content-disposition'];
                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1];
                    }
                }
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            })
    }

    const handleDonationCount = (data) => {
        setDonationCount(data.amount)
        if (data.amount < 1) {
            setDonationImage(null);
        } else if (data.amount < 2) {
            setDonationImage(glass)
        } else if (data.amount < 4) {
            setDonationImage(jar)
        } else if (data.amount < 7) {
            setDonationImage(bucket)
        } else if (data.amount < 12) {
            setDonationImage(ship)
        } else {
            setDonationImage(blackhole)
        }
    }

    useEffect(() => {
        getCurrentUserId()
            .then((data) => {
                setCurrentUser(data)
            }).catch(() => {
                setCurrentUser(null)
            })
    }, []);

    useEffect(() => {
        getIcons()
            .then((data) => handleIcons(data))
        getUser({userId: userId})
            .then((data) => {
                handleSuccess(data)
                getMedicalDocuments({userId})
                    .then((inner) => handleMedicalDocuments(inner))
                getDonationCount(userId)
                    .then((inner) => handleDonationCount(inner))
            })
            .catch(() => handleFailure(userId))
    }, [userId, currentUser]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!showPopup) {
                getUser({userId: userId})
                    .then((data) => {
                        setShowPopup(false)
                        getMedicalDocuments({userId})
                            .then((inner) => handleMedicalDocuments(inner))
                    })
                    .catch(
                        () => handleFailure(userId)
                    )
            }
        }, POLLING_INTERVAL);

        return () => clearInterval(intervalId);
    }, [userId, currentUser]);

    return (
        <div style={{
            flex: '1', position: 'relative', width: "100%", maxWidth: '100%',
            backgroundImage: `url(${background})`, maxHeight: '100%',
            backgroundSize: 'cover', display: "flex", justifyContent: "center", flexDirection: "column",
            alignItems: 'center', overflow: 'hidden'
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
                height: "90%", maxHeight: '90%', width: "92%", maxWidth: '92%', position: 'relative', backgroundColor:
                colors.pearl, display: "flex", flexDirection: "column", alignItems: 'center', overflowY: "auto",
                padding: "2vh", boxSizing: "border-box"
            }}>
                {'' + currentUser === userId && <div style={{
                    height: '42%', position: 'relative', display: 'flex',
                    flexDirection: 'row', alignItems: 'center'
                }}>
                    <div className={selectedIcon} style={{
                        width: "20vh", height: "20vh", borderRadius: "50%",
                        borderWidth: "2px", borderColor: colors.black, borderStyle: "solid", margin: "5vh"
                    }} onClick={
                        () => setShowIconOptions(true)
                    }/>
                    <div style={{
                        position: 'relative', display: 'flex',
                        flexDirection: 'column', alignItems: 'center'
                    }}>
                        <ProfileEditableField description={"სახელი"}
                                              value={selectedFirstName}
                                              setValue={setSelectedFirstName}
                                              width={'18vh'}/>
                        <ProfileEditableField description={"გვარი"}
                                              value={selectedLastName}
                                              setValue={setSelectedLastName}
                                              width={'20vh'}/>
                        <ProfileField description={"მეილი"}
                                      value={selectedEmail}/>
                        <ProfileField description={"სისხლის ჯგუფი"}
                                      value={blood}/>
                        <div style={{
                            position: 'relative', display: 'flex',
                            flexDirection: 'row', alignItems: 'center', width: '100%'
                        }}>
                            <text style={{margin: '1vh', fontWeight: 'bold'}}>
                                ვარ აქტიური დონორი:
                            </text>
                            <input
                                type="checkbox"
                                checked={isDonor}
                                onChange={() => setIsDonor(!isDonor)}
                                className={"request-checkbox"}
                            />
                        </div>
                    </div>
                    <div>
                        <LocationPick setSelectedLat={setSelectedLocLatitude}
                                      setSelectedLon={setSelectedLocLongitude}
                                      className={"request-location"}
                                      longitude={selectedLocLongitude}
                                      latitude={selectedLocLatitude}/>
                    </div>
                </div>}
                {'' + currentUser !== userId && <div style={{
                    height: '42%', position: 'relative', display: 'flex',
                    flexDirection: 'row', alignItems: 'center'
                }}>
                    <div className={selectedIcon} style={{
                        width: "20vh", height: "20vh", borderRadius: "50%",
                        borderWidth: "2px", borderColor: colors.black, borderStyle: "solid", margin: "5vh"
                    }}/>
                    <div style={{
                        position: 'relative', display: 'flex',
                        flexDirection: 'column', alignItems: 'center'
                    }}>
                        <ProfileField description={"სახელი"}
                                              value={selectedFirstName}/>
                        <ProfileField description={"გვარი"}
                                              value={selectedLastName}/>
                        <ProfileField description={"სისხლის ჯგუფი"}
                                      value={blood}/>
                        <div style={{
                            position: 'relative', display: 'flex',
                            flexDirection: 'row', alignItems: 'center', width: '100%'
                        }}>
                            {isDonor &&
                                <text style={{margin: '1vh', fontWeight: 'bold'}}>
                                    დონორი
                                </text>
                            }
                            {!isDonor &&
                                <text style={{margin: '1vh', fontWeight: 'bold'}}>
                                    არ არის დონორი
                                </text>
                            }
                        </div>
                    </div>
                    <div>
                        <Location
                            selectedLon={selectedLocLongitude}
                            selectedLat={selectedLocLatitude}/>
                    </div>
                </div>}
                {'' + currentUser === userId && <div style={{width: '70vh',
                    minHeight: '13vh', height: '13vh', overflowX: 'auto'}}>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            className={"scroll profile-description"}
                        />
                </div>}
                {'' + currentUser !== userId && (
                    <div style={{ width: '70vh', minHeight: '13vh', height: '13vh', overflowX: 'auto' }}>
                        <div
                            className="scroll profile-description"
                            style={{
                                whiteSpace: 'pre-wrap',
                                overflowY: 'auto'
                            }}
                        >
                            {description}
                        </div>
                    </div>
                )}
                {'' + currentUser === userId &&
                    <BloodDropdownMenu handleSelect={handleBloodSelect} className={"home-dropdown-menu"}/>
                }
                {'' + currentUser === userId && <button onClick={handleUserUpdate}
                                                   className={'home-unselected-button'}>
                    განაახლე
                </button>}
                <div style={{display: 'flex', flexDirection: 'row', padding: '0.5vh',
                alignItems: 'center'}}>
                    <text style={{
                        margin: '1vh', fontWeight: 'bold', fontSize: 'larger'
                    }}>დონაციათა რაოდენობა:     {donationCount}</text>
                    {donationImage && <div style={{
                        backgroundImage: `url(${donationImage})`,
                        width: '20vh',
                        height: '20vh',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: colors.white,
                        margin: '1vh',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: colors.tertiary,
                        borderRadius: '1vh'
                    }}></div>}
                </div>
                {'' + currentUser === userId &&
                    <div style={{marginTop: '1vh', marginBottom: '1vh'}}>
                        <input type="file" onChange={handleFileChange}/>
                        <button onClick={uploadFile} className={'home-unselected-button'}>ატვირთე</button>
                    </div>
                }
                <div style={{
                    height: '30%', width: '90%', maxHeight: '30%', maxWidth: '90%'
                }}>
                    <div style={{
                        position: 'relative', display: 'flex', flexDirection: 'row',
                        alignItems: 'center', overflowX: 'scroll', overflowY: 'clip'
                    }}>
                        {
                            medicalDocuments.map(
                                (document) => {
                                    return <div className={'profile-document-box'}>
                                        <img src={file_icon} style={{width: '5vh', height: '5vh'}}
                                             onClick={
                                                 () => {
                                                     downloadFile(document.id, document.file_address)
                                                 }
                                             }/>
                                        <span
                                            style={{
                                                color: colors.primary_dark,
                                                marginLeft: '1vh',
                                                marginRight: '1vh',
                                                display: 'block',
                                            }}
                                        >
                                        {document.description}
                                        </span>
                                        {'' + currentUser === userId &&
                                            <button onClick={() => {
                                                deleteFile(document.id)
                                            }}>წაშლა</button>
                                        }
                                    </div>
                                }
                            )
                        }
                    </div>
                </div>
            </div>}
        </div>
    );
}