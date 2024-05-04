import {useEffect, useRef, useState} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

import colors from "../../values/colors";

export const LocationPick = ({setSelectedLat, setSelectedLon}) => {
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
            setSelectedLat(e.lngLat.lat)
            setSelectedLon(e.lngLat.lng)
        })
    });

    return (
        <div>
            <div ref={mapContainer} className={"request-location"}/>
        </div>
    );
}