import {Button, Dropdown} from "react-bootstrap";
import {useState} from "react";
import {DropdownDonorOption} from "./DropdownDonorOption";

export const DonorDropdownMenu = ({users, className}) => {
    const [donors, setDonors] = useState([]);

    const handleDonor = ({user, check}) => {
        if (check) {
            setDonors(donors + user)
        } else {
            setDonors(donors.filter(function(e) { return e !== user }))
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle as={Button} variant="outline-dark" className={className}>
                ვინ ჩააბარა სისხლი
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    users.map(
                        (user) => {
                            return (
                                <DropdownDonorOption
                                    user = {user.id}
                                    description = {"" + user.first_name + user.last_name}
                                    action = {handleDonor}
                                />
                            );
                        }
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}