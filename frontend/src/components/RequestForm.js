import background from "../assets/background/background.png";
import {useState} from "react";
import {BloodDropdownMenu} from "./BloodDropdownMenu";
import colors from "../values/colors";

export const RequestForm = () => {

    const [selectedBlood, setSelectedBlood] = useState(null);

    const handleSelect = (eventKey, event) => {
        setSelectedBlood(event.target.innerText);
    };

    return (
        <div style={{
        flex: '1', position: 'relative', width: "100%", backgroundImage: `url(${background})`,
        backgroundSize: 'cover', display: "flex", justifyContent: "center"
        }}>
            <div style={{margin: "10px", display: "flex", flexDirection: "row",
            alignItems: "center"}}>
                <text className={"noto-sans-georgian-elegant"} style={{color: colors.black,
                fontWeight: "bold", fontSize: 22, }}>
                    მჭირდება:
                </text>
                <BloodDropdownMenu selectedBlood={selectedBlood} handleSelect={handleSelect}
                                   className={"request-dropdown-menu"}/>
            </div>
        </div>
    );
}