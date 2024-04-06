import React from 'react'
import colors from "../values/colors";
import {Map} from "../components/map/Map"

export const Home = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <div style={{flex: '0 0 30vh', backgroundColor: colors.secondary}}>
            </div>
            <div style={{flex: '1', display: 'flex', flexDirection: 'column'}}>
                <div style={{flex: '0 0 10vh', backgroundColor: colors.tertiary}}>
                </div>
                <div style={{flex: '1', position: 'relative'}}>
                    <Map/>
                </div>
            </div>
        </div>
    );
}