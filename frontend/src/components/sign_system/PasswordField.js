import colors from "../../values/colors";
import React, {useState} from "react";
import hide_pass from "../../assets/icons/hide_pass.svg";
import show_pass from "../../assets/icons/show_pass.svg";
import warning from "../../assets/icons/warning_invalid.svg";


export const PasswordField = ({fieldName, placeholderText, handleFunc, disableField=false}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = React.useState(null);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    function handleChange(e) {
        handleFunc(e, setError);
    }

    return (<div
        style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2%'
        }}>

        <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '2%'
        }}>
            <p style={{display: 'flex', marginBottom: '2%', color: colors.gray}}>
                {fieldName ? fieldName : 'პაროლი'}
            </p>

            <div className='credential-field-warning-box' style={{
                '--display': error ? 'flex' : 'none'
            }}>
                <img src={warning} alt={'warning'} className='credential-field-warning'/>

                <div className="credential-warning-hover" style={{
                    '--background-color': colors.primary,
                    '--text-color': colors.pearl,
                }}> {error} </div>
            </div>

        </div>
        <div
            style={{
                position: 'relative',
                width: '90%',
                height: '90%',
                maxHeight: '50px',
            }}
        >
            <input
                className={'password-input-field'}
                placeholder={placeholderText ? placeholderText : 'შეიყვანე პაროლი'}
                type={showPassword ? 'text' : 'password'}
                style={{
                    '--border-color': colors.primary,
                    '--dis-border-color': colors.dark_pearl
                }}
                disabled={disableField}
                onBlur={handleChange}
                onChange={handleChange}
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