import React from 'react';
import colors from "../values/colors"
import {HomePageMenuButton} from "./HomePageMenuButton";
import blood from "../../src/assets/icons/blood.svg"
import profile from "../../src/assets/icons/profile.svg"
import chat from "../../src/assets/icons/chat.svg"
import help from "../../src/assets/icons/help.svg"
import settings from "../../src/assets/icons/settings.svg"
import support from "../../src/assets/icons/support.svg"
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import "../App.css"

export const HomePageMenu = () => {
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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0}}>
            <div className={"home-menu-button"} style={{backgroundColor: colors.pearl}}>
                <text className={"noto-sans-georgian-elegant"} style={{color: colors.secondary_dark}}>
                    APP NAME AND LOGO HERE; DIFFERENT DIV AROUND IT AS WELL
                </text>
            </div>
            <HomePageMenuButton svg_file={profile} height={"38vh"} text={"პროფილი"}/>
            <HomePageMenuButton svg_file={chat} height={"42vh"} text={"შეტყობინებები"}/>
            <HomePageMenuButton svg_file={blood} height={"42vh"} text={"მჭირდება სისხლი"}
                onClick={() => navigate("/request")}/>
            <HomePageMenuButton svg_file={help} height={"38vh"} text={"თხოვნები"}/>
            <div style={{marginTop: "auto"}}>
                <HomePageMenuButton svg_file={settings} height={"50vh"} text={"პარამეტრები"}/>
            </div>
            <HomePageMenuButton svg_file={support} height={"40vh"} text={"დახმარება"}/>
        </motion.div>
    );
}