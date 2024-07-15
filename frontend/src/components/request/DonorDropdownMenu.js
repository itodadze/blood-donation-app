import {Button, Dropdown} from "react-bootstrap";
import {DropdownDonorOption} from "./DropdownDonorOption";

export const DonorDropdownMenu = ({users, className, selectedUsers, setSelectedUsers}) => {
    const handleDonor = ({user, check}) => {
        if (!check) {
            setSelectedUsers([...selectedUsers, user]);
        } else {
            setSelectedUsers(selectedUsers.filter(e => e !== user));
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle as={Button} variant="outline-dark" className={className}>
                ვინ ჩააბარა სისხლი
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    users != null && users.map(
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