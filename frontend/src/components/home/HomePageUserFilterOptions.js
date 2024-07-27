import {useEffect, useState} from "react";
import {BloodDropdownMenu} from "../BloodDropdownMenu";
import {MatchDropdownMenu} from "../MatchDropdownMenu";
import {getUsers} from "../../services/UserService";

export const HomePageUserFilterOptions = ({handleHeightChange, setMapUserData}) => {
    const [selectedBlood, setSelectedBlood] = useState(null);
    const [selectedMatch, setMatch] = useState(null);

    useEffect(() => {
        handleHeightChange();
    }, [selectedBlood, selectedMatch])

    useEffect(() => {
        getUsers({selectedBlood, selectedMatch}).then(data => {
            setMapUserData(data);
        });
    }, [selectedBlood, selectedMatch]);

    const matches = [
        "ყველა დონორი", "მხოლოდ მონიშნული"
    ]

    const handleSelect = (eventKey, event) => {
        setSelectedBlood(eventKey.id);
    };

    const handleMatch = (eventKey, event) => {
        setMatch(event.target.innerText);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
            <BloodDropdownMenu handleSelect={handleSelect} className={"home-dropdown-menu"}/>
            <MatchDropdownMenu matches={matches} selectedMatch={selectedMatch} handleMatch={handleMatch}
            defaultVal={"ფილტრი"}/>
        </div>
    );
}