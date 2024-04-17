import background from "../assets/background/background.png";
import {useState} from "react";
import {BloodDropdownMenu} from "./BloodDropdownMenu";
import {LocationPick} from "./map/LocationPick";
import colors from "../values/colors";

export const RequestForm = () => {

    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedLat, setSelectedLat] = useState(null);
    const [selectedLon, setSelectedLon] = useState(null)
    const [inputValue, setInputValue] = useState('');
    const [emergency, setEmergency] = useState(true);

    const handleEmergency = () => {
        setEmergency(!emergency);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSelect = (eventKey, event) => {
        setSelectedBlood(event.target.innerText);
    };

    return (
        <div style={{
            flex: '1', position: 'relative', width: "100%", backgroundImage: `url(${background})`,
            backgroundSize: 'cover', display: "flex", justifyContent: "center", flexDirection: "column",
            alignItems: 'center'
        }}>
            <div style={{
                height: "90%", width: "92%", position: 'relative', backgroundColor:
                colors.pearl, display: "flex", justifyContent: "center", flexDirection: "column"
            }}>
                <div className={"request-item"}>
                    <text className={"request-item-desc"}>
                        მჭირდება:
                    </text>
                    <BloodDropdownMenu selectedBlood={selectedBlood} handleSelect={handleSelect}
                                       className={"request-dropdown-menu"}/>
                </div>
                <div className={"request-item"}>
                    <text className={"request-item-desc"}>
                        აირჩიე ლოკაცია:
                    </text>
                    <LocationPick setSelectedLat={setSelectedLat} setSelectedLon={setSelectedLon}/>
                </div>
                <div className={"request-item"}>
                    <text className={"request-item-desc"}>
                        აღწერა:
                    </text>
                    <div style={{width: '380px', height: '170px', overflowX: 'auto'}}>
                        <textarea
                            value={inputValue}
                            onChange={handleChange}
                            className={"scroll request-description"}
                        />
                    </div>
                </div>
                <div className={"request-item"}>
                    <text className={"request-item-desc"}>
                        სასწრაფოდ მესაჭიროება:
                    </text>
                    <input
                        type="checkbox"
                        checked={emergency}
                        onChange={handleEmergency}
                        className={"request-checkbox"}
                    />
                </div>
                <div className={"request-item"}>
                    <button className={"request-confirm"}>
                        გაგზავნა
                    </button>
                </div>
            </div>
        </div>
    );
}