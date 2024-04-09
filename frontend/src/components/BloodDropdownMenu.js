import {Button, Dropdown} from "react-bootstrap";
import {DropdownBloodOption} from "./DropdownBloodOption";
import o_p from "../assets/blood_types/o_p.svg"
import o_n from "../assets/blood_types/o_n.svg"
import a_p from "../assets/blood_types/a_p.svg"
import a_n from "../assets/blood_types/a_n.svg"
import b_p from "../assets/blood_types/b_p.svg"
import b_n from "../assets/blood_types/b_n.svg"
import ab_p from "../assets/blood_types/ab_p.svg"
import ab_n from "../assets/blood_types/ab_n.svg"

export const BloodDropdownMenu = ({selectedBlood, handleSelect}) => {

    /* Later get this data from db */
    const blood_types = [
        [o_n, "პირველი უარყოფითი"],
        [o_p, "პირველი დადებითი"],
        [a_n, "მეორე უარყოფითი"],
        [a_p, "მეორე დადებითი"],
        [b_n, "მესამე უარყოფითი"],
        [b_p, "მესამე დადებითი"],
        [ab_n, "მეოთხე უარყოფითი"],
        [ab_p, "მეოთხე დადებითი"],
    ]

    return (
        <Dropdown>
            <Dropdown.Toggle as={Button} variant="outline-dark" className={"home-dropdown-menu"}>
                {selectedBlood ? selectedBlood : 'სისხლის ტიპი'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    blood_types.map(
                        (blood_type) => (
                            <DropdownBloodOption svg_file={blood_type.at(0)}
                                                 description={blood_type.at(1)}
                                                 action={handleSelect}/>
                        )
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}