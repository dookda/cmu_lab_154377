import React, { useEffect, useRef } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl/dist/maplibre-gl'
import './Map.css'

export default function Map({ data }) {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=QcH5sAeCUv5rMXKrnJms',
            center: [98.902295, 18.7808],
            zoom: 11,
        });

        // add marker from data
        if (data && data.data && data.data.length > 0) {
            data.data.forEach(item => {
                if (item.lat && item.lon) {
                    new maplibregl.Marker()
                        .setLngLat([item.lon, item.lat])
                        .setPopup(new maplibregl.Popup().setHTML(`<b>${item.station.name}</b><br>AQI: ${item.aqi}`))
                        .addTo(map);
                }
            });
        }

        return () => map.remove();

    }, [data])


    return (
        <div ref={mapContainer}
            className='card map'
        ></div>
    )
}
