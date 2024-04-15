import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import colors from "../values/colors";
import {HomePageMenuButton} from "./HomePageMenuButton";
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
            {(current !== strings.HOME) && <HomePageMenuButton svg_file={feed} height={"40vh"}
                                                               text={"მთავარი"}/>}

            {(current !== strings.PROFILE) && <HomePageMenuButton svg_file={profile} height={"38vh"}
                                                                  text={"პროფილი"}/>}

            {(current !== strings.CHATS) && <HomePageMenuButton svg_file={chat} height={"42vh"}
                                                                text={"შეტყობინებები"}/>}

            {(current !== strings.REQUEST) &&
                <HomePageMenuButton svg_file={blood} height={"42vh"} text={"მჭირდება სისხლი"}
                                    onClick={() => navigate("/request")}/>}

            {(current !== strings.REQUESTS) && <HomePageMenuButton svg_file={help} height={"38vh"}
                                                                   text={"თხოვნები"}/>}

            <div style={{marginTop: "auto"}}>
                <HomePageMenuButton svg_file={settings} height={"50vh"} text={"პარამეტრები"}/>
            </div>
            <HomePageMenuButton svg_file={support} height={"40vh"} text={"დახმარება"}/>
        </motion.div>
    );
}