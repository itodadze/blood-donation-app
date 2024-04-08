import colors from "../values/colors";
import menu from "../assets/icons/menu.svg";
import React from "react";
import {HomePageBloodFilterOptions} from "./HomePageBloodFilterOptions";
import {HomePageUserFilterOptions} from "./HomePageUserFilterOptions";

export const HomePageSearchBar = ({toggleSidebar, bloodOverUsers, toggleFilterButton}) => {
    return (
        <div style={{flex: '0 0 110px', backgroundColor: colors.dark_pearl}}>
            <div style={{display: 'flex', flexDirection: 'row', height: '100px'}}>
                <div style={{alignItems: "center", display: "flex"}}>
                    <img src={menu} alt="menu icon" width="60vh" height="52vh"
                         onClick={toggleSidebar}/>
                </div>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button className={bloodOverUsers ? "home-selected-button" : "home-unselected-button"}
                                onClick={toggleFilterButton}>მოთხოვნების ძებნა
                        </button>
                        <button className={bloodOverUsers ? "home-unselected-button" : "home-selected-button"}
                                onClick={toggleFilterButton}>მომხმარებლის ძებნა
                        </button>
                    </div>
                    {bloodOverUsers && <HomePageBloodFilterOptions/>}
                    {!bloodOverUsers && <HomePageUserFilterOptions/>}
                </div>
            </div>
        </div>
    );
}