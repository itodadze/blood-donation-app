import {useEffect, useRef, useState} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

export const LocationPick = () => {
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

        let marker = null
        map.current.on('click', function (e) {
            if (marker == null) {
                marker = new mapboxgl.Marker()
                    .setLngLat(e.lngLat)
                    .addTo(map.current);
            } else {
                marker.setLngLat(e.lngLat)
            }
        })
    });

    return (
        <div>
            <div ref={mapContainer} style={{minWidth: "40vh", minHeight: "25vh", textAlign: "center"}}/>
        </div>
    );
}