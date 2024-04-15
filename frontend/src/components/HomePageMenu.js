import React from 'react';
import {SideMenu} from "./SideMenu";
import strings from "../values/strings";

export const HomePageMenu = () => {
    return (
        <SideMenu current={strings.HOME}/>
    );
}