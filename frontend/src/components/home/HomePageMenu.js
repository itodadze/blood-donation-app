import React from 'react';
import {SideMenu} from "../SideMenu";
import strings from "../../values/strings";

export const HomePageMenu = ({currentUser}) => {
    return (
        <SideMenu current={strings.HOME}/>
    );
}