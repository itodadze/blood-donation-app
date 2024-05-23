import colors from "../../values/colors";
import React, {useState} from "react";
import hide_pass from "../../assets/icons/hide_pass.svg";
import show_pass from "../../assets/icons/show_pass.svg";


export const PasswordField = () => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (<div
        style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2%'
        }}>
        <p style={{display: 'flex', marginBottom: '2%', color: colors.gray}}>
            Password
        </p>
        <div
            style={{
                position: 'relative',
                width: '90%',
                height: '90%',
                maxHeight: '50px',
            }}
        >
            <input
                placeholder={'Enter Your Password'}
                type={showPassword ? 'text' : 'password'}
                style={{
                    borderStyle: 'solid',
                    borderColor: colors.primary,
                    borderRadius: '15px',
                    padding: '10px',
                    paddingRight: '40px',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box'
                }}
            />
            <button
                onClick={toggleShowPassword}
                style={{
                    border: 'none',
                    background: 'none',
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                }}
            >
                <img
                    src={showPassword ? hide_pass : show_pass}
                    alt={showPassword ? 'Hide password' : 'Show password'}
                    style={{height: '20px', width: '20px'}}
                />
            </button>
        </div>


    </div>);
}