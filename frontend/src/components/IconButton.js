import colors from "../values/colors";

export const IconButton = ({svg_file, height, text, onClick}) => {
    return (
        <div className={"home-menu-button"} style={{backgroundColor: colors.pearl}} onClick={onClick}>
            <img src={svg_file} alt="profile icon" width="58vh" height={height}/>
            <text className={"noto-sans-georgian-elegant"} style={{
                color: colors.blood,
                fontSize: 28
            }}>{text}
            </text>
        </div>
    );
}