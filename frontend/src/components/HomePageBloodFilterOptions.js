import '../App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import {useState} from "react";
import {DropdownButton} from "react-bootstrap";

export const HomePageBloodFilterOptions = () => {

    const [selectedBlood, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <DropdownButton
                title={selectedBlood ? selectedBlood : 'Select an item'}
                onSelect={handleSelect}
                className="home-blood-menu-dropdown"
            >
                <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                <Dropdown.Item eventKey="Another action">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="Something else">Something else</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}