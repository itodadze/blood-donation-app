import {Button, Dropdown} from "react-bootstrap";
import {DropdownBloodOption} from "./DropdownBloodOption";
import {useEffect, useState} from "react";
import {getBloodTypes} from "../services/BloodTypeService";
import {bloodTypeToSvg} from "../services/BloodTypeToSvg";

export const BloodDropdownMenu = ({selectedBlood, handleSelect}) => {
    const [bloodTypes, setBloodTypes] = useState([]);

    useEffect(() => {
        getBloodTypes().then(data => {
            setBloodTypes(data);
            console.log("BLOOD TYPES:", data);
        });
    }, []);

    return (
        <Dropdown>
            <Dropdown.Toggle as={Button} variant="outline-dark" className={"home-dropdown-menu"}>
                {selectedBlood ? selectedBlood : 'სისხლის ტიპი'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    bloodTypes.map(
                        (bloodType) => {
                            var path = bloodType.icon_path
                            return (
                                < DropdownBloodOption
                            svg_file = {bloodTypeToSvg({path})}
                            description = {bloodType.narrative}
                            action = {handleSelect}
                            />
                        );
                        }
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}