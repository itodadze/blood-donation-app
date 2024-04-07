import React from 'react'
import colors from "../values/colors";
import {Map} from "../components/map/Map"
import {HomePageMenu} from "../components/map/HomePageMenu";
import {Helmet} from "react-helmet";

export const Home = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                    rel="stylesheet"/>
                <script src='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js'></script>
                <link href='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css' rel='stylesheet'/>
            </Helmet>
            <HomePageMenu/>
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