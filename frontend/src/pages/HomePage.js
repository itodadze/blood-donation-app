import React, {useEffect, useState} from 'react'
import {Map} from "../components/map/Map"
import {HomePageMenu} from "../components/home/HomePageMenu";
import {Helmet} from "react-helmet";
import {HomePageSearchBar} from "../components/home/HomePageSearchBar";
import {getCurrentUserId} from "../services/CurrentUserService";
import {useNavigate} from "react-router-dom";

export const Home = ({isSidebarOpen, toggleSidebar}) => {
    const [bloodOverUsers, setBloodOverUsers] = useState(true);
    const [mapRequestData, setMapRequestData] = useState([])
    const [mapUserData, setMapUserData] = useState([])

    const toggleFilterButton = () => {
        setBloodOverUsers(!bloodOverUsers);
    }

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUserId()
            .then((data) => {
                if(!data) {
                    navigate('/login');
                }
            }).catch(() => {
            navigate('/login');
        })
    }, []);


    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                    rel="stylesheet"/>
                <script src='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js'></script>
                <link href='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css' rel='stylesheet'/>
            </Helmet>
            {isSidebarOpen && <HomePageMenu/>}
            <div style={{flex: '1', display: 'flex', flexDirection: 'column', width: "100%"}}>
                <HomePageSearchBar toggleSidebar={toggleSidebar} bloodOverUsers={bloodOverUsers}
                toggleFilterButton={toggleFilterButton} setMapRequestData={setMapRequestData}
                setMapUserData={setMapUserData}/>
                <div style={{flex: '1', position: 'relative', width: "100%"}}>
                    {bloodOverUsers && <Map mapData={mapRequestData} isBlood={true}/>}
                    {!bloodOverUsers && <Map mapData={mapUserData} isBlood={false}/>}
                </div>
            </div>
        </div>
    );
}