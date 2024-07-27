import React from 'react';
import {SideMenu} from "../SideMenu";
import strings from "../../values/strings";

export const HelpPageMenu = () => {
    return (
        <SideMenu current={strings.HELP}/>
    );
}