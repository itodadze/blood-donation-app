import {Dropdown} from "react-bootstrap";
import colors from "../../values/colors";
import {useState} from "react";

export const DropdownDonorOption = ({user, description, action}) => {
    const [check, setCheck] = useState(false);

    const handleChangeCheck = () => {
        setCheck(!check)
    }

    return (
        <Dropdown.Item eventKey={user} onClick={(e) =>
            action({user, check}, e)}>
            <text className={"noto-sans-georgian-elegant"} style={{
                color: colors.primary_dark,
                fontSize: 14,
                fontWeight: "bold"
            }}>
                {description}
            </text>
            <input
                type="checkbox"
                checked={check}
                onChange={handleChangeCheck}
                className={"request-checkbox"}
            />
        </Dropdown.Item>
    );
}