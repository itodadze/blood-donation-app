import React from "react";

export const ProfileEditableTextField = ({initial, setValue, width}) => {
    return (<textarea
        placeholder={initial}
        onChange={(event) => setValue(event.target.value)}
        style={{
            border: 'none',
            background: 'none',
            outline: 'none',
            maxWidth: width,
            maxHeight: '4vh',
            width: width,
            height: '4vh',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'clip',
            fontSize: 'large',
            fontWeight: 'bold',
            resize: 'none'
        }}
    />);
}