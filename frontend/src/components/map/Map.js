import {useEffect, useRef, useState} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import {getPinMarker} from "./PinMarkerComponent";
//import {getPinMarker} from "./PinMarkerComponent";
import {useNavigate} from "react-router-dom";

mapboxgl.accessToken = 'pk.eyJ1IjoiaXRvZGFkemUiLCJhIjoiY2x1bWdveHpnMG4zdjJrb2F2bXN3ZWx6YiJ9.-yIhnR6oioGEsaa2U1vgsQ';

export const Map = ({mapData}) => {
    const navigate = useNavigate();

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(44.78);
    const [lat] = useState(41.72);
    const [zoom] = useState(12);
    const [currentMarkers] = useState([]);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [lng, lat],
            zoom: zoom
        });
        });

    useEffect(() => {
        if (!map.current) return;
        if (!mapData) return
        if (currentMarkers!==null) {
            for (let i = currentMarkers.length - 1; i >= 0; i--) {
                currentMarkers[i].remove();
            }
        }
        mapData.forEach(marker => {
            let id = marker.id
            marker = getPinMarker(marker.blood_txt, marker.loc_longitude, marker.loc_latitude)
            marker.addTo(map.current)
            marker.getElement().addEventListener('click', () => {
                navigate("/request/" + id);
            });
            currentMarkers.push(marker);
        });
    }, [mapData]);
    return (
        <div>
            <div ref={mapContainer} style={{minWidth: "100vh", minHeight: "85vh", textAlign: "center"}}/>
        </div>
    );
}