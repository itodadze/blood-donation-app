import React from 'react';
import {SideMenu} from "../SideMenu";
import strings from "../../values/strings";

export const RequestFormPageMenu = ({currentUSer}) => {
    return (
        <SideMenu current={strings.REQUEST}/>
    );
}