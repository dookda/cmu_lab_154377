import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';


export default function Map() {
    const mapContainer = useRef(null)
    const mapRef = useRef(null)

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            // style: 'https://demotiles.maplibre.org/style.json',
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/light-matter-gl-style/style.json',
            // style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            // style: 'http://localhost:8080/styles/basic-preview/style.json',
            center: [98.95028216958734, 18.802614467416145],
            zoom: 10
        });

        map.on('load', () => {
            map.addSource('overlay', {
                type: 'vector',
                tiles: [
                    'http://localhost:8080/data/overlay2/{z}/{x}/{y}.pbf'
                ],
                minzoom: 0,
                maxzoom: 18
            });

            map.addLayer({
                id: 'overlay-points',
                type: 'circle',
                source: 'overlay',
                'source-layer': 'overlay',
                filter: ["==", ["geometry-type"], "Point"],
                paint: {
                    'circle-radius': [
                        'interpolate', ['linear'], ['zoom'],
                        8, 4,
                        14, 10
                    ],
                    'circle-color': [
                        'match',
                        ['get', 'category'],
                        'restaurant', '#e91e63',
                        'hotel', '#3f51b5',
      /* default */ '#9e9e9e'
                    ],
                    'circle-opacity': 0.8
                }
            });


            // add line style
            map.addLayer({
                id: 'overlay-lines',
                type: 'line',
                source: 'overlay',
                'source-layer': 'overlay',
                filter: ["==", ["geometry-type"], "LineString"],
                paint: {
                    'line-color': '#ff0000',
                    'line-width': 2,
                    'line-opacity': 0.8,
                    'line-dasharray': [2, 2]
                }
            });


            map.on('click', 'overlay-points', (e) => {
                const props = e.features[0].properties;
                new maplibregl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(`<strong>${props.name}</strong><br/>${props.category}`)
                    .addTo(map);
            });

            map.on('mouseenter', 'overlay-points', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'overlay-points', () => {
                map.getCanvas().style.cursor = '';
            });

        })

        mapRef.current = map

        return () => {
            map.remove()
        }
    }, [])


    return (
        <div ref={mapContainer}
            className='map'>
        </div>
    );
}