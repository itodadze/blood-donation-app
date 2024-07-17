import {Button, Dropdown} from "react-bootstrap";
import {DropdownBloodOption} from "./DropdownBloodOption";
import {useEffect, useState} from "react";
import {getBloodTypes} from "../services/BloodTypeService";
import {bloodTypeToSvg} from "../services/BloodTypeToSvg";

export const BloodDropdownMenu = ({handleSelect, className}) => {
    const [bloodTypes, setBloodTypes] = useState([]);
    const [selectedBloodNarrative, setNarrative] = useState('სისხლის ტიპი');


    useEffect(() => {
        getBloodTypes().then(data => {
            setBloodTypes(data);
            console.log(data);
        });
    }, []);

    return (
        <Dropdown>
            <Dropdown.Toggle as={Button} variant="outline-dark" className={className}>
                {selectedBloodNarrative}
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
                            id = {bloodType.id}
                            action = {handleSelect}
                            setDescription={setNarrative}
                            />
                        );
                        }
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}