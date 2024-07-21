import colors from "../../values/colors";
import warning from "../../assets/icons/warning_invalid.svg"
import React from "react";

export const CredentialField = ({fieldName, handleFunc}) => {
    const [error, setError] = React.useState(null);

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
            marginTop: '2%'
        }}>
        <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '2%'
        }}>
            <p style={{display: 'flex', marginBottom: '2%', color: colors.gray}}>
                {fieldName}
            </p>

            <div className='credential-field-warning-box' style={{
                '--display': error ? 'flex' : 'none'
            }}>
                <img src={warning} alt={'warning'} className='credential-field-warning'  />

                <div className="credential-warning-hover" style={{
                    '--background-color': colors.primary,
                    '--text-color': colors.pearl,
                }}> {error} </div>
            </div>

        </div>

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
                onBlur={handleChange}
                onChange={handleChange}
            />
        </div>
    </div>);
}