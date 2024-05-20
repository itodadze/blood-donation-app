import {deleteRequest, getRequest} from "../../services/RequestService";
import {Location} from "../../components/map/Location"
import {useEffect, useState} from "react";
import background from "../../assets/background/background.png";
import colors from "../../values/colors";
import {DonorDropdownMenu} from "./DonorDropdownMenu";
import {getDonors} from "../../services/UserService";
import {donate} from "../../services/DonationService";

export const RequestInfo = ({request_id}) => {

    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedLat, setSelectedLat] = useState(null);
    const [selectedLon, setSelectedLon] = useState(null);
    const [receiver, setSelectedReceiver] = useState(null);
    const [description, setDescription] = useState('');
    const [showPopup, setShowPopup] = useState(true);
    const [popupMessage, setPopupMessage] = useState('იძებნება');
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])

    const handleSuccess = (request) => {
        setSelectedLat(request.loc_latitude);
        setSelectedLon(request.loc_longitude);
        setSelectedBlood(request.blood_txt);
        setSelectedReceiver(request.user);
        setDescription(request.description);
        getDonors({id: receiver}).then((users) =>
        {
            setUsers(users);
            setShowPopup(false);
        }).catch((error) => {
                setShowPopup('ვერ იქნა მონაცემები წამოღებული');
                setShowPopup(true);
            }
        )
    }

    const handleFailure = (request_id) => {
        setPopupMessage(`მოთხოვნა ${request_id} ვერ იქნა ნაპოვნი, გთხოვთ ხელახლა სცადოთ.`)
        setShowPopup(true);
    }

    const handleDelete = () => {
        deleteRequest({requestId: request_id})
            .then().catch()
    }

    const handleAccept = () => {
        selectedUsers.map(
            (selectedUser) =>
                donate({id: selectedUser})
        )
        deleteRequest({requestId: request_id})
            .then().catch()
    }

    useEffect(() => {
        getRequest({requestId: request_id})
            .then((request) => handleSuccess(request))
            .catch(() => handleFailure(request_id))
    })

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
                <div className={"request-item"}>
                    <text className={"request-item-desc"}>
                        სისხლი:
                    </text>
                    <text className={"request-item-desc"}>
                        {selectedBlood}
                    </text>
                </div>
                <div className={"request-item"}>
                    <text className={"request-item-desc"}>
                        ლოკაცია:
                    </text>
                    <Location selectedLat={selectedLat} selectedLon={selectedLon}/>
                </div>
                <div className={"request-item"}>
                    <text className={"request-item-desc"}>
                        აღწერა:
                    </text>
                    <div style={{width: '380px', height: '170px', overflowX: 'auto'}}>
                        <div className={"scroll request-description"}>
                            {description}
                        </div>
                    </div>
                </div>
                {user != null && user.id === receiver &&
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <button className={"request-confirm"} onClick={handleDelete}>
                            წაშლა
                        </button>
                        <button className={"request-confirm"} onClick={handleAccept}>
                            შესრულებულია
                        </button>
                        <DonorDropdownMenu users={users} className={"home-dropdown-menu"}
                                           selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
                </div>}
                {user != null && user.id !== receiver &&
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <button className={"request-confirm"}>
                        დაკავშირება
                    </button>
                </div>}
            </div>}
        </div>
    );
}