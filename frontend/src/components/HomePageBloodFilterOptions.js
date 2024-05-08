import '../App.css';
import {useEffect, useState} from "react";
import {BloodDropdownMenu} from "./BloodDropdownMenu";
import {MatchDropdownMenu} from "./MatchDropdownMenu";
import {getSearchRequests} from "../services/SearchRequestService";

export const HomePageBloodFilterOptions = ({handleHeightChange, setMapRequestData}) => {

    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedMatch, setMatch] = useState(null);

    useEffect(() => {
        handleHeightChange();
    }, [selectedBlood, selectedMatch])

    useEffect(() => {
        getSearchRequests({selectedBlood, selectedMatch}).then(data => {
            setMapRequestData(data);
        });
    }, [selectedBlood, selectedMatch]);

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
            <BloodDropdownMenu selectedBlood={selectedBlood} handleSelect={handleSelect} className={"home-dropdown-menu"}/>
            <MatchDropdownMenu matches={matches} selectedMatch={selectedMatch} handleMatch={handleMatch}/>
        </div>
    );
}