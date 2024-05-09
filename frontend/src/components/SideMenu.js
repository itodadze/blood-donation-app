import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import colors from "../values/colors";
import {MenuButton} from "./MenuButton";
import feed from "../assets/icons/feed.svg"
import profile from "../assets/icons/profile.svg";
import chat from "../assets/icons/chat.svg";
import blood from "../assets/icons/blood.svg";
import help from "../assets/icons/help.svg";
import settings from "../assets/icons/settings.svg";
import support from "../assets/icons/support.svg";
import React from "react";
import strings from "../values/strings";

export const SideMenu = ({current}) => {
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
            <div className={"home-menu-button"} style={{backgroundColor: colors.pearl}}>
                <text className={"noto-sans-georgian-elegant"} style={{color: colors.secondary_dark}}>
                    APP NAME AND LOGO HERE; DIFFERENT DIV AROUND IT AS WELL
                </text>
            </div>
            {(current !== strings.HOME) &&
                <MenuButton svg_file={feed} height={"42vh"} text={"მთავარი"}
                            onClick={() => navigate("/")}/>}

            {(current !== strings.PROFILE) && <MenuButton svg_file={profile} height={"38vh"}
                                                          text={"პროფილი"}/>}

            {(current !== strings.CHATS) &&
                <MenuButton svg_file={chat} height={"42vh"} text={"შეტყობინებები"}
                            onClick={() => navigate("/chat")}/>}

            {(current !== strings.REQUEST) &&
                <MenuButton svg_file={blood} height={"42vh"} text={"მჭირდება სისხლი"}
                            onClick={() => navigate("/request")}/>}

            {(current !== strings.REQUESTS) && <MenuButton svg_file={help} height={"38vh"}
                                                           text={"თხოვნები"}/>}

            <div style={{marginTop: "auto"}}>
                <MenuButton svg_file={settings} height={"50vh"} text={"პარამეტრები"}/>
            </div>
            <MenuButton svg_file={support} height={"40vh"} text={"დახმარება"}/>
        </motion.div>
    );
}