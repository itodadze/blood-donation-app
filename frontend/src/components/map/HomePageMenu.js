import colors from "../../values/colors"
import {HomePageMenuButton} from "./HomePageMenuButton";
import blood from "../../assets/icons/blood.svg"
import profile from "../../assets/icons/profile.svg"
import chat from "../../assets/icons/chat.svg"
import help from "../../assets/icons/help.svg"
import settings from "../../assets/icons/settings.svg"
import support from "../../assets/icons/support.svg"
import "../../App.css"

export const HomePageMenu = () => {
    return (
        <div style={{
            flex: '0 0 30vh',
            backgroundColor: colors.dark_gray,
            alignItems: "center",
            flexDirection: "column",
            display: "flex",
        }}>
            <div className={"home-menu-button"} style={{backgroundColor: colors.gray}}>
                <text className={"noto-sans-georgian-elegant"} style={{color: colors.secondary}}>
                    APP NAME AND LOGO HERE; DIFFERENT DIV AROUND IT AS WELL
                </text>
            </div>
            <HomePageMenuButton svg_file={profile} height={"38vh"} text={"პროფილი"}/>
            <HomePageMenuButton svg_file={chat} height={"42vh"} text={"შეტყობინებები"}/>
            <HomePageMenuButton svg_file={blood} height={"42vh"} text={"მჭირდება სისხლი"}/>
            <HomePageMenuButton svg_file={help} height={"38vh"} text={"თხოვნები"}/>
            <div style={{marginTop: "auto"}}>
                <HomePageMenuButton svg_file={settings} height={"50vh"} text={"პარამეტრები"}/>
            </div>
            <HomePageMenuButton svg_file={support} height={"40vh"} text={"დახმარება"}/>
        </div>
    );
}