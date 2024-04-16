import background from "../assets/background/background.png";
import {useState} from "react";
import {BloodDropdownMenu} from "./BloodDropdownMenu";
import colors from "../values/colors";
import {LocationPick} from "./map/LocationPick";

export const RequestForm = () => {

    const [selectedBlood, setSelectedBlood] = useState(null);

    const handleSelect = (eventKey, event) => {
        setSelectedBlood(event.target.innerText);
    };

    return (
        <div style={{
            flex: '1', position: 'relative', width: "100%", backgroundImage: `url(${background})`,
            backgroundSize: 'cover', display: "flex", justifyContent: "center", flexDirection: "column"
        }}>
            <div style={{
                margin: "10px", display: "flex", flexDirection: "row",
                alignItems: "center", justifyContent: "center"
            }}>
                <text className={"noto-sans-georgian-elegant"} style={{
                    color: colors.black,
                    fontWeight: "bold", fontSize: 22,
                }}>
                    მჭირდება:
                </text>
                <BloodDropdownMenu selectedBlood={selectedBlood} handleSelect={handleSelect}
                                   className={"request-dropdown-menu"}/>
            </div>
            <div style={{
                margin: "10px", display: "flex", flexDirection: "row",
                alignItems: "center", justifyContent: "center"
            }}>
                <text className={"noto-sans-georgian-elegant"} style={{
                    color: colors.black,
                    fontWeight: "bold", fontSize: 22,
                }}>
                    აირჩიე ლოკაცია:
                </text>
                <LocationPick/>
            </div>
        </div>
    );
}