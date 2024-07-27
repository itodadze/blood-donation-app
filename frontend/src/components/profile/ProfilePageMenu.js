import React, {useEffect, useState} from 'react';
import {SideMenu} from "../SideMenu";
import strings from "../../values/strings";
import {getCurrentUserId} from "../../services/CurrentUserService";

export const ProfilePageMenu = ({userId}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getCurrentUserId()
            .then((data) => {
                setCurrentUser(data)
            }).catch(() => {
            setCurrentUser(null)
        })
    }, []);

    if ('' + currentUser === userId) {
        return (
            <SideMenu current={strings.PROFILE}/>
        );
    } else {
        return (<SideMenu/>);
    }
}