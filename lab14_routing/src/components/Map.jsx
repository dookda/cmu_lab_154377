import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl/dist/maplibre-gl'
import bbox from '@turf/bbox';
import './Map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const startPoint = useState([]);
    const endPoint = useState([])

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=QcH5sAeCUv5rMXKrnJms',
            center: [100, 18],
            zoom: 8
        })
        mapRef.current = map
        return () => map.remove()
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/99.011715%2C18.814504%3B98.968707%2C18.8013?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiZG9va2RhIiwiYSI6ImNscTM3azN3OTA4dmEyaXF1bmg3cXRvbDUifQ.d1Ovd_n9PwJqc_MdGS66-A`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: data.routes[0].geometry
                }

                const boundsArr = bbox(geojson);
                map.fitBounds([[boundsArr[0], boundsArr[1]], [boundsArr[2], boundsArr[3]]], { padding: 20 });

                map.addSource('route', {
                    type: 'geojson',
                    data: geojson
                })
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    paint: {
                        'line-color': '#3F51B5',
                        'line-width': 3
                    }
                })

                new maplibregl.Marker({ color: "#880000", })
                    .setLngLat(data.waypoints[0].location)
                    .addTo(map)

                new maplibregl.Marker({ color: "#04782fff", })
                    .setLngLat(data.waypoints[1].location)
                    .addTo(map)
            })
    }, [])

    return (
        <div
            ref={mapContainer}
            className="card map mt-5"
        >
            Map
        </div>
    );
}