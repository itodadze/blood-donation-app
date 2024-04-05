import {useEffect, useRef, useState} from "react";

const mapboxgl = require('mapbox-gl');

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
    });
    return (
        <div>
            <div ref={mapContainer} style={{ minWidth: "100vh", minHeight: "70vh", textAlign: "center" }} />
        </div>
    );
}