import strings from "../values/strings";
import {SideMenu} from "./SideMenu";

export const ChatPageMenu = () => {
    return (
        <SideMenu current={strings.CHATS}/>
    )
}