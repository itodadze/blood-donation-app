import '../../App.css';
import {useEffect, useState} from "react";
import {BloodDropdownMenu} from "../BloodDropdownMenu";
import {MatchDropdownMenu} from "../MatchDropdownMenu";
import {getSearchRequests} from "../../services/SearchRequestService";

export const HomePageBloodFilterOptions = ({handleHeightChange, setMapRequestData}) => {

    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedMatch, setMatch] = useState(null);
    const [selectedAuthorFilter, setSelectedAuthorFilter] = useState(null);

    useEffect(() => {
        handleHeightChange();
    }, [selectedBlood, selectedMatch, selectedAuthorFilter])

    useEffect(() => {
        getSearchRequests({selectedBlood, selectedMatch, selectedAuthorFilter}).then(data => {
            setMapRequestData(data);
        });
    }, [selectedBlood, selectedMatch, selectedAuthorFilter]);

    const matches = [
        "ყველა მიმღები", "მხოლოდ მონიშნული"
    ]

    const authorMatches = [
        "ყველა", "მე"
    ]

    const handleSelect = (eventKey, event) => {
        setSelectedBlood(eventKey.id);
    };

    const handleMatch = (eventKey, event) => {
        setMatch(event.target.innerText);
    }

    const handleRequestAuthor = (eventKey, event) => {
        setSelectedAuthorFilter(event.target.innerText);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <BloodDropdownMenu handleSelect={handleSelect} className={"home-dropdown-menu"}/>
            <MatchDropdownMenu matches={matches} selectedMatch={selectedMatch} handleMatch={handleMatch}
                defaultVal={"ფილტრი"}/>
            <MatchDropdownMenu matches={authorMatches} selectedMatch={selectedAuthorFilter}
                               handleMatch={handleRequestAuthor} defaultVal={"გამომცხადებელი"}/>
        </div>
    );
}