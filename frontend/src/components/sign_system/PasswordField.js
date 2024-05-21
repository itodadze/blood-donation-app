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
        style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <text style={{display: 'flex', marginBottom: '10px', color: colors.gray}}>
            Password
        </text>
        <div style={{
            flexDirection: 'row', display: 'flex', // backgroundColor: colors.white,
            width: '90%', height: '50px', justifyContent: 'center', alignItems: 'center'
        }}>
            <input
                placeholder={'Enter Your Password'}
                type={showPassword ? 'text' : 'password'}
                // value={password}
                // onChange={handleChangePass}
                // onKeyUp={handleKeyUp}
                style={{
                    borderStyle: 'solid',
                    borderColor: colors.primary,
                    borderRadius: '15px',
                    margin: '2%',
                    width: '100%',
                    height: '100%'
                }}
            />

            <button onClick={toggleShowPassword} style={{borderStyle: 'none', backgroundColor: colors.pearl}}>
                <img src={showPassword ? hide_pass : show_pass}
                     alt={showPassword ? 'hide password' : 'show password'}
                     style={{
                         height: '30px', width: '30px'
                     }}
                />
            </button>

        </div>


    </div>);
}