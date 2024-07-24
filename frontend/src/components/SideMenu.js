import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import colors from "../values/colors";
import {MenuButton} from "./MenuButton";
import feed from "../assets/icons/feed.svg"
import profile from "../assets/icons/profile.svg";
import chat from "../assets/icons/chat.svg";
import blood from "../assets/icons/blood.svg";
import logout from "../assets/icons/logout.svg";
import support from "../assets/icons/support.svg";
import logo from "../assets/icons/logo.svg"
import React from "react";
import strings from "../values/strings";
import {IconButton} from "./IconButton";

export const SideMenu = ({current, currentUser}) => {
    const navigate = useNavigate();

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
                            onClick={() => navigate("/", {currentUser: currentUser})}/>
            {(current !== strings.HOME) &&
                <MenuButton svg_file={feed} height={"42vh"} text={"მთავარი"}
                            onClick={() => navigate("/", {currentUser: currentUser})}/>}

            {(current !== strings.PROFILE) && <MenuButton svg_file={profile} height={"38vh"}
                                                          text={"პროფილი"}/>}

            {(current !== strings.CHATS) &&
                <MenuButton svg_file={chat} height={"42vh"} text={"შეტყობინებები"}
                            onClick={() => navigate("/chat", {currentUser: currentUser})}/>}

            {(current !== strings.REQUEST) &&
                <MenuButton svg_file={blood} height={"42vh"} text={"მჭირდება სისხლი"}
                            onClick={() => navigate("/request/broadcast", {currentUser: currentUser})}/>}


            <div style={{marginTop: "auto"}}>
                <MenuButton svg_file={logout} height={"44vh"} text={"გასვლა"}/>
            </div>
            {(current !== strings.HELP) &&
                <MenuButton svg_file={support} height={"40vh"}
                            text={"დახმარება"} onClick={() => navigate("/help", {currentUser: currentUser})}/>}
        </motion.div>
    );
}