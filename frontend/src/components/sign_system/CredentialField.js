import colors from "../../values/colors";

export const CredentialField = ({fieldName, defaultValue}) => {

    return (
        <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <text style={{display: 'flex', flex: 1}}>
                {fieldName}
            </text>
            <div style={{display: 'flex', flex: 1, backgroundColor: colors.white, borderStyle: 'solid',
                         borderColor: colors.tertiary, borderRadius: '15px'}}>

            </div>
        </div>
    );
}