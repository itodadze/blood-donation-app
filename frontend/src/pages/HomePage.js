import React from 'react'
import colors from "../values/colors";
import {Map} from "../components/map/Map"

export const Home = () => {
    return (
        <div style={{
            backgroundColor: colors.dark_gray,
            minHeight: "100vh", margin: "0", padding: "0", border: "0", minWidth: "100vh"
        }}>
            <h1 style={{color: colors.primary, textAlign: "center"}}>Test Primary Color</h1>
            <h2 style={{color: colors.secondary, textAlign: "center"}}>Test Secondary Color</h2>
            <h3 style={{color: colors.tertiary, textAlign: "center"}}>Test Tertiary Color</h3>
            <div>
                <Map />
            </div>
        </div>
    );
}