import {Dropdown} from "react-bootstrap";
import colors from "../values/colors";

export const DropdownMatchOption = ({description, action}) => {
    return (
        <Dropdown.Item eventKey={description} onClick={(e) =>
            action({description}, e)}>
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