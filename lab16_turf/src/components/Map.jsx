import React from 'react'
import { useRef, useEffect, useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import * as turf from "@turf/turf";
import './Map.css'

export default function Map() {
    const mapContainer = useRef(null)
    const mapRef = useRef(null)
    // const [points, setPoints] = useState([])
    // const [items, setItems] = useState([]);

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=QcH5sAeCUv5rMXKrnJms',
            center: [99.78, 18.56],
            zoom: 13
        })

        const nav = new maplibregl.NavigationControl()
        map.addControl(nav)

        map.on('click', (e) => {
            console.log(e);
        })

        map.on('load', (e) => {
            const options = {
                bbox: [99.7259, 18.49395, 99.86979, 18.629636],
            };
            const points = turf.randomPoint(100, options);
            const voronoiPolygons = turf.voronoi(points, options);
            console.log(voronoiPolygons);

            const markers = [];
            markers.forEach(m => m.remove())
            points.features.forEach(i => {
                const marker = new maplibregl.Marker()
                    .setLngLat(i.geometry.coordinates)
                    .addTo(map)
                markers.push(marker)
            })

            map.addSource('veronoi', {
                type: 'geojson',
                data: voronoiPolygons
            })

            map.addLayer({
                id: 'fill-veronoi',
                type: 'fill',
                source: 'veronoi',
                paint: {
                    'fill-color': '#dbdbdbff',
                    'fill-opacity': 0.5
                }
            })

            map.addLayer({
                id: 'line-veronoi',
                type: 'line',
                source: 'veronoi',
                paint: {
                    'line-color': '#ff6677',
                    'line-width': 3
                }
            })
        })

        mapRef.current = map
        return () => map.remove()
    }, [])

    // useEffect(() => {

    //     const map = mapRef.current

    //     console.log(items);

    // const options = {
    //     bbox: [99.7259, 18.49395, 99.86979, 18.629636],
    // };
    // const points = turf.randomPoint(100, options);
    // const voronoiPolygons = turf.voronoi(points, options);
    // console.log(voronoiPolygons);

    // const markers = [];
    // markers.forEach(m => m.remove())
    // points.features.forEach(i => {
    //     const marker = new maplibregl.Marker()
    //         .setLngLat(i.geometry.coordinates)
    //         .addTo(map)
    //     markers.push(marker)
    // })


    // }, [points])

    return (
        <div ref={mapContainer}
            className='card shadow-sm map mt-5'
        >Map</div>
    )
}
