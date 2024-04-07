import {useEffect, useRef, useState} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
//import {getPinMarker} from "./PinMarkerComponent";

mapboxgl.accessToken = 'pk.eyJ1IjoiaXRvZGFkemUiLCJhIjoiY2x1bWdveHpnMG4zdjJrb2F2bXN3ZWx6YiJ9.-yIhnR6oioGEsaa2U1vgsQ';

export const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(44.78);
    const [lat] = useState(41.72);
    const [zoom] = useState(12);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [lng, lat],
            zoom: zoom
        });
        /*getPinMarker('A-', 44.7851, 41.7105).addTo(map.current);*/
        });
    return (
        <div>
            <div ref={mapContainer} style={{minWidth: "100vh", minHeight: "90vh", textAlign: "center"}}/>
        </div>
    );
}