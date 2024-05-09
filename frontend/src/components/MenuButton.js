import colors from "../values/colors";

export const MenuButton = ({svg_file, height, text, onClick}) => {
    return (
        <div className={"home-menu-button"} style={{backgroundColor: colors.pearl}}
        onClick={onClick}>
            <img src={svg_file} alt="profile icon" width="52vh" height={height}/>
            <text className={"noto-sans-georgian-elegant"} style={{
                color: colors.secondary_dark,
                fontSize: 20
            }}>{text}
            </text>
        </div>
    );
}