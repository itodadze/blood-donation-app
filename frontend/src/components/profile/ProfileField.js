import {ProfileEditableTextField} from "./ProfileEditableTextField";
import React from "react";

export const ProfileEditableField = ({description, value, setValue, width}) => {
    return (
        <div style={{
            position: 'relative', display: 'flex',
            flexDirection: 'row', alignItems: 'center', width: '100%'
        }}>
            <text style={{margin: '1vh', fontWeight: 'bold'}}>{description}:</text>
            <ProfileEditableTextField initial={value}
                                      setValue={setValue}
                                      width={width}/>
        </div>
    )
}

export const ProfileField = ({description, value}) => {
    return (
        <div style={{
            position: 'relative', display: 'flex',
            flexDirection: 'row', alignItems: 'center', width: '100%'
        }}>
            <text style={{margin: '1vh', fontWeight: 'bold'}}>{description}:</text>
            <text style={{margin: '1vh', fontWeight: 'bold'}}>{value}</text>
        </div>
    );
}