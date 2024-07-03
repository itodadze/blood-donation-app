import {useEffect, useRef, useState} from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

import colors from "../../values/colors";

export const LocationPick = ({setSelectedLat, setSelectedLon, className}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(44.78);
    const [lat] = useState(41.72);
    const [zoom] = useState(12);

    useEffect(() => {
        if (map.current) return;

        const initializeMap = () => {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/outdoors-v12',
                center: [lng, lat],
                zoom: zoom
            });

            let marker = null;
            map.current.on('click', function (e) {
                const lngLat = e.lngLat;
                if (marker == null) {
                    marker = new mapboxgl.Marker()
                        .setLngLat(lngLat)
                        .addTo(map.current);
                } else {
                    marker.setLngLat(lngLat);
                }
                setSelectedLat(lngLat.lat);
                setSelectedLon(lngLat.lng);
            });

            map.current.resize();
        };

        if (mapContainer.current) {
            initializeMap();
        }
    }, [lng, lat, zoom, setSelectedLat, setSelectedLon]);

    return (
        <div>
            <div ref={mapContainer} className={className}/>
        </div>
    );
}