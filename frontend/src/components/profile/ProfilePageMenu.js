import React from 'react';
import {SideMenu} from "../SideMenu";
import strings from "../../values/strings";

export const ProfilePageMenu = ({currentUser, userId}) => {
    if (currentUser === userId) {
        return (
            <SideMenu current={strings.HOME} currentUser={currentUser}/>
        );
    } else {
        return (<SideMenu currentUser={currentUser}/>);
    }
}