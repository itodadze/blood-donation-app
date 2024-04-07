import colors from "../../values/colors";

export const HomePageMenuButton = ({svg_file, height, text}) => {
    return (
        <div className={"home-menu-button"} style={{backgroundColor: colors.gray}}>
            <img src={svg_file} alt="profile icon" width="52vh" height={height}/>
            <text className={"noto-sans-georgian-elegant"} style={{
                color: colors.secondary,
                fontSize: 16
            }}>{text}
            </text>
        </div>
    );
}