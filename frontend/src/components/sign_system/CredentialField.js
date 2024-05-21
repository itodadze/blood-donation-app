import colors from "../../values/colors";
import React, {useState} from "react";

export const CredentialField = ({fieldName, defaultValue}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (<div
            style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <text style={{display: 'flex', marginBottom: '10px', color: colors.gray}}>
                {fieldName}
            </text>
        <div style={{
            display: 'flex',
            // backgroundColor: colors.white,
            width: '90%',
            height: '50px'
        }}>
            <input
                placeholder={"Enter Your " + fieldName}
                type={fieldName==='Password'? 'password':'text'}
                style={{
                    borderStyle: 'solid',
                    borderColor: colors.primary,
                    borderRadius: '15px',
                    margin: '2%',
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    </div>);
}