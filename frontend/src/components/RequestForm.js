import background from "../assets/background/background.png";
import {useState} from "react";
import {BloodDropdownMenu} from "./BloodDropdownMenu";
import {LocationPick} from "./map/LocationPick";

export const RequestForm = () => {

    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedLat, setSelectedLat] = useState(null);
    const [selectedLon, setSelectedLon] = useState(null)
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSelect = (eventKey, event) => {
        setSelectedBlood(event.target.innerText);
    };

    return (
        <div style={{
            flex: '1', position: 'relative', width: "100%", backgroundImage: `url(${background})`,
            backgroundSize: 'cover', display: "flex", justifyContent: "center", flexDirection: "column"
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
                <div style={{width: '320px', height: '170px', overflowX: 'auto'}}>
                    <textarea
                        value={inputValue}
                        onChange={handleChange}
                        style={{width: '300px', height: '150px', borderStyle: 'solid'}}
                        className={"scroll"}
                    />
                </div>
            </div>
        </div>
    );
}