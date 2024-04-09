import '../App.css';
import {useEffect, useState} from "react";
import {BloodDropdownMenu} from "./BloodDropdownMenu";
import {MatchDropdownMenu} from "./MatchDropdownMenu";

export const HomePageBloodFilterOptions = ({handleHeightChange}) => {

    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedMatch, setMatch] = useState(null);

    useEffect(() => {
        handleHeightChange();
    }, [selectedBlood, selectedMatch])

    const matches = [
        "ყველა მიმღები", "მხოლოდ მონიშნული"
    ]

    const handleSelect = (eventKey, event) => {
        setSelectedBlood(event.target.innerText);
    };

    const handleMatch = (eventKey, event) => {
        setMatch(event.target.innerText);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <BloodDropdownMenu selectedBlood={selectedBlood} handleSelect={handleSelect}/>
            <MatchDropdownMenu matches={matches} selectedMatch={selectedMatch} handleMatch={handleMatch}/>
        </div>
    );
}