import React from 'react'
import colors from "../../values/colors";

export const RegisterButton = ({buttonText}) => {

    return (<button
        style={{
            borderColor: colors.primary_dark,
            borderRadius: '15px',
            flex: 0.4,
            alignSelf: 'center',
            backgroundColor: colors.primary,
            color: colors.dark_pearl,
            marginBottom: '3%',
            marginTop: '3%',
            width: '90%'
        }}
    >
        {buttonText}
    </button>);
}