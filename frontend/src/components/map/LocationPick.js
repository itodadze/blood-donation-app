import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import colors from "../../values/colors";

export const LocationPick = ({ setSelectedLat, setSelectedLon, className, latitude, longitude }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerRef = useRef(null);

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

        map.current.on('click', function (e) {
            const lngLat = e.lngLat;
            if (!markerRef.current) {
                markerRef.current = new mapboxgl.Marker()
                    .setLngLat(lngLat)
                    .addTo(map.current);
            } else {
                markerRef.current.setLngLat(lngLat);
            }
            setSelectedLat(lngLat.lat);
            setSelectedLon(lngLat.lng);
        });

        map.current.resize();
    }, [lng, lat, zoom, setSelectedLat, setSelectedLon]);

    useEffect(() => {
        if (latitude !== null && longitude !== null && map.current) {
            const lngLat = [longitude, latitude];
            map.current.setCenter(lngLat);
            if (!markerRef.current) {
                markerRef.current = new mapboxgl.Marker()
                    .setLngLat(lngLat)
                    .addTo(map.current);
            } else {
                markerRef.current.setLngLat(lngLat);
            }
            setSelectedLat(latitude);
            setSelectedLon(longitude);
        }
    }, [latitude, longitude, setSelectedLat, setSelectedLon]);

    return (
        <div>
            <div ref={mapContainer} className={className} />
        </div>
    );
};