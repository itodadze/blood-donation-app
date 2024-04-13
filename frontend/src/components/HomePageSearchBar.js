import colors from "../values/colors";
import menu from "../../src/assets/icons/menu.svg";
import React, {useEffect, useRef, useState} from "react";
import {HomePageBloodFilterOptions} from "./HomePageBloodFilterOptions";
import {HomePageUserFilterOptions} from "./HomePageUserFilterOptions";

export const HomePageSearchBar = ({toggleSidebar, bloodOverUsers, toggleFilterButton, setMapRequestData, setMapUserData}) => {

    const [contentHeight, setContentHeight] = useState(0);
    const [heightChange, handleHeightChange] = useState(false);
    const contentRef = useRef(null);

    const heightChangeFromChildren = () => {
        handleHeightChange(!heightChange)
    }

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(Math.max(contentRef.current.scrollHeight + 5, 50));
        }
    }, [contentRef, bloodOverUsers, heightChange]);

    return (
        <div style={{flex: '0 0 0', backgroundColor: colors.dark_pearl, minHeight: contentHeight}}>
            <div ref={contentRef} style={{display: 'flex', flexDirection: 'row', height: '100px'}}>
                <div style={{alignItems: "center", display: "flex"}}>
                    <img src={menu} alt="menu icon" width="60vh" height="52vh"
                         onClick={toggleSidebar}/>
                </div>
                <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: "center"
                }}>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        <button className={bloodOverUsers ? "home-selected-button" : "home-unselected-button"}
                                onClick={toggleFilterButton}>მოთხოვნების ძებნა
                        </button>
                        <button className={bloodOverUsers ? "home-unselected-button" : "home-selected-button"}
                                onClick={toggleFilterButton}>დონორთა ძებნა
                        </button>
                    </div>
                    {bloodOverUsers && <HomePageBloodFilterOptions handleHeightChange={heightChangeFromChildren} setMapRequestData={setMapRequestData}/>}
                    {!bloodOverUsers && <HomePageUserFilterOptions handleHeightChange={heightChangeFromChildren} setMapUserData={setMapUserData}/>}
                </div>
            </div>
        </div>
    );
}