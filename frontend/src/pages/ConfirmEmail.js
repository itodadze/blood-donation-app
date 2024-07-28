import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {tryConfirmEmail} from "../services/ConfirmEmailService";
import background from "../assets/background/background.png";

export const ConfirmEmail = () => {
    const {uid, token} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                tryConfirmEmail({uid, token})
                    .then(() => {
                        navigate("/login")
                    })
            } catch (error) {
                alert('Invalid confirmation link.');
            }
        };

        confirmEmail();
    }, [uid, token]);

    return (
        <div style={{
            flex: '1', position: 'relative', width: "100%", height: '100%', backgroundImage: `url(${background})`,
            backgroundSize: 'cover', display: "flex", justifyContent: "center", flexDirection: "column",
            alignItems: 'center', overflow: 'auto', maxHeight: '100%', maxWidth: '100%', minHeight: '100%',
            padding: '30vh'
        }}>
            <div className={"request-popup"}>
                <text className={"request-item-desc"}>მიმდინარეობს მეილის გადამოწმება</text>
            </div>
        </div>
    );
}