import {Dropdown} from "react-bootstrap";
import colors from "../values/colors";

export const DropdownBloodOption = ({svg_file, id, description, action, setDescription}) => {
    const handleClick = (eventKey, description, event) => {
        setDescription(description);
        action({id}, event);
    };

    return (
        <Dropdown.Item eventKey={id} onClick={(e) =>
            handleClick(id, description, e)
            }>
            <img src={svg_file} alt="blood icon" height="35vh" width="36vh"/>
            <text className={"noto-sans-georgian-elegant"} style={{
                color: colors.primary_dark,
                fontSize: 14,
                fontWeight: "bold"
            }}>
                {description}
            </text>
        </Dropdown.Item>
    );
}