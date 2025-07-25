import React, { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl/dist/maplibre-gl'

import './Map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            center: [100, 18],
            zoom: 8
        })

        return () => map.remove()

    }, []);

    return (
        <div
            ref={mapContainer}
            className="map"
        >
            Map
        </div>
    );
}