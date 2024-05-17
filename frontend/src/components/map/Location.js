import {useEffect, useRef, useState} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = 'pk.eyJ1IjoiaXRvZGFkemUiLCJhIjoiY2x1bWdveHpnMG4zdjJrb2F2bXN3ZWx6YiJ9.-yIhnR6oioGEsaa2U1vgsQ';


export const Location = ({selectedLat, selectedLon}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLat] = useState(selectedLat);
    const [lng, setLng] = useState(selectedLon);
    const [zoom] = useState(12);

    useEffect(() => {
        setLat(selectedLat)
    }, [selectedLat])

    useEffect(() => {
        setLng(selectedLon)
    }, [selectedLon])

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [lng, lat],
            zoom: zoom
        });

        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current);
    }, []);

    return (
        <div>
            <div ref={mapContainer} className={"request-location"}/>
        </div>
    );
}