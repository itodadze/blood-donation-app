import React from 'react'
import colors from "../../values/colors";

export const SignButton = ({buttonText}) => {

    return (<button
        style={{
            borderColor: colors.primary_dark,
            borderRadius: '15px',
            flex: 0.3,
            alignSelf: 'center',
            backgroundColor: colors.primary,
            color: colors.dark_pearl
        }}
    >
        {buttonText}
    </button>);
}