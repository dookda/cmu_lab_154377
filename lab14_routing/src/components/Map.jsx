import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl/dist/maplibre-gl'
import bbox from '@turf/bbox';
import './Map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [startPoint, setStartPoint] = useState([99.011715, 18.814504]);
    const [endPoint, setEndPoint] = useState([98.968707, 18.8013])

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=QcH5sAeCUv5rMXKrnJms',
            center: [100, 18],
            zoom: 8
        })

        map.on('click', (e) => {
            console.log(e)
            setEndPoint([e.lngLat.lng, e.lngLat.lat])
        })

        mapRef.current = map
        return () => map.remove()
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;
        const mbToken = 'pk.eyJ1IjoiZG9va2RhIiwiYSI6ImNscTM3azN3OTA4dmEyaXF1bmg3cXRvbDUifQ.d1Ovd_n9PwJqc_MdGS66-A';
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint.toString()};${endPoint.toString()}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mbToken}`)
            .then((response) => response.json())
            .then(({ routes, waypoints }) => {
                // console.log(data);
                try {
                    if (map.getLayer('route') || map.getSource('route')) {
                        map.removeLayer('route');
                        map.removeSource('route');
                        endMarker.remove()
                    }
                } catch (error) {
                    console.log("not found route");
                }

                const route = {
                    type: 'Feature',
                    properties: {},
                    geometry: routes[0].geometry
                }

                const boundsArr = bbox(route);
                map.fitBounds([[boundsArr[0], boundsArr[1]], [boundsArr[2], boundsArr[3]]], { padding: 20 });

                map.addSource('route', {
                    type: 'geojson',
                    data: route
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
                    .setLngLat(waypoints[0].location)
                    .addTo(map)

                if (markerRef.current !== null) markerRef.current.remove()
                markerRef.current = new maplibregl.Marker({ color: "#04782fff", })
                    .setLngLat(waypoints[1].location)
                    .addTo(map)
            })
    }, [endPoint])

    return (
        <div
            ref={mapContainer}
            className="card map mt-5"
        >
            Map
        </div>
    );
}