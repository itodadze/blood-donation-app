import {getRequest} from "../../services/RequestService";
import {useState} from "react";
import background from "../../assets/background/background.png";

export const RequestInfo = ({request_id}) => {

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleSuccess = (request) => {
        setShowPopup(false);
    }

    const handleFailure = (request_id) => {
        setPopupMessage(`მოთხოვნა ${request_id} ვერ იქნა ნაპოვნი, გთხოვთ ხელახლა სცადოთ.`)
        setShowPopup(true);
    }

    const getCurrentRequest = (request_id) => {
        getRequest({requestId: request_id})
            .then((request) => handleSuccess(request))
            .catch(() => handleFailure(request_id))
    }

    getCurrentRequest(request_id)

    return (
        <div style={{
            flex: '1', position: 'relative', width: "100%", backgroundImage: `url(${background})`,
            backgroundSize: 'cover', display: "flex", justifyContent: "center", flexDirection: "column",
            alignItems: 'center'
        }}>
            {showPopup && <div className={"request-popup"}>
                <text className={"request-item-desc"}>{popupMessage}</text>
            </div>}
        </div>
    );
}