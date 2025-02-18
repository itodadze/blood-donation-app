import colors from "../values/colors";

export const MenuButton = ({svg_file, height, text, onClick, selected}) => {
    let color = colors.pearl
    if (selected) {
        color = colors.tertiary
    }
    return (
        <div className={"home-menu-button"} style={{backgroundColor: color}}
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