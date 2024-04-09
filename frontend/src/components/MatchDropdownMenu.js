import {Button, Dropdown} from "react-bootstrap";
import {DropdownMatchOption} from "./DropdownMatchOption";

export const MatchDropdownMenu = ({matches, selectedMatch, handleMatch}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle as={Button} variant="outline-dark" className={"home-dropdown-menu"}>
                {selectedMatch ? selectedMatch : 'ფილტრი'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    matches.map(
                        (match) => (
                            <DropdownMatchOption description={match}
                                                 action={handleMatch}/>
                        )
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}