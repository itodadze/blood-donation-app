import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import colors from "../values/colors";
import {MenuButton} from "./MenuButton";
import feed from "../assets/icons/feed.svg"
import profile from "../assets/icons/profile.svg";
import chat from "../assets/icons/chat.svg";
import blood from "../assets/icons/blood.svg";
import logout_logo from "../assets/icons/logout.svg";
import support from "../assets/icons/support.svg";
import logo from "../assets/icons/logo.svg"
import React, {useEffect, useState} from "react";
import strings from "../values/strings";
import {IconButton} from "./IconButton";
import {logout} from "../services/SignSystemService";
import {getCurrentUserId} from "../services/CurrentUserService";

export const SideMenu = ({current}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        try {
            await logout()
            navigate('/login');
        } catch (error) {
            console.log(error);
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

    return (
        <motion.div
            style={{
                flex: '0 0 260px',
                backgroundColor: colors.dark_pearl,
                alignItems: "center",
                flexDirection: "column",
                display: "flex",
            }}
            initial={{x: '-100%'}}
            animate={{x: 0}}
            transition={{type: 'tween', ease: 'easeOut', duration: 0}}>
            <IconButton svg_file={logo} height={"60vh"} text={"DonorStream"}
                            onClick={() => navigate("/")}/>
            <MenuButton svg_file={feed} height={"42vh"} text={"მთავარი"}
                        onClick={() => navigate("/")}
                        selected={current === strings.HOME}/>

            <MenuButton svg_file={profile} height={"38vh"} text={"პროფილი"}
                        onClick={() => navigate("/profile/" + currentUser)}
                        selected={current === strings.PROFILE}/>

            <MenuButton svg_file={chat} height={"42vh"} text={"შეტყობინებები"}
                        onClick={() => navigate("/chat")}
                        selected={current === strings.CHATS}/>

            <MenuButton svg_file={blood} height={"42vh"} text={"მჭირდება სისხლი"}
                        onClick={() => navigate("/request/broadcast")}
                        selected={current === strings.REQUEST}/>


            <div style={{marginTop: "auto"}}>
                <MenuButton svg_file={logout_logo} height={"44vh"} text={"გასვლა"}
                            onClick={() => handleLogout()}/>
            </div>
            <MenuButton svg_file={support} height={"40vh"} text={"დახმარება"}
                        onClick={() => navigate("/help")}
                        selected={current === strings.HELP}/>
        </motion.div>
    );
}