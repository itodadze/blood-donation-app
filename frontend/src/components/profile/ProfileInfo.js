import React, {useEffect, useState} from "react";

import {getUser, updateUser} from "../../services/UserService";
import background from "../../assets/background/background.png";
import colors from "../../values/colors";
import {getIcons} from "../../services/UserIconsService";
import {ProfileEditableField, ProfileField} from "./ProfileField";
import {LocationPick} from "../map/LocationPick";
import {Location} from "../map/Location"
import {getMedicalDocument, getMedicalDocuments, saveFile} from "../../services/MedicalDocumentsService";

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
    const [medicalDocuments, setMedicalDocuments] = useState([]);
    const [icons, setIcons] = useState([]);
    const [file, setFile] = useState(null);

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

    const handleUserUpdate = () => {
        if (currentUser === userId) {
            updateUser(
                userId,
                selectedIconId,
                selectedLocLatitude,
                selectedLocLongitude,
                selectedFirstName,
                selectedLastName,
                selectedEmail,
                isDonor,
                description
            )
        }
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleIcons = (data) => {
        setIcons(data)
    }

    const handleFailure = (userId) => {
        setPopupMessage(`მომხმარებელი ${userId} ვერ იქნა ნაპოვნი, გთხოვთ ხელახლა სცადოთ.`)
        setShowPopup(true);
    }

    const handleMedicalDocuments = (data) => {
        setMedicalDocuments(data)
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

    useEffect(() => {
        getIcons()
            .then((data) => handleIcons(data))
        getUser({userId: userId})
            .then((data) => handleSuccess(data))
            .catch(() => handleFailure(userId))
        getMedicalDocuments({userId})
            .then((data) => handleMedicalDocuments(data))
    }, [userId]);

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
                colors.pearl, display: "flex", flexDirection: "column", alignItems: 'center'
            }}>
                {currentUser === userId && <div style={{
                    height: '45%', position: 'relative', display: 'flex',
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
                        <ProfileEditableField description={"მეილი"}
                                              value={selectedEmail}
                                              setValue={setSelectedEmail}
                                              width={'28vh'}/>
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
                {currentUser !== userId && <div style={{
                    height: '45%', position: 'relative', display: 'flex',
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
                        <ProfileField description={"მეილი"}
                                              value={selectedEmail}/>
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
                {currentUser === userId && <div style={{width: '70vh',
                    height: '13vh', overflowX: 'auto'}}>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            className={"scroll profile-description"}
                        />
                </div>}
                {currentUser !== userId && (
                    <div style={{ width: '70vh', height: '13vh', overflowX: 'auto' }}>
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
                {currentUser === userId && <button onClick={handleUserUpdate}
                                                   className={'home-unselected-button'}>
                    განაახლე ინფორმაცია
                </button>}
                {currentUser !== userId &&
                    <div>
                        <input type="file" onChange={handleFileChange}/>
                        <button onClick={uploadFile}>Upload File</button>
                    </div>
                }
                <div style={{
                    height: '30%', position: 'relative', display: 'flex',
                    flexDirection: 'row', alignItems: 'center'}}>
                    {
                        medicalDocuments.map(
                            (document) => {
                                return <div className={'profile-document-box'}
                                onClick = {
                                    () => {
                                        downloadFile(document.id, document.file_address)
                                    }
                                }>
                                    <text style={{color: colors.primary_dark,
                                        margin: '1vh'}}>
                                        {document.description}</text>
                                </div>
                            }
                        )
                    }
                </div>
            </div>}
        </div>
    );
}