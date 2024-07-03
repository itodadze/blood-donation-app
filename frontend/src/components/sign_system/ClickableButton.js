import React from 'react'
import colors from "../../values/colors";

export const ClickableButton = ({buttonText, onClick}) => {

    return (<button
        style={{
            borderColor: colors.primary_dark,
            borderRadius: '15px',
            flex: 0.4,
            alignSelf: 'center',
            backgroundColor: colors.primary,
            color: colors.dark_pearl,
            marginBottom: '4%',
            marginTop: '4%',
            width: '90%'
        }}
        onClick={onClick}
    >
        {buttonText}
    </button>);
}