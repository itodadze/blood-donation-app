import colors from "../../values/colors";
import mapboxgl from "mapbox-gl";

const getPinMarkerHTML = (bloodType) => (
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="35" height="35">
                <defs>
                    <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1" />
                        <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0 0 0 0   0
                                                                             0 0 0 0   0 
                                                                             0 0 0 0   0 
                                                                             0 0 0 0.3 0" />
                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                    </filter>
                </defs>
                <g filter="url(#drop-shadow)">
                    <path d="M40 99.5 C-22.5 57.5 0 0 40 0.5 C80 0 102.5 57.5 40 99.5z" stroke-width="2" stroke="${colors.primary_dark}" fill="${colors.blood}"/>
                    <text x="40" y="55" font-size="36" font-weight="bold" fill="${colors.pearl}" text-anchor="middle">${bloodType}</text>
                </g>
            </svg>`);

export const getPinMarker = (bloodType, longitude, latitude) => {
    const markerContainer = document.createElement('div');
    markerContainer.innerHTML = getPinMarkerHTML(bloodType)
    return new mapboxgl.Marker({element: markerContainer})
        .setLngLat([longitude, latitude]);
}
