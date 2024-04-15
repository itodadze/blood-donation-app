import React from 'react';
import {SideMenu} from "./SideMenu";
import strings from "../values/strings";

export const RequestPageMenu = () => {
    return (
        <SideMenu current={strings.REQUEST}/>
    );
}