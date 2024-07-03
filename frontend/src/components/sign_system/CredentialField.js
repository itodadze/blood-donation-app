import colors from "../../values/colors";
import React, {useState} from "react";

export const CredentialField = ({fieldName}) => {

    return (<div
        style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2%'
        }}>
        <p style={{display: 'flex', marginBottom: '2%', color: colors.gray}}>
            {fieldName}
        </p>
        <div style={{
            display: 'flex', // backgroundColor: colors.white,
            width: '90%', height: '90%', maxHeight: '50px'
        }}>
            <input
                placeholder={"შეიყვანე " + fieldName}
                style={{
                    borderStyle: 'solid',
                    borderColor: colors.primary,
                    borderRadius: '15px',
                    padding: '10px',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box'
                }}
            />
        </div>
    </div>);
}