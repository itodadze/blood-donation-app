import {useEffect, useState} from "react";
import colors from "../values/colors";
import {BloodDropdownMenu} from "./BloodDropdownMenu";
import {MatchDropdownMenu} from "./MatchDropdownMenu";

export const HomePageUserFilterOptions = ({handleHeightChange}) => {
    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedMatch, setMatch] = useState(null);
    const [searchText, setText] = useState("")

    /* fix duplication with home page blood filter options */

    useEffect(() => {
        handleHeightChange();
    }, [selectedBlood, selectedMatch])

    const matches = [
        "ყველა დონორი", "მხოლოდ მონიშნული"
    ]

    const handleSelect = (eventKey, event) => {
        setSelectedBlood(event.target.innerText);
    };

    const handleMatch = (eventKey, event) => {
        setMatch(event.target.innerText);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
            <BloodDropdownMenu selectedBlood={selectedBlood} handleSelect={handleSelect}/>
            <MatchDropdownMenu matches={matches} selectedMatch={selectedMatch} handleMatch={handleMatch}/>
            <input placeholder="Enter User's name"
                   onChange={event => setText(event.target.value)}
            style={{margin: "5px", color: colors.secondary_dark, borderColor: colors.primary, borderRadius: "2px"}}/>
        </div>
    );
}